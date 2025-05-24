import React from 'react';
import { motion } from 'framer-motion';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="pt-28 pb-16 bg-gray-50 min-h-screen">
      <div className="container-narrow">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Our Community</h1>
          <p className="text-gray-600">
            Create an account to start your reading journey and connect with other book lovers.
          </p>
        </motion.div>
        
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;