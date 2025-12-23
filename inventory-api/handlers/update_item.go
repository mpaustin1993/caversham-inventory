package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"inventory-api/models"
	"net/http"

	_ "github.com/lib/pq"
)

var update = "UPDATE inventory SET item_name = $2, category = $3, quantity = $4, unit = $5, location = $6, expiration_date = $7, restock_threshold = $8, note = $9 WHERE id = $1 RETURNING id, item_name, category, quantity, unit, location, expiration_date, restock_threshold, note;"

func UpdateItem(connection *sql.DB, w http.ResponseWriter, r *http.Request, id string) {
	fmt.Printf("Received %s request for %s\n", r.Method, r.URL.Path)
	if r.Method != "PUT" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var newItem models.Item
	if err := json.NewDecoder(r.Body).Decode(&newItem); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	fmt.Printf("Executing update: %s\n", update)
	row := connection.QueryRow(update, id, newItem.Item_Name, newItem.Category, newItem.Quantity, newItem.Unit, newItem.Location, newItem.Expiration_Date, newItem.Restock_Threshold, newItem.Note)

	var item models.Item
	err := row.Scan(&item.ID, &item.Item_Name, &item.Category, &item.Quantity, &item.Unit, &item.Location, &item.Expiration_Date, &item.Restock_Threshold, &item.Note)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(item)
}
