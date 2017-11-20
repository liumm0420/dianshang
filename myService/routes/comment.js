var express = require('express');
var router = express.Router();
var db = require('../modles/db');
var Good = require('../modles/Good');
var User = require('../modles/User');
var multer = require('multer');
var validator = require('validator');
var Message = require('../modles/Message');

exports.message = function (req, res, next) {

    var target_id = req.session.user._id;

    console.log(target_id)
    Message.getmessages(target_id,(err, messages) => {
        if (err) {
            return res.end(err);
        }
        console.log(messages);
        res.json({ error: 0, messages: messages })
    })
}