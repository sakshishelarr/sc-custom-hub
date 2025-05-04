# 🎁 SC Custom Hub

**SC Custom Hub** is a sleek and modern web platform for exploring, customizing, and purchasing personalized gifts like mugs, t-shirts, photo frames, and more — perfect for every occasion.

---

## 🚀 Live Demo

- **Frontend** (Vercel): [sc-custom-hub.vercel.app](https://sc-custom-hub.vercel.app)
- **Backend** (Railway): [Hosted on Railway](https://railway.app/project)

---

## 🗂️ Project Structure

sc-custom-hub/
├── frontend/
│ ├── html/ # All HTML files (index.html, login.html, products.html, etc.)
│ ├── css/ # All CSS files
│ ├── js/ # All client-side JS (login.js, cart.js, orders.js, etc.)
│ └── images/ # Static assets like logos and banners
├── backend/
│ ├── routes/ # Route files: authRoutes.js, orderRoutes.js, etc.
│ ├── models/ # Mongoose models: User.js, Order.js, Cart.js
│ ├── config/ # MongoDB connection (db.js)
│ └── server.js # Express app entry point
├── .env # Environment variables
└── README.md # Project documentation



---

## 🔧 Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Hosting**:
  - **Frontend**: Vercel
  - **Backend**: Railway
  - **Database**: MongoDB Atlas

---

## 📦 Features

- 🔐 User Authentication (Signup/Login with JWT)
- 🛍️ Product Browsing
- 🛒 Add to Cart
- ✅ Checkout and Order Confirmation
- 📦 View Recent Order (on orders page)
- 🧾 Order History (on account page)
- 📱 Responsive design

---

## 🛠️ Setup Instructions (for local development)

1. **Clone the repo:**

   ```bash
   git clone https://github.com/sakshishelarr/sc-custom-hub.git
   cd sc-custom-hub

2. **Setup backend:**

  ```bash
  cd backend
  npm install
```
3. **Add .env file in /backend/ directory:**

  ```ini
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret_key
```

4. **Start the server:**

  ```bash
  node server.js
  Open frontend/html/index.html in your browser (or use Live Server).
```

🙌 Credits
Designed and built by @sakshishelarr with 💖

yaml
Copy

---

Let me know if you'd like a version with screenshots or badges too!





