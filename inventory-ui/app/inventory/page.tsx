import { columns, Item } from "./columns";
import { DataTable } from "./data-table";

async function getInventory(): Promise<Item[]> {
  try {
    const response = await fetch("http://localhost:8080/inventory");
    if (!response.ok) {
      throw new Error("Failed to fetch inventory");
    }
    const data: Item[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Fallback to empty array
  }
}

export default async function HomePage() {
  const data = await getInventory();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
