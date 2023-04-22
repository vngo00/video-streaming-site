var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"[Insert your name here]" });
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/profile', function(req, res){
  res.render('profile');
});
router.get('/registration', function(req, res){
  res.render('registration');
});
router.get('/viewpost', function(req, res){
  res.render('viewpost');
});
router.get('/postvideo', function(req, res){
  res.render('postvideo');
});


module.exports = router;
