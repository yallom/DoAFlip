package domain

type Exchange struct {
	ID   int  `db:"id"`
	Name string `db:"name"`
	Tax  float64 `db:"tax"`
}
