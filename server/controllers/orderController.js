const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");

const ordersFilePath = path.join(__dirname, "../data/orders.json");