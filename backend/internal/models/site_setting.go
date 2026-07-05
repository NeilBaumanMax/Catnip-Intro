package models

type SiteSetting struct {
	ID          int    `json:"id"`
	CompanyName string `json:"company_name"`
	Slogan      string `json:"slogan"`
	Description string `json:"description"`
	Phone       string `json:"phone"`
	Email       string `json:"email"`
	Address     string `json:"address"`
	LogoURL     string `json:"logo_url"`
	WechatQRURL string `json:"wechat_qr_url"`
	CreatedAt   string `json:"created_at"`
	UpdatedAt   string `json:"updated_at"`
}
