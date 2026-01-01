# FullStackPersonalFinanceTracker
📊 Full Stack Personal Finance Tracker

A full-stack web application to manage income and expenses with authentication, role-based access, and analytics.

🚀 Features
✅ User Authentication

Register & Login

JWT-based authentication

Role-based access:

Admin – full access

User – manage own transactions

Read-only – view only

✅ Transaction Management

Add / Edit / Delete transactions

Categorize expenses (Food, Travel, etc.)

View transaction history

✅ Dashboard & Analytics

Monthly income vs expense

Category-wise spending

Graphs using charts

✅ Performance & Security

Redis caching

Rate limiting

Secure JWT authentication

PostgreSQL database

🛠 Tech Stack
Layer	Technology
Frontend	React.js
Backend	Node.js, Express
Database	PostgreSQL
Caching	Redis
Auth	JWT

🔐 Demo Credentials
Role	Email	Password
User	test@example.com
	123456
Admin	admin@example.com
	admin123
📦 API Endpoints
Auth
POST /api/auth/register
POST /api/auth/login

Transactions
GET    /api/transactions
POST   /api/transactions
PUT    /api/transactions/:id
DELETE /api/transactions/:id

Analytics
GET /api/analytics

⚙️ Setup Instructions (Local)
1️⃣ Clone Repo
git clone https://github.com/shrishti08012004/FullStackPersonalFinanceTracker.git
cd FullStackPersonalFinanceTracker

2️⃣ Backend Setup
cd backend
npm install
npm start


Create .env file:

PORT=5000
DB_HOST=your_db_host
DB_NAME=finance_tracker
DB_USER=your_db_user
DB_PASSWORD=postgres123
JWT_SECRET=your_secret

3️⃣ Frontend Setup
cd frontend
npm install
npm start

📁 Project Structure
FullStackPersonalFinanceTracker/
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   └── App.js
│
└── README.md

📌 Deployment
Service	Used
Backend	Render
(But it failed)



