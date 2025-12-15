"use client"

import { ColumnDef } from "@tanstack/react-table"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export type Item = {
  id: number
  item_name: string
  category: string
  quantity: number
  unit: string
  location: string
  expiration_date: Date
  restock_threshold: number
  notes?: string  
}

export const columns: ColumnDef<Item>[] = [
    {
    accessorKey: "category",
    header: "Category",
  },
 {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    accessorKey: "item_name",
    header: "Item",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "expiration_date",
    header: "Expiration Date",
    cell: ({ row }) => {
      const dateValue = row.getValue("expiration_date");      
      const date = dateValue instanceof Date ? dateValue : new Date(dateValue as string);
      const formatted = new Intl.DateTimeFormat('en-US').format(date);

      return <div>{formatted}</div>
    }
  },
  {
    accessorKey: "restock_threshold",
    header: "Restock?",
    cell: ({ row }) => {
      return (row.getValue("quantity") as number) <= (row.getValue("restock_threshold") as number) 
        ? <FontAwesomeIcon icon={faCheck} color="green" /> 
        : null
    }
  },
  {
    accessorKey: "note",
    header: "Note",
  },
]