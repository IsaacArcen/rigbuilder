const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    currentUser,
    getFavorites,
    addFavorite,
    removeFavorite,
} = require("../controllers/userController");

const validateToken = require("../middleware/validateTokenHandler");

// öppen route kräver ingen token för o skapa användare
router.post("/register", registerUser);

//öppen route ingen token för o logga in
router.post("/login", loginUser);

//skyddad route krväver JWT-token
router.get("/current", validateToken, currentUser);

//alla favorites routes
router.get("/favorites", validateToken, getFavorites);

router.post("/favorites", validateToken, addFavorite);

router.delete("/favorites", validateToken, removeFavorite);

module.exports = router;