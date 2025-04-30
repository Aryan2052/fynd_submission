import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { addToCart } from '../services/cartService';
import { toast } from 'react-toastify';

const ProductDetail = ({ userId }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const productData = await getProductById(id);
                setProduct(productData);
                setError(null);
            } catch (err) {
                setError('Failed to load product');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            await addToCart(userId, product.id);
            toast.success('Product added to cart successfully');
        } catch (err) {
            console.error('Error adding to cart:', err);
            toast.error(err.response?.data?.message || 'Failed to add to cart');
        }
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (!product) return null;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-96 object-contain"
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                    <p className="text-2xl font-semibold text-blue-600 mb-4">
                        ${product.price}
                    </p>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="mb-4">
                        <span className="text-gray-700">Category:</span>{' '}
                        <span className="font-semibold">{product.category}</span>
                    </div>
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="flex items-center border rounded">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-3 py-1"
                            >
                                -
                            </button>
                            <span className="px-3 py-1">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-3 py-1"
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail; 