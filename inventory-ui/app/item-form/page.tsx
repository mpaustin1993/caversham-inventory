"use client"

import {
  Dialog,
  DialogContent,
  DialogTitle,  
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ItemFormContent } from "./components/item-form-content";
import { useDialogStore } from "../../lib/dialog-store";
import { DialogDescription } from "@radix-ui/react-dialog";

export function ItemForm() {
  const { isDialogOpen, setDialogOpen, setSelectedItem } = useDialogStore();
  
  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedItem(null); // Clear selection when closing
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>      
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          onClick={() => {
            setSelectedItem(null); // Creating new item
            setDialogOpen(true);
          }}
        >
          Create Item
        </Button>
      </DialogTrigger>
      <DialogContent className="w-80">
        <DialogTitle className="sr-only"/>
        <DialogDescription className="sr-only"/>
        <ItemFormContent />
      </DialogContent>
    </Dialog>
  )
}
