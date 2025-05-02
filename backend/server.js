// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config(); // Load environment variables

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse incoming requests
app.use(cors({
  origin: 'https://sc-custom-hub.vercel.app', // ✅ Your deployed frontend domain
  credentials: true
})); // Add this
app.use(express.json());


// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/checkout', require('./routes/checkoutRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
