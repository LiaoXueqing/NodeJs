/**
 *  ���������⣬ԭ�������ⶼ��װ��connect�У��������ע��������
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
 *  ����·�ɿ���
 */
var routes = require('./routes/index');

/**
 * ������Ŀʵ��
 */
var app = express();

/**
 * ����EJSģ�������ģ���ļ�λ�ã�Ҳ����ʹ��jade������ģ������
 */
//app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
/**
 * ���������� �ĳ��������� ҳ��ʹ��.html�ļ�
 */
app.set('views', path.join(__dirname, 'views/'));
app.engine('.html',ejs.renderFile);
app.set('view engine', 'html');// app.set('view engine', 'ejs');
/**
 * ����iconͼ��
 */
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/**
 * ������־���������
 */
app.use(logger('dev'));
/**
 * �������ݽ�����
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/**
 * ����cookie������
 */
app.use(cookieParser());

app.use(cookieSession({
  name: 'session',     //  he name of the cookie to set
  keys: ['key1', 'key2']
}));

/**
 * ���徲̬�ļ�Ŀ¼
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
 * ƥ��·����·��
 */
app.use('/', routes);  //home page
app.use('/login', routes);  //login page
app.use('/doLogin', routes);  //doLogin
app.use('/logout', routes);  //logout
app.use('/welcome', routes);  //welcome page

/**
 * 404������
 */
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  //res.locals.session = req.session;
  next(err);
});

/**
 * ������
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
 * ���ģ��app
 */
module.exports = app;
