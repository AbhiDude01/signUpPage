const express = require('express');
const path = require('path');
const app = express.Router();
const mongoose = require("mongoose");

// schema is called from the schema file which is exported
const User = require("../schema/userSchema");

// connect to the mongoose 
app.use(express.json());
mongoose.connect('mongodb://localhost/signUpForm');
mongoose.connection.on('connect', () => {
    console.log("Mongoose connected")
})


/* GET home page. */
const signUpPageForm = path.join(__dirname, "../templates/signUp.html");

app.get('/', (req, res) => {
    res.sendFile(signUpPageForm);
})

// POST signUp route
app.post('/signUp', async (req, res) => {
    const emailQuery = req.body.email;
    // data fetched in the mongoDB
    let data = await User.findOne({ email: emailQuery });
    if (data) {
        // if data is present the sent 404 
        return res.status(404).send("Email already exists");
    }
    // if the email do not exists then add the user credentials here
    let newData = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    await newData.save();
    // the data is putted in the user schema model and then 
    return res.status(200).send("User signed in successfully");
});



module.exports = app;
