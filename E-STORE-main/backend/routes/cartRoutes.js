import express from 'express';
import { getCart, addToCart, updateCartItem, removeFromCart } from '../controllers/cartController.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

// Get user's cart
router.get('/user/:userId', protectRoute, getCart);

// Add to cart
router.post('/add', protectRoute, addToCart);

// Update cart item quantity
router.put('/:cartId/product/:productId', protectRoute, updateCartItem);

// Remove item from cart
router.delete('/:cartId/product/:productId', protectRoute, removeFromCart);

export default router; 