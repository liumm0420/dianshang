var express = require('express');
var router = express.Router();
var db = require('../modles/db');
var Good = require('../modles/Good');
var User = require('../modles/User');
var multer = require('multer');
var validator = require('validator');
var Reply = require('../modles/Reply')
const saveMessage = require('../common/message');
// 选择地址
exports.choose = function(req,res,next){
//  console.log(req.body);
    var ins = req.body.ins;
    var userId = req.body.userId;
    var isCheckd = false;
    User.getUserById(userId,function(err,user){
        if(err){
            return res.end(err);
        }
        user.shop_address.forEach(function(shopaddr){
            shopaddr.isCheckd = false;
        })
        user.shop_address[ins].isCheckd = true;
        var users = new User(user);
        users.save(); 
//      console.log(users);
        req.session.user = users;
        res.json({error:0,user:req.session.user})
    })
}
// 点击地址
exports.checkd = function(req,res,next){
    var checked_addr = [];
    User.getUserById(req.session.user._id,(err,user)=>{
        if(err){
            return res.end(err);
        }
        user.shop_address.forEach(function(address){
            if(address.isCheckd == true){
                checked_addr.push(address);
            }
        })
//      console.log(checked_addr);
        res.json({error:0,data:checked_addr})
    })
}
// 去付款
exports.addpay = function(req,res,next){
	console.log(req.body.shop);
    var shop = req.body.shop;
	User.getUserById(req.session.user._id,(err,user)=>{
		if(err){
			return res.end(err);
        }
        shop.forEach(function(data){
            user.shop_cart.splice(data._id,1)
        })
        
        user.pay_list = [];
        shop.forEach(function(data){
            user.way_list.push(data);
        })
		
		console.log(user.way_list);
		var users = new User(user);
		user.save();
		req.session.user = user;
		res.json({error:0,user:req.session.user})
	})
	
}
// 确认收货
exports.queren = function(req,res,next){
//	console.log(req.body.shop);
	var shop = req.body.way_list;
	var ins = req.body.ins;
	User.getUserById(req.session.user._id,(err,user)=>{
		if(err){
			return res.end(err);
		}
		console.log(user.way_list[ins]);
		user.order_list.push(user.way_list[ins]);
		user.way_list.splice(ins,1);
		console.log(user);
		var users = new User(user);
		users.save();
		req.session.user = users;
		res.json({error:0,user:req.session.user})
		
	})
	
}
// 获取当前待评价的商品
exports.gain = function(req,res,next){
    console.log(req.body);
    var id = req.body.id;
    Good.getGoodById(id,function(err,good){
        if(err){
            return res.end(err);
        }
        console.log(good);
        res.json({error:0,good:good})
    })
}

exports.ping = function(req,res,next){
    console.log(req.body);
    var id = req.body.good;
    var content = req.body.content;
    User.getUserById(req.session.user._id,function(err,user){
        if(err){
            return res.end(err);
        }
        Good.findById(id,function(err,good){
            if(err){
                return res.end(err);
            }
            good.reply_num ++;
            var reply = new Reply();
            reply.content = content;
            reply.reply_name = req.session.user.username;
            reply.touxiang = req.session.user.touxiang;
            reply.reply_user = req.session.user._id;
            reply.good_id = id;
            console.log(reply);
            good.save();
            user.save();
            reply.save().then(function(reply){
                console.log('12322222222');
                var target_id = "rJIxQ_41z";
                saveMessage.saveAtMessage(good._id,req.session.user._id,target_id);
                req.session.user = user;
                res.json({error:0,message:'成功'})
            }).catch(function(err){
                return res.end(err);
            })
            
        })
    })

}


// 
exports.clear = function(req,res,next){
    console.log('11111111111');
    User.getUserById(req.session.user._id,(function(err,user){
        if(err){
            return res.end(err);
        }
        user.pay_list = [];
        user.save();
        req.session.user = user;
        res.json({error:0,message:'成功'})
    }))
}