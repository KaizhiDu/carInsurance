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

router.get("/data", function (req, res) {
     var queryParams = req.query;
     
     var condition = new Object();
     condition.adminprove = 0;
     if (queryParams.firstname!="") {
         condition.firstname = queryParams.firstname;
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
