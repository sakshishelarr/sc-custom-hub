const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

// Place order (checkout)
router.post('/checkout', authMiddleware, async (req, res) => {
  const userId = req.user.userId;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ msg: 'Cart is empty' });
    }

    const totalAmount = cart.products.reduce((total, product) => total + (product.price * product.quantity), 0);

    const newOrder = new Order({
      user: userId,
      products: cart.products,
      totalAmount
    });

    await newOrder.save();
    cart.products = []; // Empty cart after placing order
    await cart.save();

    res.json({ msg: 'Order placed successfully!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// View user's orders
router.get('/myorders', authMiddleware, async (req, res) => {
  const userId = req.user.userId;

  try {
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
