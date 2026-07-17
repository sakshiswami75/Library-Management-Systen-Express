# 📚 Library Management System (Backend)

A RESTful backend application developed using **Node.js**, **Express.js**, **MongoDB**, and **Mongoose** following the **MVC Architecture**. The project provides secure user authentication, role-based authorization, and complete library management functionalities including book management, borrowing, returning, and viewing borrowed books.

---

# Features

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
- Borrow Book
- Return Book
- View My Borrowed Books

## Validation
- Required Field Validation
- Duplicate Email Validation
- Duplicate ISBN Validation
- Prevent Duplicate Book Borrowing
- Proper Error Handling
- HTTP Status Codes

---

# Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcryptjs
- dotenv

---

# Project Structure

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
│   ├── authRoutes.js
│   └── bookRoutes.js
│
├── .env
├── package.json
├── server.js
└── README.md
```

---

# Installation

## 1. Clone the Repository

```bash
git clone <repository-url>
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create a `.env` file.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## 4. Start the Server

```bash
npm run dev
```

Server will run on:

```
http://localhost:5000
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login user |

---

## Books

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/book/add | Add a new book (Admin) |
| GET | /api/book/getall | Get all books |
| GET | /api/book/get/:id | Get single book |
| PUT | /api/book/update/:id | Update book (Admin) |
| DELETE | /api/book/delete/:id | Delete book (Admin) |
| POST | /api/book/:id/borrow | Borrow a book |
| POST | /api/book/:id/return | Return a book |
| GET | /api/book/getmybooks | Get currently borrowed books |

---

# Authentication

Protected routes require a JWT token.

**Header**

```http
Authorization: Bearer <your_jwt_token>
```

---

# Book Model

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

# User Model

```json
{
  "username": "sakshi",
  "email": "sakshi@example.com",
  "password": "********",
  "role": "user",
  "borrowedBooks": [
    {
      "book": "Book ID",
      "borrowDate": "Date",
      "dueDate": "Date",
      "returned": false
    }
  ]
}
```

---

# HTTP Status Codes

- **200** – Success
- **201** – Created
- **400** – Bad Request
- **401** – Unauthorized
- **403** – Forbidden
- **404** – Not Found
- **500** – Internal Server Error

---

# API Testing

Use **Thunder Client** or **Postman** to test all API endpoints.

---

# Future Enhancements

- Book Search
- Borrow History
- Fine Management
- Due Date Notifications
- Pagination
- Dashboard Analytics

---

# Author

**Sakshi Swami**
