var express = require('express');
var router = express.Router();
var db = require('../conf/database');
var bcrypt = require('bcrypt');

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
      `select id,username,password,email from users where username=?;`,
      [username]
    );
    var user = resultObject[0]
    var passwordMatch = await bcrypt.compare(password, user.password);
    if (resultObject && resultObject.length == 1 && passwordMatch){
      req.session.user = {
        userId: user.id,
        email: user.email,
        username: user.username
      };
      req.flash("success", `Welcome: ${user.username}`);
      next();
    }
    else {
      req.flash("error", `Log In Failed: Invalid username/password`);
      req.session.save(function(err){
        if(err) next(err);
        return res.redirect('/login');

      });
    }
    
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
    req.session.save(function(err){
        if(err) next(err);
        return res.redirect('/');

    });

  
  
});


/*
*
* validate sign up data
*/
// router.use('/register', async function(req,res, next){
//   var {username,password} = req.body;
//   if (validatePassword(password) && validateUserName(username)){
//     next();
//   }
//   else res.redirect('/registration');
// });
// router.use('/register', async function(req, res,next){
//   var {password, confirm_password} = req.body;
//   if (password == confirm_password){
//     next();
//   }
//   else{
//     res.redirect('/registration');
//   }
// });
// router.use('/register', async function(req, res, next){
//   var {username, email} = req.body;
//   try{
//     var [resultObject, fields] = await db.execute(
//       `select id from users where username=? or email=?`,
//       [username, email]
//     );
//     if (resultObject && resultObject.length >= 1){
//       return res.redirect('/registration');  
//     }
//     else next(); 
//   }
//   catch(error){
//     next(error);
//   }
// });
// adding new user
router.post('/register', async function(req, res, next){
  var {username, email,password} = req.body;
  try{
  // insert
  var hashesPassword = await bcrypt.hash(password, 3);
  var [resultObject, fields] = await db.execute(
    `INSERT INTO users
    (username, email, password)
    value
    (?,?,?);`,[username, email,hashesPassword]);
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

router.use(function(req, res, next){
  if(req.session.user){
    next();
  }
  else {
    return res.redirect('/login');
  }
})

router.get('/profile', function(req, res){
  res.render('profile', {title:'profile'});
});

router.post("/logout", function(req, res, next){
  req.session.destroy(function(err){
    if(err) {
      next(err);
    }
    return res.redirect('/');
  });


  

});






module.exports = router;
