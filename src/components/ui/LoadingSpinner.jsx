import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'medium' }) => {
  const sizeClass = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  };

  return (
    <div className="flex justify-center items-center">
      <motion.div
        className={`${sizeClass[size]} border-4 border-gray-200 rounded-full`}
        style={{ 
          borderTopColor: '#070738' 
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinner;