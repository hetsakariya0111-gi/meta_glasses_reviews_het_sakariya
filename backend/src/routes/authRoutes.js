const express = require('express');
const {
  register,
  login,
  getMe,
  getProfile,
  updateProfile,
  getUsers,
  getUserReviews,
  logout,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/users', protect, getUsers);
router.get('/users/:name/reviews', protect, getUserReviews);
router.get('/logout', logout);

module.exports = router;
