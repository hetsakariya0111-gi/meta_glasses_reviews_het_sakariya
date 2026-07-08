const express = require('express');
const {
  getAverageRating,
  getPositiveReviews,
  getTopReviewers,
  getMostHelpful,
  getVerifiedPurchases,
  getMonthlyAverage
} = require('../controllers/statsController');

const router = express.Router();

router.get('/average-rating', getAverageRating);
router.get('/positive-reviews', getPositiveReviews);
router.get('/top-reviewers', getTopReviewers);
router.get('/most-helpful', getMostHelpful);
router.get('/verified-purchases', getVerifiedPurchases);
router.get('/monthly-average', getMonthlyAverage);

module.exports = router;
