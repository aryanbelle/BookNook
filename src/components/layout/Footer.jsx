import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 pt-12 pb-8 mt-12">
      <div className="container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <FaBook className="text-2xl text-primary-900" />
              <span className="font-bold text-xl text-primary-900">BookNook</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Discover your next favorite book with our community of readers and reviewers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary-700 transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-700 transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-700 transition-colors">
                <FaFacebook className="text-xl" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary-700 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/books" className="text-gray-600 hover:text-primary-700 transition-colors">
                  Books
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-primary-700 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 hover:text-primary-700 transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Genres */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Popular Genres</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/books?genre=Fiction" className="text-gray-600 hover:text-primary-700 transition-colors">
                  Fiction
                </Link>
              </li>
              <li>
                <Link to="/books?genre=Science%20Fiction" className="text-gray-600 hover:text-primary-700 transition-colors">
                  Science Fiction
                </Link>
              </li>
              <li>
                <Link to="/books?genre=Fantasy" className="text-gray-600 hover:text-primary-700 transition-colors">
                  Fantasy
                </Link>
              </li>
              <li>
                <Link to="/books?genre=Thriller" className="text-gray-600 hover:text-primary-700 transition-colors">
                  Thriller
                </Link>
              </li>
              <li>
                <Link to="/books?genre=Memoir" className="text-gray-600 hover:text-primary-700 transition-colors">
                  Memoir
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-600 mb-2">
              Have questions or suggestions?
            </p>
            <a 
              href="mailto:info@booknook.com" 
              className="text-primary-700 hover:text-primary-800 transition-colors"
            >
              info@booknook.com
            </a>
            <p className="text-gray-600 mt-4 mb-2">
              Subscribe to our newsletter:
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="input py-1 rounded-r-none flex-grow"
              />
              <button 
                type="submit" 
                className="bg-primary-700 text-white px-3 py-1 rounded-r-md hover:bg-primary-800 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-300 mt-8 pt-6 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {currentYear} BookNook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;