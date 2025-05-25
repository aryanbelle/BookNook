import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OptimizedImage = ({ src, alt, className, placeholder = '/book-icon.svg' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(placeholder);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
    };
    
    img.onerror = () => {
      setError(true);
      setImageSrc(placeholder);
    };
  }, [src, placeholder]);

  // Generate a smaller image URL for initial loading
  const getSmallImageUrl = (url) => {
    try {
      // Check if it's a Cloudinary URL
      if (url.includes('cloudinary')) {
        return url.replace('/upload/', '/upload/w_50,q_30/');
      }
      // For other image URLs, we'll return as is for now
      return url;
    } catch (err) {
      return url;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className={`relative overflow-hidden ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {!imageLoaded && (
          <motion.div
            className="absolute inset-0 bg-gray-200 animate-pulse"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
        <motion.img
          src={imageSrc}
          alt={alt}
          className={`${className} ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          loading="lazy"
          onError={() => {
            setError(true);
            setImageSrc(placeholder);
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: imageLoaded ? 1 : 0 }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default OptimizedImage;
