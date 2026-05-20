const asyncHandler = require("express-async-handler");

//Hämtar produkterna från data/products.json
const products = require("../data/products.json");

// @desc    Get all products, or filter by category
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const { category } = req.query;

    if (category) {
        const filteredProducts = products.filter(
            (product) => product.category.toLowerCase() === category.toLowerCase()
        );

        return res.status(200).json(filteredProducts);
    }

    res.status(200).json(products);
});

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = products.find((p) => p.id === req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    res.status(200).json(product);
});

module.exports = {
    getProducts,
    getProductById,
};