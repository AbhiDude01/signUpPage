const userModel = require("../schema/userSchema");
const User = require("../schema/userSchema");
// json web token is imported here
const jwt = require("jsonwebtoken");
// secret key is setted here
const secretKey = "abhi@jeet";

// authentication middleware is defined here
const AuthMiddleware = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        var decode = jwt.verify(token, secretKey);
        req.decode = decode;
        next();
    } catch (error) {
        req.error = error;
        res.status(401).send({ error: "Not Authenticated" })
        return req.error
    }
}

module.exports = AuthMiddleware;