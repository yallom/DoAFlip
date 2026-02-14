package database

import (
	"fmt"
	"log"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

var DB *sqlx.DB

func ConnectDatabase() {
	dsn := "postgres://postgres:your_password@db:5432/doaflip?sslmode=disable"

	var err error
	DB, err = sqlx.Connect("postgres", dsn)
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	schema := `
	CREATE TABLE IF NOT EXISTS users (
		id SERIAL PRIMARY KEY,
		name TEXT NOT NULL,
		email TEXT NOT NULL UNIQUE,
		hash_password TEXT NOT NULL
	);

	
	CREATE TABLE IF NOT EXISTS coins (
		id SERIAL PRIMARY KEY,
		name TEXT NOT NULL,
		token TEXT NOT NULL
	);
		
	CREATE TABLE IF NOT EXISTS exchanges (
		id SERIAL PRIMARY KEY,
		name TEXT NOT NULL,
		tax FLOAT NOT NULL
	);

	CREATE TABLE IF NOT EXISTS transactions (
		id SERIAL PRIMARY KEY,
		exchange1_id INT REFERENCES exchanges(id),
		exchange2_id INT REFERENCES exchanges(id),
		coin1_id INT REFERENCES coins(id),
		coin2_id INT REFERENCES coins(id),
		amount1 FLOAT NOT NULL,
		amount2 FLOAT NOT NULL,
		timestamp TIMESTAMPTZ DEFAULT NOW()
	);

	CREATE TABLE IF NOT EXISTS exchange_accounts (
		id SERIAL PRIMARY KEY,
		user_id INT REFERENCES users(id),
		exchange_id INT REFERENCES exchanges(id),
		api_key TEXT NOT NULL,
		api_secret TEXT NOT NULL
	);

	CREATE TABLE IF NOT EXISTS wallets (
		id SERIAL PRIMARY KEY,
		user_id INT REFERENCES users(id),
		coin_id INT REFERENCES coins(id),
		account_id INT REFERENCES exchange_accounts(id),
		balance FLOAT NOT NULL DEFAULT 0
	);
	`

	DB.MustExec(schema)
	fmt.Println("Database connected successfully and tables created!")
}
