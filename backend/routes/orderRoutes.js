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
// Get latest order
// In your backend (ordersRoutes.js or similar)

router.get('/latest', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findOne({ user: req.user.userId }).sort({ createdAt: -1 }).populate('user', 'fullname email');
    if (!order) {
      return res.status(404).json({ msg: 'No orders found.' });
    }
    res.json({ 
      order: {
        _id: order._id,
        products: order.products,
        totalAmount: order.totalAmount,
        subtotal: order.totalAmount, // you can split later if you have tax
        shipping: 0, // Assume Free Shipping
        tax: 50, // Hardcoded for now
        user: {
          fullname: order.user.fullname,
          email: order.user.email,
        }
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});



// Get all order history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
