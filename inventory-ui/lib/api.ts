import { Item, CreateItem } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://caversham-inventory-api.onrender.com";

export async function getInventory(): Promise<Item[]> {
  try {
    const response = await fetch(`${API_URL}/inventory`);
    if (!response.ok) {
      throw new Error("Failed to fetch inventory");
    }
    const data: Item[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Fallback to empty array
  }
}

export async function createItem(item: CreateItem): Promise<Item | null> {
  try {
    const response = await fetch(`${API_URL}/inventory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error("Failed to create item");
    }
    const data: Item = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating item:", error);
    return null;
  }
}

export async function updateItem(
  id: number,
  item: CreateItem,
): Promise<Item | null> {
  try {
    const response = await fetch(`${API_URL}/inventory/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error("Failed to update item");
    }
    const data: Item = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating item:", error);
    return null;
  }
}

export async function deleteItem(id: number): Promise<Item | null> {
  try {
    const response = await fetch(`${API_URL}/inventory/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete item");
    }
    const data: Item = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting item:", error);
    return null;
  }
}
