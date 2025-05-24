import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineBookOpen, HiOutlineSearch, HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { RiUser3Line, RiLoginBoxLine, RiLogoutBoxLine } from 'react-icons/ri';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  const isHomePage = location.pathname === '/';
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Determine navbar styling based on page and scroll position
  const getNavbarStyle = () => {
    if (!isHomePage) {
      return 'bg-white shadow-card py-3';
    }
    
    return isScrolled 
      ? 'bg-white shadow-card py-3' 
      : 'bg-gradient-to-r from-primary-900 to-primary-700 py-4';
  };

  // Determine text color based on navbar style
  const isTransparent = isHomePage && !isScrolled;

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${getNavbarStyle()}`}
    >
      <div className="container-narrow mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              whileHover={{ rotate: 10 }}
              transition={{ duration: 0.2 }}
              className={isTransparent ? "text-white" : "text-primary-700"}
            >
              <HiOutlineBookOpen className="text-2xl" />
            </motion.div>
            <span className={`font-heading font-bold text-xl ${isTransparent ? "text-white" : "text-primary-800"}`}>BookNook</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input py-1.5 pr-8 w-40 focus:w-52 transition-all text-sm"
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-700"
                >
                  <HiOutlineSearch className="text-lg" />
                </button>
              </form>
            </div>
            
            <Link 
              to="/" 
              className={`font-medium text-sm hover:${isTransparent ? 'text-white' : 'text-primary-700'} transition-colors ${
                location.pathname === '/' 
                  ? isTransparent 
                    ? 'text-white border-b-2 border-white pb-1' 
                    : 'text-primary-700 border-b-2 border-primary-700 pb-1' 
                  : isTransparent 
                    ? 'text-gray-100' 
                    : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            
            <Link 
              to="/books" 
              className={`font-medium text-sm hover:${isTransparent ? 'text-white' : 'text-primary-700'} transition-colors ${
                location.pathname === '/books' 
                  ? isTransparent 
                    ? 'text-white border-b-2 border-white pb-1' 
                    : 'text-primary-700 border-b-2 border-primary-700 pb-1' 
                  : isTransparent 
                    ? 'text-gray-100' 
                    : 'text-gray-700'
              }`}
            >
              Books
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className={`font-medium text-sm hover:${isTransparent ? 'text-white' : 'text-primary-700'} transition-colors ${
                    location.pathname === '/profile' 
                      ? isTransparent 
                        ? 'text-white border-b-2 border-white pb-1' 
                        : 'text-primary-700 border-b-2 border-primary-700 pb-1' 
                      : isTransparent 
                        ? 'text-gray-100' 
                        : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <RiUser3Line className="text-base" />
                    <span>Profile</span>
                  </div>
                </Link>
                
                {user && user.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className={`font-medium text-sm hover:${isTransparent ? 'text-white' : 'text-primary-700'} transition-colors ${
                      location.pathname === '/admin' 
                        ? isTransparent 
                          ? 'text-white border-b-2 border-white pb-1' 
                          : 'text-primary-700 border-b-2 border-primary-700 pb-1' 
                        : isTransparent 
                          ? 'text-gray-100' 
                          : 'text-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-1">
                      <RiUser3Line className="text-base" />
                      <span>Admin</span>
                    </div>
                  </Link>
                )}
                
                <button 
                  onClick={handleLogout}
                  className={`flex items-center space-x-1 font-medium text-sm ${
                    isTransparent ? 'text-gray-100 hover:text-white' : 'text-gray-700 hover:text-primary-700'
                  } transition-colors`}
                >
                  <RiLogoutBoxLine className="text-base" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className={`btn ${isTransparent ? 'bg-white text-primary-900 hover:bg-gray-100' : 'btn-primary'} py-1.5 px-3 text-sm`}
              >
                <RiLoginBoxLine className="text-base" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={isTransparent ? "text-white hover:text-gray-200" : "text-gray-700 hover:text-primary-700"}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <HiOutlineX className="text-2xl" />
              ) : (
                <HiOutlineMenu className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 py-3 bg-white rounded shadow-dropdown"
          >
            <form onSubmit={handleSearch} className="px-4 mb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input py-2 w-full text-sm"
                />
                <button 
                  type="submit" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-700"
                >
                  <HiOutlineSearch className="text-lg" />
                </button>
              </div>
            </form>
            
            <Link to="/" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50">
              <span>Home</span>
            </Link>
            
            <Link to="/books" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50">
              <span>Books</span>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50">
                  <RiUser3Line className="text-base" />
                  <span>Profile</span>
                </Link>
                
                {user && user.role === 'admin' && (
                  <Link to="/admin" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50">
                    <RiUser3Line className="text-base" />
                    <span>Admin Dashboard</span>
                  </Link>
                )}
                
                <button 
                  onClick={handleLogout}
                  className="w-full text-left flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  <RiLogoutBoxLine className="text-base" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50">
                <RiLoginBoxLine className="text-base" />
                <span>Login</span>
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;