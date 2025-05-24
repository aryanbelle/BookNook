import React, { useState } from 'react';
import { FaUser, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || '',
    preferences: {
      favoriteGenres: user?.preferences?.favoriteGenres || ['Fiction', 'Science Fiction'],
      emailNotifications: user?.preferences?.emailNotifications || true
    }
  });
  
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
  
  const handleSave = () => {
    // Update user data (in a real app, this would be an API call)
    login({
      ...user,
      ...userData
    });
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    // Reset form data
    setUserData({
      username: user?.username || '',
      email: user?.email || '',
      bio: user?.bio || '',
      preferences: {
        favoriteGenres: user?.preferences?.favoriteGenres || ['Fiction', 'Science Fiction'],
        emailNotifications: user?.preferences?.emailNotifications || true
      }
    });
    setIsEditing(false);
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
          >
            <FaEdit className="mr-2" />
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="btn btn-primary flex items-center"
            >
              <FaSave className="mr-2" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="btn btn-secondary flex items-center"
            >
              <FaTimes className="mr-2" />
              Cancel
            </button>
          </div>
        )}
      </div>
      
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
    </motion.div>
  );
};

export default UserProfile;