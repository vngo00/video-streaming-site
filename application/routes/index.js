var express = require('express');
var router = express.Router();
const {getRecentPosts} = require('../middleware/posts');

/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
 // res.render('index', { title: 'Upipe', name:"[Insert your name here]" , js:["index.js"]});
  // console.log(res.locals.searchPosts);
  console.log(req.query);
  console.log(res.locals.posts);
  res.render('index', {title:'Upipe'});
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
