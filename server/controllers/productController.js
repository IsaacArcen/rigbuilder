const asyncHandler = require("express-async-handler");

//Hämtar produkterna från data/products.json
const Product = require("../models/productModel");

// @desc    Get all products, or filter by category
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const { category } = req.query;

   
//dynamiskt filter så samma ENDPOINT kan hämta alla produkter och specifik kategori (ifall vidarutveckling)
const filter = category
    ? { category: category.toLowerCase() }
    : {};

    const products = await Product.find(filter);

    res.status(200).json(products);
});

module.exports = {
    getProducts,
};