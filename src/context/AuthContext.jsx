import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await authAPI.getCurrentUser();
      if (response.success) {
        setUser(response.data);
      }
    } catch (err) {
      console.error('Error fetching current user:', err);
      // Clear invalid token
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await authAPI.login(credentials);
      if (response.success) {
        const userData = response.data;
        setUser(userData);
        localStorage.setItem('token', userData.token);
        
        // Fetch full user data
        await fetchCurrentUser();
        return true;
      }
    } catch (err) {
      setError(err.message || 'Login failed');
      return false;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await authAPI.register(userData);
      if (response.success) {
        const registeredUser = response.data;
        setUser(registeredUser);
        localStorage.setItem('token', registeredUser.token);
        
        // Fetch full user data
        await fetchCurrentUser();
        return true;
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  // Update user in state immediately after profile update
  const updateUser = (userData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...userData,
      // Ensure nested objects are merged correctly
      preferences: {
        ...(prevUser?.preferences || {}),
        ...(userData?.preferences || {})
      }
    }));
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    updateUser,
    fetchCurrentUser  // Export this so components can refresh user data
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};