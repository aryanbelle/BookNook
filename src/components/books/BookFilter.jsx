import React, { useState, useRef, useEffect } from 'react';
import { HiOutlineSearch, HiOutlineFilter, HiOutlineX, HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { genres } from '../../data/books';
import { motion, AnimatePresence } from 'framer-motion';

const BookFilter = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target)) {
        setIsDesktopDropdownOpen(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setIsMobileDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    applyFilters();
  };
  
  const applyFilters = () => {
    onFilter({
      searchTerm,
      filters: {
        genre: selectedGenre === 'All' ? '' : selectedGenre,
        minRating: minRating
      }
    });
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedGenre('All');
    setMinRating(0);
    onFilter({
      searchTerm: '',
      filters: {
        genre: '',
        minRating: 0
      }
    });
  };
  
  // Simple rating display
  const RatingDisplay = ({ rating }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <div 
            key={star} 
            className={`w-2 h-2 rounded-full ${star <= rating ? 'bg-primary-600' : 'bg-gray-200'}`}
          />
        ))}
      </div>
    );
  };
  
  // Custom slider styles
  const sliderStyles = {
    // Base slider style
    slider: {
      width: '100%',
      height: '2px',
      backgroundColor: '#e5e7eb',
      borderRadius: '9999px',
      appearance: 'none',
      cursor: 'pointer',
      background: `linear-gradient(to right, #191987 0%, #191987 ${(minRating / 5) * 100}%, #e5e7eb ${(minRating / 5) * 100}%, #e5e7eb 100%)`
    },
    // WebKit (Chrome, Safari, newer Opera) thumb
    webkitThumb: {
      WebkitAppearance: 'none',
      appearance: 'none',
      width: '16px',
      height: '16px',
      backgroundColor: '#191987',
      borderRadius: '50%',
      border: '2px solid white',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
      marginTop: '-7px'
    },
    // Mozilla (Firefox) thumb
    mozThumb: {
      width: '16px',
      height: '16px',
      backgroundColor: '#191987',
      borderRadius: '50%',
      border: '2px solid white',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
    }
  };
  
  return (
    <div className="bg-white rounded shadow-card p-4 md:p-6 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search input */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by title or author"
              className="input py-2 pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          {/* Filter button (mobile) */}
          <div className="md:hidden">
            <button
              type="button"
              className="btn btn-secondary w-full flex items-center justify-center gap-2"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <HiOutlineFilter />
              <span>{isFilterOpen ? 'Hide Filters' : 'Show Filters'}</span>
            </button>
          </div>
          
          {/* Desktop filters */}
          <div className="hidden md:flex items-center gap-4 flex-wrap">
            {/* Custom Genre dropdown */}
            <div className="custom-dropdown w-56" ref={desktopDropdownRef}>
              <button
                type="button"
                className="custom-dropdown-button"
                onClick={() => setIsDesktopDropdownOpen(!isDesktopDropdownOpen)}
              >
                <span className="truncate">{selectedGenre}</span>
                {isDesktopDropdownOpen ? (
                  <HiChevronUp className="text-gray-500 flex-shrink-0 ml-1" />
                ) : (
                  <HiChevronDown className="text-gray-500 flex-shrink-0 ml-1" />
                )}
              </button>
              
              <AnimatePresence>
                {isDesktopDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="custom-dropdown-panel"
                  >
                    {genres.map(genre => (
                      <button
                        key={genre}
                        type="button"
                        className={`custom-dropdown-item ${
                          selectedGenre === genre ? 'custom-dropdown-item-selected' : ''
                        }`}
                        onClick={() => {
                          setSelectedGenre(genre);
                          setIsDesktopDropdownOpen(false);
                        }}
                      >
                        <span className="truncate block">{genre}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Simple Rating filter */}
            <div className="w-48">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-gray-700">Min Rating:</label>
                <span className="custom-range-value">{minRating}</span>
              </div>
              
              <div className="mb-1">
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={minRating}
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                  style={sliderStyles.slider}
                  className="slider-thumb"
                />
              </div>
              
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">0</span>
                <RatingDisplay rating={minRating} />
                <span className="text-xs text-gray-500">5</span>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary py-2 px-4">
                Apply
              </button>
              <button 
                type="button" 
                onClick={resetFilters}
                className="btn btn-secondary py-2 px-4"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </form>
      
      {/* Mobile filters */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 overflow-hidden"
          >
            <div className="pt-4 border-t border-gray-200 space-y-4">
              {/* Genre dropdown for mobile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Genre
                </label>
                <div className="custom-dropdown" ref={mobileDropdownRef}>
                  <button
                    type="button"
                    className="custom-dropdown-button"
                    onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                  >
                    <span className="truncate">{selectedGenre}</span>
                    {isMobileDropdownOpen ? (
                      <HiChevronUp className="text-gray-500 flex-shrink-0 ml-1" />
                    ) : (
                      <HiChevronDown className="text-gray-500 flex-shrink-0 ml-1" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {isMobileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="custom-dropdown-panel"
                      >
                        {genres.map(genre => (
                          <button
                            key={genre}
                            type="button"
                            className={`custom-dropdown-item ${
                              selectedGenre === genre ? 'custom-dropdown-item-selected' : ''
                            }`}
                            onClick={() => {
                              setSelectedGenre(genre);
                              setIsMobileDropdownOpen(false);
                            }}
                          >
                            <span className="truncate block">{genre}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Simple Rating filter for mobile */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Minimum Rating
                  </label>
                  <span className="custom-range-value">{minRating}</span>
                </div>
                
                <div className="mb-1">
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={minRating}
                    onChange={(e) => setMinRating(parseFloat(e.target.value))}
                    style={sliderStyles.slider}
                    className="slider-thumb"
                  />
                </div>
                
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">0</span>
                  <RatingDisplay rating={minRating} />
                  <span className="text-xs text-gray-500">5</span>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={applyFilters}
                  className="btn btn-primary py-2 flex-1"
                >
                  Apply Filters
                </button>
                <button 
                  type="button" 
                  onClick={resetFilters}
                  className="btn btn-secondary py-2 flex-1"
                >
                  Reset
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookFilter;