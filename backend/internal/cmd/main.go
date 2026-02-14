package main

import (
	"backend/internal/config"
	"backend/pkg"
	"log"

	"github.com/gin-gonic/gin"
	"backend/internal/database"
	routerSetup "backend/internal/router"
/*	"backend/internal/exchange"
	"backend/internal/transaction"
	"backend/internal/coins"*/
)

func main() {
	database.ConnectDatabase()

	env, err := config.LoadEnv()
	if err != nil {
		log.Fatal(err)
	}

	pkg.InitLogger(env.App_Env)

	router := gin.Default()

	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	routerSetup.SetupMainRouter(router)

	router.Run()
}
