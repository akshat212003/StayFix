# 🔧 StayFix — Hostel Maintenance Management System

A full-stack hostel & PG maintenance complaint management platform built with **Spring Boot** (backend) and **React + Vite** (frontend).

---

## ✨ Features

- 📋 **Student** — Raise maintenance complaints with photos, track status, rate resolved issues
- 🔧 **Staff** — View assigned work orders, update progress, upload resolution proof
- 🛡️ **Admin** — Manage users, assign staff, view analytics and performance metrics
- 🌙 **Light & Dark Theme** — Fully theme-aware UI with one-click toggle
- 📸 **Image Upload** — Attach issue photos and resolution proof images

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Spring Boot 3, Spring Security (JWT), JPA/Hibernate |
| Database | MySQL 8 |
| Frontend | React 18, Vite, TailwindCSS, Recharts |
| Auth | JWT Bearer tokens |
| File Storage | Local filesystem (`/uploads`) |

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8

### 1. Backend Setup

```bash
cd Backend
# Configure your MySQL credentials in:
# src/main/resources/application.yml
#   spring.datasource.password: <your_password>

mvn spring-boot:run
```

Backend runs on `http://localhost:8080`

### 2. Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 🔐 Default Credentials

> All accounts require `@stayfix.com` email domain.

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@stayfix.com | admin123 |

Register new student accounts via the `/register` page.

---

## 📁 Project Structure

```
StayFix/
├── Backend/          # Spring Boot API
│   └── src/main/java/com/stayfix/
│       ├── controller/
│       ├── service/
│       ├── model/
│       ├── repository/
│       ├── config/   # JWT, CORS, DataInitializer
│       └── dto/
└── Frontend/         # React + Vite SPA
    └── src/
        ├── pages/
        ├── components/
        ├── context/  # AuthContext, ThemeContext
        ├── services/ # API calls
        └── utils/
```

---

## 📄 License

MIT License — feel free to fork and customize.
