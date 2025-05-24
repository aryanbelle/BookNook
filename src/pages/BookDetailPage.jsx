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
  
  const handleReviewSubmit = async (bookId, reviewData) => {
    try {
      setError(null);
      const updatedBook = await addReview(bookId, reviewData);
      if (updatedBook) {
        setBook(updatedBook);
        // Refresh reviews
        const reviewsResponse = await reviewsAPI.getBookReviews(id);
        if (reviewsResponse.success) {
          setReviews(reviewsResponse.data.reviews);
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to submit review');
      console.error('Error submitting review:', err);
    }
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
                    {renderRating(book.rating)}
                  </div>
                  <span className="text-xl font-semibold text-gray-800">{book.rating}</span>
                  <span className="text-gray-500 ml-2">({book.reviews.length} reviews)</span>
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
              <ReviewForm bookId={book._id} onReviewSubmit={handleReviewSubmit} />
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