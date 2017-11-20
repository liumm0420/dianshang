var express = require('express');
var router = express.Router();
var db = require('../modles/db');
var Good = require('../modles/Good');
var User = require('../modles/User');
var multer = require('multer');
var validator = require('validator');
var Reply = require('../modles/Reply');
const saveMessage = require('../common/message');



exports.replys = function (req, res, next) {
    console.log('111111111');
    var id = req.body.id;
    console.log(id);
    Good.findById({ '_id': id }).exec(function (err, good) {
        if (err) {
            return res.end(err);
        }
        Reply.getReplyById(id, function (err, reply) {
            if (err) {
                return res.end(err);
            }
            console.log(reply);
            res.json({ error: 0, reply: reply, good: good })
        })
    })
}


// }

exports.zan = function (req, res, next) {
    var goodId = req.body.reply._id;
    var isCun = false;
    Reply.findOne({ '_id': goodId }).exec(function (err, replys) {
        console.log(replys)
        if (err) {
            return res.end(err);
        }
        // replys.forEach(function (data) {
        if (replys._id == req.body.reply._id) {
            replys.likes_num += 1
            replys.save().then(function(reply){
                saveMessage.saveMessage(reply.good_id,req.session.user._id,reply.reply_user);
                res.json({error:0,reply:replys})

            }).catch(function(err){
                console.log(err);
            })
        }
        // })
        // console.log(replys)
        // var reply = new Reply(replys);
        // reply.save();
        

    })
}