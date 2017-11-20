const mongoose = require('mongoose');
const db = require('./db');
const shortid = require('shortid');
const setting = require('../setting');
const Schema = mongoose.Schema;
const GoodSchema = new Schema({
    _id:{
        type:String,
        default:shortid.generate,
        unique:true
    },
    good_name:{
        type:String,
        required:true,
    },
    category:{
        type:String,
    },
    good_price:{
        type:Number,
        required:true
    },
    youhui:{
        type:String,
    },
    introduce:{
        type:String
    },
    reply:{
        type:String,
        ref:'Reply'
    },
    reply_num:{
        type:Number,
        default:0
    },
    good_img:{
        type:String,
    },
    good_intro:{
        type:String
    },
    cart_num:{
        type:Number,
        default:1
    },
    pic_url:{
        type:Array,
    },
    deleted:{
        type:Boolean,
        default:false,
    }
})

GoodSchema.statics = {
    getGood:(callback)=>{
        Good.find().sort({'create_time':-1}).then((good)=>{
            callback(null,good)
        }).catch((err)=>{
            callback(err);
        })
    },
    getGoodById:(id,callback)=>{
        Good.findOne({'_id':id,deleted:false}).sort({'create_time':-1}).populate('Reply').then((good)=>{
            callback(null,good)
        }).catch((err)=>{
            callback(err);
        })
    },
    // getIdRemove:(id,callback)=>{
    //     Good.findByIdAndRemove({'_id':id}).then((good)=>{
    //         console.log(good);
    //         callback(null,good);
    //     }).catch((err)=>{
    //         callback(err);
    //     })
    // }
}



const Good = mongoose.model('good',GoodSchema);
module.exports = Good;