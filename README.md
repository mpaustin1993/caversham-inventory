# Caversham Inventory

A simple inventory management system built with a Go backend API and a planned React frontend UI.

## Overview

This project provides a RESTful API for managing inventory items. It connects to a PostgreSQL database to store and retrieve inventory data. The system tracks items with details such as name, category, quantity, unit, location, expiration date, restock threshold, and notes.

## Features

- Retrieve a list of all inventory items via API
- PostgreSQL database integration
- Environment variable configuration for database connection
- JSON API responses

## Project Structure

- `inventory-api/`: Go backend API
  - `main.go`: Application entry point
  - `models/models.go`: Data models
  - `requests/get_inventory.go`: API request handlers
  - `routes/configure.go`: Route configuration
  - `go.mod`: Go module dependencies
- `inventory-ui/`: Planned React frontend (currently empty)

## Prerequisites

- Go 1.25.5 or later
- PostgreSQL database
- Git

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/caversham-inventory.git
   cd caversham-inventory
   ```

2. Set up the PostgreSQL database:
   - Create a database named `inventory`
   - Create a table with the following schema:
     ```sql
     CREATE TABLE inventory (
         id SERIAL PRIMARY KEY,
         item_name VARCHAR(255) NOT NULL,
         category VARCHAR(255),
         quantity DECIMAL,
         unit VARCHAR(50),
         location VARCHAR(255),
         expiration_date DATE,
         restock_threshold DECIMAL,
         notes TEXT
     );
     ```

3. Create a `.env` file in the `inventory-api/` directory with your database connection string:
   ```
   DB_URL=postgres://username:password@localhost/inventory?sslmode=disable
   ```

4. Install Go dependencies:
   ```
   cd inventory-api
   go mod download
   ```

## Usage

1. Start the API server:
   ```
   go run main.go
   ```

2. The server will start on `http://localhost:8080`.

3. Make a GET request to retrieve inventory items:
   ```
   curl http://localhost:8080/inventory
   ```

## API Documentation

### GET /inventory

Retrieves a list of all inventory items.

**Response:**
```json
[
  {
    "id": 1,
    "item_name": "Apple",
    "category": "Fruit",
    "quantity": 50.0,
    "unit": "kg",
    "location": "Warehouse A",
    "expiration_date": "2025-12-31T00:00:00Z",
    "restock_threshold": 10.0,
    "notes": "Fresh batch"
  }
]
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.