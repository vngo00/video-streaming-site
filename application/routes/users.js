var express = require('express');
var router = express.Router();
var db = require('../conf/database');
var bcrypt = require('bcrypt');
const {isLoggedIn, isMyProfile, checkLogin} = require("../middleware/auth");
const {usernameCheck,
    passwordCheck,
    emailCheck,
    tosCheck,
    ageCheck,
    isUsernameUnique,
    isEmailUnique,
    createUser
  } = require("../middleware/validation");
const {getPostsForUserById} = require('../middleware/posts');

/* GET localhost:3000/users. */
router.get('/', async function(req, res, next) {
  res.redirect('/');
});
/**
 * login
 */
router.post('/login',checkLogin, async function(req, res, next){
  req.session.save(function(err){
      if(err) next(err);
      return res.redirect('/');
  });
});
/**
 * registration 
 */
router.post('/register',usernameCheck,
 passwordCheck,
 emailCheck,
 tosCheck,
 ageCheck,
 isUsernameUnique,
 isEmailUnique,
 createUser,
  function(req, res, next){
  return res.redirect('/login');
});
/**
 * viewing profile
 */
router.get('/profile/:id(\\d+)',isLoggedIn,isMyProfile,getPostsForUserById, function(req, res){
  //console.log(res.locals.userPosts);
  res.render('profile', {title:'profile'});
});
/**
 * logout
 */
router.post("/logout", async function(req, res, next){
  req.session.destroy(function(err){
    if(err) {
      next(err);
    }
    return res.redirect('/');
  });


  

});

module.exports = router;
