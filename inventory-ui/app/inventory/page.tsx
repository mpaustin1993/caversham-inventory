import { columns, Item } from "./columns";
import { getInventory } from "../client";
import { DataTable } from "./data-table";

export default async function HomePage() {
  const data = await getInventory();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
