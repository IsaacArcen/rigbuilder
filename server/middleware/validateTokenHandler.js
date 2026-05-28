const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

//middleware som kontrollerar om request har en giltig jwt-token
const validateToken = asyncHandler(async (req, res, next) => {
    let token;

    //läser auth-headern från requesten
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }

            req.user = decoded.user;
            next();
        });
    } else {
        res.status(401);
        throw new Error("Token is missing or malformed");
    }
});

module.exports = validateToken;