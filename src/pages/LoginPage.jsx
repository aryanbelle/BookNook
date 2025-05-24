import React from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="pt-28 pb-16 bg-gray-50 min-h-screen">
      <div className="container-narrow">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">
            Log in to access your account and continue your reading journey.
          </p>
        </motion.div>
        
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;