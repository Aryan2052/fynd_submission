import {create} from "zustand";
import axios from "../lib/axios.js";
import {toast} from "react-hot-toast";

const VALID_CATEGORIES = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing"
];

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({products}),

  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/products");
      // FakeStore API returns an array
      set({ products: response.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", loading: false });
      toast.error(error.response?.data?.error || "Failed to fetch products");
    }
  },

  fetchProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      if (!VALID_CATEGORIES.includes(category)) {
        set({ products: [], loading: false });
        toast.error("Invalid category");
        return;
      }
      const response = await axios.get(`/products/category/${category}`);
      set({ products: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.error || "Failed to fetch products by category");
    }
  },

  // The following are for admin/local only, not FakeStore API
  createProduct: async (productData) => {
    toast.error("Product creation is disabled with FakeStore API");
  },
  deleteProduct: async (productId) => {
    toast.error("Product deletion is disabled with FakeStore API");
  },
  toggleFeaturedProduct: async (productId) => {
    toast.error("Feature toggle is disabled with FakeStore API");
  },
}));