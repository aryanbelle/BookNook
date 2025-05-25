import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaStar, FaBook, FaUserFriends } from 'react-icons/fa';
import { motion } from 'framer-motion';
import FeaturedBooks from '../components/books/FeaturedBooks';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white pt-40 pb-24">
        <div className="container-narrow relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl text-white md:text-5xl font-bold mb-6">
              Discover Your Next Favorite Book
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-16 max-w-3xl mx-auto">
              Join our community of book lovers to find, review, and share the best reads.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
              <Link to="/books" className="btn btn-accent text-lg px-6 py-3">
                Browse Books
              </Link>
              <Link to="/register" className="btn btn-secondary text-lg px-6 py-3">
                Join Community
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path 
              fill="#f9fafb" 
              fillOpacity="1" 
              d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,138.7C672,139,768,181,864,186.7C960,192,1056,160,1152,138.7C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>
      
      {/* Search Section */}
      <section className="py-8 bg-gray-50">
        <div className="container-narrow">
          <div className="max-w-2xl mx-auto bg-white rounded shadow-card">
            <form className="flex">
              <input 
                type="text" 
                placeholder="Search for books by title, author, or genre..." 
                className="input py-3 rounded-r-none flex-grow"
              />
              <button 
                type="submit" 
                className="bg-primary-700 text-white px-6 py-3 rounded-r hover:bg-primary-800 transition-colors flex items-center"
              >
                <FaSearch className="mr-2" />
                Search
              </button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Featured Books Section */}
      <FeaturedBooks />
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Join BookNook?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers everything book lovers need to discover, track, and share their reading journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-lg p-6 shadow-flat text-center"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSearch className="text-2xl text-primary-700" />
              </div>
              <h3 className="text-xl font-bold mb-2">Discover New Books</h3>
              <p className="text-gray-600">
                Find your next read from our curated collection of books across all genres.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-lg p-6 shadow-flat text-center"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-2xl text-primary-700" />
              </div>
              <h3 className="text-xl font-bold mb-2">Rate and Review</h3>
              <p className="text-gray-600">
                Share your thoughts and see what others think about the books you love.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-lg p-6 shadow-flat text-center"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUserFriends className="text-2xl text-primary-700" />
              </div>
              <h3 className="text-xl font-bold mb-2">Join the Community</h3>
              <p className="text-gray-600">
                Connect with fellow readers and discover books through recommendations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-50">
        <div className="container-narrow">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Start Your Reading Journey Today
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Join thousands of readers who have found their next favorite book through BookNook.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register" className="btn btn-primary text-center">
                    Sign Up Now
                  </Link>
                  <Link to="/books" className="btn btn-secondary text-center">
                    Browse Books
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 relative min-h-[300px]">
                <img 
                  src="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Books on a shelf" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Readers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our community of book lovers about their experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-gray-50 p-6 rounded-lg shadow-flat"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xl font-bold text-primary-700">S</span>
                </div>
                <div>
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <div className="flex text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </div>
              <p className="text-gray-700">
                "BookNook has completely transformed how I find new books. The recommendations are spot-on, and I love reading what others think before I commit to a new book."
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-gray-50 p-6 rounded-lg shadow-flat"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xl font-bold text-primary-700">M</span>
                </div>
                <div>
                  <h4 className="font-bold">Michael Chen</h4>
                  <div className="flex text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </div>
              <p className="text-gray-700">
                "I've discovered so many amazing authors through BookNook that I would have never found otherwise. The community discussions are insightful and engaging."
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-gray-50 p-6 rounded-lg shadow-flat"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xl font-bold text-primary-700">J</span>
                </div>
                <div>
                  <h4 className="font-bold">Jessica Martinez</h4>
                  <div className="flex text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </div>
              <p className="text-gray-700">
                "As an avid reader, I appreciate how BookNook makes it easy to track my reading progress and set goals. The interface is intuitive and the recommendations are always on point."
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;