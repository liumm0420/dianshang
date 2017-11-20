var express = require('express');
var router = express.Router();
const validator = require('validator');
const db = require('../modles/db');
const crypto = require('crypto');
const User = require('../modles/User');
const setting = require('../setting');

/* GET home page. */
exports.index = function(req, res, next) {
  
  if(req.session.user){
    // console.log(req.session.user)
    res.json({error:0,user:req.session.user})
  }else{
    console.log(111111111111);
    res.json({error:1,message:'退出成功'})
  }
  // res.render('index', { title: 'Express' });
};

exports.postZhuce = function(req,res,next){
  console.log(123456789);
  console.log(req.body);
  var username = req.body.username;
  var password = req.body.password;
  // 进行数据验证
  let error = '';
  if(!validator.matches(username,/^[a-zA-Z][a-zA-Z0-9_]{4,11}$/, 'g')){
    error = '用户名不符合要求，请重新输入'
  }
  if(!validator.matches(password,/(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{5,12}/,'g')){
    error = '密码不符合要求，请重新输入'
  }
  if(error){
    return res.end(err);
  }
  // 判断用户是否存在
  User.findOne({username:username}).then(function(user){
    if(user){
      return res.end('用户名已存在');
    }
    //密码加密
		let newPsd = db.encrypt(password,setting.PSDkey);
		req.body.password = newPsd;
    db.addOne(req,res,User,'success');
  }).catch(function(err){
    res.end(err);
  })
}

exports.postLogin = function(req,res){
  console.log(req.body);
  var username = req.body.username;
  var password = req.body.password;
  // 进行数据验证
  let error = '';
  if(!validator.matches(username,/^[a-zA-Z][a-zA-Z0-9_]{4,11}$/, 'g')){
    error = '用户名不符合要求，请重新输入'
  }
  if(!validator.matches(password,/(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{5,12}/,'g')){
    error = '密码不符合要求，请重新输入'
  }
  if(error){
    return res.end(err);
  }
  User.getUserByName(username,function(err,user){
    if(err){
      return res.end(err)
    }
    if(!user){
      return res.end('用户不存在')
    }
    let newPsd = db.encrypt(password,setting.PSDkey);
    console.log(newPsd);
    if(newPsd !== user.password){
        return res.end('密码错误')
    }
    req.session.user = user;
    console.log(req.session)
    res.json({error:0,message:'登陆成功，快去购物吧',data:req.session.user})
  })
}

// 退出
exports.tuichu = function(req,res){
  req.session.user = null;
  res.json({error:0,message:'退出账户成功'})
}

