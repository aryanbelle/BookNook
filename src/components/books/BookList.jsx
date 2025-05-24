import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import { motion } from 'framer-motion';

const BookList = ({ books, loading }) => {
  const [displayedBooks, setDisplayedBooks] = useState([]);
  
  useEffect(() => {
    setDisplayedBooks(books);
  }, [books]);
  
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
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      {displayedBooks.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </motion.div>
  );
};

export default BookList;