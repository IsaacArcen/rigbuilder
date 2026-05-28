const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    currentUser,
} = require("../controllers/userController");

const validateToken = require("../middleware/validateTokenHandler");

// öppen route kräver ingen token för o skapa användare
router.post("/register", registerUser);