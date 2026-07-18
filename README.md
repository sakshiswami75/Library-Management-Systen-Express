# 📚 Library Management System (Backend)

A RESTful backend application developed using **Node.js**, **Express.js**, **MongoDB**, and **Mongoose** following the **MVC Architecture**. The project provides secure user authentication, role-based authorization, complete book management, borrowing & returning books, borrowing history, search functionality, and book availability management.

---

# 🚀 Features

## Authentication
- User Registration
- User Login
- Password Hashing using bcrypt
- JWT Authentication
- Role-Based Authorization (Admin/User)

## Book Management
- Add Book (Admin)
- Update Book (Admin)
- Delete Book (Admin)
- View All Books
- View Single Book
- Search Books (Title, Author, Category)
- View Available Books
- View Unavailable Books

## Library Features
- Borrow Book
- Return Book
- View Borrow History
- Prevent Duplicate Borrowing
- Automatically Update Available Copies

## Validation
- Required Field Validation
- Duplicate Email Validation
- Duplicate ISBN Validation
- Proper Error Handling
- HTTP Status Codes

---

# 🛠 Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcryptjs
- dotenv
- Thunder Client

---

# 📂 Project Structure

```
Library-Management-System/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   └── bookController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── adminMiddleware.js
│
├── models/
│   ├── User.js
│   └── Book.js
│
├── routes/
│   ├── authRoute.js
│   └── bookRoute.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/sakshiswami75/Library-Management-Systen-Express.git
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Start Server

```bash
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

---

## Books

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/book/add` | Add Book (Admin) |
| GET | `/api/book/getall` | Get All Books |
| GET | `/api/book/get/:id` | Get Single Book |
| PUT | `/api/book/update/:id` | Update Book (Admin) |
| DELETE | `/api/book/delete/:id` | Delete Book (Admin) |
| GET | `/api/book/search?keyword=value` | Search Books |
| GET | `/api/book/available` | Get Available Books |
| GET | `/api/book/unavailable` | Get Unavailable Books |
| POST | `/api/book/:id/borrow` | Borrow Book |
| POST | `/api/book/:id/return` | Return Book |
| GET | `/api/book/getmybooks` | View Borrow History |

---

# 🔐 Authentication

Protected routes require a JWT Token.

```
Authorization: Bearer <your_jwt_token>
```

---

# 📖 Book Schema

```json
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "category": "Fiction",
  "isbn": "9780061122415",
  "totalCopies": 10,
  "availableCopies": 10
}
```

---

# 👤 User Schema

```json
{
  "username": "sakshi",
  "email": "sakshi@example.com",
  "password": "********",
  "role": "user",
  "borrowedBooks": [
    {
      "book": "Book ID",
      "borrowDate": "2026-07-17",
      "dueDate": "2026-07-24",
      "returned": false
    }
  ]
}
```

---

# 📊 HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

# 🧪 API Testing

All APIs were tested using **Thunder Client**.

---

# 🔮 Future Enhancements

- Pagination
- Book Sorting
- Dashboard Statistics
- Fine Management
- Due Date Notifications
- Email Notifications
- React Frontend
- Project Deployment

---

# 👩‍💻 Author

**Sakshi Swami**
