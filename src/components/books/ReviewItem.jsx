import React from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ReviewItem = ({ review }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Unknown date';
      }
      
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Unknown date';
    }
  };

  // Generate star rating
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    
    return stars;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-flat p-4 mb-4"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          {review.userId.avatar ? (
            <img
              src={review.userId.avatar}
              alt={review.userId.username}
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <FaUser className="text-gray-400" />
            </div>
          )}
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-gray-900">{review.userId.username}</h4>
            <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
          </div>
          
          <div className="flex mb-3">
            {renderRating(review.rating)}
            <span className="ml-2 text-sm text-gray-600">({review.rating})</span>
          </div>
          
          <p className="text-gray-700">{review.comment}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewItem;