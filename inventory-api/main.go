package main

import (
	"database/sql"
	"inventory-api/routes"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	_ "modernc.org/sqlite" // SQLite driver (pure Go)
)

var db *sql.DB

func init() {
	// Load .env (optional for SQLite)
	_ = godotenv.Load("../.env")

	// Use SQLite database file
	dbPath := os.Getenv("DB_PATH")
	if dbPath == "" {
		dbPath = "./inventory.db" // Default local path
	}

	// Connect to SQLite database (creates if doesn't exist)
	var err error
	db, err = sql.Open("sqlite", dbPath)
	if err != nil {
		log.Fatal("Error connecting to database:", err)
	}

	// Create tables if they don't exist
	createTables()
}

func createTables() {
	schema := `
	CREATE TABLE IF NOT EXISTS inventory (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		item_name TEXT NOT NULL,
		category TEXT NOT NULL,
		quantity INTEGER NOT NULL,
		unit TEXT NOT NULL,
		location TEXT NOT NULL,
		expiration_date TEXT NOT NULL,
		restock_threshold INTEGER NOT NULL,
		note TEXT
	);
	`
	_, err := db.Exec(schema)
	if err != nil {
		log.Fatal("Error creating tables:", err)
	}
}

func main() {
	defer db.Close()

	routes.Configure(db)

	log.Println("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
