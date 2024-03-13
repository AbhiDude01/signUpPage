const express = require('express');
const path = require('path');
const app = express.Router();
const mongoose = require("mongoose");
// json web token is imported 
const jwt = require("jsonwebtoken");
const User = require("../schema/userSchema");



// mongo db is connected here
app.use(express.json());
mongoose.connect('mongodb://localhost/signUpForm');
mongoose.connection.on('connect', () => {
    console.log("Mongoose connected")
})

// html page path is getted here
const loginPageForm = path.join(__dirname, "../templates/login.html");

// POST route defined here
app.post('/verify', async (req, res) => {
    let queryEmail = req.body.email;
    let queryPassword = req.body.password;
    // email and password is set in the variable 

    if (queryEmail === "admin@gmail.com" && queryPassword === "admin") {
        // Generate token for admin
        const authKey = "auth@admin";
        // secret key is set here
        const token = jwt.sign({ email: queryEmail, isAdmin: true }, authKey);
        // Send token to the client side
        return res.json({ token });
    }

    let data = await User.findOne({ email: queryEmail });
    // user credentials is fetched from the database through the email
    if (!data) {
        // if data is not found then send error status
        return res.status(401).send("Email doesn't exists");
    }
    // checking and validating the email and password
    if (data.password !== queryPassword || data.email !== queryEmail) {
        return res.status(401).send("Invalid username and password");
    }
    const secretKey = "abhi@jeet";
    // through the email and secret key the token is generated
    const token = jwt.sign({ email: queryEmail, isAdmin: false }, secretKey);
    // token is sent to the client side
    res.json({ token })
})

// GET route is defined here 
app.get('/', (req, res) => {
    res.sendFile(loginPageForm);
})


module.exports = app;