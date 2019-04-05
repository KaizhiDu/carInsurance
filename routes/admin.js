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

const quoteSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    age: Number,
    state: String,
    driverlicense: String,
    make: Number,
    dui: Number,
    accin3y: Number,
    score: Number,
    charge: Number,
    adminprove: Number,
    uwprove: Number,
    driver: {
        username: String,
        password: String
    }

});
const Quote = mongoose.model("Quotes", quoteSchema);


router.get("/home", function (req, res) {

    res.render("admin/admin");

});

router.get("/permitquote", function (req, res) {
    res.render("admin/permitquote");
});

router.get("/data", function (req, res) {

     var queryParams = req.query;
     
     var condition = new Object();
     if (queryParams.firstname!="") {
         condition.firstname = queryParams.firstname;
     }
     if (queryParams.lastname!="") {
         condition.lastname = queryParams.lastname;
     }
     if (queryParams.age!="") {
        condition.age = queryParams.age;
    }
    if (queryParams.state!="") {
        condition.state = queryParams.state;
    }
    if (queryParams.make!="") {
        condition.make = queryParams.make;
    }
    if (queryParams.dui!="") {
        condition.dui = queryParams.dui;
    }
    if (queryParams.accin3y!="") {
        condition.accin3y = queryParams.accin3y;
    }
    if (queryParams.score!="") {
        condition.score = queryParams.score;
    }
    if (queryParams.charge!="") {
        condition.charge = queryParams.charge;
    }
    if (queryParams.adminprove!="") {
        condition.adminprove = queryParams.adminprove;
    }
    if (queryParams.uwprove!="") {
        condition.uwprove = queryParams.uwprove;
    }
    if (queryParams.username!="") {
        condition.username = queryParams.username;
    }
     var params= {
         page: queryParams.page,
         size: queryParams.size,
         condition: condition
     };
 
     //根据分页条件查询数据条数
     getPagination(params,function(err,users){
         if(err){
             res.send({success:false,msg:err,data:null});
         }else{
             People.find(params.condition, function (err, peoples) {
                 if (err) {
                     res.send({success:false,msg:err,data:null});
                 } else {
                     res.send({'success':true,'msg':"获取用户列表成功",'total':peoples.length,'rows':users});
                 }
             });
         }
     });
 });

 //得到分页
function getPagination (params, callback) {
    var index = (params.page-1)*params.size;//设置分页起点下标
    var size = parseInt(params.size);
    //设置分页条件
    var query = People.find(params.condition, function (err, peoples) {});
    query.limit(size);//条数
    query.skip(index);//下标

    //执行查询
    query.exec(function(err,users){
        callback(err,users);
    });
}


module.exports = router;
