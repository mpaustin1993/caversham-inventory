import { create } from 'zustand'

interface InventoryItem {
  id: number
  item_name: string
  category: string
  quantity: number
  unit: string
  location: string
  expiration_date: Date
  restock_threshold: number
  note?: string  
}

interface InventoryStore {
  items: InventoryItem[]
  loading: boolean
  error: string | null
  fetchInventory: () => Promise<void>  
}

export const useInventoryStore = create<InventoryStore>((set) => ({
  items: [],
  loading: false,
  error: null,
  fetchInventory: async () => {
    set({ loading: true, error: null })
    try {
      const res = await fetch('http://localhost:8080/inventory')
      if (!res.ok) throw new Error('Failed to fetch inventory')
      const data = await res.json()
      set({ items: data, loading: false })
    } catch (err: any) {
      set({ error: err.message, loading: false })
    }
  }  
}))
