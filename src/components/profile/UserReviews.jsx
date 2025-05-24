import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaStarHalfAlt, FaEdit, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { reviewsAPI, booksAPI } from '../../services/api';
import LoadingSpinner from '../ui/LoadingSpinner';

const UserReviews = () => {
  const { user } = useAuth();
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Only fetch reviews if user is logged in
    if (user) {
      fetchUserReviews();
    } else {
      setLoading(false);
    }
  }, [user]);
  
  const fetchUserReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch user reviews - this would normally be a dedicated endpoint
      // For now, we'll use the existing endpoints to get all reviews
      const reviewsResponse = await reviewsAPI.getUserReviews();
      
      if (reviewsResponse.success) {
        const reviews = reviewsResponse.data.reviews || [];
        
        // For each review, fetch the book details
        const reviewsWithBookDetails = await Promise.all(
          reviews.map(async (review) => {
            try {
              const bookResponse = await booksAPI.getBook(review.bookId);
              if (bookResponse.success) {
                return {
                  ...review,
                  bookTitle: bookResponse.data.title,
                  bookCover: bookResponse.data.coverImage
                };
              }
              return review;
            } catch (err) {
              console.error('Error fetching book details:', err);
              return review;
            }
          })
        );
        
        setUserReviews(reviewsWithBookDetails);
      }
    } catch (err) {
      setError('Failed to load your reviews');
      console.error('Error fetching user reviews:', err);
    } finally {
      setLoading(false);
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
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-lg shadow-flat p-6 mt-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Reviews</h2>
        <div className="flex justify-center py-8">
          <LoadingSpinner size="large" />
        </div>
      </motion.div>
    );
  }
  
  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-lg shadow-flat p-6 mt-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Reviews</h2>
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={fetchUserReviews} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }
  
  if (userReviews.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-lg shadow-flat p-6 mt-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Reviews</h2>
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">You haven't written any reviews yet.</p>
          <Link to="/books" className="btn btn-primary">
            Browse Books
          </Link>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-flat p-6 mt-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Reviews</h2>
      
      <div className="space-y-6">
        {userReviews.map(review => (
          <div 
            key={review.id}
            className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
          >
            <div className="flex items-start">
              <Link to={`/books/${review.bookId}`}>
                <img 
                  src={review.bookCover} 
                  alt={review.bookTitle}
                  className="w-16 h-24 object-cover rounded-md mr-4"
                />
              </Link>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <Link 
                      to={`/books/${review.bookId}`}
                      className="text-lg font-semibold text-gray-900 hover:text-primary-700 transition-colors"
                    >
                      {review.bookTitle}
                    </Link>
                    
                    <div className="flex items-center mt-1 mb-2">
                      <div className="flex mr-2">
                        {renderRating(review.rating)}
                      </div>
                      <span className="text-sm text-gray-600">
                        {formatDate(review.date)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="text-gray-500 hover:text-primary-700 transition-colors">
                      <FaEdit />
                    </button>
                    <button className="text-gray-500 hover:text-red-500 transition-colors">
                      <FaTrash />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-700">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default UserReviews;