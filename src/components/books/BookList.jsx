import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import Pagination from '../ui/Pagination';
import { motion } from 'framer-motion';

const BookList = ({ books, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const booksPerPage = 8; // Number of books to display per page
  
  useEffect(() => {
    // Reset to first page when books array changes
    setCurrentPage(1);
    paginateBooks(books, 1);
  }, [books]);
  
  // Function to paginate books
  const paginateBooks = (allBooks, page) => {
    const startIndex = (page - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    setDisplayedBooks(allBooks.slice(startIndex, endIndex));
  };
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    paginateBooks(books, pageNumber);
    
    // Scroll to top of book list
    window.scrollTo({
      top: document.getElementById('book-list-top').offsetTop - 100,
      behavior: 'smooth'
    });
  };
  
  if (loading) {
    return (
      <div className="py-12 flex justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }
  
  if (displayedBooks.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-xl text-gray-700 mb-4">No books found</h3>
        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
      </div>
    );
  }
  
  // Calculate total pages
  const totalPages = Math.ceil(books.length / booksPerPage);
  
  return (
    <div id="book-list-top">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {displayedBooks.map(book => (
          <BookCard key={book._id} book={book} />
        ))}
      </motion.div>
      
      {/* Pagination component */}
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        loading={loading}
      />
      
      {/* Book count and pagination info */}
      <div className="text-center text-sm text-gray-500 mt-4">
        Showing {displayedBooks.length} of {books.length} books
      </div>
    </div>
  );
};

export default BookList;