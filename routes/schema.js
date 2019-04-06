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
mongodb.col={};
mongodb.col.users = mongoose.model("User", userSchema);

module.exports = mongodb;