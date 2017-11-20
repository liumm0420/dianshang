const express = require('express');
const router = express.Router();

//引入首页的路由文件
const home = require('./routes/index');
const good = require('./routes/good');
const users = require('./routes/users');
const address = require('./routes/address');
const reply = require('./routes/reply');
const comment = require('./routes/comment');


//---------------------------------首页-------------------------------------
router.get('/',home.index);
//登录
router.post('/login',home.postLogin);
//注册
router.post('/zhuce',home.postZhuce);
//退出
router.get('/quit',home.tuichu);
// ------------------------------发布商品---------------------------------
router.post('/fabu',good.postFabu);

// router.get('/good',good.index);
router.get('/mind',good.mind);
router.get('/com',good.computer);
router.get('/tv',good.tv);
router.get('/xiang',good.detail);
router.get('/phone',good.phone);
// 编辑
router.post('/edits',good.edit);
// 删除
router.get('/remove',good.remove)

router.post('/add',good.add);

router.post('/addnums',good.addnums);
router.get('/jian',good.minus);
router.post('/deleted',good.deleted);

router.post('/address',good.address);

router.post('/removesite',good.removesite);
router.post('/search',good.search);
router.post('/pricedown',good.pricedown);
router.post('/priceup',good.priceup);

router.post('/addheart',good.addheart);

// --------------------------用户-------------------------
router.post('/chooseaddr',address.choose)

router.post('/checked',address.checkd);

router.post('/addpay',address.addpay);

router.post('/queren',address.queren);

router.post('/gain',address.gain);

router.post('/ping',address.ping);
router.post('/clear',address.clear);


// ---------------------------回复-----------------------------
router.post('/replys',reply.replys)
router.post('/zan',reply.zan)

router.get('/message',comment.message)


router.post('/paymoney',users.paymoney)









module.exports = router;