import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminBookList from '../components/admin/AdminBookList';
import AdminBookForm from '../components/admin/AdminBookForm';
import { FaPlus, FaTimes } from 'react-icons/fa';

const AdminDashboardPage = () => {
  const { user, loading } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  
  // If user is not admin, redirect to home
  if (!loading && (!user || user.role !== 'admin')) {
    return <Navigate to="/" replace />;
  }
  
  const handleAddBook = () => {
    setEditingBook(null);
    setShowAddForm(true);
  };
  
  const handleEditBook = (book) => {
    setEditingBook(book);
    setShowAddForm(true);
  };
  
  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingBook(null);
  };
  
  if (loading) {
    return (
      <div className="pt-28 pb-16 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  return (
    <div className="pt-28 pb-16">
      <div className="container-narrow">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          
          {!showAddForm ? (
            <button 
              onClick={handleAddBook}
              className="btn btn-primary flex items-center"
            >
              <FaPlus className="mr-2" />
              Add New Book
            </button>
          ) : (
            <button 
              onClick={handleCloseForm}
              className="btn btn-secondary flex items-center"
            >
              <FaTimes className="mr-2" />
              Cancel
            </button>
          )}
        </div>
        
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">
              {editingBook ? 'Edit Book' : 'Add New Book'}
            </h2>
            <AdminBookForm 
              book={editingBook} 
              onSuccess={handleCloseForm} 
            />
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Manage Books</h2>
          <AdminBookList onEditBook={handleEditBook} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
