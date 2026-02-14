package transactions

import (
	"backend/internal/database"
	"backend/internal/domain"
)

type Transaction = domain.Transaction

func GetAllTransactions() ([]Transaction, error) {
	var transactions []Transaction
	err := database.DB.Select(&transactions, "SELECT * FROM transactions")
	return transactions, err
}

func GetTransactionByID(id int) (Transaction, error) {
	var transaction Transaction
	err := database.DB.Get(&transaction, "SELECT * FROM transactions WHERE id=$1", id)
	return transaction, err
}

func CreateTransaction(transaction Transaction) (int, error) {
	var id int
	err := database.DB.QueryRow(
		"INSERT INTO transactions (exchange1_id, exchange2_id, coin1_id, coin2_id, amount1, amount2, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
		transaction.Exchange1Id, transaction.Exchange2Id, transaction.Coin1Id, transaction.Coin2Id, transaction.Amount1, transaction.Amount2, transaction.Timestamp,
	).Scan(&id)
	return id, err
}

func UpdateTransaction(id int, transaction Transaction) error {
	_, err := database.DB.Exec(
		"UPDATE transactions SET exchange1_id=$1, exchange2_id=$2, coin1_id=$3, coin2_id=$4, amount1=$5, amount2=$6, timestamp=$7 WHERE id=$8",
		transaction.Exchange1Id, transaction.Exchange2Id, transaction.Coin1Id, transaction.Coin2Id, transaction.Amount1, transaction.Amount2, transaction.Timestamp, id,
	)
	return err
}

func DeleteTransaction(id int) error {
	_, err := database.DB.Exec("DELETE FROM transactions WHERE id=$1", id)
	return err
}