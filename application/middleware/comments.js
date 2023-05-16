const db = require("../conf/database");

module.exports  = {
    insertComment: async function(req,res,next){
        var {userId} = req.session.user;
        var {text, postId} =  req.body;
        
        try{
            [rows, fields] = await db.execute(
                `INSERT INTO comments (text, fk_authorId, fk_postId)
                VALUE (?,?,?);`,[text,userId,postId]
            );
            console.log(rows);
            if(rows && rows.affectedRows){
                req.flash("success", "comment successfully posted");
                next();
            }
            else {
                req.flash("error", "comment could no be posted");
            }
        } catch(error){
            next(error);
        }

    },
}