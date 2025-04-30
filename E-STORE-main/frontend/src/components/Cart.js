import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart, updateCartItem, removeFromCart } from '../services/cartService';

const Cart = ({ userId }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                setLoading(true);
                const cartData = await getCart(userId);
                setCart(cartData[0]); // Get the first cart
                setError(null);
            } catch (err) {
                setError('Failed to load cart');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchCart();
        }
    }, [userId]);

    const handleQuantityChange = async (productId, newQuantity) => {
        try {
            if (newQuantity < 1) return;
            const updatedCart = await updateCartItem(cart.id, productId, newQuantity);
            setCart(updatedCart);
        } catch (err) {
            console.error('Error updating quantity:', err);
        }
    };

    const handleRemoveItem = async (productId) => {
        try {
            const updatedCart = await removeFromCart(cart.id, productId);
            setCart(updatedCart);
        } catch (err) {
            console.error('Error removing item:', err);
        }
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (!cart || !cart.products.length) {
        return (
            <div className="text-center py-8">
                <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
                <Link
                    to="/products"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    const total = cart.products.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
            <div className="grid gap-6">
                {cart.products.map(item => (
                    <div
                        key={item.productId}
                        className="border rounded-lg p-4 flex items-center justify-between"
                    >
                        <div className="flex items-center space-x-4">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-20 h-20 object-cover rounded"
                            />
                            <div>
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="text-gray-600">${item.price}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center border rounded">
                                <button
                                    onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                    className="px-3 py-1"
                                >
                                    -
                                </button>
                                <span className="px-3 py-1">{item.quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                    className="px-3 py-1"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={() => handleRemoveItem(item.productId)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 border-t pt-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Total: ${total.toFixed(2)}</h3>
                    <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart; 