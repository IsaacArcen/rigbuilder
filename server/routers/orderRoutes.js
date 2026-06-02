const express = require("express");
const router = express.Router();

//Import orderController funktioner
const {
    createOrder,
} = require("../controllers/orderController");

//Route för api/orders
//GET hämtar alla orders.
//POST skapar ny order.
router.route("/").post(createOrder);

//export
module.exports = router;