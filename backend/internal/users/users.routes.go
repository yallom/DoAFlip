package users

import "github.com/gin-gonic/gin"

func RegisterUserRoutes(userRouter *gin.RouterGroup, repo UsersRepository) {
	handler := NewUserHandler(repo)

	users := userRouter.Group("/users")
	{
		users.GET("", handler.GetAllUsers)
		users.GET("/id/:id", handler.GetById)
		users.GET("/email/:email", handler.GetByEmail)
		users.POST("", handler.Create)
	}
}