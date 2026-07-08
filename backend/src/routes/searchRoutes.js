const express = require('express');
const { searchReviews } = require('../controllers/searchController');

const router = express.Router();

router.get('/', searchReviews);
router.get('/reviews', searchReviews);

module.exports = router;
