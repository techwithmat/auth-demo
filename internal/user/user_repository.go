package user

import (
	"context"
	"log"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

const InsertQuery = "INSERT INTO users (email,password) VALUES ($1, $2) RETURNING id"
const GetByEmailQuery = "SELECT id, email, password FROM users WHERE email = $1"
const CreateSessionQuery = "INSERT INTO sessions (user_id,session_token, expires_at) VALUES ($1, $2, $3)"
const DeleteSessionQuery = "DELETE FROM sessions WHERE session_token = $1"
const GetUserSession = `
SELECT s.expires_at, u.email, u.id
FROM sessions s
INNER JOIN users u ON s.user_id = u.id
WHERE session_token = $1
`

type userRepo struct {
	db *pgx.Conn
}

func NewUserRepository(db *pgx.Conn) userRepository {
	return &userRepo{
		db: db,
	}
}

func (repository *userRepo) Insert(ctx context.Context, user *RegisterRequest) error {
	_, err := repository.db.Exec(ctx, InsertQuery, user.Email, user.Password)

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

func (repository *userRepo) GetSession(ctx context.Context, sessionToken string) (*GetSessionResponse, error) {
	var (
		userEmail, userId    string
		expiresAt            time.Time
	)

	err := repository.db.
		QueryRow(ctx, GetUserSession, sessionToken).
		Scan(&expiresAt, &userEmail, &userId)

	if err != nil {
		log.Println(err)

		return nil, err
	}

	return &GetSessionResponse{
		User: User{
			ID:    userId,
			Email: userEmail,
		},
		ExpiresAt: expiresAt,
	}, nil
}
