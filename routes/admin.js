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

var Quote = mongodb.col.quotes;
var User = mongodb.col.users;

router.get("/data2", function (req, res) {
    var queryParams = req.query;
    var condition = new Object();
    condition.isUm = "1";
     if (queryParams.firstname!="") {
         condition.firstname = queryParams.firstname;
     } 
     if (queryParams.lastname!="") {
        condition.lastname = queryParams.lastname;
    } 
    if (queryParams.username!="") {
        condition.username = queryParams.username;
    } 
    if (queryParams.active!="") {
        condition.active = queryParams.active;
    }    
     var params= {
         page: queryParams.page,
         size: queryParams.size,
         condition: condition
     };

     //根据分页条件查询数据条数
     getPagination2(params,function(err,users){
        if(err){
            res.send({success:false,msg:err,data:null});
        }else{
            User.find(params.condition, function (err, underwriters) {          
                if (err) {
                    res.send({success:false,msg:err,data:null});
                } else {
                    res.send({'success':true,'msg':"获取用户列表成功",'total':underwriters.length,'rows':users});
                }
            });
        }
    });
});

 //得到分页
 function getPagination2 (params, callback) {
    var index = (params.page-1)*params.size;//设置分页起点下标
    var size = parseInt(params.size);
    //设置分页条件
    var query = User.find(params.condition, function (err, underwriters) {});
    query.limit(size);//条数
    query.skip(index);//下标

    //执行查询
    query.exec(function(err,users){
        callback(err,users);
    });
}

router.post("/create", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;

    var newUser = new User({
        username : username,
        password : password,
        firstname : firstname,
        lastname : lastname,
        active: "active",
        type : "2",
        isUm: "1"
        
   });

   console.log(newUser);
   var flag = "1";
   //检查有没有相同的username
   User.findOne({username: req.body.username, type: '2'},function (err, user) {
    if(user) flag = "0";
    }); 
    User.findOne({username: req.body.username, type: '3'},function (err, user) {
        if(user) flag = "0";
        });
    if(flag=="1"){
        newUser.save();
    }
    res.send(flag);    
});

router.post("/active", function (req, res) {
    var content = req.body.content;
    //console.log(content);  
    const id = mongoose.Types.ObjectId(req.body.id);
    //console.log(id);
    if (content == "active") {
        User.updateOne({_id: id}, {active: content, type: "2"}, function (err, user) {
            console.log(user);
        });
    }
    else{
        User.updateOne({_id: id}, {active: content, type: "3"}, function (err, user) {
            console.log(user);
        });
    }
    
    res.send("1");
});

router.get("/data", function (req, res) {
     var queryParams = req.query;
     
     var condition = new Object();
     
     if (queryParams.firstname!="") {
         condition.firstname = queryParams.firstname;
     }
     if (queryParams.age!="") {
        condition.age = queryParams.age;
    }
    if (queryParams.uwprove!="") {
        condition.uwprove = queryParams.uwprove;
    }
    if (queryParams.make!="") {
        condition.make = queryParams.make;
    }
    if (queryParams.accin3y!="") {
        condition.accin3y = queryParams.accin3y;
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
            Quote.find(params.condition, function (err, quotes) {             
                 if (err) {
                     res.send({success:false,msg:err,data:null});
                 } else {
                     res.send({'success':true,'msg':"获取用户列表成功",'total':quotes.length,'rows':users});
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
    var query = Quote.find(params.condition, function (err, quotes) {});
    query.limit(size);//条数
    query.skip(index);//下标

    //执行查询
    query.exec(function(err,users){
        callback(err,users);
    });
}

router.post("/deny", function (req, res) {
    const id = mongoose.Types.ObjectId(req.body.id);
    Quote.deleteOne({"_id": id}, function (err) {
        if (err) {
            console.log(err);
            
        } else {
            //console.log("successful delete");
        }
    });
    
});

router.post("/permit", function (req, res) {
    const id = mongoose.Types.ObjectId(req.body.id);
    Quote.update({_id: id}, {adminprove: "1"}, function (err) {
        if(err){
            console.log(err);
        }else{
            //console.log("successful update");
        }
    });

});



module.exports = router;
