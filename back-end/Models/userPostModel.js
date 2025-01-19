const { text } = require("express")
const mongoose = require("mongoose")
const { ObjectId } = mongoose;


const userPostSchema = new mongoose.Schema({

      title :{
          type:String,
          required:true
      },
      body : {
          type:String,
          required:true
      },
      user_id :{
          type:ObjectId,
          ref:"User",
          required:true   
      }},
      {
      timestamps: true
      }
    )


module.exports = mongoose.model("usersPostData",userPostSchema)