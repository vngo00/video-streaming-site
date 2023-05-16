var express = require('express');
var router = express.Router();
var multer = require('multer');
var db = require('../conf/database');
const { makeThumbnail,
     getPostById,
     deletePostbyId,
     getSearchPosts,
     getCommentsForPostById,
     uploadPost } = require('../middleware/posts');
const { isLoggedIn } = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/videos/uploads');
    },
    filename: function (req, file, cb) {
        var fileExt = file.mimetype.split("/")[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`);
    }
});
  
const upload = multer({ storage: storage });

router.post(
    "/create",
    isLoggedIn,
    upload.single("uploadVideo"),
    makeThumbnail,
    uploadPost,
    function(req,res,next){
        return res.redirect(`/`);
});

router.get('/:id(\\d+)',getPostById,getCommentsForPostById, function(req, res){
    res.render('viewpost', {title:`View Post ${req.params.id}`});
});

router.post('/delete',isLoggedIn,deletePostbyId, function(req,res,next){
    var {userId} = req.session.user;
    return res.redirect(`/users/profile/${userId}`);
});

router.get('/search',getSearchPosts, function(req,res,next){
    res.render('index');
});



  





module.exports = router;