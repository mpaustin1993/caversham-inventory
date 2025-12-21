import { Item, CreateItem } from "./types";

const API_URL = process.env.NEXT_PUBLIC_LOCAL_API_URL || "http://localhost:8080";

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
    const response = await fetch(`${API_URL}/inventory`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch inventory");
    }
    const data: Item = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
