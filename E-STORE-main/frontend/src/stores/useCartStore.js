import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
	cart: null,
	total: 0,
	subtotal: 0,

	getCartItems: async (userId) => {
		try {
			const res = await axios.get(`/cart/user/${userId}`);
			set({ cart: res.data });
			get().calculateTotals();
		} catch (error) {
			set({ cart: null });
			toast.error(error.response?.data?.message || "Failed to fetch cart");
		}
	},

	clearCart: async () => {
		set({ cart: null, total: 0, subtotal: 0 });
	},

	addToCart: async (userId, product) => {
		try {
			console.log('Adding to cart:', { userId, productId: product.id, product });
			const res = await axios.post("/cart/add", {
				userId,
				productId: product.id,
				product: {
					title: product.title,
					price: product.price,
					description: product.description,
					category: product.category,
					image: product.image
				}
			});
			
			console.log('Add to cart response:', res.data);
			set({ cart: res.data.cart });
			get().calculateTotals();
			toast.success("Product added to cart");
		} catch (error) {
			console.error('Error adding to cart:', error.response?.data || error);
			toast.error(error.response?.data?.message || "Failed to add to cart");
		}
	},

	removeFromCart: async (cartId, productId) => {
		try {
			const res = await axios.delete(`/cart/${cartId}/product/${productId}`);
			set({ cart: res.data.cart });
			get().calculateTotals();
			toast.success("Item removed from cart");
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to remove item");
		}
	},

	updateQuantity: async (cartId, productId, quantity) => {
		try {
			const res = await axios.put(`/cart/${cartId}/product/${productId}`, {
				quantity
			});
			set({ cart: res.data.cart });
			get().calculateTotals();
			toast.success("Cart updated");
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to update cart");
		}
	},

	calculateTotals: () => {
		const { cart } = get();
		if (!cart || !cart.items) return;

		const subtotal = cart.items.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);
		const total = subtotal; // Add shipping, tax, etc. if needed

		set({ subtotal, total });
	}
}));