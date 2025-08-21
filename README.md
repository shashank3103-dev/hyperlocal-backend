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