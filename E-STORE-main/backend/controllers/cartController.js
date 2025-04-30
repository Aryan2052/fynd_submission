import Cart from '../models/Cart.js';
import axios from 'axios';
import mongoose from 'mongoose';

// Get user's cart
export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId });
        
        if (!cart) {
            return res.status(200).json({ items: [] });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching cart',
            error: error.message
        });
    }
};

// Add to cart
export const addToCart = async (req, res) => {
    try {
        const { productId, userId, product } = req.body;

        // Validate required fields
        if (!productId || !userId) {
            return res.status(400).json({
                success: false,
                message: 'Product ID and User ID are required'
            });
        }

        console.log('Adding to cart:', { productId, userId });

        // Find user's cart or create a new one
        let cart = await Cart.findOne({ userId });
        console.log('Existing cart:', cart);

        if (!cart) {
            cart = new Cart({
                userId,
                items: []
            });
            console.log('Created new cart');
        }

        // Check if product already exists in cart
        const existingItemIndex = cart.items.findIndex(item => item.productId === productId);

        if (existingItemIndex !== -1) {
            // If product exists, increment quantity
            cart.items[existingItemIndex].quantity += 1;
            console.log('Incremented existing item quantity');
        } else {
            // If product doesn't exist, add it to cart
            // Use the product details from the request if available
            const cartItem = {
                productId: productId,
                title: product?.title || `Product ${productId}`,
                price: product?.price || 0,
                description: product?.description || '',
                category: product?.category || '',
                image: product?.image || '',
                quantity: 1
            };

            cart.items.push(cartItem);
            console.log('Added new item to cart:', cartItem);
        }

        cart.updatedAt = new Date();
        await cart.save();
        console.log('Cart saved successfully');

        res.status(200).json({
            success: true,
            message: 'Product added to cart successfully',
            cart
        });
    } catch (error) {
        console.error('Error in addToCart:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding product to cart',
            error: error.message
        });
    }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
    try {
        const { cartId, productId } = req.params;
        const { quantity } = req.body;

        console.log('Update cart item:', { cartId, productId, quantity });

        // Validate cartId
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid cart ID'
            });
        }

        // Validate quantity
        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: 'Quantity must be a positive integer'
            });
        }

        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        const itemIndex = cart.items.findIndex(item => item.productId === Number(productId));
        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Product not found in cart'
            });
        }

        cart.items[itemIndex].quantity = quantity;
        cart.updatedAt = new Date();
        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Cart item updated successfully',
            cart
        });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating cart item',
            error: error.message
        });
    }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
    try {
        const { cartId, productId } = req.params;

        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        cart.items = cart.items.filter(item => item.productId !== Number(productId));
        cart.updatedAt = new Date();
        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Item removed from cart successfully',
            cart
        });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({
            success: false,
            message: 'Error removing item from cart',
            error: error.message
        });
    }
}; 