# Advanced MERN Authentication

## 🚀 Overview
This project implements a **secure authentication system** using the **MERN stack** (MongoDB, Express.js, React, and Node.js). It includes features like **JWT-based authentication, email verification, password reset, role-based access control (RBAC), and secure cookie handling**.

## 🔥 Features
- **User Signup & Login** (with hashed passwords)
- **JWT Authentication & Refresh Tokens**
- **Email Verification** (via Mailtrap or other SMTP services)
- **Password Reset & Change Password**
- **Role-Based Access Control (RBAC)**
- **Secure HTTP Cookies for Authentication**
- **Protected Routes (Frontend & Backend)**
- **Logout & Token Revocation**

## 🏗️ Tech Stack
### Frontend:
- React.js (Vite/CRA)
- Redux Toolkit (for state management)
- Chakra UI / TailwindCSS (for UI)
- React Router DOM (for routing)
- Axios (for API requests)

### Backend:
- Node.js & Express.js
- MongoDB with Mongoose
- bcrypt.js (for password hashing)
- JSON Web Token (JWT) for authentication
- Mailtrap / Nodemailer (for email verification & password reset)
- dotenv (for environment variables)

## 🎯 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/advanced-mern-auth.git
cd advanced-mern-auth
```

### 2️⃣ Backend Setup
```sh
cd backend
npm install
```
- **Create a `.env` file** in the `backend` folder and add the following:
  ```env
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  JWT_EXPIRES_IN=1d
  MAILTRAP_USER=your_mailtrap_username
  MAILTRAP_PASS=your_mailtrap_password
  ````
- **Start the backend server:**
```sh
npm run dev
```

### 3️⃣ Frontend Setup
```sh
cd ../frontend
npm install
```
- **Start the React frontend:**
```sh
npm run dev
```

## 🛠️ API Endpoints
### 🔑 Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - Login & receive tokens
- `POST /api/auth/logout` - Logout & clear tokens
- `POST /api/auth/refresh-token` - Get a new access token
- `POST /api/auth/verify-email` - Email verification
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### 👤 User Management
- `GET /api/users/me` - Get current user profile
- `PATCH /api/users/update-password` - Change password
- `GET /api/users/admin-dashboard` - Admin-only route

## 🔒 Security Measures
- **Password Hashing** using `bcryptjs`
- **JWT Authentication** with refresh tokens
- **Secure HTTP Cookies** for storing tokens
- **Email Verification** via Mailtrap/Nodemailer
- **Rate Limiting & CORS Protection**

## 📝 Contribution
Feel free to contribute! Open an issue or submit a PR to improve the project.

## 📜 License
This project is open-source and available under the **MIT License**.
