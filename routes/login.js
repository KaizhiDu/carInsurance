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

// const userSchema = new mongoose.Schema({
//     _id: String,
//     username: String,
//     password: String,
//     type: String
// });
// const User = mongoose.model("User", userSchema);

router.get("/login", function (req, res) {
    res.render("login.ejs");  
});

router.post("/check", function (req, res) {

    const username = req.body.username;
    const password = req.body.password;
    const type = req.body.usertype;

    User.findOne({username: username, password: password, type: type},function (err, user) {   
        if (err) {
            console.log(err);
            
        } else {
            //console.log(user);
            if (user) {
                switch (user.type) {
                    case "0": res.render("driver/driver", {firstName: user.firstname, lastName: user.lastname});
                        
                        break;
                    case "1": res.render("admin/admin", {userInfo: user});
                        
                        break;
                    case "2": res.render("underwriter/underwriter", {userInfo: user});
                        
                        break;
                
                    default:
                        break;
                }
                
            }
            else{
                res.render("loginerr");
            }
            
        }   
    });  
});

router.post("/checkIsExist", function (req, res) {
    User.findOne({username: req.body.username, password: req.body.password, type: req.body.type},function (err, user) {
        if(user) res.send("1");
        else{
            res.send("0");
        }
    });
});



module.exports = router;