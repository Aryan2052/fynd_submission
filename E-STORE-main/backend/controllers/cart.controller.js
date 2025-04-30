import axios from 'axios';

const FAKE_STORE_API = 'https://fakestoreapi.com';

export const getUserCart = async (req, res) => {
	try {
		const { userId } = req.params;
		// Get user's cart from FakeStore API
		const response = await axios.get(`${FAKE_STORE_API}/carts/user/${userId}`);
		
		// Get product details for each item in cart
		const cart = response.data[0]; // Get most recent cart
		if (cart && cart.products) {
			const productsWithDetails = await Promise.all(
				cart.products.map(async (item) => {
					const productResponse = await axios.get(`${FAKE_STORE_API}/products/${item.productId}`);
					return {
						...productResponse.data,
						quantity: item.quantity
					};
				})
			);
			cart.products = productsWithDetails;
		}
		
		res.json(cart || { products: [] });
	} catch (error) {
		console.log("Error in getUserCart controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const addToCart = async (req, res) => {
	try {
		const { userId, productId, quantity = 1 } = req.body;
		
		// Create new cart entry according to FakeStore API format
		const cartData = {
			userId,
			date: new Date().toISOString(),
			products: [{
				productId: parseInt(productId),
				quantity: parseInt(quantity)
			}]
		};

		// Add cart to FakeStore API
		const response = await axios.post(`${FAKE_STORE_API}/carts`, cartData);
		
		// Get product details to return to client
		const productResponse = await axios.get(`${FAKE_STORE_API}/products/${productId}`);
		const cartResponse = {
			...response.data,
			products: [{
				...productResponse.data,
				quantity
			}]
		};

		res.json(cartResponse);
	} catch (error) {
		console.log("Error in addToCart controller", error.message);
		res.status(400).json({ message: "Failed to add to cart", error: error.message });
	}
};

export const updateCartItem = async (req, res) => {
	try {
		const { cartId } = req.params;
		const { productId, quantity } = req.body;

		// Get current cart
		const cartResponse = await axios.get(`${FAKE_STORE_API}/carts/${cartId}`);
		const cart = cartResponse.data;

		// Update product quantity
		const updatedProducts = cart.products.map(product => 
			product.productId === parseInt(productId) 
				? { ...product, quantity: parseInt(quantity) }
				: product
		);

		// Update cart in FakeStore API
		const response = await axios.put(`${FAKE_STORE_API}/carts/${cartId}`, {
			...cart,
			products: updatedProducts
		});

		// Get product details for response
		const productResponse = await axios.get(`${FAKE_STORE_API}/products/${productId}`);
		
		res.json({
			...response.data,
			updatedProduct: {
				...productResponse.data,
				quantity
			}
		});
	} catch (error) {
		console.log("Error in updateCartItem controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const removeFromCart = async (req, res) => {
	try {
		const { cartId } = req.params;
		const { productId } = req.body;

		// Get current cart
		const cartResponse = await axios.get(`${FAKE_STORE_API}/carts/${cartId}`);
		const cart = cartResponse.data;

		// Remove product from cart
		const updatedProducts = cart.products.filter(product => 
			product.productId !== parseInt(productId)
		);

		// Update cart in FakeStore API
		const response = await axios.put(`${FAKE_STORE_API}/carts/${cartId}`, {
			...cart,
			products: updatedProducts
		});

		res.json(response.data);
	} catch (error) {
		console.log("Error in removeFromCart controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};