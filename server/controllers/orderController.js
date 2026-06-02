//Läser orders från order.json
//Kollar igenom data för nya orders
// Sparar datan från orders
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

    const orders = readOrders();
    //skapa ny order
    //date.now() enkelt unikt id
    const newOrder = {
        id: `order-${Date.now()}`,
        customer,
        items,
        totalPrice,
        createdAt: new Date().toISOString(),
    };

    //lägger till nya order i listan
    orders.push(newOrder);
    writeOrders(orders);
    //201 = "created"
    res.status(201).json(newOrder);
});

//Exporta så orderRoutes.js kan använda funktionerna
module.exports = {
    createOrder,
    getOrders,
};