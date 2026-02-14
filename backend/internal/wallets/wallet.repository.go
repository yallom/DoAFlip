package wallets

import (
	"backend/internal/database"
	"backend/internal/domain"
)

type Wallet = domain.Wallet

func GetAllWallets() ([]Wallet, error) {
	var wallets []Wallet
	err := database.DB.Select(&wallets, "SELECT * FROM wallets")
	return wallets, err
}

func GetWalletByID(id int) (Wallet, error) {
	var wallet Wallet
	err := database.DB.Get(&wallet, "SELECT * FROM wallets WHERE id=$1", id)
	return wallet, err
}

func CreateWallet(wallet Wallet) (int, error) {
	var id int
	err := database.DB.QueryRow(
		"INSERT INTO wallets (user_id, exchange_id, api_key, api_secret) VALUES ($1, $2, $3, $4) RETURNING id",
		wallet.UserId, wallet.ExchangeId, wallet.ApiKey, wallet.ApiSecret,
	).Scan(&id)
	return id, err
}

func UpdateWallet(id int, wallet Wallet) error {
	_, err := database.DB.Exec(
		"UPDATE wallets SET user_id=$1, exchange_id=$2, api_key=$3, api_secret=$4 WHERE id=$5",
		wallet.UserId, wallet.ExchangeId, wallet.ApiKey, wallet.ApiSecret, id,
	)
	return err
}

func DeleteWallet(id int) error {
	_, err := database.DB.Exec("DELETE FROM wallets WHERE id=$1", id)
	return err
}