import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaSearch } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="pt-28 pb-16 flex items-center justify-center min-h-screen bg-gray-50">
      <div className="container-narrow">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-9xl font-bold text-primary-900 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/" className="btn btn-primary text-lg px-6 py-3 flex items-center justify-center">
              <FaHome className="mr-2" />
              Back to Home
            </Link>
            <Link to="/books" className="btn btn-secondary text-lg px-6 py-3 flex items-center justify-center">
              <FaSearch className="mr-2" />
              Browse Books
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;