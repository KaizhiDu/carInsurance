const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const login = require("./routes/login");
const admin = require("./routes/admin");
const register = require("./routes/register");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));
mongoose.connect("mongodb+srv://admin-kevin:dkzh19921210@firstdemo-o9czr.mongodb.net/carInsuranceDB", {useNewUrlParser: true});


app.use("/carinsurance/login", login);
app.use("/carinsurance/admin", admin);
app.use("/carinsurance/register", register);

app.get("/", function (req, res) {
    res.render("index/index.ejs");
});

app.listen(8080, function() {
    console.log("Server started on port 8080");
  });