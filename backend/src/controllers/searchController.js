const Review = require('../models/Review');

const searchReviews = async (req, res, next) => {
  try {
    const keyword = req.query.keyword || req.query.q || '';
    if (!keyword.trim()) {
      return res.status(200).json({ success: true, count: 0, data: [] });
    }

    const regex = new RegExp(keyword, 'i');
    const reviews = await Review.find({
      $or: [
        { title: regex },
        { review: regex },
        { name: regex },
        { country: regex }
      ]
    }).limit(20);

    res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    next(error);
  }
};

module.exports = { searchReviews };
