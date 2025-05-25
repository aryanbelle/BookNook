import React, { useState, useEffect } from 'react';
import { FaUser, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { usersAPI } from '../../services/api';
import LoadingSpinner from '../ui/LoadingSpinner';
import BookCard from '../books/BookCard';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [userData, setUserData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || '',
    preferences: {
      favoriteGenres: user?.preferences?.favoriteGenres || ['Fiction', 'Science Fiction'],
      emailNotifications: user?.preferences?.emailNotifications || true
    }
  });
  const [userBooks, setUserBooks] = useState([]);
  const [booksLoading, setBooksLoading] = useState(false);
  const [booksError, setBooksError] = useState(null);

  // Update form data when user data changes
  useEffect(() => {
    if (user) {
      setUserData({
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || '',
        preferences: {
          favoriteGenres: user.preferences?.favoriteGenres || ['Fiction', 'Science Fiction'],
          emailNotifications: user.preferences?.emailNotifications || true
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (user?._id) {
      fetchUserBooks();
    }
  }, [user?._id]);

  const fetchUserBooks = async () => {
    try {
      setBooksLoading(true);
      setBooksError(null);
      const response = await usersAPI.getUserBooks(user._id);
      if (response.success) {
        // The backend returns books in response.data.books
        setUserBooks(response.data.books || []);
      } else {
        setBooksError(response.message || 'Failed to load your books');
      }
    } catch (err) {
      setBooksError(err.message || 'Failed to load your books');
      console.error('Error fetching user books:', err);
    } finally {
      setBooksLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setUserData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setUserData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    try {
      if (!user?._id) return;
      
      setLoading(true);
      setError(null);
      setSuccessMessage('');

      const updatedData = {
        ...userData,
        name: user.name // Keep the existing name if it's not being updated
      };

      const response = await usersAPI.updateUserProfile(user._id, updatedData);
      
      if (response.success) {
        // Update both local state and auth context with the response data
        const updatedUserData = response.data;
        updateUser(updatedUserData);
        setUserData(prev => ({
          ...prev,
          ...updatedUserData,
          preferences: {
            ...prev.preferences,
            ...(updatedUserData.preferences || {})
          }
        }));
        
        setSuccessMessage('Profile updated successfully!');
        setIsEditing(false);
      }
    } catch (err) {
      setError(err.message || 'Failed to update profile');
      console.error('Error updating profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (!user) return;
    
    setUserData({
      username: user.username || '',
      email: user.email || '',
      bio: user.bio || '',
      preferences: {
        favoriteGenres: user.preferences?.favoriteGenres || ['Fiction', 'Science Fiction'],
        emailNotifications: user.preferences?.emailNotifications || true
      }
    });
    setIsEditing(false);
    setError(null);
    setSuccessMessage('');
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-flat p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-secondary flex items-center"
            disabled={loading}
          >
            <FaEdit className="mr-2" />
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="btn btn-primary flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoadingSpinner size="small" />
                  <span className="ml-2">Saving...</span>
                </>
              ) : (
                <>
                  <FaSave className="mr-2" />
                  Save
                </>
              )}
            </button>
            <button
              onClick={handleCancel}
              className="btn btn-secondary flex items-center"
              disabled={loading}
            >
              <FaTimes className="mr-2" />
              Cancel
            </button>
          </div>
        )}
      </div>
      
      {/* Success message */}
      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{successMessage}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 flex flex-col items-center">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.username} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <FaUser className="text-gray-400 text-5xl" />
            )}
          </div>
          
          {isEditing && (
            <button className="btn btn-secondary text-sm mt-2">
              Change Photo
            </button>
          )}
          
          <div className="mt-4 text-center">
            <h3 className="text-xl font-semibold">{user?.username || 'User'}</h3>
            <p className="text-gray-600">{user?.email || 'user@example.com'}</p>
            <p className="text-gray-500 text-sm mt-1">Member since {user?.joinDate || 'Jan 2023'}</p>
          </div>
        </div>
        
        <div className="md:w-2/3">
          {!isEditing ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">About Me</h3>
                <p className="text-gray-700">
                  {userData.bio || 'No bio available. Edit your profile to add a bio.'}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Preferences</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-medium">Favorite Genres:</span>{' '}
                    {userData.preferences.favoriteGenres.join(', ')}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Email Notifications:</span>{' '}
                    {userData.preferences.emailNotifications ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    className="input w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="input w-full"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={userData.bio}
                  onChange={handleChange}
                  rows="4"
                  className="input w-full"
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Preferences</h3>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Favorite Genres (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="preferences.favoriteGenres"
                    value={userData.preferences.favoriteGenres.join(', ')}
                    onChange={(e) => {
                      const genres = e.target.value.split(',').map(genre => genre.trim());
                      setUserData(prev => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          favoriteGenres: genres
                        }
                      }));
                    }}
                    className="input w-full"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    name="preferences.emailNotifications"
                    checked={userData.preferences.emailNotifications}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700">
                    Receive email notifications
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* User's Books Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Books</h2>
        {booksLoading ? (
          <LoadingSpinner />
        ) : booksError ? (
          <div className="text-red-600">{booksError}</div>
        ) : userBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {userBooks.map(book => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600">You haven't published any books yet.</p>
            {user.role === 'admin' && (
              <Link to="/admin" className="btn btn-primary mt-4">
                Create Your First Book
              </Link>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UserProfile;