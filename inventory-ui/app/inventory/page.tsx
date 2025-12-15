import { columns, Item } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Item[]> {
  // Fetch data from your API here.
  return [
    {
      id: 0,
      name: "Milk",
      category: "Dairy",
      quantity: 1.0,
      unit: "gallon",
      location: "Fridge",
      expiration_date: new Date("2024-07-01"),
      restock_threshold: 0.5,
      notes: "Non-dairy"
    }
  ]
}

export default async function HomePage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}