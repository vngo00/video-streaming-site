var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Upipe', name:"[Insert your name here]" , js:["index.js"]});
});


router.get('/login', async function(req, res) {
  res.render('login', {title:'login'});
});

router.get('/registration', async function(req, res){
  res.render('registration', {title:'registration', js:["formValidation.js"]});
});

router.get('/postvideo', function(req, res){
  res.render('postvideo', {title:'postvideo'});
});




module.exports = router;
