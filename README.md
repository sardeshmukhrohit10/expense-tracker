# Expense Tracker (React + Node.js + PostgreSQL)

A full-stack expense tracking application built with React (frontend), Node.js + Express (backend), and PostgreSQL (database).  
The app supports dark mode, adding/deleting transactions, filtering, charts, and CSV export — with a premium UI.

---

## 🚀 Tech Stack

### Frontend
- React
- Context API
- TailwindCSS
- Chart.js
- Fetch / REST API

### Backend
- Node.js
- Express.js
- CORS
- dotenv

### Database
- PostgreSQL
- pgAdmin
- Node `pg` client

---

## 📦 Project Structure

```
project/
│
├── frontend/                 # React application
│
└── backend/
    ├── server.js
    ├── .env
    ├── .env.example
    ├── package.json
    └── src/
        ├── config/
        │   └── db.js
        ├── controllers/
        │   └── transactionController.js
        └── routes/
            └── transactionRoutes.js
```

---

## 🛠 Backend Setup

### 1. Navigate to backend
```bash
cd backend
```

### 2. Install backend dependencies
```bash
npm install
```

### 3. Create `.env`
```env
PORT=5000

PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=your_password_here
PG_DATABASE=expense_tracker_db
```

### 4. Create database in PostgreSQL
In pgAdmin or SQL terminal:

```sql
CREATE DATABASE expense_tracker_db;
```

### 5. Create `transactions` table
Run this inside the DB:

```sql
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  type VARCHAR(10) NOT NULL CHECK (type IN ('Income','Expense')),
  category TEXT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### 6. Start backend
```bash
npm run dev
```

Backend runs at:
```
http://localhost:5000
```

---

## 🛠 Frontend Setup

### 1. Navigate to frontend
```bash
cd frontend
```

### 2. Install frontend dependencies
```bash
npm install
```

### 3. Start frontend
```bash
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---

## 🔌 API Endpoints

### GET all transactions
```http
GET /api/transactions
```

### Create a transaction
```http
POST /api/transactions
```

#### Request Body:
```json
{
  "title": "Salary",
  "amount": 3000,
  "type": "Income",
  "category": "Salary",
  "date": "2025-01-20"
}
```

### Delete a transaction
```http
DELETE /api/transactions/:id
```

---

## 🎨 Features

- Add, delete transactions  
- Income & expense calculation  
- Monthly filtering  
- Category filtering  
- Search bar  
- CSV export  
- Dark/Light mode  
- Summary cards + Donut chart  
- Fully connected to PostgreSQL backend  

---

## ✨ Future Enhancements

- User authentication (JWT)
- Recurring or scheduled transactions
- Multi-currency support
- Deploy backend (Render/Railway)
- Deploy frontend (Vercel)
- Reports & analytics dashboard

---

## 📄 License
MIT License

---

## 👨‍💻 Developer
Built by **Tejas**.
