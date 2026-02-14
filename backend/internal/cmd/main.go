package main

import (
	"backend/pkg"

	"github.com/gin-gonic/gin"
	"backend/internal/database"
	routerSetup "backend/internal/router"
/*	"backend/internal/exchange"
	"backend/internal/transaction"
	"backend/internal/coins"*/
)

func main() {
	database.ConnectDatabase()

	pkg.InitLogger("dev")
	router := gin.Default()

	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	routerSetup.SetupMainRouter(router)

	router.Run()
}
