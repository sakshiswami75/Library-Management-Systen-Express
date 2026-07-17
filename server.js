require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')

const app=express()

app.use(express.json());
connectDB()

app.use('/api',require('./routes/authRoutes'))
app.use('/api/book',require('./routes/bookRoutes'))
const PORT = process.env.PORT 
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})