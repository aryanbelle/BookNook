import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BookCard from './BookCard';
import { useBooks } from '../../context/BookContext';
import LoadingSpinner from '../ui/LoadingSpinner';
import HorizontalPagination from '../ui/HorizontalPagination';

const FeaturedBooks = () => {
  const { featuredBooks, loading } = useBooks();
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const booksPerPage = 4; // Number of books to display per page
  
  useEffect(() => {
    if (featuredBooks.length > 0) {
      updateDisplayedBooks(1);
    }
  }, [featuredBooks]);
  
  // Function to update displayed books based on current page
  const updateDisplayedBooks = (page) => {
    const startIndex = (page - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    setDisplayedBooks(featuredBooks.slice(startIndex, endIndex));
  };
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    updateDisplayedBooks(pageNumber);
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  if (loading && featuredBooks.length === 0) {
    return (
      <section className="py-12">
        <div className="container-narrow">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Books</h2>
            <Link 
              to="/books" 
              className="text-primary-700 hover:text-primary-800 font-medium transition-colors"
            >
              View all books
            </Link>
          </div>
          <div className="flex justify-center py-12">
            <LoadingSpinner size="large" />
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-12">
      <div className="container-narrow">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Books</h2>
          <Link 
            to="/books" 
            className="text-primary-700 hover:text-primary-800 font-medium transition-colors"
          >
            View all books
          </Link>
        </div>
        
        <motion.div 
          key={currentPage} // Re-render animation when page changes
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {displayedBooks.map(book => (
            <BookCard key={book._id} book={book} />
          ))}
        </motion.div>
        
        {/* Horizontal pagination */}
        {featuredBooks.length > booksPerPage && (
          <div className="mt-8 flex flex-col items-center">
            <HorizontalPagination 
              currentPage={currentPage}
              totalPages={Math.ceil(featuredBooks.length / booksPerPage)}
              onPageChange={handlePageChange}
              loading={loading}
            />
            <div className="text-sm text-gray-500 mt-2">
              Showing {displayedBooks.length} of {featuredBooks.length} featured books
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedBooks;