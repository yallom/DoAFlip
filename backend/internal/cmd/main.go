package main

import (
	"backend/pkg"

	"github.com/gin-gonic/gin"
)

func main() {
	pkg.InitLogger("dev")
	router := gin.Default()

	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	router.Run()
}
