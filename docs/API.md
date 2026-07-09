# Meta Glasses Reviews API Documentation

Base URL: `https://meta-glasses-reviews-het-sakariya-2.onrender.com/api/v1`

---

## 1. Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/health` | Check API status |

---

## 2. Authentication (`/auth`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST   | `/register` | Register new user | ❌ |
| POST   | `/login` | Login user | ❌ |
| GET    | `/me` | Get current user | ✅ |
| GET    | `/profile` | Get user profile | ✅ |
| PUT    | `/profile` | Update user profile | ✅ |
| GET    | `/users` | Get all users | ✅ |
| GET    | `/users/:name/reviews` | Get reviews by username | ✅ |
| GET    | `/logout` | Logout user | ❌ |

---

## 3. Reviews (`/reviews`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET    | `/` | Get all reviews (supports: `page`, `limit`, `sort`, `search`, etc.) | ❌ |
| GET    | `/analytics` | Get review analytics | ✅ |
| GET    | `/:id` | Get single review | ❌ |
| POST   | `/` | Create review | ✅ |
| PUT    | `/:id` | Update review | ✅ (only author or admin) |
| DELETE | `/:id` | Delete review | ✅ (only author or admin) |

---

## 4. Stats (`/stats`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/average-rating` | Overall average rating |
| GET    | `/positive-reviews` | Count & percentage of positive reviews |
| GET    | `/top-reviewers` | Top 5 reviewers |
| GET    | `/most-helpful` | Top 5 most helpful reviews |
| GET    | `/verified-purchases` | Count & percentage of verified purchases |
| GET    | `/monthly-average` | Monthly average rating trend |

---

## 5. Search (`/search`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/` | Search reviews (use `keyword` or `q` query param) |
| GET    | `/reviews` | Same as above |

---

## Authorization
For protected routes, send header: `Authorization: Bearer <your-token>`
