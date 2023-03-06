package main

import (
	"context"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
	"github.com/techwithmat/auth-golang/internal/user"
	"github.com/techwithmat/auth-golang/pkg/database"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("Error loading .env file")
	}

	db, err := database.NewDBInstance()

	if err != nil {
		log.Println("Unable to connect to database")
	}

	defer db.Close(context.Background())

	app := fiber.New()
	app.Use(logger.New())

	userRepository := user.NewUserRepository(db)
	user.InitUserRoutes(app, userRepository)

	app.Listen(":3000")
}
