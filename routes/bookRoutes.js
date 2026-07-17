const express = require('express')
const { create } = require('../models/User')
const { addNewBook, getAllBooks, updateBook, deleteBook, getSingleBookByID, borrowBook, returnBook, getMyBorrowedBooks } = require('../controllers/bookController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

const router=express.Router()

router.post('/add',authMiddleware,adminMiddleware,addNewBook)
router.get('/getall',authMiddleware,getAllBooks)
router.get('/get/:id',authMiddleware,getSingleBookByID)
router.put('/update/:id',authMiddleware,adminMiddleware,updateBook)
router.delete('/delete/:id',authMiddleware,adminMiddleware,deleteBook)
router.post("/:id/borrow", authMiddleware, borrowBook);
router.post("/:id/return", authMiddleware, returnBook);
router.get('/getmybooks',authMiddleware,getMyBorrowedBooks)
module.exports=router