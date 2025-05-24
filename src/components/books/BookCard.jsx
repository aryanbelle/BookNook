import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiStar, HiOutlineStar, HiOutlineChevronRight } from 'react-icons/hi';
import { HiMiniStar } from 'react-icons/hi2';

const BookCard = ({ book }) => {
  // Generate star rating
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<HiStar key={i} className="text-yellow-500" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<HiMiniStar key={i} className="text-yellow-500" />);
      } else {
        stars.push(<HiOutlineStar key={i} className="text-yellow-500" />);
      }
    }
    
    return stars;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -3 }}
      className="bg-white rounded shadow-card hover:shadow-hover transition-all duration-300"
    >
      <Link to={`/books/${book._id}`} className="flex flex-col h-full">
        <div className="relative overflow-hidden" style={{ maxHeight: "200px" }}>
          <img 
            src={book.coverImage} 
            alt={book.title}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-102"
          />
          {book.featured && (
            <div className="absolute top-2 right-2 badge badge-accent">
              Featured
            </div>
          )}
        </div>
        
        <div className="p-3 flex flex-col flex-grow">
          <h3 className="font-medium text-base mb-1 line-clamp-1 text-gray-900">{book.title}</h3>
          <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
          
          <div className="flex items-center mb-3">
            <div className="flex mr-1">
              {renderRating(book.rating)}
            </div>
            <span className="text-xs text-gray-700">({book.rating})</span>
          </div>
          
          <div className="mt-auto flex justify-between items-center">
            <span className="badge">
              {book.genre}
            </span>
            <span className="text-primary-700 text-xs font-medium flex items-center hover:underline">
              Details
              <HiOutlineChevronRight className="ml-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BookCard;