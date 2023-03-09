## 🛠️ Technologies

- **[React.js](https://reactjs.org/)** A JavaScript library for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)** - A superset of JavaScript.
- **[Tailwind CSS](https://tailwindcss.com/)** Rapidly build modern websites without ever leaving your HTML.
- **[React-Hook-Form](https://react-hook-form.com/)** - Performant, flexible and extensible forms with easy-to-use validation.
- **[Go](https://go.dev/)** - Statically typed, compiled high-level programming language.
- **[Fiber](https://gofiber.io/)** - An Express-inspired web framework written in Go.
- **[PostgreSQL](https://www.postgresql.org/)** - The World's Most Advanced Open Source Relational Database.

## 💻 API endpoints

- `GET /auth/session` - retrieve user session data

- `POST /auth/register` - register a new user account.

- `POST /auth/login` - log in an existing user

- `DELETE /auth/logout` - log out the current user.

- `GET /auth/csrf` - returns object containing CSRF token.

## 🔑 Environment variables

1. Create a `.env` file in the root of the project with the following variables:

```env
# Postgres Database config
PGUSER=
PGPASSWORD=
PGDATABASE=
PGHOST=
PGPORT=
```

2. Create a `.env` file inside the /web folder with the following variables:

```env
# URL of the backend
VITE_PRODUCTION_URL=
VITE_DEVELOPMENT_URL=
```
