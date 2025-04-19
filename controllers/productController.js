const products = require("../data/products.json");

let cart = [];
let wishlist = [];

const getAllProducts = (req, res) => {
  const { category, minPrice, maxPrice, sort, page = 1, limit = 6 } = req.query;

  let filteredProducts = [...products];

  if (category) {
    const categories = category.split(",");
    filteredProducts = filteredProducts.filter((product) => categories.includes(product.category));
  }

  if (minPrice || maxPrice) {
    filteredProducts = filteredProducts.filter((product) => {
      return (!minPrice || product.price >= Number(minPrice)) &&
             (!maxPrice || product.price <= Number(maxPrice));
    });
  }

  if (sort) {
    if (sort === "priceLowToHigh") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "priceHighToLow") {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sort === "latest") {
      filteredProducts.sort((a, b) => b.id - a.id);
    }
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  res.json({
    products: paginatedProducts,
    total: filteredProducts.length,
    page: Number(page),
    limit: Number(limit)
  });
};

const addToCart = (req, res) => {
  const { productId } = req.body;
  const product = products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  cart.push(product);
  res.json({ message: "Product added to cart", cart });
};

const addToWishlist = (req, res) => {
  const { productId } = req.body;
  const product = products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  wishlist.push(product);
  res.json({ message: "Product added to wishlist", wishlist });
};

module.exports = {
  getAllProducts,
  addToCart,
  addToWishlist
};
