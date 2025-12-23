package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"inventory-api/models"
	"net/http"

	_ "github.com/lib/pq"
)

var delete = "DELETE FROM inventory WHERE id = $1 RETURNING id, item_name, category, quantity, unit, location, expiration_date, restock_threshold, note;"

func DeleteItem(connection *sql.DB, w http.ResponseWriter, r *http.Request, id string) {
	fmt.Printf("Received %s request for %s\n", r.Method, r.URL.Path)
	if r.Method != "DELETE" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	fmt.Printf("Executing delete: %s\n", delete)
	row := connection.QueryRow(delete, id)

	var item models.Item
	err := row.Scan(&item.ID, &item.Item_Name, &item.Category, &item.Quantity, &item.Unit, &item.Location, &item.Expiration_Date, &item.Restock_Threshold, &item.Note)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(item)
}
