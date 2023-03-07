package user

import (
	"context"
	"time"
)

type User struct {
	ID        string `json:"id"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	Username  string `json:"username,omitempty"`
	AvatarUrl string `json:"avatar_url,omitempty"`
}

type UserSession struct {
	ID           string
	UserID       string
	SessionToken string
	ExpiresAt    time.Time
}

type RegisterRequest struct {
	Email                string `json:"email" validate:"required,email,min=6,max=32"`
	Password             string `json:"password" validate:"required,eqfield=PasswordConfirmation,min=8,max=28"`
	PasswordConfirmation string `json:"password_confirmation" validate:"required,min=8,max=28"`
}

type LoginRequest struct {
	Email    string `json:"email" validate:"required,email,min=6,max=32"`
	Password string `json:"password" validate:"required,min=8,max=28"`
}

type userRepository interface {
	Insert(ctx context.Context, user *RegisterRequest) error
	GetByEmail(ctx context.Context, param string) (*User, error)
	CreateUserSession(ctx context.Context, userId string) (*UserSession, error)
	DeleteUserSession(ctx context.Context, sessionToken string) error
}
