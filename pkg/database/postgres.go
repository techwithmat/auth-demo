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
	dns := fmt.Sprintf("postgres://%s:%s@%s:%s/%s",
		os.Getenv("PGUSER"),
		os.Getenv("PGPASSWORD"),
		os.Getenv("PGHOST"),
		os.Getenv("PGPORT"),
		os.Getenv("PGDATABASE"),
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
