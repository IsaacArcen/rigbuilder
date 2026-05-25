const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");

const ordersFilePath = path.join(__dirname, "../data/orders.json");

//Läser alla orders i JSON-filen
const readOrders = () => {
    const orderData = fs.readFileSync(ordersFilePath, "utf8");
    return JSON.parse(orderData);
};

//Skriver uppdaterade orders till JSON.filen
const writeOrders = (orders) => {
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
};

// @desc Create a new order
// @route POST /api/orders
// @access public
const createOrder = asyncHandler(async (req, res) => {
    const { customer, items, totalPrice } = req.body;

    if (!customer || !items || !totalPrice) {
        res.status(400);
        throw new Error("Missing order data");
    }

    if (!customer.name || !customer.email || !customer.phone) {
        res.status(400);
        throw new Error("Missing customer details");
    }

    if (!Array.isArray(items) || items.length === 0) {
        res.status(400);
        throw new Error("Order must contain at least one item");
    }
})