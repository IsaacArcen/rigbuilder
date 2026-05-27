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

const ensureDefaultUser = async () => {
    const users = readUsers();
    const defaultUserExists = users.some((user) => user.username === "user");

    if (!defaultUserExists) {
        const hashedPassword = await bcrypt.hash("password", 10);

        users.push({
            id: "user-1",
            username: "user",
            email: "user@example.com",
            password: hashedPassword,
        });

        writeUsers();
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

    const users = readUsers();

    const userExists = users.some(
        (user) => user.username === username || user.email === email
    );

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser =  {
        id: `user-${Date.now()}`,
        username,
        email,
        password: hashedPassword,
    };

    users.push(newUser);
    writeUsers(users);

    res.status(201).json({
        id: newUser.id,
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

    const users = readUsers();
    const user = users.find((item) => item.username === username);

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

module.exports = {
    registerUser,
    loginUser,
    currentUser,
};