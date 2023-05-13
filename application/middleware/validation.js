var validator = require('validator');
var db = require('../conf/database');
var bcrypt = require('bcrypt');
module.exports = {
    usernameCheck: function(req,res,next){
        var {username} = req.body;
        username = username.trim();
        if(!validator.isLength(username, {min:3})) {
            req.flash("error", "username must be 3 or more characters");
        }

        if(!/[a-zA-z]/.test(username.charAt(0))){
            req.flash("error", "username must begin with a character");
        }

        if(req.session.flash.error){
            res.redirect('/registration');
        }else{
            next();
        }
    },
    passwordCheck: function(req,res,next){
        var {password} = req.body;
        var specialChars = /[*-+!@#$^&~[\]]+/;
        var upperCase = /[A-Z]+/;
        var numbers = /[0-9]+/;
        if (password.length >= 8 && specialChars.test(password)
            && upperCase.test(password) && numbers.test(password)){
            next();
        }
        else {
            req.flash("error", "Invalid password");
            res.redirect('/registration')
        }
  
    },
    emailCheck: function(req,res,next){
        var {email} = req.body;
        for (let i=0; i<email.length; i++) {
            if (email[i] === email[i].toUpperCase() && !(email[i]*1 >= 0) && email[i] !== '@' && email[i] !== '.') {
                req.flash("error", "Invalid email");
                break;
            }
        }
        if(req.session.flash.error){
            res.redirect('/registration');
        }
        else{
            next();
        }


    },
    tosCheck: function(req,res,next){
        var {tosCheck} = req.body;
        if (tosCheck){
            next();
        }
        else {
            req.flash("error", "need TOS confirmation");
            return req.session.save(function (err){
                return res.redirect('/registration');  
            });
        }
    },
    ageCheck: function(req,res,next){
        var {ageCheck} = req.body;
        if (ageCheck){
            next();
        }
        else {
            req.flash("error", "need age confirmation");
            return req.session.save(function (err){
                return res.redirect('/registration');  
            });
        }
    },
    isUsernameUnique: async function(req,res,next){
        var {username} = req.body;
        try{
            var [resultObject, fields] = await db.execute(
                `select id from users where username=?`,
                [username]
            );
            if (resultObject && resultObject.length > 0){
                req.flash("error", `${username} is already taken`);
                return req.session.save(function (err){
                    return res.redirect('/registration');  
                });
                
            }
            else next(); 
        }
        catch(error){
        next(error);
        }
    },
    isEmailUnique: async function(req,res,next){
        var {email} = req.body;
        try{
            var [resultObject, fields] = await db.execute(
                `select id from users where email=?`,
                [email]
            );
            if (resultObject && resultObject.length > 0){
                req.flash("error", `${email} is already taken`);
                return req.session.save(function (err){
                    return res.redirect('/registration');  
                });
                
            }
            else next(); 
        }
        catch(error){
        next(error);
        }
    },
    createUser: async function(req,res,next){
        var {username, email,password} = req.body;
        try{
        // insert
        var hashesPassword = await bcrypt.hash(password, 3);
        var [resultObject, fields] = await db.execute(
            `INSERT INTO users
            (username, email, password)
            value
            (?,?,?);`,[username.trim(), email,hashesPassword]);
        // respond
        if (resultObject && resultObject.affectedRows == 1){
            next();
        }
        else {
            req.flash("error", "invalid credentials");
            return res.redirect('/registration');
        }

        }
        catch(error){
            next(error);
        }
    },
};
