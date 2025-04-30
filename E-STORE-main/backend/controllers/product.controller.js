import axios from 'axios';

const FAKE_STORE_API = 'https://fakestoreapi.com';
const VALID_CATEGORIES = [
	"electronics",
	"jewelery",
	"men's clothing",
	"women's clothing"
];

export const getAllProducts = async (req, res) => {
	try {
		const response = await axios.get(`${FAKE_STORE_API}/products`);
		res.json(response.data);
	} catch (error) {
		console.error("Error in getAllProducts controller:", {
			message: error.message,
			response: error.response?.data,
			status: error.response?.status
		});
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getProductById = async (req, res) => {
	try {
		const { id } = req.params;
		const response = await axios.get(`${FAKE_STORE_API}/products/${id}`);
		res.json(response.data);
	} catch (error) {
		console.log("Error in getProductById controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getProductsByCategory = async (req, res) => {
	try {
		const { category } = req.params;
		console.log("Fetching products for category:", category);
		
		if (!VALID_CATEGORIES.includes(category)) {
			return res.status(404).json({ message: "Category not found" });
		}
		
		const url = `${FAKE_STORE_API}/products/category/${category}`;
		console.log("Calling FakeStore API:", url);
		
		const response = await axios.get(url);
		console.log("FakeStore API response:", response.data);
		
		res.json(response.data);
	} catch (error) {
		console.error("Error in getProductsByCategory controller:", {
			message: error.message,
			response: error.response?.data,
			status: error.response?.status,
			category: req.params.category
		});
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getAllCategories = async (req, res) => {
	try {
		res.json(VALID_CATEGORIES);
	} catch (error) {
		console.log("Error in getAllCategories controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getFeaturedProducts = async (req, res) => {
	try {
		// Get all products from FakeStore API and return first 4 as featured
		const response = await axios.get(`${FAKE_STORE_API}/products?limit=4`);
		res.json(response.data);
	} catch (error) {
		console.error("Error in getFeaturedProducts controller:", {
			message: error.message,
			response: error.response?.data,
			status: error.response?.status
		});
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const createProduct = async (req, res) => {
	try {
		const { name, description, price, image, category } = req.body;

		const product = await Product.create({
			name,
			description,
			price,
			image: image || "",
			category,
		});

		res.status(201).json(product);
	} catch (error) {
		console.log("Error in createProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		await Product.findByIdAndDelete(req.params.id);

		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.log("Error in deleteProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getRecommendedProducts = async (req, res) => {
	try {
		// Get all products from FakeStore API and return first 4 as recommended
		const response = await axios.get(`${FAKE_STORE_API}/products?limit=4`);
		res.json(response.data);
	} catch (error) {
		console.error("Error in getRecommendedProducts controller:", {
			message: error.message,
			response: error.response?.data,
			status: error.response?.status
		});
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const toggleFeaturedProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (product) {
			product.isFeatured = !product.isFeatured;
			const updatedProduct = await product.save();
			res.json(updatedProduct);
		} else {
			res.status(404).json({ message: "Product not found" });
		}
	} catch (error) {
		console.log("Error in toggleFeaturedProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};