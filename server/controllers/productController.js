const asyncHandler = require("express-async-handler");

//Hämtar produkterna från data/products.json
const Product = require("../models/productModel");

// @desc    Get all products, or filter by category
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const { category } = req.query;

   
//om category finns hämtas endast matchande produkter
const filter = category
    ? { category: category.toLowerCase() }
    : {};

    const products = await Product.find(filter);

    res.status(200).json(products);
});

module.exports = {
    getProducts,
};