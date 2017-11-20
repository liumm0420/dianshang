var express = require('express');
var router = express.Router();
var db = require('../modles/db');
var Good = require('../modles/Good');
var User = require('../modles/User');
// var multer = require('multer')


const multer = require('multer');
var picture=[]
//设置文件磁盘存储
var storage = multer.diskStorage({
	//文件存储的路径
	destination:function(req,file,cb){
    cb(null,'./public/images')
  },
	//文件的名称设置
	filename:function(req,file,cb){
    var suffix=file.mimetype.split("/")[1];
    var fileName=file.fieldname+'-'+Date.now()+"."+suffix;
    picture.push(fileName)
		cb(null,fileName);
	}
})
//通过multer处理当前文件的存储
var upload = multer({storage:storage});

//发布图片
router.post('/publish',upload.array('img'),function(req,res){
    console.log('1235468')
    console.log(req.body)
    var good_name = req.body.good_name;
    var good_price = req.body.good_price;
    var category = req.body.category;
    var youhui = req.body.youhui;
    var introduce = req.body.introduce;
    var good_img = req.body.good_img;
    var good_intro = req.body.good_intro;
    req.body.pic_url = picture;
    let newObj = new Good(req.body);
    console.log('123456')
    newObj.save();
    picture=[]
    res.json({ error: 0, message: '发布成功' })
    //   newPhotoWord.save();
    //   picture=[]
    //   res.json({err:1,msg:'success'})
  })


router.post('/touxiang',upload.single('img'),function(req,res){
	console.log('11111111111111111111111111111111');
	console.log(req.body);
	req.body.pic_url = picture;
	var name = req.body.name;
	console.log(req.session.user._id)
	var id = req.session.user._id;
  console.log(id);
  
	User.findById(id).exec(function(err,user){
		if(err){
			return res.end(err);
		}
		console.log('22222222222222')			
		// console.log(user)
			user.username = req.body.name;
			user.touxiang = req.body.pic_url;
//			var users = new User(users);
			user.save();
			req.session.user = user;
      console.log(user);
      picture = [];
		res.json({error:0,user:req.session.user})
	})
	
})

router.get('/good',function (req,res) {
  console.log('快来获取请求');
 console.log(req.query.page);
  Good.find().limit(2).skip(req.query.page * 2).exec(function (err,good) {
      if(err){
        return res.end;
      }
     console.log(good);
      res.json({error:0,goods:good})
  })
})

module.exports = router;