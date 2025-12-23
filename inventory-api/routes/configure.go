package routes

import (
	"database/sql"
	"inventory-api/handlers"
	"net/http"
)

func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func Configure(db *sql.DB) {
	http.HandleFunc("/inventory", func(w http.ResponseWriter, r *http.Request) {
		enableCORS(w)
		switch r.Method {
		case http.MethodGet:
			handlers.GetInventory(db, w, r)
		case http.MethodPost:
			handlers.CreateItem(db, w, r)
		}
	})

	http.HandleFunc("/inventory/{id}", func(w http.ResponseWriter, r *http.Request) {
		enableCORS(w)
		switch r.Method {
		case http.MethodPut:
			handlers.UpdateItem(db, w, r, r.PathValue("id"))
		case http.MethodDelete:
			handlers.DeleteItem(db, w, r, r.PathValue("id"))
		}
	})
}
