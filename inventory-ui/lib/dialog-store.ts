import { create } from "zustand";
import { Item } from "./types";

interface DialogStore {
  isDialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  selectedItem: Item | null;
  setSelectedItem: (item: Item | null) => void;
}

export const useDialogStore = create<DialogStore>((set) => ({
  isDialogOpen: false,
  setDialogOpen: (open) => set({ isDialogOpen: open }),
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
}));
