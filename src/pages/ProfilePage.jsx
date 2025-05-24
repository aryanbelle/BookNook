import React from 'react';
import { motion } from 'framer-motion';
import UserProfile from '../components/profile/UserProfile';
import UserReviews from '../components/profile/UserReviews';

const ProfilePage = () => {
  return (
    <div className="pt-28 pb-16">
      <div className="container-narrow">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <UserProfile />
          <UserReviews />
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;