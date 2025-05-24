import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const ReviewForm = ({ bookId, onReviewSubmit }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    if (comment.trim() === '') {
      setError('Please write a review');
      return;
    }
    
    // Format the review data according to the API expectations
    const review = {
      rating,
      comment
      // The backend will automatically use the authenticated user's ID
    };
    
    onReviewSubmit(bookId, review);
    setRating(0);
    setComment('');
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-flat p-6 mb-6"
    >
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Your Rating
          </label>
          <div className="flex">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={`text-2xl ${
                    starValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
                  } focus:outline-none`}
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(0)}
                >
                  <FaStar />
                </button>
              );
            })}
            <span className="ml-2 text-gray-700">{rating > 0 ? `(${rating})` : ''}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="comment" className="block text-gray-700 text-sm font-medium mb-2">
            Your Review
          </label>
          <textarea
            id="comment"
            rows="4"
            className="input w-full"
            placeholder="Share your thoughts about this book..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        
        {error && (
          <div className="mb-4 p-2 bg-red-50 text-red-500 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <button 
          type="submit" 
          className="btn btn-primary"
        >
          Submit Review
        </button>
      </form>
    </motion.div>
  );
};

export default ReviewForm;