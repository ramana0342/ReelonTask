const express = require("express")
const route = express.Router()

const {createPostController,
       getAllPostsDataController , 
       getUserPostsDataController , 
       deleteUserPostController,
       editUserPostController}      = require("../Controllers/postControllers")


route.post("/createPost",createPostController)

route.get("/getAllPostsData",getAllPostsDataController)

route.get("/getUsersPostData",getUserPostsDataController)

route.delete("/deleteUserPost/:id",deleteUserPostController)

route.put("/edituserPost",editUserPostController)



module.exports = route