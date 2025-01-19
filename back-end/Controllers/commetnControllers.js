const jwt = require("jsonwebtoken")
const commentsData = require("../Models/commentsModel")


const postCommentController = async(req,res)=>{
               try{
                 const postID = req.params.id
                 let token = req.headers.authorization;
                 let tokenResult = jwt.verify(token, "Shh");
                 let CreatingNewComment = new commentsData({content:req.body.content,user_id:tokenResult.userID,username:tokenResult.userName,post_id:postID})
                 let CreatedCommentResult = await CreatingNewComment.save()
                 return res.status(201).json({
                    CreatedCommentResult
                 })
                 
               }catch(err){
                res.status(500).json({ error: "Internal server error",
                    err
                })
               }
}


module.exports = {
    postCommentController
}