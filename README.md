# 📦 Hyperlocal Backend

A scalable **Node.js + Express + Prisma + PostgreSQL** backend boilerplate with authentication, structured logging, and request validation. Built for modern production-grade applications.

---

## ✨ Features
- ⚡ **Express + TypeScript** – fast and type-safe
- 🛡 **Auth Module** – JWT-based authentication (register, login, me)
- 🗄 **Prisma ORM** – PostgreSQL with migrations
- 🧾 **Validation** – request validation with [Zod](https://zod.dev)
- 📊 **Logging** – structured logging with [Winston](https://github.com/winstonjs/winston)
- 🧩 **Modular Architecture** – clean folder structure for scalability
- 🛠 **Error Handling** – consistent error response format

---

## 📂 Project Structure

src/
├── middlewares/ # error, auth, validate
├── modules/ # feature modules
│ └── auth/ # auth.routes, auth.controller, auth.service, auth.schemas
├── utils/ # helpers (http, logger, etc.)
├── server.ts # entrypoint
└── app.ts # express app config

---

## 🚀 Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/<your-username>/hyperlocal-backend.git
cd hyperlocal-backend

npm install

DATABASE_URL="postgresql://postgres:postgres@localhost:5434/localfast_db"
PORT=5001
JWT_SECRET="supersecretjwt"

docker run --name hyperlocal-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=localfast_db \
  -p 5434:5432 \
  -d postgres:15

npm run prisma:migrate

npm run dev

POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "user_123",
    "email": "user@example.com"
  }
}

{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "path": "email", "message": "Invalid email" }
  ]
}

{
  "success": false,
  "message": "Email already in use"
}

{
  "success": false,
  "message": "Internal Server Error"
}

{
  "info": {
    "name": "Hyperlocal Backend",
    "_postman_id": "12345678-abcd-efgh-ijkl-987654321000",
    "description": "Postman collection for Hyperlocal Backend APIs",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Register",
      "request": {
        "method": "POST",
        "header": [
          { "key": "Content-Type", "value": "application/json" }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"user@example.com\",\n  \"password\": \"password123\"\n}"
        },
        "url": {
          "raw": "http://localhost:5001/api/v1/auth/register",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5001",
          "path": ["api", "v1", "auth", "register"]
        }
      }
    },
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "header": [
          { "key": "Content-Type", "value": "application/json" }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"user@example.com\",\n  \"password\": \"password123\"\n}"
        },
        "url": {
          "raw": "http://localhost:5001/api/v1/auth/login",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5001",
          "path": ["api", "v1", "auth", "login"]
        }
      }
    },
    {
      "name": "Me",
      "request": {
        "method": "GET",
        "header": [
          { "key": "Authorization", "value": "Bearer {{token}}" }
        ],
        "url": {
          "raw": "http://localhost:5001/api/v1/auth/me",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5001",
          "path": ["api", "v1", "auth", "me"]
        }
      }
    }
  ]
}

🤝 Contributing

Fork the repo

Create your feature branch (git checkout -b feature/awesome)

Commit your changes (git commit -m 'Add some awesome feature')

Push to the branch (git push origin feature/awesome)

Open a Pull Request 🚀

📜 License

MIT License © 2025 shashank shakya