const express = require("express");
const app = express.Router();
const path = require("path")

const mongoose = require("mongoose");
// const AuthMiddleware = require("../middleware/authentication");
const adminAuthMiddleware = require("../middleware/adminAuth");

const User = require("../schema/userSchema");



app.use(express.json());
mongoose.connect('mongodb://localhost/signUpForm');
mongoose.connection.on('connect', () => {
    console.log("mongoose connect");
})


const adminPage = path.join(__dirname, "../templates/adminPage.html");

app.get('/', (req, res) => {
    res.sendFile(adminPage);

})

// app.use(AuthMiddleware);
app.use(adminAuthMiddleware);

app.get('/verify', async (req, res) => {
    // let decode = req.decode;
    let data = await User.find();
    res.send({ data });
})

app.post('/populateData', (req, res) => {
    // console.log(req.body);
    let data = req.body;
    res.json(data);
})

app.post('/editData', async (req, res) => {
    try {
        let docID = req.body.docID;
        let email = req.body.email;
        let name = req.body.name;
        let password = req.body.password;
        let ActiveStatus = req.body.checkedStatus;// if true then block the user 
        await User.findByIdAndUpdate(docID, {
            $set: {
                name: name,
                email: email,
                password: password,
                ActiveStatus: ActiveStatus
            }
        },
            { new: true }
        );
        res.status(200).send("changes applied");
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).send(error.message || "Interval server error");
    }

})

app.post('/deleteData', async (req, res) => {
    try {
        let docID = req.body.docID;
        await User.findByIdAndDelete(docID);
        res.status(200).send("User removed");
    } catch (error) {
        console.log(error);
        res.status(500).send("Interval server error");
    }
})

module.exports = app;