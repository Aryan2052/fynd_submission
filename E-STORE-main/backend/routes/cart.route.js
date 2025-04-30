import express from "express";
import {
    getUserCart,
    addToCart,
    updateCartItem,
    removeFromCart
} from "../controllers/cart.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/user/:userId", getUserCart);
router.post("/", protectRoute, addToCart);
router.put("/:cartId/product/:productId", protectRoute, updateCartItem);
router.delete("/:cartId/product/:productId", protectRoute, removeFromCart);

export default router;