package routes

import (
	"database/sql"
	"inventory-api/handlers"
	"net/http"
)

func Configure(db *sql.DB) {
	http.HandleFunc("/inventory", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			handlers.GetInventory(db, w, r)
		case http.MethodPost:
			handlers.CreateItem(db, w, r)
		}
	})

	http.HandleFunc("/inventory/{id}", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodPut:
			handlers.UpdateItem(db, w, r)
		case http.MethodDelete:
			handlers.DeleteItem(db, w, r)
		}
	})
}
