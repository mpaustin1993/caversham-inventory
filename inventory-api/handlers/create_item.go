package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"inventory-api/models"
	"net/http"

	_ "github.com/lib/pq"
)

var insert = "INSERT INTO inventory (item_name, category, quantity, unit, location, expiration_date, restock_threshold, note) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, item_name, category, quantity, unit, location, expiration_date, restock_threshold, note;"

func CreateItem(connection *sql.DB, w http.ResponseWriter, r *http.Request) {
	fmt.Printf("Received %s request for %s\n", r.Method, r.URL.Path)
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var newItem models.Item
	if err := json.NewDecoder(r.Body).Decode(&newItem); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	fmt.Printf("Executing insert: %s\n", insert)
	row := connection.QueryRow(insert, newItem.Item_Name, newItem.Category, newItem.Quantity, newItem.Unit, newItem.Location, newItem.Expiration_Date, newItem.Restock_Threshold, newItem.Note)

	var item models.Item
	err := row.Scan(&item.ID, &item.Item_Name, &item.Category, &item.Quantity, &item.Unit, &item.Location, &item.Expiration_Date, &item.Restock_Threshold, &item.Note)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(item)
}
