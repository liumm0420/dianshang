var express = require('express');
var router = express.Router();
var User = require('../modles/User')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });



exports.paymoney = function(req,res,next){
  // console.log(req.body.arr);
  User.getUserById(req.session.user._id,function(err,user){
    if(err){
      return res.end(err);
    }
    user.pay_list = [];
    req.body.arr.forEach(function(data){
      user.pay_list.push(data);
    })
    
    console.log(user.pay_list);
    user.save();
    req.session.user = user;
    res.json({error:0,message:'成功'})
  })

}

