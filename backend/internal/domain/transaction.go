package domain

import "time"

type Transaction struct {
	ID        string
	Exchange  Exchange
	Coin1     Coin
	Coin2     Coin
	Amount1   float64
	Amount2   float64
	Timestamp time.Time
}
