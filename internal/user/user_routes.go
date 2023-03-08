package user

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type UserHandler struct {
	validator  *validator.Validate
	repository userRepository
}

func InitUserRoutes(router *fiber.App, repository userRepository) {
	handler := &UserHandler{
		repository: repository,
		validator:  validator.New(),
	}

	router.Post("/auth/register", handler.RegisterUser)
	router.Post("/auth/login", handler.LoginUser)
	router.Delete("/auth/logout", handler.LogoutUser)
	router.Get("/auth/session", handler.GetUserSession)
	router.Get("/auth/crsf", handler.GetCrsfToken)
}
