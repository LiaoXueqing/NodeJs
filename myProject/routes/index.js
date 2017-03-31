var express = require('express');
var router = express.Router();
/* home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login' });
});
/* doLogin */
router.post('/doLogin', function(req, res, next) {
    var user={
        username:'admin',
        password:'admin'
    }
    if(req.body.username===user.username && req.body.password===user.password){
        req.session.user = user;
        res.redirect('welcome');
    }else{
        req.session.error='username or password error!';
        return res.redirect('/login');
    }
});
/* logout */
router.get('/logout', function(req, res, next) {
    req.session.user=null;
    res.redirect('/login');
});
/* welcome page. */
router.get('/welcome', function(req, res, next) {
    authentication(req, res);
    console.log('wecome___'+ req.session.user);
    res.render('welcome', { title: 'welcome' });
});
function authentication(req, res) {
    console.log('Not login');
    if (!req.session.user) {
        req.session.error='please login';
        return res.redirect('/login');
    }
}
module.exports = router;
