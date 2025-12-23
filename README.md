# Caversham Inventory

A modern full-stack inventory management system with a Go REST API backend and Next.js frontend.

## Features

- ✅ **Full CRUD Operations** - Create, read, update, and delete inventory items
- 🎨 **Modern UI** - Clean, responsive interface built with Next.js and Tailwind CSS
- 📊 **Sortable Table** - Click column headers to sort inventory data
- 📅 **Date Management** - Timezone-agnostic date handling for expiration dates
- ⚠️ **Visual Indicators** - Expired items highlighted in red and bold
- ✔️ **Restock Alerts** - Visual indicators for items below restock threshold
- 🔄 **Real-time Updates** - Changes reflect immediately across the application
- 📝 **Form Validation** - Client-side validation with Zod schemas
- 🗄️ **SQLite Database** - Simple, file-based database with automatic setup

## Tech Stack

### Frontend
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible UI components
- **Zustand** - Lightweight state management
- **@tanstack/react-form** - Powerful form handling
- **Zod** - Schema validation
- **date-fns** - Modern date utility library

### Backend
- **Go 1.25+** - Fast, compiled backend
- **SQLite** - Embedded database with modernc.org/sqlite (pure Go)
- **RESTful API** - Standard HTTP methods for CRUD operations
- **CORS enabled** - Configured for frontend communication

## Project Structure

```
caversham-inventory/
├── inventory-api/              # Go backend
│   ├── main.go                # Entry point & DB initialization
│   ├── handlers/              # HTTP request handlers
│   │   ├── create_item.go
│   │   ├── get_inventory.go
│   │   ├── update_item.go
│   │   └── delete_item.go
│   ├── models/                # Data models
│   │   └── models.go
│   ├── routes/                # API route configuration
│   │   └── configure.go
│   └── go.mod                 # Go dependencies
│
├── inventory-ui/              # Next.js frontend
│   ├── app/                   # Next.js App Router
│   │   ├── page.tsx          # Home page
│   │   ├── layout.tsx        # Root layout
│   │   ├── inventory/        # Inventory list
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   │       ├── columns.tsx      # Table column definitions
│   │   │       ├── data-table.tsx   # Table component
│   │   │       └── sorting-button.tsx
│   │   └── item-form/        # Create/Edit form
│   │       ├── page.tsx
│   │       └── components/
│   │           ├── item-form-content.tsx
│   │           └── date-picker.tsx
│   ├── components/ui/        # shadcn/ui components
│   ├── lib/                  # Utilities & stores
│   │   ├── api.ts           # API client functions
│   │   ├── inventory-store.ts  # Inventory state
│   │   ├── dialog-store.ts  # Dialog state
│   │   ├── types.ts         # TypeScript types
│   │   └── utils.ts         # Helper functions
│   └── package.json         # Node dependencies
│
└── README.md
```

## Prerequisites

- **Go 1.25.0+** - [Download](https://go.dev/dl/)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm** or **pnpm** - Package manager
- **Git** - Version control

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/caversham-inventory.git
cd caversham-inventory
```

### 2. Set Up the Backend

```bash
cd inventory-api
go mod download
go build
```

The SQLite database (`inventory.db`) and tables will be created automatically on first run.

### 3. Set Up the Frontend

```bash
cd ../inventory-ui
npm install
# or
pnpm install
```

### 4. Configure Environment (Optional)

Create `inventory-ui/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Running the Application

### Start the Backend

```bash
cd inventory-api
go run main.go
```

✅ Server runs on **http://localhost:8080**

### Start the Frontend

```bash
cd inventory-ui
npm run dev
# or
pnpm dev
```

✅ Frontend runs on **http://localhost:3000**

Open your browser to http://localhost:3000 to use the application.

## API Endpoints

### `GET /inventory`
Retrieve all inventory items.

**Response:**
```json
[
  {
    "id": 1,
    "item_name": "Apples",
    "category": "Fruit",
    "quantity": 50,
    "unit": "kg",
    "location": "Warehouse A",
    "expiration_date": "2025-12-31",
    "restock_threshold": 10,
    "note": "Fresh batch"
  }
]
```

### `POST /inventory`
Create a new inventory item.

**Request Body:**
```json
{
  "item_name": "Apples",
  "category": "Fruit",
  "quantity": 50,
  "unit": "kg",
  "location": "Warehouse A",
  "expiration_date": "2025-12-31",
  "restock_threshold": 10,
  "note": "Fresh batch"
}
```

**Response:** Created item with generated `id`

### `PUT /inventory/{id}`
Update an existing inventory item.

**Request Body:** Same as POST (all fields)

**Response:** Updated item

### `DELETE /inventory/{id}`
Delete an inventory item by ID.

**Response:** 204 No Content

## Database Schema

```sql
CREATE TABLE inventory (
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
```

## Deployment

### Recommended Free Hosting

**Frontend → [Vercel](https://vercel.com)**
- Perfect for Next.js (zero-config)
- Connect your GitHub repository
- Auto-deploys on push
- Set `NEXT_PUBLIC_API_URL` environment variable to your backend URL

**Backend → [Render.com](https://render.com)**
- Create a Web Service from your GitHub repo
- Add a persistent disk for SQLite database (mounted at `/data`)
- Update `DB_PATH` environment variable to `/data/inventory.db`
- Free tier: 750 hours/month (enough for 24/7)

### Production Build

**Backend:**
```bash
cd inventory-api
go build -o inventory-api
./inventory-api
```

**Frontend:**
```bash
cd inventory-ui
npm run build
npm start
```

## Development

### Format Code

**Frontend:**
```bash
cd inventory-ui
npx prettier --write "**/*.{ts,tsx,js,jsx,json,css}"
```

**Backend:**
```bash
cd inventory-api
go fmt ./...
```

### Linting

```bash
cd inventory-ui
npm run lint
```

## Contributing

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Make your changes
4. Format your code (see Development section)
5. Commit your changes
   ```bash
   git commit -m 'Add some amazing feature'
   ```
6. Push to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
7. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Vercel](https://vercel.com) for Next.js and hosting
- [Render](https://render.com) for backend hosting
