"use client";

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Item } from "../../../lib/types";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDialogStore } from "../../../lib/dialog-store";

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
      if (!dateValue) return <div>-</div>;
      const dateString =
        dateValue instanceof Date
          ? dateValue.toISOString()
          : (dateValue as string);
      const formatted = dateString.split("T")[0]; // Extract YYYY-MM-DD
      const [year, month, day] = formatted.split("-");
      const formattedDate = `${month}/${day}/${year}`; // Convert to MM/DD/YYYY

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "restock_threshold",
    header: "Restock?",
    cell: ({ row }) => {
      return (row.getValue("quantity") as number) <=
        (row.getValue("restock_threshold") as number) ? (
        <FontAwesomeIcon icon={faCheck} color="green" />
      ) : null;
    },
  },
  {
    accessorKey: "note",
    header: "Note",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { setDialogOpen, setSelectedItem } = useDialogStore();
      
      const handleEdit = () => {
        setSelectedItem(row.original);
        setDialogOpen(true);
      };
      
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleEdit}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
