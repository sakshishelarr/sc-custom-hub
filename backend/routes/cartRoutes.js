const express = require('express');
const router = express.Router();
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
    req.user = decoded; // attaches user info to req
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

// Add to Cart route
// Add to Cart route
router.post('/add', authMiddleware, async (req, res) => {
  const { productId, productName, productPrice } = req.body;
  const userId = req.user.userId;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    const existingProduct = cart.products.find(p => p.productId === productId);

    if (existingProduct) {
      existingProduct.quantity += 1; // 🛠 If product already exists, increment quantity
    } else {
      cart.products.push({
        productId,
        name: productName,
        price: productPrice,
        quantity: 1
      });
    }

    await cart.save();
    res.json({ msg: 'Product added to cart successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }


  // View Cart Items
  router.get('/view', authMiddleware, async (req, res) => {
    const userId = req.user.userId;

    try {
      const cart = await Cart.findOne({ user: userId });

      if (!cart) {
        return res.status(200).json({ products: [] });
      }

      res.json({ products: cart.products });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  });

  // Remove item from cart
  router.post('/remove', authMiddleware, async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.userId;

    try {
      const cart = await Cart.findOne({ user: userId });
      if (!cart) return res.status(404).json({ msg: 'Cart not found' });

      cart.products = cart.products.filter(p => p.productId !== productId);
      await cart.save();

      res.json({ msg: 'Product removed from cart' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  });

  // Update quantity in cart (increase or decrease)
  router.post('/update', authMiddleware, async (req, res) => {
    const { productId, action } = req.body; // action = 'increase' or 'decrease'
    const userId = req.user.userId;

    try {
      const cart = await Cart.findOne({ user: userId });
      if (!cart) return res.status(404).json({ msg: 'Cart not found' });

      const product = cart.products.find(p => p.productId === productId);

      if (!product) return res.status(404).json({ msg: 'Product not found' });

      if (action === 'increase') {
        product.quantity += 1;
      } else if (action === 'decrease') {
        product.quantity -= 1;
        if (product.quantity <= 0) {
          cart.products = cart.products.filter(p => p.productId !== productId); // Remove if quantity 0
        }
      }

      await cart.save();
      res.json({ msg: 'Cart updated' });

    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  });


  // Checkout cart
  router.post('/checkout', authMiddleware, async (req, res) => {
    const userId = req.user.userId;

    try {
      const cart = await Cart.findOne({ user: userId });
      if (!cart || cart.products.length === 0) {
        return res.status(400).json({ msg: 'Cart is empty' });
      }

      // Here you would create an Order model (optional later)
      cart.products = []; // Clear cart
      await cart.save();

      res.json({ msg: 'Checkout successful' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  });

});

module.exports = router;
