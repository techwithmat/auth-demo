package auth

type User struct {
	ID        string `json:"id"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	Username  string `json:"username"`
	AvatarUrl string `json:"avatar_url"`
}
