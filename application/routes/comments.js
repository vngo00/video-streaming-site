var express = require('express');
var router = express.Router();
const { isLoggedIn } = require('../middleware/auth');
const { insertComment } = require('../middleware/comments');


router.post('/create',isLoggedIn,insertComment, function(req,res,next){
    var {postId} = req.body;

    return res.redirect(`/posts/${postId}`);
});





module.exports = router;