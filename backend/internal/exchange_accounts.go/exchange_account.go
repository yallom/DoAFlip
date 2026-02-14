package exchange_accounts

import (
	"backend/internal/database"
	"backend/internal/domain"
)

type ExchangeAccount = domain.ExchangeAccount

func GetAllExchangeAccounts() ([]ExchangeAccount, error) {
	var exchangeAccounts []ExchangeAccount
	err := database.DB.Select(&exchangeAccounts, "SELECT * FROM exchange_accounts")
	return exchangeAccounts, err
}

func GetExchangeAccountByID(id int) (ExchangeAccount, error) {
	var exchangeAccount ExchangeAccount
	err := database.DB.Get(&exchangeAccount, "SELECT * FROM exchange_accounts WHERE id=$1", id)
	return exchangeAccount, err
}

func CreateExchangeAccount(exchangeAccount ExchangeAccount) (int, error) {
	var id int
	err := database.DB.QueryRow(
		"INSERT INTO exchange_accounts (user_id, exchange_id, api_key, api_secret) VALUES ($1, $2, $3, $4) RETURNING id",
		exchangeAccount.UserId, exchangeAccount.ExchangeId, exchangeAccount.ApiKey, exchangeAccount.ApiSecret,
	).Scan(&id)
	return id, err
}

func UpdateExchangeAccount(id int, exchangeAccount ExchangeAccount) error {
	_, err := database.DB.Exec(
		"UPDATE exchange_accounts SET user_id=$1, exchange_id=$2, api_key=$3, api_secret=$4 WHERE id=$5",
		exchangeAccount.UserId, exchangeAccount.ExchangeId, exchangeAccount.ApiKey, exchangeAccount.ApiSecret, id,
	)
	return err
}

func DeleteExchangeAccount(id int) error {
	_, err := database.DB.Exec("DELETE FROM exchange_accounts WHERE id=$1", id)
	return err
}