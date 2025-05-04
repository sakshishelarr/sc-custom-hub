

---

```markdown
# 🎁 SC Custom Hub

**SC Custom Hub** is a sleek and modern web platform for exploring, customizing, and purchasing personalized gifts like mugs, t-shirts, photo frames, and more — perfect for every occasion.

---

## 🚀 Live Demo

- **Frontend** (Vercel): [sc-custom-hub.vercel.app](https://sc-custom-hub.vercel.app)
- **Backend** (Railway): [Hosted on Railway](https://railway.app/project)

---

## 🗂️ Project Structure

```

sc-custom-hub/
├── frontend/
│   ├── html/           # All HTML files (index.html, login.html, products.html, etc.)
│   ├── css/            # All CSS files
│   ├── js/             # All client-side JS (login.js, cart.js, orders.js, etc.)
│   └── images/         # Static assets like logos and banners
│
├── backend/
│   ├── routes/         # Route files: authRoutes.js, orderRoutes.js, etc.
│   ├── models/         # Mongoose models: User.js, Order.js, Cart.js
│   ├── config/         # MongoDB connection (db.js)
│   ├── middleware/     # Auth middleware
│   └── server.js       # Entry point for Express app
│
├── .env                # Environment variables (Mongo URI, JWT Secret)
├── README.md
└── package.json

````

---

## 🧰 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Auth**: JWT Authentication
- **Deployment**:
  - Frontend → Vercel
  - Backend → Railway
  - MongoDB → MongoDB Atlas

---

## 🔐 Features

- ✅ User Registration and Login (JWT protected)
- ✅ Product Browsing & Filtering
- ✅ Add to Cart & Checkout
- ✅ Order Confirmation & History
- ✅ Responsive Design
- ✅ Modern UI with Animations

---

## 🌐 Environment Variables (Backend)

Create a `.env` file in the `backend` folder with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
````

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/sakshishelarr/sc-custom-hub.git
cd sc-custom-hub
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
npm start
```

### 3. Serve Frontend (optional for local testing)

You can use VS Code Live Server or a simple HTTP server.

---

## 👩‍💻 Author

Made with ❤️ by [Sakshi Shelar](https://github.com/sakshishelarr)

---

## 📸 Screenshots

| Home Page                                                   | Checkout Page                                                  | Orders Page                                                |
| ----------------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------- |
| ![Home](https://via.placeholder.com/300x180?text=Home+Page) | ![Checkout](https://via.placeholder.com/300x180?text=Checkout) | ![Orders](https://via.placeholder.com/300x180?text=Orders) |

> Replace these with your own screenshots!

---

## ⭐️ If you liked this project, give it a star on GitHub!

```

---

Let me know if you want the **screenshots to display real images** (you can upload them to GitHub Issues or use an image hosting tool like imgbb or Cloudinary). Would you like help doing that?
```
