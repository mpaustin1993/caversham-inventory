package requests

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"inventory-api/models"
	"net/http"
	"reflect"
	"strings"

	_ "github.com/lib/pq"
)

var query = "SELECT id, item_name, category, quantity, unit, location, expiration_date, restock_threshold, notes FROM inventory"

func GetInventory(connection *sql.DB, w http.ResponseWriter, r *http.Request) {
	fmt.Printf("Received %s request for %s\n", r.Method, r.URL.Path)
	fmt.Printf("Executing query: %s\n", query)
	rows, err := connection.Query(query)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	items := []models.Item{}
	fmt.Printf("Mapping query result to slice of type: %s\n", reflect.TypeFor[models.Item]().String()[strings.LastIndex(reflect.TypeFor[models.Item]().String(), ".")+1:])
	for rows.Next() {
		var item models.Item
		if err := rows.Scan(&item.ID, &item.Name, &item.Category, &item.Quantity, &item.Unit, &item.Location, &item.Expiration_Date, &item.Restock_Threshold, &item.Note); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		items = append(items, item)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(items)
}
