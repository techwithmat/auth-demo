package user

import (
	"context"
	"log"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

const InsertQuery = "INSERT INTO users (email,username,password) VALUES ($1, $2, $3) RETURNING id"
const GetByEmailQuery = "SELECT id, email, password FROM users WHERE email = $1"
const CreateSessionQuery = "INSERT INTO sessions (user_id,session_token, expires_at) VALUES ($1, $2, $3)"
const DeleteSessionQuery = "DELETE FROM sessions WHERE session_token = $1"

type userRepo struct {
	db *pgx.Conn
}

func NewUserRepository(db *pgx.Conn) userRepository {
	return &userRepo{
		db: db,
	}
}

func (repository *userRepo) Insert(ctx context.Context, user *RegisterRequest) error {
	_, err := repository.db.Exec(ctx, InsertQuery, user.Email, user.Username, user.Password)

	if err != nil {
		log.Println(err)

		return err
	}

	return nil
}

func (repository *userRepo) GetByEmail(ctx context.Context, param string) (*User, error) {
	var id, email, hashedPassword string

	err := repository.db.QueryRow(ctx, GetByEmailQuery, param).Scan(&id, &email, &hashedPassword)

	if err != nil {
		log.Println(err)

		return nil, err
	}

	return &User{
		ID:       id,
		Email:    email,
		Password: hashedPassword,
	}, nil
}

func (repository *userRepo) CreateUserSession(ctx context.Context, userId string) (*UserSession, error) {
	sessionToken := uuid.NewString()
	expiresAt := time.Now().Add(720 * time.Hour)

	_, err := repository.db.Exec(ctx, CreateSessionQuery, userId, sessionToken, expiresAt)

	if err != nil {
		log.Println(err)

		return nil, err
	}

	return &UserSession{
		SessionToken: sessionToken,
		UserID:       userId,
		ExpiresAt:    expiresAt,
	}, nil
}

func (repository *userRepo) DeleteUserSession(ctx context.Context, sessionToken string) error {
	_, err := repository.db.Exec(ctx, DeleteSessionQuery, sessionToken)

	if err != nil {
		log.Println(err)

		return err
	}

	return nil
}
