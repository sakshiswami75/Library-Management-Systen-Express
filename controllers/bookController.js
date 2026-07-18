const Book = require("../models/Book");
const User = require("../models/User");

// Add New Book
const addNewBook = async (req, res) => {
    try {
        const {
            title,
            author,
            category,
            isbn,
            totalCopies,
            availableCopies
        } = req.body;

        // Check duplicate ISBN
        const existingBook = await Book.findOne({ isbn });

        if (existingBook) {
            return res.status(400).json({
                success: false,
                msg: "Book with this ISBN already exists"
            });
        }

        // availableCopies should not exceed totalCopies
        if (availableCopies > totalCopies) {
            return res.status(400).json({
                success: false,
                msg: "Available copies cannot be greater than total copies"
            });
        }

        const newlyCreatedBook = await Book.create({
            title,
            author,
            category,
            isbn,
            totalCopies,
            availableCopies
        });

        res.status(201).json({
            success: true,
            msg: "Book created successfully",
            data: newlyCreatedBook
        });

    } catch (e) {

        if (e.code === 11000) {
            return res.status(400).json({
                success: false,
                msg: "Book with this ISBN already exists"
            });
        }

        console.log(e);

        res.status(500).json({
            success: false,
            msg: "Something went wrong! Please try again."
        });
    }
}

// Get All Books
const getAllBooks = async (req, res) => {
    try {

        const allBooks = await Book.find({});

        if (allBooks.length === 0) {
            return res.status(404).json({
                success: false,
                msg: "No books found"
            });
        }

        res.status(200).json({
            success: true,
            msg: "Books fetched successfully",
            data: allBooks
        });

    } catch (e) {
        console.log(e);

        res.status(500).json({
            success: false,
            msg: "Something went wrong!"
        });
    }
};

// Get Single Book
const getSingleBookByID = async (req, res) => {
    try {

        const bookId = req.params.id;

        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({
                success: false,
                msg: "Book not found"
            });
        }

        res.status(200).json({
            success: true,
            data: book
        });

    } catch (e) {
        console.log(e);

        res.status(500).json({
            success: false,
            msg: "Something went wrong!"
        });
    }
};

// Update Book
const updateBook = async (req, res) => {
    try {

        const bookId = req.params.id;

        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                msg: "Book not found"
            });
        }

        res.status(200).json({
            success: true,
            msg: "Book updated successfully",
            data: updatedBook
        });

    } catch (e) {
        console.log(e);

        if (e.code === 11000) {
            return res.status(400).json({
                success: false,
                msg: "Book with this ISBN already exists"
            });
        }

        res.status(500).json({
            success: false,
            msg: "Something went wrong!"
        });
    }
};

// Delete Book
const deleteBook = async (req, res) => {
    try {

        const bookId = req.params.id;

        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return res.status(404).json({
                success: false,
                msg: "Book not found"
            });
        }

        res.status(200).json({
            success: true,
            msg: "Book deleted successfully",
            data: deletedBook
        });

    } catch (e) {
        console.log(e);

        res.status(500).json({
            success: false,
            msg: "Something went wrong!"
        });
    }
};

// borrow book
const borrowBook = async (req, res) => {
    try {
        const { dueDate } = req.body;

        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        if (book.availableCopies <= 0) {
            return res.status(400).json({
                success: false,
                message: "Book is not available",
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Check if the user has already borrowed this book
        const alreadyBorrowed = user.borrowedBooks.find(
            (item) =>
                item.book.toString() === book._id.toString() &&
                item.returned === false
        );

        if (alreadyBorrowed) {
            return res.status(400).json({
                success: false,
                message: "You have already borrowed this book",
            });
        }

        user.borrowedBooks.push({
            book: book._id,
            dueDate,
        });

        await user.save();

        book.availableCopies -= 1;
        await book.save();

        res.status(200).json({
            success: true,
            message: "Book borrowed successfully",
            data: {
                book,
                borrowedBook: user.borrowedBooks[user.borrowedBooks.length - 1],
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


const returnBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const borrowedBook = user.borrowedBooks.find(
            (item) =>
                item.book.toString() === book._id.toString() &&
                item.returned === false
        );

        if (!borrowedBook) {
            return res.status(400).json({
                success: false,
                message: "This book is not borrowed by you",
            });
        }

        borrowedBook.returned = true;

        await user.save();

        book.availableCopies += 1;
        await book.save();

        res.status(200).json({
            success: true,
            message: "Book returned successfully",
            data: book,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const getMyBorrowedBooks = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .populate("borrowedBooks.book");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            data: user.borrowedBooks,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const searchBooks = async (req, res) => {
    try {
        const { keyword } = req.query;

        const books = await Book.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { author: { $regex: keyword, $options: "i" } },
                { category: { $regex: keyword, $options: "i" } }
            ]
        });

        res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAvailableBooks = async (req, res) => {
    try {
        const books = await Book.find({
            availableCopies: { $gt: 0 }
        });

        res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getUnavailableBooks = async (req, res) => {
    try {
        const books = await Book.find({
            availableCopies: 0
        });

        res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    addNewBook,
    getAllBooks,
    getSingleBookByID,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook,
    getMyBorrowedBooks,
    searchBooks,
    getAvailableBooks,
    getUnavailableBooks
};
