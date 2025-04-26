// routes/checkoutRoutes.js
const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const router = express.Router();

// Checkout Route
router.post('/checkout', async (req, res) => {
  const { userId, shippingAddress, totalPrice, paymentStatus } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('products.product');
    if (!cart) {
      return res.status(400).json({ msg: 'Cart is empty' });
    }

    const newOrder = new Order({
      user: userId,
      cart: cart.id,
      status: 'Pending',
      totalPrice,
      shippingAddress,
      paymentStatus,
    });

    await newOrder.save();
    res.json(newOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
