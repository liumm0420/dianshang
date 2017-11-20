var express = require('express');
var router = express.Router();
var db = require('../modles/db');
var Good = require('../modles/Good');
var User = require('../modles/User');
var multer = require('multer');
var validator = require('validator');

/* GET users listing. */
// exports.index = function (req, res, next) {
//     // var num = req.query;
//     console.log(req.query);
//     Good.find().limit(2).skip(req.query.num * 2).exec(function(err,goodss){
//         if(err){
//             return res.end(err);
//         }
//         // console.log(goods)
//         // var goods = goodss.slice(0, 3);
//         // var other = goodss.slice(3);
//         // console.log(other)
//         // res.json({ error: 0, goods: goods ,other:other})
//         res.json({ error: 0, goods: goodss})
        
//     })
// }

exports.detail = function (req, res, next) {
    var id = req.query.id;
    console.log(req.query);
    Good.getGoodById(id, function (err, good) {
        if (err) {
            return res.end(err);
        }
        console.log(good)
        res.json({ error: 0, good: good })
    })
}


exports.phone = function (req, res, next) {
    console.log(req.query.cate);
    Good.find({ category: req.query.cate }).then((goods) => {
        if (!goods) {
            return res.end('商品不存在')
        }
        var good = goods.slice(0, 3);
        var goodleft = goods.slice(3)
        res.json({ error: 0, goods: good, goodleft: goodleft ,allgood:goods})
    }).catch((err) => {
        console.log(err);
    })
}

exports.mind = function (req, res, next) {
    console.log(req.query.cate);
    Good.find({ category: req.query.cate }).then((goods) => {
        if (!goods) {
            return res.end('商品不存在')
        }
        var good = goods.slice(0, 2);
        var more = goods.slice(2)
        res.json({ error: 0, goods: good, more: more ,allgood:goods})
    }).catch((err) => {
        console.log(err);
    })
}

exports.tv = function (req, res, next) {
    console.log(req.query.cate);
    Good.find({ category: req.query.cate }).then((goods) => {
        if (!goods) {
            return res.end('商品不存在')
        }
        var good = goods.slice(0, 2);
        var more = goods.slice(2)
        res.json({ error: 0, goods: good, more: more,allgood:goods })
    }).catch((err) => {
        console.log(err);
    })
}

exports.computer = function (req, res, next) {
    console.log(req.query.cate);
    Good.find({ category: req.query.cate }).then((goods) => {
        if (!goods) {
            return res.end('商品不存在')
        }
        var good = goods.slice(0, 2);
        var more = goods.slice(2)
        res.json({ error: 0, goods: good, more: more,allgood:goods })
    }).catch((err) => {
        console.log(err);
    })
}

exports.edit = function (req, res, next) {
    console.log(req.body.good);
    var id = req.body.good._id;
    Good.getGoodById(id, (err, good) => {
        console.log(123456)
        console.log(good);
        good.category = req.body.good.category;
        good.good_name = req.body.good.good_name;
        good.good_price = req.body.good.good_price;
        good.youhui = req.body.good.youhui;
        good.introduce = req.body.good.introduce;
        good.good_intro = req.body.good.good_intro;
        good.save();
        console.log(good)
        res.json({ error: 0, message: '编辑成功，2s后跳转到首页' })
    })
}

exports.remove = function (req, res, next) {
    console.log(req.query.id);
    var id = req.query.id;
    Good.findOneAndRemove({ '_id': id }).then(function (good) {
        console.log(good);
        res.json({ error: 0, message: '删除成功' })
    }).catch(function (err) {
        return res.end(err);
    })
}

exports.postFabu = function (req, res, next) {
    console.log(req.body);
    var good_name = req.body.good_name;
    var good_price = req.body.good_price;
    var category = req.body.category;
    var youhui = req.body.youhui;
    var introduce = req.body.introduce;
    var good_img = req.body.good_img;
    var good_intro = req.body.good_intro;
    let newObj = new Good(req.body);
    newObj.save();
    res.json({ error: 0, message: '发布成功' })
}

exports.add = function (req, res, next) {
    // console.log(req.body);
    var id = req.body.id;
    var ids = req.session.user._id;
    console.log(ids)
    var isCun = false;
    Good.getGoodById(id, (err, good) => {
        if (err) {
            return res.end(err);
        }
        User.getUserById(ids, function (err, user) {
            if (err) {
                return res.end(err);
            }
            console.log(good);
            user.shop_cart.forEach(function (carts,ins) {
                if (carts._id == good._id) {
                    carts.cart_num = carts.cart_num - 0 + 1;
     
                    isCun = true;
                }
            })
            if (!isCun) {
                user.shop_cart.push(good);
            }       
                user.shopcart_num ++;
                var users = new User(user);
                users.save().then((user)=>{
                    console.log(user)
                }).catch((error)=>{
                    console.log(error)
                })
                req.session.user = users;
            res.json({ error: 0, message: '已加入购物车' })
        })
    })

}


exports.addnums = function(req,res,next){
    console.log(req.body);
    var num = req.body.addnum;
    var id = req.body.id;
    var userId = req.body.user_id;
    // console.log(userId)
    // console.log(req.session.user)
    User.getUserById(userId,(err,user)=>{
        if(err){
            return res.end(err);
        }
        user.shop_cart.forEach(function(cart){
            if(cart._id == id){
                // console.log(cart._id);
                // console.log(id);
                cart.cart_num = num;
            }
            user.shopcart_num ++;            
            var users = new User(user);
            users.save();
            req.session.user = users;
            console.log(req.session.user);
            res.json({error:0,user:req.session.user})
        })
    })
}



exports.minus = function(req,res,next){
    console.log(req.query);
    var num = req.query.nums;
    var id = req.query.id;
    var userId = req.query.user_id;
    User.getUserById(userId,(err,user)=>{
        if(err){
            return res.end(err);
        }
        user.shop_cart.forEach(function(cart){
            if(cart._id == id){
                // console.log(cart._id);
                // console.log(id);
                cart.cart_num = num;
            }
            
        })
        user.shopcart_num --;        
        var users = new User(user);
        users.save();
        req.session.user = users;
        res.json({error:0,user:req.session.user})
    })
}

exports.deleted = function(req,res,next){
    console.log(req.body);
    var id = req.body.id;
    var userId = req.body.user_id;
    var isTrue = false;
    User.getUserById(userId,(err,user)=>{
        if(err){
            return res.end(err);
        }
        user.shop_cart.forEach(function(cart){
            if(cart._id == id){
                isTrue = true;
                console.log('123456')
            }
        })
        if(isTrue){
            user.shop_cart.splice(id,1)
        }
        var users = new User(user);
        users.save();
        req.session.user = users;
        res.json({error:0,user:req.session.user})

    })
}

exports.address = function(req,res,next){
    console.log(req.body);
    var name = req.body.name;
    var tell = req.body.tell;
    var value = req.body.value;
    var address = req.body.address;
    let error = '';
    // if(!validator.matches(name,/^[\u4e00-\u9fa5]{2,4}$/)){
    //     error = '请输入正确的姓名'
    // }
    // if(!validator.matches(tell,/^[1][0-9]{10}/)){
    //     error = '请输入正确的手机号'
    // }
    User.findById(req.session.user._id,function(err,user){
        if(err){
            console.log(err);
        }
        // console.log(user);
        user.shop_address.push(req.body);
        console.log(user);
        var users = new User(user);
        users.save();
        req.session.user = users;
        res.json({error:0,message:'添加成功',user:req.session.user})
    })
}

exports.removesite = function(req,res,next){
    console.log(req.body);
    var userId = req.body.userId;
    var ins = req.body.ins;
    User.getUserById(userId,function(err,user){
        if(err){
            return res.end(err);
        }
        user.shop_address.splice(ins,1);
        var users = new User(user);
        users.save();
        console.log(users);
        req.session.user = users;
        res.json({error:0,user:req.session.user}) 
    })
}


// 商品搜索
exports.search = function(req,res,next){
    var any = req.body.any;
    var reg = RegExp(any,'i');
    console.log(reg);
    Good.find({'good_name':reg}).exec(function(err,good){
        if(err){
            return res.end(err);
        }
        console.log(good);
        res.json({error:0,goods:good})
    })
}

// 价格降序
exports.pricedown = function(req,res,next){
    console.log(req.body.goods);
    var goods = req.body.goods;
    var any = req.body.any;
    var reg = RegExp(any,'i');
    console.log(reg);
    Good.find({'good_name':reg}).sort({'good_price':-1}).exec(function(err,good){
        if(err){
            return res.end(err);
        }
        console.log(good);
        res.json({error:0,goods:good})
    })
}

// 价格降序
exports.priceup = function(req,res,next){
    console.log(req.body.goods);
    var goods = req.body.goods;
    var any = req.body.any;
    var reg = RegExp(any,'i');
    console.log(reg);
    Good.find({'good_name':reg}).sort({'good_price':1}).exec(function(err,good){
        if(err){
            return res.end(err);
        }
        console.log(good);
        res.json({error:0,goods:good})
    })
}


//收藏
exports.addheart = function(req,res,next){
	console.log(req.body);
	var good = req.body.good;
	var isTrue = false;
	User.getUserById(req.session.user._id,function(err,user){
		if(err){
			return res.end(err);
		}
		user.heart.forEach(function(data){
			if(data._id == good._id){
				isTrue = true
			}
		})
		if(!isTrue){
			user.heart.push(good);
			user.heart_num ++;
		}
		console.log(user);
		user.save();
		req.session.user = user;
		res.json({error:0,message:'收藏成功'})
	})
}









