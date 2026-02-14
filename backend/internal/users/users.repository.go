package users

import (
	"backend/internal/database"
	"backend/internal/domain"
)

type User = domain.User

type UsersRepository interface {
	GetAllUsers() ([]User, error)
	GetUserByID(id int) (User, error)
	GetUserByEmail(email string) (User, error)
	CreateUser(user User) (User, error)
	UpdateUser(id int, user User) error
	DeleteUser(id int) error
}

type usersRepository struct {
	db *sqlx.DB
}

func NewUsersRepository() UsersRepository {
	return &usersRepository{
		db: database.DB,
	}
}

func (r *usersRepository) GetAllUsers() ([]User, error) {
	var users []User
	err := r.db.Select(&users, "SELECT * FROM users")
	return users, err
}

func (r *usersRepository) GetUserByID(id int) (User, error) {
	var user User
	err := r.db.Get(&user, "SELECT * FROM users WHERE id=$1", id)
	return user, err
}

func (r *usersRepository) GetUserByEmail(email string) (User, error) {
	var user User
	err := r.db.Get(&user, "SELECT * FROM users WHERE email=$1", email)
	return user, err
}

func (r *usersRepository) CreateUser(user User) (User, error) {
	var id int
	err := r.db.QueryRow(
		"INSERT INTO users (name, email, hash_password) VALUES ($1, $2, $3) RETURNING id",
		user.Name, user.Email, user.HashPassword,
	).Scan(&id)
	user.ID = uint(id)
	return user, err
}

func (r *usersRepository) UpdateUser(id uint, user User) error {
	_, err := r.db.Exec(
		"UPDATE users SET name=$1, email=$2, hash_password=$3 WHERE id=$4",
		user.Name, user.Email, user.HashPassword, id,
	)
	return err
}

func (r *usersRepository) DeleteUser(id uint) error {
	_, err := r.db.Exec("DELETE FROM users WHERE id=$1", id)
	return err
}