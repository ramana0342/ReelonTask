
const postsData = require("../Models/userPostModel")
const jwt = require("jsonwebtoken")
const commentsData = require("../Models/commentsModel")


const createPostController = async(req,res)=>{

      try{
        //console.log(req.body)
        let token = req.headers.authorization;
       // console.log(token)
        let tokenResult = jwt.verify(token, "Shh");
      //  console.log("123")
       // console.log(tokenResult)
        let  createNewPost = new postsData({...req.body , user_id :tokenResult.userID})
        let  newPostResult = await createNewPost.save();
        return res.status(201).json({
            newPostResult
        })
        
      } catch (err){
        res.status(500).json({ error: "Internal server error",
                                err
         });
      }

}

const getAllPostsDataController = async(req,res)=>{
             
      try{
             let allPostsData= await postsData.find({})
             let allCommentsData = await commentsData.find({})
             return res.status(201).json({
                   allPostsData,
                   allCommentsData
      })
       } catch (err){
        res.status(500).json({ error: "Internal server error",
          err
});
       }
}

const getUserPostsDataController  = async(req,res)=>{
  try{
  let token = req.headers.authorization;
  let tokenResult = jwt.verify(token, "Shh");

  let  userPostsData = await postsData.find({user_id :tokenResult.userID})
  return res.status(201).json({
    userPostsData
})
    
  } catch(err){
    res.status(500).json({ error: "Internal server error",
                            err
})
  }
}

const deleteUserPostController = async(req,res)=>{
  try{
    let postID = req.params.id
    let  deletePostData = await postsData.findByIdAndDelete(postID)
    return res.status(201).json({
      deletePostData
  })
}  catch(err){
  res.status(500).json({ error: "Internal server error",
                          err
})
}
}

const editUserPostController = async(req,res)=>{
              try{
               // console.log(req.body)
                const { _id, title, body } = req.body;
                await postsData.findByIdAndUpdate(_id, { title, body })
                
                let editedPostData = await postsData.findById(_id)
               // console.log(editedPostData)
                return res.status(201).json({
                  editedPostData
              })

              } catch (err){
                res.status(500).json({ error: "Internal server error",
                  err
                 })
              }    
}







module.exports = {
                   createPostController , 
                   getAllPostsDataController ,
                   getUserPostsDataController,
                   deleteUserPostController,
                   editUserPostController
                  }