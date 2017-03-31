/**
 *  加载依赖库，原来这个类库都封装在connect中，现在需地注单独加载
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var cookieSession = require('cookie-session');

/**
 *  加载路由控制
 */
var routes = require('./routes/index');

/**
 * 创建项目实例
 */
var app = express();

/**
 * 定义EJS模板引擎和模板文件位置，也可以使用jade或其他模型引擎
 */
//app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
/**
 * 把上面两行 改成下面三行 页面使用.html文件
 */
app.set('views', path.join(__dirname, 'views/'));
app.engine('.html',ejs.renderFile);
app.set('view engine', 'html');// app.set('view engine', 'ejs');
/**
 * 定义icon图标
 */
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/**
 * 定义日志和输出级别
 */
app.use(logger('dev'));
/**
 * 定义数据解析器
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/**
 * 定义cookie解析器
 */
app.use(cookieParser());

app.use(cookieSession({
  name: 'session',     //  he name of the cookie to set
  keys: ['key1', 'key2']
}));

/**
 * 定义静态文件目录
 */
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.locals.session = req.session;
  res.locals.user = req.session.user;
  var err = req.session.error;
  delete req.session.error;
  res.locals.message = '';
  if (err) res.locals.message =  err ;
  next();
});
/**
 * 匹配路径和路由
 */
app.use('/', routes);  //home page
app.use('/login', routes);  //login page
app.use('/doLogin', routes);  //doLogin
app.use('/logout', routes);  //logout
app.use('/welcome', routes);  //welcome page

/**
 * 404错误处理
 */
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  //res.locals.session = req.session;
  next(err);
});

/**
 * 错误处理
 */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
/**
 * 输出模型app
 */
module.exports = app;
