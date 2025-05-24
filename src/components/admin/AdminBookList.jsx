import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { booksAPI } from '../../services/api';
import LoadingSpinner from '../ui/LoadingSpinner';

const AdminBookList = ({ onEditBook }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(null);
  
  useEffect(() => {
    fetchBooks();
  }, [currentPage]);
  
  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page: currentPage,
        limit: 10,
        search: searchTerm
      };
      
      const response = await booksAPI.getAllBooks(params);
      
      if (response.success) {
        setBooks(response.data.books);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (err) {
      setError('Failed to load books. Please try again.');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBooks();
  };
  
  const handleDeleteClick = (bookId) => {
    setConfirmDelete(bookId);
  };
  
  const handleDeleteConfirm = async () => {
    if (!confirmDelete) return;
    
    try {
      setLoading(true);
      const response = await booksAPI.deleteBook(confirmDelete);
      
      if (response.success) {
        // Remove the deleted book from the list
        setBooks(books.filter(book => book._id !== confirmDelete));
        setConfirmDelete(null);
      }
    } catch (err) {
      setError('Failed to delete book. Please try again.');
      console.error('Error deleting book:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteCancel = () => {
    setConfirmDelete(null);
  };
  
  if (loading && books.length === 0) {
    return <LoadingSpinner size="large" />;
  }
  
  return (
    <div>
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex">
          <div className="relative flex-grow mr-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10 w-full"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {confirmDelete && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
          <p className="text-red-700 mb-3">Are you sure you want to delete this book? This action cannot be undone.</p>
          <div className="flex justify-end space-x-2">
            <button 
              onClick={handleDeleteCancel}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button 
              onClick={handleDeleteConfirm}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Cover</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Author</th>
              <th className="py-3 px-4 text-left">Genre</th>
              <th className="py-3 px-4 text-left">Rating</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {books.length > 0 ? (
              books.map(book => (
                <tr key={book._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <img 
                      src={book.coverImage} 
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium">{book.title}</td>
                  <td className="py-3 px-4">{book.author}</td>
                  <td className="py-3 px-4">
                    <span className="badge">{book.genre}</span>
                  </td>
                  <td className="py-3 px-4">{book.rating.toFixed(1)}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onEditBook(book)}
                        className="text-primary-600 hover:text-primary-800"
                        title="Edit book"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(book._id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete book"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">
                  No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>
            
            <div className="flex space-x-1">
              {[...Array(totalPages).keys()].map(page => (
                <button
                  key={page + 1}
                  onClick={() => setCurrentPage(page + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page + 1
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {page + 1}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default AdminBookList;
