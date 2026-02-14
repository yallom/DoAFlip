package users

import "api/internal/domain"

type UserDTO struct {
	ID        	 string          `json:"id"`
	Email     	 string          `json:"email"`
	Name      	 string          `json:"name"`
	HashPassword string          `json:"hash_password"`
}

type UpdateUserDTO struct {
	Email  string          `json:"email"`
	Name   string          `json:"name"`
}