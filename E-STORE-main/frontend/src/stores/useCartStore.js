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
			const res = await axios.post("/cart", { 
				userId,
				productId: product.id,
				quantity: 1
			});
			
			// If this is the first item, set the cart
			if (!get().cart) {
				set({ cart: res.data });
			} else {
				// Otherwise update the products array
				set((state) => ({
					cart: {
						...state.cart,
						products: [...state.cart.products, res.data.products[0]]
					}
				}));
			}
			
			get().calculateTotals();
			toast.success("Product added to cart");
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to add to cart");
		}
	},

	removeFromCart: async (cartId, productId) => {
		try {
			await axios.delete(`/cart/${cartId}`, {
				data: { productId }
			});

			// Update local state
			set((state) => ({
				cart: {
					...state.cart,
					products: state.cart.products.filter(item => item.id !== productId)
				}
			}));
			
			get().calculateTotals();
			toast.success("Item removed from cart");
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to remove item");
		}
	},

	updateQuantity: async (cartId, productId, quantity) => {
		if (quantity === 0) {
			get().removeFromCart(cartId, productId);
			return;
		}

		try {
			const res = await axios.put(`/api/cart/${cartId}`, { 
				productId,
				quantity 
			});

			// Update local state with the updated product
			set((state) => ({
				cart: {
					...state.cart,
					products: state.cart.products.map(item => 
						item.id === productId 
							? { ...item, quantity: quantity }
							: item
					)
				}
			}));
			
			get().calculateTotals();
			toast.success("Cart updated");
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to update cart");
		}
	},

	calculateTotals: () => {
		const { cart } = get();
		if (!cart || !cart.products) return;

		const subtotal = cart.products.reduce((total, item) => {
			return total + (item.price * item.quantity);
		}, 0);

		set({ subtotal, total: subtotal });
	}
}));