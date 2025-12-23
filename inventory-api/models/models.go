package models

type Item struct {
	ID                int     `json:"id"`
	Item_Name         string  `json:"item_name"`
	Category          string  `json:"category"`
	Quantity          float64 `json:"quantity"`
	Unit              string  `json:"unit"`
	Location          string  `json:"location"`
	Expiration_Date   string  `json:"expiration_date"`
	Restock_Threshold float64 `json:"restock_threshold"`
	Note              string  `json:"note"`
}
