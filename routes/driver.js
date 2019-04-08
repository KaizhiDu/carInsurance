const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = express.Router();
const app = express();
const path = require("path");
const mongodb = require("../routes/schema.js");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));
mongoose.connect("mongodb+srv://admin-kevin:dkzh19921210@firstdemo-o9czr.mongodb.net/carInsuranceDB", {useNewUrlParser: true});

var Quote = mongodb.col.quotes;

// router.get("/quote", function (req, res) {
//     res.render("quote.ejs");  
// });
// router.get("/driver", function (req, res) {
//     res.render("driver.ejs");  
// });

router.post("/check", function (req, res) {

    // const username = req.body.username;
    // const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const aage = req.body.age;
    const state = req.body.state;
    const driverlicense = req.body.driverlicense;
    const make = req.body.make;
    const dui = req.body.dui;
    const accin3y = req.body.accin3y;
    // const score = req.body.score;
    // const charge = req.body.charge;
    // console.log(score);
    // console.log(charge);
    const username = req.body.username;
    const password = req.body.password;
    // const adminprove = req.body.adminprove;
    // const uwprove = req.body.uwprove;
    const driver = {
        firstname,
        lastname,
    	username, 
    	password    
    }

    var score = 0;
    var charge = 0;
    var age = parseInt(aage);
    if (age>=16&&age<18) {
        score = score + 4;
      }
      if (age>=18&&age<21) {
        score = score + 3;
      }
      if (age>=21&&age<25) {
        score = score + 2;
      }
      if (age>=25) {
        score = score + 1;
      }
      switch (accin3y) {
        case '3':
          score = score + 4;
          break;
          case '2':
          score = score + 3;
          break;
          case '1':
          score = score + 2;
          break;
      
        default:
          break;
      }

      charge = score * 200;


    var newQuote = new Quote({	firstname: firstname,
    					lastname: lastname,
    					age: aage,
    					state: state,
    					driverlicense: driverlicense,
    					make: make,
    					dui: dui,
    					accin3y: accin3y,
    					score: score,
    					charge: charge,
    					driver: driver,
                        adminprove: 0,
    				});

                newQuote.save();

                res.render("driver/driver", {firstName: firstname, lastName: lastname}); // think about send to which page 
            

            
});

module.exports = router;