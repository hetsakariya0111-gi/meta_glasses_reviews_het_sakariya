const Review = require('../models/Review');

const getAverageRating = async (req, res, next) => {
  try {
    const totalReviews = await Review.countDocuments();
    const result = await Review.aggregate([
      {
        $group: {
          _id: null,
          averageRating: { $avg: { $toDouble: '$rating' } }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      totalReviews,
      averageRating: result[0]?.averageRating || 0
    });
  } catch (error) {
    next(error);
  }
};

const getPositiveReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({});
    const positive = reviews.filter((review) => {
      const value = String(review.is_positive_review || review.rating || '').toLowerCase();
      return value === 'true' || Number(review.rating) >= 4;
    }).length;

    const percentage = reviews.length ? Math.round((positive / reviews.length) * 100) : 0;

    res.status(200).json({
      success: true,
      count: positive,
      percentage
    });
  } catch (error) {
    next(error);
  }
};

const getTopReviewers = async (req, res, next) => {
  try {
    const reviewers = await Review.aggregate([
      { $group: { _id: '$name', totalReviews: { $sum: 1 }, avgRating: { $avg: { $toDouble: '$rating' } } } },
      { $sort: { totalReviews: -1, avgRating: -1 } },
      { $limit: 5 }
    ]);

    res.status(200).json({
      success: true,
      count: reviewers.length,
      data: reviewers
    });
  } catch (error) {
    next(error);
  }
};

const getMostHelpful = async (req, res, next) => {
  try {
    const reviews = await Review.find({}).sort({ helpful: -1 }).limit(5);
    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};

const getVerifiedPurchases = async (req, res, next) => {
  try {
    const reviews = await Review.find({});
    const verified = reviews.filter((review) => String(review.verifiedPurchase).toLowerCase() === 'true').length;
    const percentage = reviews.length ? Math.round((verified / reviews.length) * 100) : 0;

    res.status(200).json({
      success: true,
      count: verified,
      percentage
    });
  } catch (error) {
    next(error);
  }
};

const getMonthlyAverage = async (req, res, next) => {
  try {
    const data = await Review.aggregate([
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' }
          },
          averageRating: { $avg: { $toDouble: '$rating' } }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      { $limit: 6 }
    ]);

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAverageRating,
  getPositiveReviews,
  getTopReviewers,
  getMostHelpful,
  getVerifiedPurchases,
  getMonthlyAverage
};
