const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = express.Router();
const app = express();
const path = require("path");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));
mongoose.connect("mongodb+srv://admin-kevin:dkzh19921210@firstdemo-o9czr.mongodb.net/carInsuranceDB", {useNewUrlParser: true});
var mongodb = require("../routes/schema");

var User = mongodb.col.users;

router.post("/register", function (req, res) {
    var newUser = new User({
        username : req.body.username,
        password : req.body.password,
        firstname : req.body.firstName,
        lastname : req.body.lastName,
        email : req.body.eEmail,
        type : "0"
   });
   //检查有没有相同的username
   User.findOne({username: req.body.username, type: '0'},function (err, user) {
       if(user) res.render("register/registererr");
       else{
        newUser.save();
        res.render("driver/driver", {firstName: req.body.firstName, lastName: req.body.lastName});
       }
   });  
});

router.post("/checkIsExist", function (req, res) {
    User.findOne({username: req.body.username, type: '0'},function (err, user) {
        if(user) res.send("0");
        else{
            res.send("1");
        }
    });
});



module.exports = router;