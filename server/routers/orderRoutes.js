const express = require("express");
const router = express.Router();

//Import orderController funktioner
const {
    createOrder,
    getOrders,
} = require("../controllers/orderController");

//Route för api/orders
//GET hämtar alla orders.
//POST skapar ny order.
router.route("/").get(getOrders).post(createOrder);

//export
module.exports = router;