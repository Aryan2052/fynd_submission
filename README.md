# E-Store

A full-stack e-commerce application built with modern web technologies.

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (with Mongoose ODM)
- **Redis** - Caching layer
- **JWT** - Authentication
- **Stripe** - Payment processing
- **Bcrypt** - Password hashing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

## Features

- User authentication and authorization
- Product catalog management
- Shopping cart functionality
- Secure payment processing with Stripe
- Redis-based caching for improved performance
- Responsive design with Tailwind CSS

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Product Routes
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Cart Routes
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
  
## API
-Fakestore Api for product details.
-Google Gemini flash 2.0 api for product details.


## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd E-STORE-main
```

2. Install dependencies:
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## Running the Application

1. Start the backend server:
```bash
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Project Structure

```
E-STORE-main/
├── backend/
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   └── server.js       # Server entry point
├── frontend/
│   ├── public/         # Static assets
│   ├── src/            # React components and logic
│   └── vite.config.js  # Vite configuration
└── package.json        # Project dependencies
```
