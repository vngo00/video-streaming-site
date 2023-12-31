var pathToFFMPEG = require('ffmpeg-static');
var exec = require('child_process').exec;
var ffmpeg = require('fluent-ffmpeg');
var db = require('../conf/database');


module.exports = {
    // makeThumbnail: function (req, res, next) {
    //     if (!req.file) {
    //         next(new Error("File upload failed"));
    //     } else {

    //         try {
    //             console.log(pathToFFMPEG);
    //             var destinationOfThumbnail = `public/images/uploads/thumbnail-${
    //                 req.file.filename.split(".")[0]
    //             }.png`;
    //             var thumbnailCommand = `${pathToFFMPEG} -ss 00:00:01 -i ${req.file.path} -y -s 200x200 -vframes 1 -f image2 ${destinationOfThumbnail}`;
    //             exec(thumbnailCommand);
    //             req.file.thumbnail = destinationOfThumbnail;
    //             next();
    //         } catch (error) {
    //             next(error);
    //         }
    //     }
    // },
    makeThumbnail: function(req,res,next){
        if (!req.file){
            next(new Error("File upload failed"));
        }
        else{
            var destinationOfThumbnail = `public/images/uploads/thumbnail-${
                                req.file.filename.split(".")[0]
                            }.png`;
            ffmpeg(req.file.path)
            // Extract a thumbnail at the 1st second of the video
            .thumbnail({
                count: 1,
                timemarks: ['1'],
                folder: 'public/images/uploads',
                filename: `thumbnail-${req.file.filename.split(".")[0]}.png`,
                size: '200x200'
            })
            // Execute the ffmpeg command
            .on('end', () => {
                req.file.thumbnail = destinationOfThumbnail;
                console.log('Thumbnail created successfully');
                next();
            })
            .on('error', (err) => {
                console.error('Error creating thumbnail:', err);
                next(error);
            });
                }
    },
    getPostsForUserById: async function(req,res,next){
        var {userId} = req.session.user;

        try{
            [rows, fields] = await db.execute(
                `SELECT * FROM posts where fk_userId=?`,[userId]
            );
            if (rows){
                res.locals.userPosts = rows;
                next();
            }
            else{
                new Error("User Posts coud not be retrieved.");
            }
            
        }
        catch (error) {
            next(error);
        }
    },
    getPostById: async function(req,res,next){
        var {id} = req.params;

        try{

            [rows, fields] = await db.execute(
                `SELECT * FROM posts WHERE id=?`,[id]
                );
                if (rows && rows.length){
                    res.locals.currentPost = rows[0];
                    next();
                }
                else {
                    new Error("Post could not be retrieved.");
                }
        } catch(error){
            next(error)
        }
    },
    getCommentsForPostById: async function(req,res,next){
        var {id} = req.params;

        try {
            [rows, fields] = await db.execute(
                `SELECT username, c.createAt, text from comments c INNER JOIN users u ON c.fk_authorId = u.id
                and fk_postId=? ORDER BY c.createAt DESC;`,[id]
            );
            if (rows){
                res.locals.comments = rows;
                next();
            }
            else{
                new Error("unable to retrieve comments");
            }
        }
        catch (error){
            next(error);
        }

    },
    getRecentPosts: async function(req,res,next){

        try{
        [rows, fields] = await db.execute(
            `SELECT * FROM posts ORDER BY createdAt DESC LIMIT 50`
        );
        if (rows && rows.length){
            res.locals.posts = rows;
            req.session.save(function(err){
                if (err) next(err);
                next();
            });
        } else{
            new Error("Unable to retrieve posts");
        }
        } catch(error){
            next(error);
        }

    },
    deletePostbyId: async function(req,res,next){
        var {id} = req.body;
        try{
            [rows, fields] = await db.execute(
                `DELETE FROM posts where id=?`,[id]
            );
            if(rows && rows.affectedRows){
                req.session.save(function(error){
                    if (error) next(error);
                    next();
                    
                });
            }else{
                new Error("Unable to delete post");
            }
        } catch(error){
            next(error);
        }
    },
    getSearchPosts: async function(req,res,next){
        var {search} = req.query;
        try{
            [rows, fields] = await db.execute(
                `SELECT * FROM posts where title=?;`,[search]
            );
            if(rows && rows.length){
                req.session.save(function(error){
                    if(error) next(error);
                    res.locals.searchPosts = rows;
                    res.locals.posts = rows;
                    next();
                });
                
            }
            else{
                [rows, field] = await db.execute(
                    `SELECT * FROM posts ORDER BY createdAt limit 5;`
                );
                if(rows && rows.length){
                    req.session.save(function(error){
                        if(error) next(error);
                        res.locals.searchPosts = rows;
                        res.locals.posts = rows;
                        next();
                    });
                }
                else{
                    new Error("can't find posts");
                }
            }
        } catch(error){
            next(error);
        }
    },
    uploadPost: async function(req,res,next){
        var {title, description} = req.body;
    var {path, thumbnail} = req.file;
    var { userId} = req.session.user;
    try {
        var [insertResult, _] = await db.execute(
            `INSERT INTO posts (title, description, video, thumbnail,
            fk_userId) VALUE (?,?,?,?,?)`,
            [title, description, path, thumbnail, userId]
        );
        if (insertResult && insertResult.affectedRows){
            req.flash("success", "Your post was created!");
            return req.session.save(function(error){
                if(error) next(error);
                next();
            });
        } else {
            next(new Error('Post could not be created'));
        }
    }
    catch(error){
        next(error);
    }
    }
}