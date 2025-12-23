"use client";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { useEffect } from "react";
import { useInventoryStore } from "../../lib/inventory-store";

export default function HomePage() {
  const { items, loading, error, fetchInventory } = useInventoryStore();

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto py-8">
      <DataTable columns={columns} data={items} />
    </div>
  );
}
