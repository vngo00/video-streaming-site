var db = require("../conf/database");
var bcrypt = require('bcrypt');
module.exports = {
    isLoggedIn: function(req,res, next){
        if(req.session.user){
            next();
        } else {
            req.flash("error", `You must be logged in`);
            req.session.save(function(err){
                if (err) next(err);
                res.redirect('/login');
            });
        }
    },
    isMyProfile: function(req, res, next){
        var {id} = req.params;
        if (id == req.session.user.userId){
            next();
        } else {
            req.flash("error", `Invalid profile.`);
            req.session.save(function(err){
                if (err) next(err);
                res.redirect('/login');
            });
        }
    },
    checkLogin: async function(req, res,next){
        var {username, password} = req.body;
        try{
          var [resultObject, fields] = await db.execute(
            `select id,username,password,email from users where username=?;`,
            [username]
          );
          var user = resultObject[0];
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
    }
}