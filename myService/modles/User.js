const mongoose = require('mongoose');
const db = require('./db');
const shortid = require('shortid');
const setting = require('../setting');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate,
        unique: true
    },
    username: {
        type: String,
        // required:true
    },
    password: {
        type: String,
        required: true
    },
    //创建时间
    create_time: {
        type: Date,
        default: Date.now
    },
    shop_cart:{
        type:Array,
    },
    touxiang:{
        type:String,
    },
    shopcart_num: {
        type: Number,
        default: 0
    },
    shop_address: {
        type: Array,
        default:{
            "name" : "刘",
            "tell" : "17337106612",
            "value" : "河南省 郑州市 管城回族区",
            "address" : "刘家大院",
            "isCheckd" : true
        }
    },
    order_list: {
        type: Array,
        ref: 'Good'
    },
    pay_list:{
        type:Array,
    },
    way_list:{
        type:Array,
    },
    wait_list:{
        type:Array,
    },
    have_list:{
        type:Array
    },
    heart:{
    	type:Array
    },
    heart_num:{
    	type:Number,
    	default:0
    }
})

UserSchema.statics = {
    //通过id查找id
    getUserById: (id, callback) => {
        User.findOne({ '_id': id }).then((user) => {
            callback(null, user)
        }).catch((err) => {
            callback(err);
        })
    },
    getUserByName: (username, callback) => {
        User.findOne({ 'username': username }).then(function (user) {
            callback(null, user)
        }).catch(function (err) {
            callback(err);
        })
    }
}

const User = mongoose.model('user', UserSchema);
module.exports = User;