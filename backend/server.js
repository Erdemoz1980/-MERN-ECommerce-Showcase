const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 3000

const app = express()


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

connectDB()

app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(port, () => console.log(`Server is listenning on Port:${port}
`))

