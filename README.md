# 📦 Hyperlocal Backend

![Node.js](https://img.shields.io/badge/Node.js-23.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Backend-black?logo=express)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-lightblue?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)
![Winston](https://img.shields.io/badge/Logging-Winston-yellow?logo=winston)
![License](https://img.shields.io/badge/License-MIT-red)

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
```
src/
├── middlewares/       # error, auth, validate
├── modules/           # feature modules
│    └── auth/         # auth.routes, auth.controller, auth.service, auth.schemas
├── utils/             # helpers (http, logger, etc.)
├── server.ts          # entrypoint
└── app.ts             # express app config
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/shashank3103-dev/hyperlocal-backend.git
cd hyperlocal-backend
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Setup environment variables
Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/hyperlocal"
JWT_SECRET="your-secret-key"
PORT=5001
```

### 4️⃣ Run database migrations
```bash
npx prisma migrate dev
```

### 5️⃣ Start the server
```bash
npm run dev
```

Your server will be running at 👉 **http://localhost:5001**

---

## 📬 API Endpoints

### Auth
| Method | Endpoint             | Description               |
|--------|----------------------|---------------------------|
| POST   | `/api/v1/auth/register` | Register new user         |
| POST   | `/api/v1/auth/login`    | Login with credentials    |
| GET    | `/api/v1/auth/me`       | Get logged-in user (JWT)  |

---

## 🤝 Contributing

1. Fork the repo  
2. Create your feature branch (`git checkout -b feature/awesome`)  
3. Commit your changes (`git commit -m 'Add some awesome feature'`)  
4. Push to the branch (`git push origin feature/awesome`)  
5. Open a Pull Request 🚀  

---

## 👥 Contributors

Thanks goes to these amazing people:

<a href="https://github.com/shashank3103-dev">
  <img src="https://avatars.githubusercontent.com/u/shashank3103-dev?v=4" width="60px" style="border-radius:50%" alt="shashank shakya"/>
</a>

---

## 📜 License
MIT License © 2025 [shashank shakya](https://github.com/shashank-shakya)
