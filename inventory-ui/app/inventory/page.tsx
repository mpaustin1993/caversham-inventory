import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { getInventory } from "../../lib/api";

export default async function HomePage() {
  const data = await getInventory();

  return (    
    <div className="container mx-auto py-8">      
      <DataTable columns={columns} data={data} />
    </div>
  );
}
