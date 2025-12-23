export type Item = {
  id: number;
  item_name: string;
  category: string;
  quantity: number;
  unit: string;
  location: string;
  expiration_date: string;
  restock_threshold: number;
  note?: string;
};

export type CreateItem = {
  item_name: string;
  category: string;
  quantity: number;
  unit: string;
  location: string;
  expiration_date: string;
  restock_threshold: number;
  note?: string;
};
