const mongoose = require('mongoose');
const crypto = require('crypto');
const setting = require('../setting');
mongoose.connect(`mongodb://${setting.host}/${setting.db}`);


const db = {
//增加一条新数据
	addOne:function(req,res,obj,msg){
		let newobj = new obj(req.body);
		console.log('123546');
		newobj.save().then((data)=>{
			res.json({error:0,message:'注册成功，2s后跳转到登陆'})
		}).catch((err)=>{
			res.end(err);
		})
	},
   //封装加密代码
   //加密
    encrypt : function(data,key){ // 密码加密
        var cipher = crypto.createCipher("bf",key);
        var newPsd = "";
        newPsd += cipher.update(data,"utf8","hex");
        newPsd += cipher.final("hex");
        return newPsd;
    },
}

module.exports = db;