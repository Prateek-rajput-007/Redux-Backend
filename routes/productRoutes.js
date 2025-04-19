const express = require("express");
const router = express.Router();
const { getAllProducts, addToCart, addToWishlist } = require("../controllers/productController");

router.get("/products", getAllProducts);
router.post("/cart", addToCart);
router.post("/wishlist", addToWishlist);

module.exports = router;
