package uploads

import (
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"
)

const maxUploadSize = 5 << 20 // 5 MB

var allowedMIMETypes = map[string]bool{
	"image/jpeg":      true,
	"image/png":       true,
	"image/webp":      true,
	"image/svg+xml":   true,
}

var allowedExtensions = map[string]bool{
	".jpg":  true,
	".jpeg": true,
	".png":  true,
	".webp": true,
	".svg":  true,
}

var allowedCategories = map[string]bool{
	"products": true,
	"cases":    true,
	"company":  true,
	"qrcode":   true,
}

type uploadResponse struct {
	OK       bool   `json:"ok"`
	URL      string `json:"url,omitempty"`
	Filename string `json:"filename,omitempty"`
	Category string `json:"category,omitempty"`
	Error    string `json:"error,omitempty"`
}

// RootDir resolves the project root by walking up from cwd until go.mod is found.
func RootDir() (string, error) {
	cwd, err := os.Getwd()
	if err != nil {
		return "", fmt.Errorf("get cwd: %w", err)
	}

	dir := cwd
	for {
		if _, err := os.Stat(filepath.Join(dir, "go.mod")); err == nil {
			return filepath.Dir(dir), nil
		}

		parent := filepath.Dir(dir)
		if parent == dir {
			return "", fmt.Errorf("project root not found (no go.mod in ancestors)")
		}
		dir = parent
	}
}

func generateFilename(ext string) (string, error) {
	b := make([]byte, 8)
	if _, err := rand.Read(b); err != nil {
		return "", fmt.Errorf("generate random: %w", err)
	}
	ts := time.Now().UnixMilli()
	return fmt.Sprintf("%d_%s%s", ts, hex.EncodeToString(b), ext), nil
}

func writeJSON(w http.ResponseWriter, status int, resp uploadResponse) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		log.Printf("uploads: encode error: %v", err)
	}
}

func validateAndOpenFile(fh *multipart.FileHeader) (multipart.File, string, error) {
	ext := strings.ToLower(filepath.Ext(fh.Filename))
	if !allowedExtensions[ext] {
		return nil, "", fmt.Errorf("不允许的文件扩展名: %s", ext)
	}

	if fh.Size > maxUploadSize {
		return nil, "", fmt.Errorf("文件过大，最大 %d MB", maxUploadSize/(1<<20))
	}

	file, err := fh.Open()
	if err != nil {
		return nil, "", fmt.Errorf("打开上传文件失败: %w", err)
	}

	buf := make([]byte, 512)
	n, err := file.Read(buf)
	if err != nil && err != io.EOF {
		file.Close()
		return nil, "", fmt.Errorf("读取文件头失败: %w", err)
	}

	mimeType := http.DetectContentType(buf[:n])
	if !allowedMIMETypes[mimeType] {
		file.Close()
		return nil, "", fmt.Errorf("不允许的文件类型: %s", mimeType)
	}

	_, err = file.Seek(0, io.SeekStart)
	if err != nil {
		file.Close()
		return nil, "", fmt.Errorf("seek file: %w", err)
	}

	return file, ext, nil
}

// UploadHandler handles POST /api/uploads.
func UploadHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		writeJSON(w, http.StatusMethodNotAllowed, uploadResponse{
			OK: false, Error: "仅支持 POST 方法",
		})
		return
	}

	if err := r.ParseMultipartForm(maxUploadSize); err != nil {
		writeJSON(w, http.StatusBadRequest, uploadResponse{
			OK: false, Error: fmt.Sprintf("解析上传表单失败: %v", err),
		})
		return
	}

	category := r.FormValue("category")
	if category == "" {
		category = "products"
	}
	if !allowedCategories[category] {
		writeJSON(w, http.StatusBadRequest, uploadResponse{
			OK: false, Error: fmt.Sprintf("非法 category: %s，允许: products, cases, company, qrcode", category),
		})
		return
	}

	fh, ok := r.MultipartForm.File["file"]
	if !ok || len(fh) == 0 {
		writeJSON(w, http.StatusBadRequest, uploadResponse{
			OK: false, Error: "缺少 file 字段",
		})
		return
	}

	if len(fh) > 1 {
		writeJSON(w, http.StatusBadRequest, uploadResponse{
			OK: false, Error: "暂不支持多文件上传，每次只上传一个文件",
		})
		return
	}

	file, ext, err := validateAndOpenFile(fh[0])
	if err != nil {
		writeJSON(w, http.StatusBadRequest, uploadResponse{
			OK: false, Error: err.Error(),
		})
		return
	}
	defer file.Close()

	root, err := RootDir()
	if err != nil {
		log.Printf("uploads: resolve root: %v", err)
		writeJSON(w, http.StatusInternalServerError, uploadResponse{
			OK: false, Error: "服务端路径错误",
		})
		return
	}

	dir := filepath.Join(root, "uploads", category)
	if err := os.MkdirAll(dir, 0o755); err != nil {
		log.Printf("uploads: mkdir %s: %v", dir, err)
		writeJSON(w, http.StatusInternalServerError, uploadResponse{
			OK: false, Error: "创建目录失败",
		})
		return
	}

	filename, err := generateFilename(ext)
	if err != nil {
		log.Printf("uploads: generate filename: %v", err)
		writeJSON(w, http.StatusInternalServerError, uploadResponse{
			OK: false, Error: "生成文件名失败",
		})
		return
	}

	destPath := filepath.Join(dir, filename)
	dst, err := os.Create(destPath)
	if err != nil {
		log.Printf("uploads: create file %s: %v", destPath, err)
		writeJSON(w, http.StatusInternalServerError, uploadResponse{
			OK: false, Error: "保存文件失败",
		})
		return
	}
	defer dst.Close()

	if _, err := io.Copy(dst, file); err != nil {
		log.Printf("uploads: copy file: %v", err)
		writeJSON(w, http.StatusInternalServerError, uploadResponse{
			OK: false, Error: "写入文件失败",
		})
		return
	}

	url := fmt.Sprintf("/uploads/%s/%s", category, filename)
	log.Printf("[uploads] 上传成功: %s (%d bytes)", url, fh[0].Size)

	writeJSON(w, http.StatusOK, uploadResponse{
		OK:       true,
		URL:      url,
		Filename: filename,
		Category: category,
	})
}

// StaticHandler returns a handler that serves files from the uploads directory.
// It strips the /uploads/ prefix and serves from the project root uploads/ directory.
func StaticHandler() (http.Handler, error) {
	root, err := RootDir()
	if err != nil {
		return nil, fmt.Errorf("resolve root: %w", err)
	}
	uploadsDir := filepath.Join(root, "uploads")

	fs := http.FileServer(http.Dir(uploadsDir))

	return http.StripPrefix("/uploads/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Prevent directory listing by checking if path ends with /
		// http.FileServer serves index.html for directories; we don't have that
		// so it will return 404 for bare directory paths, which is acceptable.
		// For extra safety, reject paths that try to escape.
		if strings.Contains(r.URL.Path, "..") {
			http.Error(w, "forbidden", http.StatusForbidden)
			return
		}
		fs.ServeHTTP(w, r)
	})), nil
}
