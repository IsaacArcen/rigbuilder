const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users.json");

//läser användare från json
const readUsers = () => {
    const usersData = fs.readFileSync(usersFilePath, "utf8");
    return JSON.parse(usersData);
};

//skriver användare till json-filen
const writeUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

//skapar JWT token
const createAccessToken = (user) => {
    return jwt.sign(
    {
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
        },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
    );
};