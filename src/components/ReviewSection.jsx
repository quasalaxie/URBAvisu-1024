import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaThumbsUp, FaThumbsDown, FaFlag } from 'react-icons/fa';

const ReviewSection = ({ reviews = [] }) => {
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState('');

  const handleRatingClick = (rating) => {
    setUserRating(rating);
    setShowReviewForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Rating Input */}
      <div className="bg-gray-850 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Rate this title</h3>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <motion.button
              key={rating}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleRatingClick(rating)}
              onMouseEnter={() => setHoverRating(rating)}
              onMouseLeave={() => setHoverRating(0)}
              className="text-2xl"
            >
              <FaStar
                className={`${
                  rating <= (hoverRating || userRating)
                    ? 'text-yellow-400'
                    : 'text-gray-600'
                }`}
              />
            </motion.button>
          ))}
          <span className="ml-2 text-gray-400">
            {userRating ? `${userRating}/5` : 'Rate this'}
          </span>
        </div>

        {showReviewForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mt-4"
          >
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review..."
              className="w-full h-32 px-4 py-2 bg-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex justify-end mt-2">
              <button className="px-4 py-2 bg-primary rounded-lg hover:bg-primary/90">
                Submit Review
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-850 rounded-lg p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <img
                  src={review.avatar}
                  alt={review.username}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <h4 className="font-medium">{review.username}</h4>
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < review.rating ? 'text-yellow-400' : 'text-gray-600'}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-400">{review.date}</span>
            </div>
            <p className="mt-4 text-gray-300">{review.text}</p>
            <div className="flex items-center space-x-4 mt-4">
              <button className="flex items-center space-x-1 text-gray-400 hover:text-white">
                <FaThumbsUp />
                <span>{review.likes}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-400 hover:text-white">
                <FaThumbsDown />
                <span>{review.dislikes}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-400 hover:text-white ml-auto">
                <FaFlag />
                <span>Report</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;