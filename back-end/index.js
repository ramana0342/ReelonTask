const mongoose = require("mongoose");
const express = require("express");
const cors=require("cors")
const app = express()
const port = 8080;

const userRoutes = require("./Views/userView")
const postRoutes = require("./Views/postView")
const commentRoutes = require("./Views/commentView")


app.use(cors());
app.use(express.json());

app.use(userRoutes)
app.use(postRoutes)
app.use(commentRoutes)


mongoose.connect("mongodb+srv://ramanareddym0342:Ramana799@reloondata.em5jw.mongodb.net/?retryWrites=true&w=majority&appName=reloonData").then(()=>{
         console.log("DB Atlas Connected")
})

app.listen(port,()=>{
         console.log(`Server Started Running On Port ${port}`)
})

