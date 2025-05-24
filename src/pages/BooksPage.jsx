import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BookFilter from '../components/books/BookFilter';
import BookList from '../components/books/BookList';
import { useBooks } from '../context/BookContext';

const BooksPage = () => {
  const location = useLocation();
  const { books, loading: contextLoading, error, filterBooks } = useBooks();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get('search');
  const genreParam = queryParams.get('genre');
  
  useEffect(() => {
    // Apply filters from URL if present
    if (searchParam || genreParam) {
      handleFilter({
        searchTerm: searchParam || '',
        filters: {
          genre: genreParam || '',
          minRating: 0
        }
      });
    } else {
      setFilteredBooks(books);
    }
  }, [searchParam, genreParam, books]);
  
  const handleFilter = async ({ searchTerm, filters }) => {
    setLoading(true);
    try {
      await filterBooks(searchTerm, filters);
      setFilteredBooks(books);
    } catch (err) {
      console.error('Error filtering books:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="pt-28 pb-16">
      <div className="container-narrow">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Books
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover new reads, search for your favorites, and filter by genre or rating.
          </p>
        </div>
        
        <BookFilter onFilter={handleFilter} />
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <BookList books={filteredBooks} loading={loading || contextLoading} />
      </div>
    </div>
  );
};

export default BooksPage;