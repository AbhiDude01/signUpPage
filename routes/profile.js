const express = require('express');
const path = require('path');
const app = express.Router();
const mongoose = require("mongoose");

const User = require("../schema/userSchema");
const AuthMiddleware = require('../middleware/authentication');
const upload = require('../config/multer.config');

const profilePage = path.join(__dirname, "../templates/profile.html");

app.get('/', (req, res) => {
    res.sendFile(profilePage);
})

mongoose.connect('mongodb://localhost/signUpForm');
mongoose.connection.on('connect', () => {
    console.log("Mongoose connected")
})

app.use(AuthMiddleware);
app.get('/verifyUser', async (req, res) => {
    let decode = req.decode;
    let data = await User.findOne({ email: decode.email });
    if (!data) {
        return res.status(401).send("Email doesn't exists");
    }
    res.status(200).json(data);
})

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const name = req.body.name;
        const password = req.body.password;
        // let imageName = req.file;
        // console.log(imageName);
        let imageUrl = ""
        try {
            imageUrl = `/assets/${req.file.originalname}`;
        } catch (error) {
        }
        await User.findOneAndUpdate(
            { email: req.decode.email },
            {
                $set: {
                    name: name,
                    password: password,
                    imageUrl: imageUrl
                }
            },
            { new: true }
        );
        res.status(200).send("Changes applied");
    } catch (err) {
        console.log(err);

        res.status(500).send("Interval server error");
    }

})
module.exports = app;
