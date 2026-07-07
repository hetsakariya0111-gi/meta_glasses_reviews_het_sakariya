# Meta Glasses Reviews API & Analytics Dashboard

A full-stack review analytics and management system built with Node.js, Express.js, MongoDB, React, Redux Toolkit, Tailwind CSS, and Recharts.

---

## 🌐 Live Demo

*(Add your live demo link here when deployed)*

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Security Features](#-security-features)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 📋 Overview

This project is based on a real-world Meta Glasses Reviews dataset and is designed to handle large-scale review data with:

- Secure authentication & protected routes
- Advanced filtering, search, sorting, & pagination
- MongoDB aggregation pipelines for analytics
- Professional UI with responsive design
- Redux Toolkit for state management

## ✨ Features

### Backend
- ✅ Complete RESTful API with MVC architecture
- ✅ JWT-based authentication & HTTP-only cookies
- ✅ User registration, login, logout, get me
- ✅ Review CRUD operations
- ✅ Analytics & ratings breakdown
- ✅ Advanced filtering, search, sorting, pagination
- ✅ Role-based access control (Owner & Admin)
- ✅ Centralized error handling
- ✅ Helmet security headers, CORS, rate limiting
- ✅ Response compression, request validation

### Frontend
- ✅ Responsive UI with Tailwind CSS
- ✅ Redux Toolkit for state management
- ✅ Protected routes with automatic redirect
- ✅ Home, Login, Register pages
- ✅ Reviews listing with search
- ✅ Create, Edit, Delete reviews (only by owner)
- ✅ My Reviews page
- ✅ Analytics dashboard with Recharts
- ✅ Formik & Yup for forms & validation
- ✅ Axios interceptor for API calls

---

## 🛠️ Tech Stack

### Backend
| Tech | Version |
|------|---------|
| Node.js | v20+ |
| Express.js | ^4.21 |
| MongoDB | v6+ |
| Mongoose | ^8.8 |
| JWT | ^9.0 |
| bcryptjs | ^2.4 |
| dotenv | ^16.4 |
| cors | ^2.8 |
| morgan | ^1.10 |
| helmet | ^8.0 |
| compression | ^1.7 |
| express-rate-limit | ^7.4 |
| cookie-parser | ^1.4 |

### Frontend
| Tech | Version |
|------|---------|
| React.js | ^18.3 |
| Vite | ^5.4 |
| Redux Toolkit | ^2.3 |
| Tailwind CSS | ^3.4 |
| React Router DOM | ^6.27 |
| Axios | ^1.7 |
| Formik | ^2.4 |
| Yup | ^1.4 |
| Recharts | ^2.12 |

---

## 📁 Project Structure

```
meta-glasses-api/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                  # MongoDB connection
│   │   ├── models/
│   │   │   ├── User.js                # User schema/model
│   │   │   └── Review.js              # Review schema/model
│   │   ├── controllers/
│   │   │   ├── authController.js      # Auth logic (register, login, logout, getMe)
│   │   │   └── reviewController.js    # Review logic & analytics
│   │   ├── routes/
│   │   │   ├── authRoutes.js          # Auth endpoints
│   │   │   └── reviewRoutes.js        # Review endpoints
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js      # Protect routes with JWT
│   │   │   └── errorMiddleware.js     # Not found & error handler
│   │   ├── utils/
│   │   │   └── sendToken.js           # Helper to send JWT cookie
│   │   ├── app.js                     # Express app configuration
│   │   └── server.js                  # Server entry point
│   ├── .env                           # Environment variables
│   ├── .env.example                   # Env template
│   ├── .gitignore
│   ├── package-lock.json
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── assets/
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   ├── components/
│   │   │   ├── Header.jsx             # Navigation header
│   │   │   ├── ProtectedRoute.jsx     # Protected route wrapper
│   │   │   └── ReviewCard.jsx         # Reusable review card
│   │   ├── pages/
│   │   │   ├── Home.jsx               # Home page
│   │   │   ├── Login.jsx              # Login page
│   │   │   ├── Register.jsx           # Register page
│   │   │   ├── Dashboard.jsx          # User dashboard
│   │   │   ├── Reviews.jsx            # All reviews list
│   │   │   ├── CreateReview.jsx       # Create new review
│   │   │   ├── MyReviews.jsx          # User's own reviews
│   │   │   ├── EditReview.jsx         # Edit review
│   │   │   └── Analytics.jsx          # Analytics dashboard
│   │   ├── services/
│   │   │   ├── api.js                 # Axios instance with interceptor
│   │   │   ├── authService.js         # Auth API calls
│   │   │   └── reviewService.js       # Review API calls
│   │   ├── store/
│   │   │   ├── store.js               # Redux store config
│   │   │   ├── authSlice.js           # Auth state slice
│   │   │   └── reviewSlice.js         # Review state slice
│   │   ├── App.jsx                    # Main app & routing
│   │   ├── main.jsx                   # React entry point
│   │   └── index.css                  # Global styles (Tailwind)
│   ├── .env
│   ├── .gitignore
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md                          # This file!
```

---

## 📊 Database Schema

### User Collection ([User.js](file:///c:/Users/Admin/OneDrive/Desktop/meta-glasses-api/backend/src/models/User.js))
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, min 6, bcrypt hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date (default: Date.now)
}
```

### Review Collection ([Review.js](file:///c:/Users/Admin/OneDrive/Desktop/meta-glasses-api/backend/src/models/Review.js))
```javascript
{
  _id: ObjectId,
  reviewID: String (unique),
  name: String (required),
  date: String,
  verifiedPurchase: String (default: 'False'),
  rating: String (required),
  helpful: String,
  title: String (required),
  review: String (required),
  profile: String,
  country: String,
  reviewLink: String,
  reviewImage: String,
  helpful_aug: String,
  is_positive_review: String,
  helpfulness_score: String,
  author: ObjectId (ref: 'User'),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

**Indexes:**
- `{ rating: 1, createdAt: -1 }` - For sorting reviews
- Text index on `title, review, name, country` for full-text search

---

## 🔗 API Endpoints

### Authentication Endpoints
Base URL: `/api/v1/auth`

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | Register new user | Public |
| POST | `/login` | Login user & get token | Public |
| GET | `/me` | Get current user | Private |
| POST | `/logout` | Logout user | Private |

### Review Endpoints
Base URL: `/api/v1/reviews`

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all reviews with filters/search/sort/pagination | Public |
| GET | `/analytics` | Get review analytics | Private |
| GET | `/:id` | Get single review | Public |
| POST | `/` | Create new review | Private |
| PUT | `/:id` | Update review | Private (Owner only) |
| DELETE | `/:id` | Delete review | Private (Owner only) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   # Copy the example env file
   cp .env.example .env
   ```

4. Update `.env` file with your details:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/meta-glasses
   JWT_SECRET=your_jwt_secret_key_here (use a strong secret!)
   JWT_EXPIRES_IN=7d
   ```

5. Start backend dev server:
   ```bash
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file in frontend root:
   ```env
   VITE_API_URL=http://localhost:5000/api/v1
   ```

4. Start frontend dev server:
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

---

## 🔐 Environment Variables

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| NODE_ENV | Environment mode | `development` |
| PORT | Server port | `5000` |
| MONGO_URI | MongoDB connection string | `mongodb://localhost:27017/meta-glasses` |
| JWT_SECRET | Secret key for JWT tokens | `supersecretkey123` |
| JWT_EXPIRES_IN | JWT expiration time | `7d` |

### Frontend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API base URL | `http://localhost:5000/api/v1` |

---

## 🔒 Security Features

- Password hashing with **bcryptjs**
- JWT token authentication with **HTTP-only cookies**
- Helmet.js for security headers
- CORS configuration
- Express rate limiting
- Input validation & sanitization
- Protected routes with role-based access (Owner can edit/delete own reviews only)

---

## 📸 Screenshots

*(Add your screenshots here)*

---

## 🤝 Contributing

Contributions are welcome! Please fork the repo and open a PR!

---

## 📝 License

This project is for **educational & portfolio purposes**.

---

## 👨‍💻 Author

**Het Sakariya**

---

Made with ❤️ using Node.js & React!
