
const  usersData= require("../Models/userModel")
const jwt = require("jsonwebtoken")

const userAuthorization = async(req,res)=>{
               let token = req.headers.authorization;
            if(token){
                let tokenResult = jwt.verify(token, "Shh");
                let isUserExist  = await  usersData.findById(tokenResult.userID)
                 
                      if (!isUserExist) {
                           return res.status(400).json({ Error: "User not found" });
                         }
                         next(); 

            }else{
                  return res.status(400).json({
                         Error:"Token Missing"
                  })
            }
                     
}