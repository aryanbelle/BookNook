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
        // Store user data with role information
        const userData = response.data;
        setUser(userData);
        localStorage.setItem('token', userData.token);
        
        // Immediately fetch current user to get complete user data including role
        try {
          const userResponse = await authAPI.getCurrentUser();
          if (userResponse.success) {
            setUser(userResponse.data);
          }
        } catch (userErr) {
          console.error('Error fetching complete user data:', userErr);
        }
        
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
        // Store user data with role information
        const registeredUser = response.data;
        
        // Explicitly set the role from the registration data
        if (userData.role) {
          registeredUser.role = userData.role;
        }
        
        setUser(registeredUser);
        localStorage.setItem('token', registeredUser.token);
        
        // Immediately fetch current user to get complete user data including role
        try {
          const userResponse = await authAPI.getCurrentUser();
          if (userResponse.success) {
            setUser(userResponse.data);
          }
        } catch (userErr) {
          console.error('Error fetching complete user data:', userErr);
        }
        
        return true;
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
      return false;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error('Error during logout:', err);
    } finally {
      setUser(null);
      localStorage.removeItem('token');
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};