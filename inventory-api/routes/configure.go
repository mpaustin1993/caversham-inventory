package routes

import (
	"database/sql"
	"inventory-api/handlers"
	"net/http"
	"os"
)

func enableCORS(w http.ResponseWriter, r *http.Request) {
	origin := r.Header.Get("Origin")
	// Allow localhost for development and your Vercel domain for production
	allowedOrigins := []string{
		"http://localhost:3000",
		os.Getenv("FRONTEND_URL"), // Set this in Render.com environment variables
	}
	
	for _, allowedOrigin := range allowedOrigins {
		if origin == allowedOrigin {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			break
		}
	}
	
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func Configure(db *sql.DB) {
	http.HandleFunc("/inventory", func(w http.ResponseWriter, r *http.Request) {
		enableCORS(w, r)
		switch r.Method {
		case http.MethodGet:
			handlers.GetInventory(db, w, r)
		case http.MethodPost:
			handlers.CreateItem(db, w, r)
		}
	})

	http.HandleFunc("/inventory/{id}", func(w http.ResponseWriter, r *http.Request) {
		enableCORS(w, r)
		switch r.Method {
		case http.MethodPut:
			handlers.UpdateItem(db, w, r, r.PathValue("id"))
		case http.MethodDelete:
			handlers.DeleteItem(db, w, r, r.PathValue("id"))
		}
	})
}
