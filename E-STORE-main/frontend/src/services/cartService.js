import api from './api';

export const getCart = async (userId) => {
    try {
        const response = await api.get(`/cart/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
};

export const addToCart = async (userId, productId) => {
    try {
        const response = await api.post('/cart/add', {
            userId,
            productId
        });
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
};

export const updateCartItem = async (cartId, productId, quantity) => {
    try {
        const response = await api.put(`/cart/${cartId}/product/${productId}`, {
            quantity
        });
        return response.data;
    } catch (error) {
        console.error('Error updating cart item:', error);
        throw error;
    }
};

export const removeFromCart = async (cartId, productId) => {
    try {
        const response = await api.delete(`/cart/${cartId}/product/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing from cart:', error);
        throw error;
    }
}; 