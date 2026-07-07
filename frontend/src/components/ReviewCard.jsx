import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteReview, reset } from '../store/reviewSlice';
import toast from 'react-hot-toast';

const ReviewCard = ({ review, onDelete }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isOwner = user && review.author && review.author._id === user._id;

  // Convert rating to number (handle both string and number)
  const ratingNum = Math.min(Math.max(Math.round(Number(review.rating)), 1), 5);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      const result = await dispatch(deleteReview(review._id));
      if (deleteReview.fulfilled.match(result)) {
        toast.success('Review deleted successfully!');
        if (onDelete) onDelete(review._id);
      } else {
        toast.error('Failed to delete review');
      }
      dispatch(reset());
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-8 mb-6 border border-gray-100 transition-all duration-200 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {review.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{review.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {review.country && (
                <span className="flex items-center gap-1">
                  🌍 {review.country}
                </span>
              )}
              <span>•</span>
              <span>{new Date(review.createdAt || review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-6 h-6 ${star <= ratingNum ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-700">
            {review.rating} / 5
          </span>
        </div>
      </div>
      
      <h4 className="text-xl font-semibold text-gray-800 mb-3">{review.title}</h4>
      <p className="text-gray-600 mb-6 leading-relaxed">{review.review}</p>
      
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          {review.helpful && (
            <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
              👍 {review.helpful} helpful
            </span>
          )}
          {review.verifiedPurchase === 'True' && (
            <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
              ✅ Verified Purchase
            </span>
          )}
        </div>
        
        {isOwner && (
          <div className="flex gap-3">
            <Link
              to={`/reviews/${review._id}/edit`}
              className="flex items-center gap-1 bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-medium hover:bg-blue-200 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="flex items-center gap-1 bg-red-100 text-red-700 px-4 py-2 rounded-xl font-medium hover:bg-red-200 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
