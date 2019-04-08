var mongoose = require("mongoose");
var mongodb = mongoose.connect("mongodb+srv://admin-kevin:dkzh19921210@firstdemo-o9czr.mongodb.net/carInsuranceDB", {useNewUrlParser: true});

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    email: String,
    type: String,
});

var quoteSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    age: Number,
    state: String,
    driverlicense: String,
    make: String,
    dui: Number,
    accin3y: Number,
    score: Number,
    charge: Number,
    adminprove: Number,
    uwprove: Number,
    comment: String,
    driver: {
        firstname: String,
        lastname: String,
        username: String,
        password: String
    }

});

mongodb.col={};
mongodb.col.users = mongoose.model("User", userSchema);
mongodb.col.quotes = mongoose.model("Quote", quoteSchema);

module.exports = mongodb;