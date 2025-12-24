# Caversham Inventory

A full-stack inventory management system with a modern web interface and RESTful API backend.

## Overview

Caversham Inventory helps you track and manage inventory items with features like expiration date monitoring, restock thresholds, and categorization. Built with Next.js and Go, deployed on Vercel and Render.com with PostgreSQL storage via Supabase.

## Tech Stack

### Frontend (`inventory-ui/`)
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Accessible component library
- **Zustand** - Global state management
- **@tanstack/react-table** - Powerful data tables
- **Zod** - Schema validation

### Backend (`inventory-api/`)
- **Go 1.25+** - High-performance API server
- **PostgreSQL** - Production-grade database
- **Supabase** - Managed PostgreSQL hosting
- **lib/pq** - PostgreSQL driver for Go

## Features

✨ **Inventory Management**
- Create, read, update, and delete inventory items
- Track quantities, units, and locations
- Set restock thresholds for low-stock alerts
- Add notes and categorize items

📅 **Expiration Tracking**
- Date-based expiration monitoring
- Visual indicators for expired items (red/bold)
- Timezone-agnostic date handling

🔍 **Data Organization**
- Sortable table columns
- Search and filter capabilities
- Responsive design for mobile/desktop

⚡ **Modern UX**
- Modal dialogs for create/edit operations
- Real-time form validation
- Toast notifications for actions
- Loading states and error handling

## Project Structure

```
caversham-inventory/
├── inventory-ui/           # Next.js frontend application
│   ├── app/               # Next.js App Router pages
│   ├── components/        # Reusable UI components
│   ├── lib/              # Utilities, stores, API client
│   └── public/           # Static assets
│
├── inventory-api/         # Go backend API
│   ├── handlers/         # HTTP request handlers
│   ├── models/           # Data models
│   ├── routes/           # Route configuration & CORS
│   └── main.go           # Application entry point
│
└── README.md             # This file
```

## Getting Started

### Prerequisites

- **Node.js 18+** - [Download](https://nodejs.org/)
- **Go 1.25+** - [Download](https://go.dev/dl/)
- **Supabase Account** - [Sign up](https://supabase.com)

### Database Setup

1. Create a new Supabase project
2. In SQL Editor, run:

```sql
-- Create schema
CREATE SCHEMA IF NOT EXISTS caversham;

-- Create update timestamp function
CREATE OR REPLACE FUNCTION public.update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create inventory table
CREATE TABLE IF NOT EXISTS caversham.inventory (
    id SERIAL PRIMARY KEY,
    item_name TEXT NOT NULL,
    category TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit TEXT NOT NULL,
    location TEXT NOT NULL,
    expiration_date TEXT NOT NULL,
    restock_threshold INTEGER NOT NULL,
    note TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now()
);

-- Create trigger for automatic timestamp updates
CREATE OR REPLACE TRIGGER update_inventory_timestamp
    BEFORE UPDATE 
    ON caversham.inventory
    FOR EACH ROW
    EXECUTE FUNCTION public.update_timestamp();
```

3. Copy your connection pooler string (port 6543) from Project Settings → Database

### Backend Setup

1. Navigate to the API directory:
   ```bash
   cd inventory-api
   ```

2. Create `.env` file in project root:
   ```env
   DATABASE_URL=postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
   ```

3. Install dependencies:
   ```bash
   go mod download
   ```

4. Build and run:
   ```bash
   go build
   ./inventory-api
   ```

   Server will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the UI directory:
   ```bash
   cd inventory-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

   App will open at `http://localhost:3000`

## Deployment

### Backend (Render.com)

1. Push code to GitHub
2. Create new Web Service on [Render.com](https://render.com)
3. Connect your repository
4. Configure:
   - **Root Directory:** `inventory-api`
   - **Build Command:** `go build -o inventory-api`
   - **Start Command:** `./inventory-api`
5. Add environment variables:
   - `DATABASE_URL` - Your Supabase connection string
   - `FRONTEND_URL` - Your Vercel frontend URL (for CORS)
6. Deploy!

### Frontend (Vercel)

1. Import project on [Vercel](https://vercel.com)
2. Set **Root Directory** to `inventory-ui`
3. Add environment variable:
   - `NEXT_PUBLIC_API_URL` - Your Render.com backend URL
4. Deploy!

Your app is now live with persistent PostgreSQL storage! 🚀

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/inventory` | Get all inventory items |
| POST | `/inventory` | Create new item |
| PUT | `/inventory/{id}` | Update item by ID |
| DELETE | `/inventory/{id}` | Delete item by ID |

### Example Request

```bash
# Create an item
curl -X POST http://localhost:8080/inventory \
  -H "Content-Type: application/json" \
  -d '{
    "item_name": "Apples",
    "category": "Produce",
    "quantity": 50,
    "unit": "lbs",
    "location": "Warehouse A",
    "expiration_date": "2026-01-15",
    "restock_threshold": 10,
    "note": "Organic"
  }'
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

### Build for Production

**Frontend:**
```bash
cd inventory-ui
npm run build
npm start
```

**Backend:**
```bash
cd inventory-api
go build -o inventory-api
./inventory-api
```

## Environment Variables

### Backend (`.env`)
- `DATABASE_URL` - PostgreSQL connection string (required)
- `PORT` - Server port (default: 8080, auto-set by Render)
- `FRONTEND_URL` - Frontend URL for CORS

### Frontend (`.env.local`)
- `NEXT_PUBLIC_API_URL` - Backend API URL (required)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

---
