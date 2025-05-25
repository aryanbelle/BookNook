import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const ReviewForm = ({ bookId, onReviewSubmit, externalError }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Reset form when external error changes
  useEffect(() => {
    if (externalError && externalError.includes('already reviewed')) {
      // If the error is about already having reviewed, reset the form
      setRating(0);
      setComment('');
    }
  }, [externalError]);

  const handleSubmit = async (e) => {
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
    
    setIsSubmitting(true);
    
    try {
      // Format the review data according to the API expectations
      const review = {
        rating,
        comment
        // The backend will automatically use the authenticated user's ID
      };
      
      await onReviewSubmit(bookId, review);
      
      // Only reset if there was no error
      if (!externalError) {
        setRating(0);
        setComment('');
      }
    } catch (err) {
      console.error('Error in review submission:', err);
    } finally {
      setIsSubmitting(false);
    }
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
        
        {externalError && (
          <div className="mb-4 p-2 bg-red-50 text-red-500 rounded-md text-sm">
            {externalError}
          </div>
        )}
        
        <button 
          type="submit" 
          className="btn btn-primary flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            'Submit Review'
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default ReviewForm;