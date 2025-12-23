# Inventory UI

Frontend web application for the Caversham Inventory management system.

## Tech Stack

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Zustand** - Lightweight state management
- **@tanstack/react-form** - Powerful form handling
- **Zod** - Schema validation
- **date-fns** - Date formatting and manipulation
- **Sonner** - Toast notifications

## Features

- ✨ Modern, responsive design
- 📝 Create, edit, and delete inventory items
- 🔍 Sortable data table with column sorting
- 📅 Date picker with timezone-agnostic handling
- ✅ Form validation with helpful error messages
- 🚨 Visual alerts for expired items (red/bold)
- 🎯 Modal dialogs for create/edit operations
- 📱 Mobile-friendly interface

## Project Structure

```
inventory-ui/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main page
│   ├── layout.tsx         # Root layout with Toaster
│   ├── globals.css        # Global styles
│   ├── inventory/         # Inventory list page
│   │   ├── page.tsx
│   │   └── components/
│   │       ├── columns.tsx      # Table column definitions
│   │       ├── data-table.tsx   # Reusable table component
│   │       └── sorting-button.tsx
│   └── item-form/         # Create/Edit form
│       ├── page.tsx       # Form dialog wrapper
│       └── components/
│           ├── item-form-content.tsx  # Form logic
│           └── date-picker.tsx        # Custom date picker
│
├── components/            # Shared UI components (shadcn/ui)
│   └── ui/
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── field.tsx
│       ├── input.tsx
│       ├── table.tsx
│       └── ...
│
├── lib/                   # Utilities and configuration
│   ├── api.ts            # API client functions
│   ├── inventory-store.ts # Zustand store for inventory
│   ├── dialog-store.ts   # Zustand store for dialog state
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Utility functions
│
└── public/               # Static assets
```

## Prerequisites

- Node.js 18+ or later
- npm, pnpm, or yarn
- Backend API running on `http://localhost:8080` (or configured URL)

## Installation

```bash
# Install dependencies
npm install

# or with pnpm
pnpm install
```

## Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The application will hot-reload when you make changes to the code.

## Building for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## Code Quality

### Format Code

```bash
# Format all TypeScript/React files
npx prettier --write "**/*.{ts,tsx,js,jsx,json,css}"
```

### Lint Code

```bash
npm run lint
```

## Key Components

### State Management

**Inventory Store** (`lib/inventory-store.ts`)
- Fetches and caches inventory data
- Provides `fetchInventory()` to reload data

**Dialog Store** (`lib/dialog-store.ts`)
- Manages modal dialog state
- Stores selected item for editing
- Shares state between create/edit operations

### API Client

**API Functions** (`lib/api.ts`)
- `getInventory()` - Fetch all items
- `createItem()` - Create new item
- `updateItem()` - Update existing item
- `deleteItem()` - Delete item

All functions communicate with the backend API and handle errors.

### Form Handling

Forms use `@tanstack/react-form` with Zod validation:
- Real-time field validation
- Error messages on blur/submit
- Supports create and edit modes
- Timezone-agnostic date handling

### Data Table

Built with `@tanstack/react-table`:
- Sortable columns
- Responsive design
- Row actions (edit/delete)
- Custom cell rendering

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Set environment variable:
   - `NEXT_PUBLIC_API_URL` = Your backend API URL
4. Deploy!

Vercel will automatically detect Next.js and configure the build.

### Manual Deployment

```bash
# Build the application
npm run build

# The output will be in the .next folder
# Deploy the .next folder and run:
npm start
```

## Contributing

1. Follow the existing code style
2. Format code before committing
3. Test changes locally
4. Create descriptive commit messages

## License

MIT

