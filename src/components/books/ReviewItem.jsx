import React from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ReviewItem = ({ review }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-flat p-4 mb-4"
    >
      <div className="flex items-start">
        <div className="bg-primary-100 rounded-full p-2 mr-3">
          <FaUser className="text-primary-700" />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-gray-900">{review.username}</h4>
            <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
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