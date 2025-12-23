import { create } from "zustand";
import { getInventory } from "./api";

interface InventoryItem {
  id: number;
  item_name: string;
  category: string;
  quantity: number;
  unit: string;
  location: string;
  expiration_date: Date;
  restock_threshold: number;
  note?: string;
}

interface InventoryStore {
  items: InventoryItem[];
  loading: boolean;
  error: string | null;
  fetchInventory: () => Promise<void>;
}

export const useInventoryStore = create<InventoryStore>((set) => ({
  items: [],
  loading: false,
  error: null,
  fetchInventory: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getInventory();
      set({ items: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
