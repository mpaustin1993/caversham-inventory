package main

import (
	"database/sql"
	"inventory-api/routes"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq" // PostgreSQL driver
)

var db *sql.DB

func init() {
	// Load .env
	_ = godotenv.Load("../.env")

	// Get PostgreSQL connection string from environment
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		log.Fatal("DATABASE_URL environment variable is required")
	}

	// Connect to PostgreSQL database
	var err error
	db, err = sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatal("Error connecting to database:", err)
	}

	// Test the connection
	if err = db.Ping(); err != nil {
		log.Fatal("Error pinging database:", err)
	}

	log.Println("Connected to PostgreSQL database")

	// Set search path to use caversham schema
	_, err = db.Exec("SET search_path TO caversham, public")
	if err != nil {
		log.Fatal("Error setting search path:", err)
	}

	log.Println("Using caversham schema")
}

func main() {
	defer db.Close()

	routes.Configure(db)

	// Use PORT environment variable (required by Render.com and other cloud platforms)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default port if not specified
	}

	log.Printf("Server starting on :%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
