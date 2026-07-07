import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, reset } from '../store/reviewSlice';
import ReviewCard from '../components/ReviewCard';
import Loader from '../components/Loader';

const Reviews = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const { reviews, isLoading, isError, message } = useSelector(
    (state) => state.reviews
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(fetchReviews());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  const filteredReviews = reviews.filter((review) =>
    (review.title && review.title.toLowerCase().includes(search.toLowerCase())) ||
    (review.review && review.review.toLowerCase().includes(search.toLowerCase())) ||
    (review.name && review.name.toLowerCase().includes(search.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="text-center">
          <Loader size="lg" />
          <p className="text-xl text-gray-500 mt-4">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3">
            Customer Reviews
          </h1>
          <p className="text-xl text-gray-600">
            What our community is saying about Meta Glasses
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search reviews, titles, or names..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-md">
              <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                No reviews found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or be the first to review!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
