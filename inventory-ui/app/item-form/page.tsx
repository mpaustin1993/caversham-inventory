"use client"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ItemFormContent } from "./components/item-form-content";

export function ItemForm() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Create Item</Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" sideOffset={-60} align="center" className="w-80">
        <ItemFormContent />
      </PopoverContent>
    </Popover>
  )
}
