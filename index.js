const express = require("express")
const app = express();
// express is imported here

// routes are setted here
const signUp = require("./routes/signUp");
const login = require("./routes/login");
const profile = require("./routes/profile");
const adminPage = require("./routes/adminPage");

// cors middleware is implemented here
const cors = require('cors');
app.use(cors())

// this middleware is used to parse incoming request with JSON payload
app.use(express.json())

// different routes are assigned to different URLs
app.use('/', signUp);
app.use('/assets', express.static('uploads')); // this is route for the uploads folder
app.use('/login', login)
app.use('/profile', profile);
app.use('/adminPage', adminPage);


// server port is listening to 5050 
const port = 5050;
app.listen(port, () => {
    console.log(`server started listening at : http://localhost:${port} `)
});