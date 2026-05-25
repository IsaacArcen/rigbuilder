const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");

const ordersFilePath = path.join(__dirname, "../data/orders.json");

//Läser alla orders i JSON-filen
const readOrders = () => {
    const orderData = fs.readFileSync(ordersFilePath, "utf8");
    return JSON.parse(orderData);
};