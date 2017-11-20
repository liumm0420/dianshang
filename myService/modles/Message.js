const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const Good = require('./Good')
const MessageSchema = new Schema({

    _id:{
        type:String,
        default:shortid.generate,
        unique:true
    },
//    登录的人
    user_id:{
        type:String,
        ref:'user',   //参考的某个数据集合
    },

//    被通知的那个人
    target_id:{
        type:String,
        ref:'user',
    },
//    发布时间
    create_time:{
        type:Date,
        default:Date.now,
    },
    //消息通知类型
    atType:{
        type:String,
    },
//    回复的那条id
    good_id:{
        type:String,
        ref:'good'
    },
//    是否已读
    has_read:{
        type:Boolean,
        default:false
    }

})
MessageSchema.statics = {
    //获取所有的未读消息
    getmessages:(target_id,callback)=>{
        Message.find({'target_id':target_id}).populate('good_id user_id').then((messages)=>{
            callback(null,messages);
        }).catch((err)=>{
            callback(err);
        })
    },
}
const Message = mongoose.model('Message',MessageSchema);
module.exports = Message;
