package database

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v5"
)

func NewDBInstance() (*pgx.Conn, error) {
	ctx := context.Background()
	dns := fmt.Sprintf("postgres://%s:%s@localhost:5432/%s",
		os.Getenv("POSTGRES_USER"),
		os.Getenv("POSTGRES_PASSWORD"),
		os.Getenv("POSTGRES_DB"),
	)

	connection, err := pgx.Connect(ctx, dns)

	if err != nil {
		log.Fatal("Unable to connect to database")
	}

	if err = connection.Ping(ctx); err != nil {
		log.Fatal("Unable to connect to database")
		return nil, err
	}

	return connection, nil
}
