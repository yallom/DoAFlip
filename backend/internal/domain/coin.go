package domain

type Coin struct {
	ID   int  `db:"id"`
	Name string `db:"name"`
	Token  string `db:"token"`
}
