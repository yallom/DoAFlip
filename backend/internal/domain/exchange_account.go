package domain

type ExchangeAccount struct {
	ID   int  `db:"id"`
	UserId int `db:"user_id"`
	ExchangeId  int `db:"exchange_id"`
	APIKey string `db:"api_key"`
	ApiSecret string `db:"api_secret"`
}
