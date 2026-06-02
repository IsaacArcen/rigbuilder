//Läser orders från order.json
//Kollar igenom data för nya orders
// Sparar datan från orders
const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");


// @desc Create a new order
// @route POST /api/orders
// @access public
const createOrder = asyncHandler(async (req, res) => {
    //frontend skickar customer items och totalPrice
    const { customer, items, totalPrice } = req.body;

    //if cases kontrollerar att grundläggande info finns
    if (!customer || !items || !totalPrice) {
        res.status(400);
        throw new Error("Missing order data");
    }

    if (!customer.name || !customer.email || !customer.phone) {
        res.status(400);
        throw new Error("Missing customer details");
    }

    if (
        customer.paymentMethod !== "card" &&
        customer.paymentMethod !== "swish"
    ) {
        res.status(400);
        throw new Error("Invalid payment method.");
    }

    if (!Array.isArray(items) || items.length === 0) {
        res.status(400);
        throw new Error("Order must contain at least one item");
    }

    //skapa ny order
    //date.now() enkelt unikt id
    const newOrder = await Order.create({
        customer,
        items,
        totalPrice,
    });

    res.status(201).json(newOrder);
});

//Exporta så orderRoutes.js kan använda funktionerna
module.exports = {
    createOrder,
};