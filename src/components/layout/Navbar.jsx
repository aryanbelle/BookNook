import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineBookOpen, HiOutlineSearch, HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { RiUser3Line, RiLoginBoxLine, RiLogoutBoxLine } from 'react-icons/ri';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
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
            {/* Search Bar */}
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

            {/* Navigation Links */}
            <Link 
              to="/books"
              className={`nav-link ${isTransparent ? "text-white hover:text-gray-200" : "text-gray-700 hover:text-primary-700"}`}
            >
              Books
            </Link>

            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link 
                    to="/admin"
                    className={`nav-link ${isTransparent ? "text-white hover:text-gray-200" : "text-gray-700 hover:text-primary-700"}`}
                  >
                    Admin
                  </Link>
                )}
                <Link 
                  to="/profile"
                  className={`nav-link flex items-center space-x-1 ${isTransparent ? "text-white hover:text-gray-200" : "text-gray-700 hover:text-primary-700"}`}
                >
                  <RiUser3Line />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className={`nav-link flex items-center space-x-1 ${isTransparent ? "text-white hover:text-gray-200" : "text-gray-700 hover:text-primary-700"}`}
                >
                  <RiLogoutBoxLine />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/login"
                className={`nav-link flex items-center space-x-1 ${isTransparent ? "text-white hover:text-gray-200" : "text-gray-700 hover:text-primary-700"}`}
              >
                <RiLoginBoxLine />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl"
          >
            {isOpen ? (
              <HiOutlineX className={isTransparent ? "text-white" : "text-gray-700"} />
            ) : (
              <HiOutlineMenu className={isTransparent ? "text-white" : "text-gray-700"} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/books"
                className="nav-link text-gray-700 hover:text-primary-700"
              >
                Books
              </Link>

              {user ? (
                <>
                  {user.role === 'admin' && (
                    <Link 
                      to="/admin"
                      className="nav-link text-gray-700 hover:text-primary-700"
                    >
                      Admin
                    </Link>
                  )}
                  <Link 
                    to="/profile"
                    className="nav-link flex items-center space-x-1 text-gray-700 hover:text-primary-700"
                  >
                    <RiUser3Line />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="nav-link flex items-center space-x-1 text-gray-700 hover:text-primary-700"
                  >
                    <RiLogoutBoxLine />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link 
                  to="/login"
                  className="nav-link flex items-center space-x-1 text-gray-700 hover:text-primary-700"
                >
                  <RiLoginBoxLine />
                  <span>Login</span>
                </Link>
              )}

              <div className="pt-2">
                <form onSubmit={handleSearch} className="flex">
                  <input
                    type="text"
                    placeholder="Search books..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input py-1.5 pr-8 w-full text-sm"
                  />
                  <button 
                    type="submit" 
                    className="absolute right-6 transform translate-y-2.5 text-gray-400 hover:text-primary-700"
                  >
                    <HiOutlineSearch className="text-lg" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;