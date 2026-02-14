package domain

import "time"

type Transaction struct {
	ID        int  `db:"id"`
	Exchange1Id  int `db:"exchange1_id"`
	Exchange2Id  int `db:"exchange2_id"`
	Coin1Id     int     `db:"coin1_id"`
	Coin2Id     int     `db:"coin2_id"`
	Amount1   float64  `db:"amount1"`
	Amount2   float64  `db:"amount2"`
	Timestamp time.Time `db:"timestamp"`
}
