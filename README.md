# BookNook - Book Review Platform (Frontend)

A modern, responsive book review platform built with React that allows users to discover books, read and write reviews, and manage their reading lists.

## Features

### User Features
- Browse and search books with advanced filtering
- View detailed book information and reviews
- Write and manage book reviews
- Maintain a personal reading list
- Create and manage user profiles
- Rate books on a 5-star scale

### Admin Features
- Manage books (add, edit, delete)
- View and moderate reviews
- Track book statistics
- Manage featured books

## Technical Stack

### Core Technologies
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Context API** - State management
- **Tailwind CSS** - Styling and responsive design
- **Framer Motion** - Animations and transitions

### Key Libraries
- `react-icons` - Icon components
- `axios` - HTTP client
- `react-router-dom` - Routing
- `framer-motion` - Animations

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── admin/          # Admin-specific components
│   │   ├── auth/           # Authentication components
│   │   ├── books/          # Book-related components
│   │   ├── layout/         # Layout components
│   │   ├── profile/        # User profile components
│   │   └── ui/             # Generic UI components
│   ├── context/            # React Context providers
│   ├── data/              # Static data and constants
│   ├── pages/             # Page components
│   └── services/          # API and utility services
```

## Components

### Core Components

#### Admin Components
- `AdminBookForm` - Form for creating/editing books
- `AdminBookList` - List of books with management controls

#### Authentication Components
- `LoginForm` - User login form
- `RegisterForm` - New user registration form
- `ProtectedRoute` - Route guard for authenticated pages

#### Book Components
- `BookCard` - Book preview card
- `BookList` - Grid display of book cards
- `BookFilter` - Search and filtering controls
- `FeaturedBooks` - Carousel of featured books
- `ReviewForm` - Book review submission form
- `ReviewItem` - Individual review display

#### Layout Components
- `Navbar` - Main navigation bar
- `Footer` - Site footer

#### Profile Components
- `UserProfile` - User profile management
- `UserReviews` - User's review history

#### UI Components
- `LoadingSpinner` - Loading state indicator
- `Pagination` - Page navigation controls
- `OptimizedImage` - Lazy-loaded image component
- `HorizontalPagination` - Horizontal scrolling pagination

## Context Providers

### AuthContext
- User authentication state management
- Login/logout functionality
- User role management

### BookContext
- Book data management
- Filtering and search functionality
- Review management

## Pages

- `HomePage` - Landing page with featured books
- `BooksPage` - Book browsing with filters
- `BookDetailPage` - Detailed book information and reviews
- `ProfilePage` - User profile management
- `AdminDashboardPage` - Admin controls
- `LoginPage` - User authentication
- `RegisterPage` - New user registration
- `NotFoundPage` - 404 error page

## State Management

The application uses React Context API for state management:
- `AuthContext` - Manages user authentication state
- `BookContext` - Manages book data and operations

## API Integration

The frontend integrates with the backend REST API using service modules:
- `api.js` - Centralized API service with axios

## Styling

The application uses Tailwind CSS for styling with:
- Responsive design
- Custom theme configuration
- Component-specific styles
- Dark/Light mode support

## Performance Optimization

- Lazy loading of images
- Route-based code splitting
- Optimized list rendering
- Debounced search inputs
- Cached API responses

## Security Features

- Protected routes for authenticated users
- JWT token management
- Role-based access control
- Form validation and sanitization
- Secure HTTP-only cookies

## Error Handling

- Global error boundary
- Form validation errors
- API error handling
- Friendly error messages
- Loading states

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Environment Configuration

Create a `.env` file with:
```
VITE_API_URL=http://localhost:5000/api/v1
VITE_CLOUDINARY_URL=your_cloudinary_url
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.
