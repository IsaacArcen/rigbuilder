const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//skapar JWT token
const createAccessToken = (user) => {
    return jwt.sign(
    {
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
    );
};

const ensureDefaultUser = async () => {
    const defaultUser = await User.findOne({ username: "user" });

    if (!defaultUser) {
        const hashedPassword = await bcrypt.hash("password", 10);

        await User.create({
            username: "user",
            email: "user@example.com",
            password: hashedPassword,
            favorites: [],
        });
    }
};

// @desc Register user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Please fill in all fields.");
    }

    const userExists = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (userExists) {
        res.status(400);
        throw new Error("Username or email already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser =  await User.create({
        username,
        email,
        password: hashedPassword,
        favorites: [],
    });

    res.status(201).json({
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
    });
});

// @desc Login a user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    await ensureDefaultUser();

    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400);
        throw new Error("Please enter username and password");
    }

    const user = await User.findOne({ username });

    if (!user) {
        res.status(401);
        throw new Error("Invalid username or password");
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
        res.status(401);
        throw new Error("Invalid username or password");
    }

    const accessToken = createAccessToken(user);

    res.status(200).json({ accessToken });
});

// @desc Current user
// @route GET /api/users/content
// @access private
const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

// @desc Get logged in user favorites
// @route GET /api/users/favorites
// @access private
const getFavorites = asyncHandler(async (req, res) => {
    //req.user från validateTokenHandler
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    //skickar array med produkterna
    res.status(200).json(user.favorites);
});

// @desc Add product to favorites
// @route POST /api/users/favorites
// @access private
const addFavorite = asyncHandler(async (req, res) => {
    //skickar produkternas id från frontend till req.body
    const { productId } = req.body;

    if (!productId) {
        res.status(400);
        throw new Error("Product id is required");
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    //om produkt redan är sparad
    if (!user.favorites.includes(productId)) {
        user.favorites.push(productId);
        await user.save();
    }

    res.status(200).json(user.favorites);
});

// @desc Remove product from favorites
// @route DELETE /api/users/favorites/:productId
// @access private
const removeFavorite = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user.id);
    
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    //filter skapar en array utan produkten som ska deletas
    user.favorites = user.favorites.filter(
        (productId) => productId !== req.params.productId
    );

    await user.save();

    //skickar den uppdaterade listan
    res.status(200).json(user.favorites);
});

module.exports = {
    registerUser,
    loginUser,
    currentUser,
    getFavorites,
    addFavorite,
    removeFavorite,
};