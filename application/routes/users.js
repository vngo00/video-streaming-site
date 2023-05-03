var express = require('express');
var router = express.Router();
var db = require('../conf/database');
/* GET localhost:3000/users. */
router.get('/', async function(req, res, next) {
  res.redirect('/');
});


/*
*validate credentials
*/
function validatePassword(password){
  var specialChars = /[*-+!@#$^&~[\]]+/
  var upperCase = /[A-Z]+/
  var numbers = /[0-9]+/
  if (password.length >= 8 && specialChars.test(password)
      && upperCase.test(password) && numbers.test(password)){
      return true;
  }
  return false;
}
function validateUserName(userName){
  var format = /^[a-zA-Z]/
      if (format.test(userName) && userName.length >= 3){
        return true;
      }
  return false;
}


/*
*
* validate login access
*/
router.use('/login', async function(req, res, next){
  var {username, password} = req.body;
  try{
    var [resultObject, fields] = await db.execute(
      `select id from users where username=? and password=?`,
      [username, password]
    );
    if (resultObject && resultObject.length == 1){
      next();
    }
    else return res.redirect('/registration');
    
  }
  catch(error){
    next(error);
  }
});

//login user
router.post('/login', async function(req, res, next){
  // try{
  //   return res.redirect('/');
  // }
  // catch(error){
  //   next(error);
  // }
  return res.redirect('/');
  
});


/*
*
* validate sign up data
*/
router.use('/register', async function(req,res, next){
  var {username,password} = req.body;
  if (validatePassword(password) && validateUserName(username)){
    next();
  }
  else res.redirect('/registration');
});
router.use('/register', async function(req, res,next){
  var {password, confirm_password} = req.body;
  if (password == confirm_password){
    next();
  }
  else{
    res.redirect('/registration');
  }
});
router.use('/register', async function(req, res, next){
  var {username, email} = req.body;
  try{
    var [resultObject, fields] = await db.execute(
      `select id from users where username=? or email=?`,
      [username, email]
    );
    if (resultObject && resultObject.length >= 1){
      return res.redirect('/registration');  
    }
    else next(); 
  }
  catch(error){
    next(error);
  }
});
// adding new user
router.post('/register', async function(req, res, next){
  var {username, email,password} = req.body;
  try{
  // insert
  var [resultObject, fields] = await db.execute(
    `INSERT INTO users
    (username, email, password)
    value
    (?,?,?);`,[username, email,password]);
  // respond
  if (resultObject && resultObject.affectedRows == 1){
    return res.redirect('/login');
  }
  else return res.redirect('/registration');
  }
  catch(error){
    next(error);
  }
});





module.exports = router;
