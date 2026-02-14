package router

import( 
	"github.com/gin-gonic/gin"

	"backend/internal/users"
)

func SetupMainRouter(router *gin.Engine) {
	userRepo := users.NewUsersRepository()
	userGroup := router.Group("/api")

	users.RegisterUserRoutes(userGroup, userRepo)
}
