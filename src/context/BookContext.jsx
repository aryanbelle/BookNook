import React, { createContext, useContext, useState, useEffect } from 'react';
import { booksAPI, reviewsAPI } from '../services/api';

const BookContext = createContext();

export const useBooks = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch all books on component mount
  useEffect(() => {
    fetchBooks();
    fetchFeaturedBooks();
  }, []);
  
  // Fetch all books from API
  const fetchBooks = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await booksAPI.getAllBooks(params);
      if (response.success) {
        setBooks(response.data.books);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch books');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch featured books from API
  const fetchFeaturedBooks = async () => {
    try {
      const response = await booksAPI.getFeaturedBooks();
      if (response.success) {
        setFeaturedBooks(response.data.books);
      }
    } catch (err) {
      console.error('Error fetching featured books:', err);
    }
  };
  
  // Filter books based on search term and filters
  const filterBooks = async (searchTerm, filters) => {
    try {
      setLoading(true);
      const params = {
        search: searchTerm || '',
        genre: filters.genre || ''
      };
      
      // Get minimum rating filter
      const minRating = parseFloat(filters.minRating) || 0;
      
      // If we have a minimum rating filter, add it to the params
      if (minRating > 0) {
        params.minRating = minRating;
      }
      
      const response = await booksAPI.getAllBooks(params);
      
      if (response.success) {
        // If the backend doesn't support minRating filtering, we can do it client-side
        let filteredBooks = response.data.books;
        
        // Apply client-side filtering for minimum rating if needed
        if (minRating > 0) {
          filteredBooks = filteredBooks.filter(book => book.rating >= minRating);
        }
        
        setBooks(filteredBooks);
      }
    } catch (err) {
      setError(err.message || 'Failed to filter books');
      console.error('Error filtering books:', err);
    } finally {
      setLoading(false);
    }
    
    return books;
  };

  // Add a review to a book
  const addReview = async (bookId, reviewData) => {
    try {
      setError(null);
      const response = await reviewsAPI.addReview(bookId, reviewData);
      if (response.success) {
        // Refresh the book data to include the new review
        const updatedBook = await booksAPI.getBook(bookId);
        if (updatedBook.success) {
          setBooks(prevBooks => 
            prevBooks.map(book => 
              book._id === bookId ? updatedBook.data : book
            )
          );
          return updatedBook.data;
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to add review');
      console.error('Error adding review:', err);
      throw err;
    }
  };

  // Get a single book by ID
  const getBook = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await booksAPI.getBook(id);
      if (response.success) {
        return response.data;
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch book');
      console.error('Error fetching book:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    books,
    featuredBooks,
    loading,
    error,
    fetchBooks,
    filterBooks,
    addReview,
    getBook
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};