const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 3000

const app = express()

// Configure CORS to allow requests from your frontend (localhost during development)
const allowedOrigins = ['http://localhost:3000', 'https://erdemoz-io-659240e6c6f7.herokuapp.com']; // Add your frontend domain when in production
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

connectDB()

app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/orders', require('./routes/orderRoutes'))
app.use('/api/send-email', require('./routes/mailRoutes'))
app.use(errorHandler)

app.listen(port, () => console.log(`Server is listenning on Port:${port}
`))

