package config

import (
	"log"

	"github.com/joho/godotenv"
	"github.com/kelseyhightower/envconfig"
)

type Environment struct {
	App_Env string
	Db_Url  string
}

func LoadEnv() (*Environment, error) {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	var env Environment
	err = envconfig.Process("", &env)
	if err != nil {
		log.Fatal("Error loading environment variables")
	}

	return &env, nil
}
