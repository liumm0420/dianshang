//生成所有的通知消息模块
const Message = require('../modles/Message');

const saveMessage = {
    saveAtMessage:(good_id,user_id,target_id) => {
        let message = new Message();
        message.atType = 'at';
        //谁在某篇文章中提到了你
        message.good_id = good_id;
        message.user_id = user_id;
        message.target_id = target_id;
    //    保存
        message.save((msg) => {
            console.log('保存成功');
        })
    },

    saveMessage:(good_id,user_id,target_id) => {
        let message = new Message();
        message.atType = 'zan';
        //谁在某篇文章中提到了你
        message.good_id = good_id;
        message.user_id = user_id;
        message.target_id = target_id;
    //    保存
        message.save((msg) => {
            console.log('点赞成功');
        })
    },
}
module.exports = saveMessage;