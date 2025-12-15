package routes

import (
	"database/sql"
	"inventory-api/requests"
	"net/http"
)

func Configure(db *sql.DB) {
	http.HandleFunc("/inventory", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			requests.GetInventory(db, w, r)
		}
	})
}
