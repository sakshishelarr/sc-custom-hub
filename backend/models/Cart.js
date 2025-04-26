const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  products: [
    {
      productId: { type: String },  // 🛠️ Make sure this is a STRING
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number, default: 1 }
    }
  ]
});

module.exports = mongoose.model('Cart', CartSchema);
