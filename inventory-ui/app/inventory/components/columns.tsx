"use client";

import { ColumnDef} from "@tanstack/react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Item } from "../../../lib/types";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { SortingButton } from "./sorting-button";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useInventoryStore } from "../../../lib/inventory-store";
import { useDialogStore } from "../../../lib/dialog-store";
import { deleteItem } from "@/lib/api";

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "category",
    header: ({ column }) => {
      return <SortingButton column={column} header="Category" />;
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return <SortingButton column={column} header="Quantity" />;
    },
  },
  {
    accessorKey: "unit",
    header: ({ column }) => {
      return <SortingButton column={column} header="Unit" />;
    },
  },
  {
    accessorKey: "item_name",
    header: ({ column }) => {
      return <SortingButton column={column} header="Item" />;
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return <SortingButton column={column} header="Location" />;
    },
  },
  {
    accessorKey: "expiration_date",
   header: ({ column }) => {
      return <SortingButton column={column} header="Expiration Date" />;
    },
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

      // Check if date is before today
      const expirationDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to compare dates only
      const isExpired = expirationDate < today;

      return (
        <div className={isExpired ? "text-red-600 font-bold" : ""}>
          {formattedDate}
        </div>
      );
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
      const { fetchInventory } = useInventoryStore();
      
      const handleEdit = () => {
        setSelectedItem(row.original);
        setDialogOpen(true);
      };

      const handleDelete = () => {
        deleteItem(row.original.id).then(() => {
          fetchInventory();
        });
      }
      
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
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
