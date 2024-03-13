const mongoose = require("mongoose")

// set schema 
const userData = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    imageUrl: String,
    ActiveStatus: Boolean
})

// the user data schema is set in the model of mongoose 
const userModel = new mongoose.model("userData", userData);
// the user data schema model is exported 
module.exports = userModel;