package exchanges

import (
	"backend/internal/database"
	"backend/internal/domain"
)

type Exchange = domain.Exchange

func GetAllExchanges() ([]Exchange, error) {
	var exchanges []Exchange
	err := database.DB.Select(&exchanges, "SELECT * FROM exchanges")
	return exchanges, err
}

func GetExchangeByID(id int) (Exchange, error) {
	var exchange Exchange
	err := database.DB.Get(&exchange, "SELECT * FROM exchanges WHERE id=$1", id)
	return exchange, err
}

func CreateExchange(exchange Exchange) (int, error) {
	var id int
	err := database.DB.QueryRow(
		"INSERT INTO exchanges (name, tax) VALUES ($1, $2) RETURNING id",
		exchange.Name, exchange.Tax,
	).Scan(&id)
	return id, err
}

func UpdateExchange(id int, exchange Exchange) error {
	_, err := database.DB.Exec(
		"UPDATE exchanges SET name=$1, tax=$2 WHERE id=$3",
		exchange.Name, exchange.Tax, id,
	)
	return err
}

func DeleteExchange(id int) error {
	_, err := database.DB.Exec("DELETE FROM exchanges WHERE id=$1", id)
	return err
}