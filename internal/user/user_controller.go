package user

import (
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/techwithmat/auth-golang/pkg/encryption"
)

func (h *UserHandler) RegisterUser(c *fiber.Ctx) error {
	ctx := c.Context()
	var user RegisterRequest

	// validate the request body
	if err := c.BodyParser(&user); err != nil {
		return c.Status(400).JSON(fiber.Map{"message": err.Error()})
	}

	if err := h.validator.Struct(&user); err != nil {
		log.Printf("Validation error: %v, Request Path: %s, Time: %s", err, c.Path(), time.Now().String())
		return c.SendStatus(400)
	}

	// Hashing the password and then inserting the user into the database.
	hashedPassword, err := encryption.HashPassword(user.Password)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"Message": err.Error()})
	}

	user.Password = hashedPassword

	if err := h.repository.Insert(ctx, &user); err != nil {
		return c.SendStatus(500)
	}

	return c.JSON(fiber.Map{"status": "success"})
}

func (h *UserHandler) LoginUser(c *fiber.Ctx) error {
	ctx := c.Context()
	var input LoginRequest

	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"message": err.Error()})
	}

	if err := h.validator.Struct(&input); err != nil {
		log.Printf("Validation error: %v, Request Path: %s, Time: %s", err, c.Path(), time.Now().String())
		return c.SendStatus(400)
	}

	user, err := h.repository.GetByEmail(ctx, input.Email)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "message": "Invalid email or password"})
	}

	if err := encryption.PasswordMatch(user.Password, input.Password); err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "message": "Invalid email or password"})
	}

	session, err := h.repository.CreateUserSession(ctx, user.ID)
	if err != nil {
		return c.SendStatus(500)
	}

	c.Cookie(&fiber.Cookie{
		Name:     "session_token",
		Value:    session.SessionToken,
		Path:     "/",
		Secure:   true,
		HTTPOnly: true,
		Expires:  session.ExpiresAt,
		Domain:   "localhost",
	})

	return c.JSON(fiber.Map{
		"status": "success",
	})
}

func (h *UserHandler) LogoutUser(c *fiber.Ctx) error {
	ctx := c.Context()
	sessionToken := c.Cookies("session_token")
	expired := time.Now().Add(-time.Hour * 24)

	if err := h.repository.DeleteUserSession(ctx, sessionToken); err != nil {
		return c.SendStatus(500)
	}

	c.Cookie(&fiber.Cookie{
		Name:    "session_token",
		Value:   "",
		Expires: expired,
	})

	return c.Status(200).JSON(fiber.Map{"status": "success"})
}

func (h *UserHandler) GetUserSession(c *fiber.Ctx) error {
	ctx := c.Context()
	sessionToken := c.Cookies("session_token")

	if sessionToken == "" {
		return c.Status(401).JSON(fiber.Map{
			"status":  "error",
			"message": "missing session token",
		})
	}

	userSession, err := h.repository.GetSession(ctx, sessionToken)

	if err != nil {
		log.Printf("Error getting session: %v", err)
		return c.Status(400).JSON(fiber.Map{
			"status":  "error",
			"message": "invalid session token",
		})
	}

	if time.Now().After(userSession.ExpiresAt) {
		err := h.repository.DeleteUserSession(ctx, sessionToken)

		if err != nil {
			log.Printf("Error deleting session: %v", err)
		}

		return c.Status(401).JSON(fiber.Map{
			"status":  "error",
			"message": "session has expired, please log in again",
		})
	}

	return c.Status(200).JSON(userSession)
}
