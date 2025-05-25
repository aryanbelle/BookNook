import React from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { motion } from 'framer-motion';

const HorizontalPagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  loading = false,
  className = ''
}) => {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;
  
  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {/* Previous page button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className={`flex items-center justify-center w-8 h-8 rounded-full 
          ${currentPage === 1 || loading 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
          }`}
        aria-label="Previous page"
      >
        <HiChevronLeft className="w-5 h-5" />
      </button>
      
      {/* Page indicators (dots) */}
      <div className="flex space-x-1">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            disabled={index + 1 === currentPage || loading}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index + 1 === currentPage
                ? 'bg-primary-600 w-4'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Next page button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        className={`flex items-center justify-center w-8 h-8 rounded-full 
          ${currentPage === totalPages || loading
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
          }`}
        aria-label="Next page"
      >
        <HiChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default HorizontalPagination;
