package coins

import (
	"backend/internal/database"
	"backend/internal/domain"
)

type Coin = domain.Coin

func GetAllCoins() ([]Coin, error) {
	var coins []Coin
	err := database.DB.Select(&coins, "SELECT * FROM coins")
	return coins, err
}

func GetCoinByID(id int) (Coin, error) {
	var coin Coin
	err := database.DB.Get(&coin, "SELECT * FROM coins WHERE id=$1", id)
	return coin, err
}

func CreateCoin(coin Coin) (int, error) {
	var id int
	err := database.DB.QueryRow(
		"INSERT INTO coins (name, token) VALUES ($1, $2) RETURNING id",
		coin.Name, coin.Token,
	).Scan(&id)
	return id, err
}

func UpdateCoin(id int, coin Coin) error {
	_, err := database.DB.Exec(
		"UPDATE coins SET name=$1, token=$2 WHERE id=$3",
		coin.Name, coin.Token, id,
	)
	return err
}

func DeleteCoin(id int) error {
	_, err := database.DB.Exec("DELETE FROM coins WHERE id=$1", id)
	return err
}