const API_BASE_URL = 'http://localhost:5001/api/v1';

// Helper function for making API requests
async function fetchData(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Auth API
export const authAPI = {
  register: (userData) => {
    return fetchData('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },
  
  login: (credentials) => {
    return fetchData('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },
  
  getCurrentUser: () => {
    return fetchData('/auth/me');
  },
  
  logout: () => {
    return fetchData('/auth/logout');
  }
};

// Books API
export const booksAPI = {
  getAllBooks: (params = {}) => {
    const queryParams = new URLSearchParams();
    
    // Add query parameters if they exist
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.genre && params.genre !== 'All') queryParams.append('genre', params.genre);
    if (params.search) queryParams.append('search', params.search);
    if (params.sort) queryParams.append('sort', params.sort);
    if (params.order) queryParams.append('order', params.order);
    
    const queryString = queryParams.toString();
    return fetchData(`/books${queryString ? `?${queryString}` : ''}`);
  },
  
  getBook: (id) => {
    return fetchData(`/books/${id}`);
  },
  
  getFeaturedBooks: () => {
    return fetchData('/books?featured=true');
  },
  
  // Admin-only endpoints
  createBook: (bookData) => {
    return fetchData('/books', {
      method: 'POST',
      body: JSON.stringify(bookData)
    });
  },
  
  updateBook: (id, bookData) => {
    return fetchData(`/books/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bookData)
    });
  },
  
  deleteBook: (id) => {
    return fetchData(`/books/${id}`, {
      method: 'DELETE'
    });
  }
};

// Reviews API
export const reviewsAPI = {
  getBookReviews: (bookId) => {
    return fetchData(`/reviews?bookId=${bookId}`);
  },
  
  getUserReviews: () => {
    // This endpoint would normally fetch reviews by the current user
    // For now, we'll return an empty success response
    return Promise.resolve({
      success: true,
      data: {
        reviews: []
      }
    });
  },
  
  addReview: (bookId, reviewData) => {
    // Include the bookId in the review data
    const reviewWithBookId = {
      ...reviewData,
      bookId
    };
    
    return fetchData(`/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewWithBookId)
    });
  },
  
  updateReview: (reviewId, reviewData) => {
    return fetchData(`/reviews/${reviewId}`, {
      method: 'PUT',
      body: JSON.stringify(reviewData)
    });
  },
  
  deleteReview: (reviewId) => {
    return fetchData(`/reviews/${reviewId}`, {
      method: 'DELETE'
    });
  }
};

// Users API
export const usersAPI = {
  getUserProfile: (userId) => {
    return fetchData(`/users/${userId}`);
  },
  
  updateUserProfile: (userData) => {
    return fetchData('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  },
  
  getReadingList: () => {
    return fetchData('/users/reading-list');
  },
  
  addToReadingList: (bookId) => {
    return fetchData('/users/reading-list', {
      method: 'POST',
      body: JSON.stringify({ bookId })
    });
  },
  
  removeFromReadingList: (bookId) => {
    return fetchData(`/users/reading-list/${bookId}`, {
      method: 'DELETE'
    });
  }
};
