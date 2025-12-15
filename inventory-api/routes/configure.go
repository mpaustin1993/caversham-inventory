package routes

import (
	"database/sql"
	"inventory-api/handlers"
	"net/http"
)

func Configure(db *sql.DB) {
	http.HandleFunc("/inventory", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			handlers.GetInventory(db, w, r)
		}
	})
}
