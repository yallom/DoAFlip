package domain

type User struct {
	ID   int  `db:"id"`
	Email  string `db:"email"`
	Name string `db:"name"`
	HashPassword string `db:"hash_password"`
}
