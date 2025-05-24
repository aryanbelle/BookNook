import React, { useState, useEffect } from 'react';
import { FaSave, FaUpload } from 'react-icons/fa';
import { booksAPI } from '../../services/api';
import { genres } from '../../data/books'; // Reusing the genres from the mock data

const AdminBookForm = ({ book, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    coverImage: '',
    genre: '',
    publishedDate: '',
    featured: false
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // If editing a book, populate the form with book data
  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        description: book.description || '',
        coverImage: book.coverImage || '',
        genre: book.genre || '',
        publishedDate: book.publishedDate ? book.publishedDate.split('T')[0] : '',
        featured: book.featured || false
      });
    }
  }, [book]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Validate form
    if (!formData.title || !formData.author || !formData.description || !formData.coverImage || !formData.genre) {
      setError('Please fill in all required fields');
      return;
    }
    
    try {
      setLoading(true);
      
      let response;
      
      if (book) {
        // Update existing book
        response = await booksAPI.updateBook(book._id, formData);
      } else {
        // Create new book
        response = await booksAPI.createBook(formData);
      }
      
      if (response.success) {
        // Reset form and notify parent component
        if (!book) {
          setFormData({
            title: '',
            author: '',
            description: '',
            coverImage: '',
            genre: '',
            publishedDate: '',
            featured: false
          });
        }
        
        onSuccess();
      } else {
        setError(response.message || 'Failed to save book');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while saving the book');
      console.error('Error saving book:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700 text-sm font-medium mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="input w-full"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="author" className="block text-gray-700 text-sm font-medium mb-2">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              id="author"
              name="author"
              type="text"
              className="input w-full"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="genre" className="block text-gray-700 text-sm font-medium mb-2">
              Genre <span className="text-red-500">*</span>
            </label>
            <select
              id="genre"
              name="genre"
              className="input w-full"
              value={formData.genre}
              onChange={handleChange}
              required
            >
              <option value="">Select a genre</option>
              {genres.filter(genre => genre !== 'All').map(genre => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="publishedDate" className="block text-gray-700 text-sm font-medium mb-2">
              Published Date
            </label>
            <input
              id="publishedDate"
              name="publishedDate"
              type="date"
              className="input w-full"
              value={formData.publishedDate}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex items-center">
            <input
              id="featured"
              name="featured"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              checked={formData.featured}
              onChange={handleChange}
            />
            <label htmlFor="featured" className="ml-2 block text-gray-700 text-sm font-medium">
              Featured Book
            </label>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="coverImage" className="block text-gray-700 text-sm font-medium mb-2">
              Cover Image URL <span className="text-red-500">*</span>
            </label>
            <input
              id="coverImage"
              name="coverImage"
              type="text"
              className="input w-full"
              value={formData.coverImage}
              onChange={handleChange}
              required
            />
            {formData.coverImage && (
              <div className="mt-2">
                <img 
                  src={formData.coverImage} 
                  alt="Cover preview" 
                  className="w-32 h-44 object-cover rounded border border-gray-300"
                />
              </div>
            )}
          </div>
          
          <div>
            <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows="8"
              className="input w-full"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="btn btn-primary flex items-center"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            <span className="flex items-center">
              <FaSave className="mr-2" />
              {book ? 'Update Book' : 'Save Book'}
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

export default AdminBookForm;
