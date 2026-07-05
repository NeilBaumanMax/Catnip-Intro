package carousel

import (
	"fmt"
	"log"
	"net/http"
	"sync/atomic"
	"time"
)

var current int32

func init() {
	go func() {
		ticker := time.NewTicker(4 * time.Second)
		for range ticker.C {
			atomic.StoreInt32(&current, (atomic.LoadInt32(&current)+1)%4)
		}
	}()
}

func SSEHandler(w http.ResponseWriter, r *http.Request) {
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "streaming not supported", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// Send initial state
	fmt.Fprintf(w, "data: %d\n\n", atomic.LoadInt32(&current))
	flusher.Flush()

	ticker := time.NewTicker(500 * time.Millisecond)
	defer ticker.Stop()

	last := atomic.LoadInt32(&current)
	for {
		select {
		case <-r.Context().Done():
			return
		case <-ticker.C:
			now := atomic.LoadInt32(&current)
			if now != last {
				fmt.Fprintf(w, "data: %d\n\n", now)
				flusher.Flush()
				last = now
				log.Printf("[carousel] tick %d", now)
			}
		}
	}
}
