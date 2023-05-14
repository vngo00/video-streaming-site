var pathToFFMPEG = require('ffmpeg-static');
var exec = require('child_process').exec;
const ffmpeg = require('fluent-ffmpeg');


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
    getPostsForUserBy: function(req,res,next){},
    getPostById: function(req,res,next){},
    getCommentsForPostById: function(req,res,next){},
    getRecentPosts: function(req,res,next){}
}