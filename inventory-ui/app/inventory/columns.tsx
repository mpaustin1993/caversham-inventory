"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
    {
    accessorKey: "category",
    header: "Category",
  },
 {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "item_name",
    header: "Item",
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "expiration_date",
    header: "Expiration Date",
  },
  {
    accessorKey: "restock_threshold",
    header: "Time to Restock?",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
]