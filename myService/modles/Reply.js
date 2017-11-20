const mongoose = require('mongoose');
const db = require('./db');
const shortid = require('shortid');
const setting = require('../setting');
const Schema = mongoose.Schema;

//日期格式化工具
const moment = require('moment');

//设置全局语言  -- 使用中文
moment.locale("zh-cn");

const ReplySchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate,
        unique: true
    },
    //创建时间
    create_time: {
        type: Date,
        default: Date.now
    },
    content:{
        type:String
    },
    reply_user:{
        type:String,
        ref:'User'
    },
    reply_name:{
        type:String,
        ref:'User'
    },
//    回复的商品
    good_id:{
        type:String,
        ref:'Good'
    },
    touxiang:{
        type:String,
    },
    likes_num:{
        type:Number,
        default:0
    }
})
ReplySchema.statics = {
    getReplyById:function(id,callback){
        Reply.find({'good_id':id}).sort({'create_time':-1}).then(function(reply){
            callback(null,reply)
        }).catch(function(err){
            callback(err);
        })
    },
}

//设置实例对象的方法
ReplySchema.methods.create_time_ago = function(){
    //this.create_time;
    let time = moment(this.create_time).fromNow();

    return time;
}


const Reply = mongoose.model('reply', ReplySchema);
module.exports = Reply;