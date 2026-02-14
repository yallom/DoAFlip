package users

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type UserHandler interface {
	GetAllUsers(c *gin.Context)
	GetUserById(c *gin.Context)
	GetUserByEmail(c *gin.Context)
	CreateUser(c *gin.Context)
	UpdateUser(c *gin.Context)
	DeleteUser(c *gin.Context)
}

type userHandler struct {
	repository UsersRepository
}

func NewUserHandler(repository UsersRepository) UserHandler {
	return &userHandler{
		repository: repository,
	}
}

func (h *userHandler) GetAllUsers(c *gin.Context) {
	users, err := h.repository.GetAllUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve users"})
		return
	}

	c.JSON(http.StatusOK, users)
}

func (h *userHandler) GetUserById(c *gin.Context) {
	idUint64, err := strconv.ParseUint(c.Param("id"), 10, 0)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	id := uint(idUint64)
	user, err := h.repository.GetByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, user)
}

func (h *userHandler) GetUserByEmail(c *gin.Context) {
	email := c.Param("email")
	user, err := h.repository.GetByEmail(email)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, user)
}

func (h *userHandler) CreateUser(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	id, err := h.repository.CreateUser(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"id": id})
}

func (h *userHandler) UpdateUser(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}
	
	idUint64, err := strconv.ParseUint(c.Param("id"), 10, 0)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	id := uint(idUint64)
	err = h.repository.UpdateUser(id, user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User updated successfully"})	
}

func (h *userHandler) DeleteUser(c *gin.Context) {
	idUint64, err := strconv.ParseUint(c.Param("id"), 10, 0)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	id := uint(idUint64)
	err = h.repository.DeleteUser(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}