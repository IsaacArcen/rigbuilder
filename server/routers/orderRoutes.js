const express = require("express");
const router = express.Router();

//Import orderController funktioner
const {
    createOrder,
    getOrders,
} = require("../controllers/orderController");

