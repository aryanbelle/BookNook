import React from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  loading = false,
  className = ''
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // If we have 5 or fewer pages, show all of them
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);
      
      // Calculate start and end of page range to show
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're at the start or end
      if (currentPage <= 2) {
        endPage = 3;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2;
      }
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Always include last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };
  
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;
  
  return (
    <div className={`flex items-center justify-center space-x-1 mt-6 ${className}`}>
      {/* Previous page button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className={`flex items-center justify-center w-10 h-10 rounded-md 
          ${currentPage === 1 || loading 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
          }`}
        aria-label="Previous page"
      >
        <HiChevronLeft className="w-5 h-5" />
      </button>
      
      {/* Page numbers */}
      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="flex items-center justify-center w-10 h-10 text-gray-500">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page)}
              disabled={page === currentPage || loading}
              className={`flex items-center justify-center w-10 h-10 rounded-md
                ${page === currentPage
                  ? 'bg-primary-600 text-white font-medium'
                  : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                } ${loading ? 'cursor-not-allowed' : ''}`}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}
      
      {/* Next page button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        className={`flex items-center justify-center w-10 h-10 rounded-md 
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

export default Pagination;
