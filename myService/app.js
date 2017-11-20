var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');

// var index = require('./routes/index');
// var users = require('./routes/users');
var picture = require('./routes/picture');
// var picture = require('./routes/huadong');

//session设置模块
const session = require('express-session');
// session存储模块
const MongoStore = require('connect-mongo')(session);
// 即时消息设置模块
const flash = require('connect-flash');
//引入routes.js路由文件
const routes = require('./routes');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(flash());

app.use(session({
  secret:'boke1', // 必选参数 --- 设置session的签名,防止数据被篡改
  store:new MongoStore({
      // 自动存储session数据到数据库中
      url:'mongodb://localhost/XMcheng'
  }),
  // 设置cookie存在的期限，以毫秒计，30天
  cookie:{maxAge:1000 * 60 * 60 * 24 * 30 },
  // 是否强制性的保存未修改的数据
  resave:false,
  // 是否强制性的保存未初始化的数据
  saveUninitialized:true,
  // 设置cookie中，存储sessionId的属性名称,具有默认值，connect.sid
  name:'bokeid1'
}));



// app.use('/', index);
// app.use('/good', good);
app.use('/',routes);
app.use('/',picture);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(2222,function(){
  console.log('刘大美人已成功上线')
})
module.exports = app;
