import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaStarHalfAlt, FaArrowLeft, FaBook } from 'react-icons/fa';
import { motion } from 'framer-motion';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ReviewItem from '../components/books/ReviewItem';
import ReviewForm from '../components/books/ReviewForm';
import { useBooks } from '../context/BookContext';
import { useAuth } from '../context/AuthContext';
import { reviewsAPI } from '../services/api';

const BookDetailPage = () => {
  const { id } = useParams();
  const { getBook, addReview } = useBooks();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    fetchBookDetails();
  }, [id]);
  
  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch book details
      const bookData = await getBook(id);
      if (bookData) {
        setBook(bookData);
        
        // Fetch reviews for the book
        try {
          const reviewsResponse = await reviewsAPI.getBookReviews(id);
          if (reviewsResponse.success) {
            setReviews(reviewsResponse.data.reviews);
          }
        } catch (reviewErr) {
          console.error('Error fetching reviews:', reviewErr);
        }
      } else {
        setError('Book not found');
      }
    } catch (err) {
      setError(err.message || 'Failed to load book details');
      console.error('Error fetching book details:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const [reviewSubmitError, setReviewSubmitError] = useState(null);

  const handleReviewSubmit = async (bookId, reviewData) => {
    try {
      setError(null);
      setReviewSubmitError(null);
      
      const response = await reviewsAPI.addReview(bookId, reviewData);
      
      if (response.success) {
        // Refresh book data
        const bookData = await getBook(id);
        if (bookData) {
          setBook(bookData);
        }
        
        // Refresh reviews
        const reviewsResponse = await reviewsAPI.getBookReviews(id);
        if (reviewsResponse.success) {
          setReviews(reviewsResponse.data.reviews);
        }
      }
    } catch (err) {
      // Set specific error for review submission
      setReviewSubmitError(err.message || 'Failed to submit review');
      console.error('Error submitting review:', err);
    }
  };
  
  // Calculate average rating from reviews
  const calculateAverageRating = () => {
    if (!reviews || reviews.length === 0) return 0;
    
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return parseFloat((sum / reviews.length).toFixed(1));
  };
  
  // Generate star rating
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400 text-2xl" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 text-2xl" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400 text-2xl" />);
      }
    }
    
    return stars;
  };
  
  // Check if user has already submitted a review
  const hasUserReviewed = () => {
    if (!user || !reviews) return false;
    return reviews.some(review => review.userId === user.id);
  };
  
  if (loading) {
    return (
      <div className="pt-28 pb-16 flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner size="large" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="pt-28 pb-16 container-narrow">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/books" className="btn btn-primary">
            Browse Books
          </Link>
        </div>
      </div>
    );
  }
  
  if (!book) {
    return (
      <div className="pt-28 pb-16 container-narrow">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Book Not Found</h2>
          <p className="text-gray-600 mb-6">The book you are looking for does not exist or has been removed.</p>
          <Link to="/books" className="btn btn-primary">
            Browse Books
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-28 pb-16">
      <div className="container-narrow">
        <Link 
          to="/books" 
          className="inline-flex items-center text-primary-700 hover:text-primary-800 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Books
        </Link>
        
        <div className="bg-white rounded-lg shadow-flat overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 p-6 flex justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <img 
                  src={book.coverImage} 
                  alt={book.title}
                  className="w-64 h-auto object-cover rounded-md shadow-md"
                />
                {book.featured && (
                  <div className="absolute top-2 right-2 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded">
                    Featured
                  </div>
                )}
              </motion.div>
            </div>
            
            <div className="md:w-2/3 p-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
                
                <div className="flex items-center mb-4">
                  <div className="flex mr-3">
                    {renderRating(calculateAverageRating())}
                  </div>
                  <span className="text-xl font-semibold text-gray-800">{calculateAverageRating()}</span>
                  <span className="text-gray-500 ml-2">({reviews.length} reviews)</span>
                </div>
                
                <div className="mb-4">
                  <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {book.genre}
                  </span>
                  <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    Published: {book.publishedDate}
                  </span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <h3 className="text-xl font-semibold mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{book.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {user ? (
                    <a href="#write-review" className="btn btn-primary">
                      Write a Review
                    </a>
                  ) : (
                    <Link to="/login" className="btn btn-primary">
                      Login to Review
                    </Link>
                  )}
                  
                  <button className="btn btn-secondary flex items-center">
                    <FaBook className="mr-2" />
                    Add to Reading List
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews ({reviews.length})</h2>
          
          {user && (
            <div id="write-review">
              {hasUserReviewed() ? (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        You have already submitted a review for this book. Multiple reviews are not allowed.
                      </p>
                    </div>
                  </div>
                </div>
              ) : user.username === book.author ? (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        As the author of this book, you cannot submit a review for your own work.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <ReviewForm 
                  bookId={book._id} 
                  onReviewSubmit={handleReviewSubmit} 
                  externalError={reviewSubmitError}
                />
              )}
            </div>
          )}
          
          {reviews.length > 0 ? (
            <div>
              {reviews.map(review => (
                <ReviewItem key={review._id} review={review} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-flat p-6 text-center">
              <p className="text-gray-600 mb-4">No reviews yet. Be the first to review this book!</p>
              {!user && (
                <Link to="/login" className="btn btn-primary">
                  Login to Review
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;