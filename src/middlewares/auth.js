const jwt = require("jsonwebtoken")
const User = require("../models/user")

// const adminAuth = (req,res,next)=>{

//     const token = "xyz"

// const isAdminAuthorized = token === "xyz"

// if(! isAdminAuthorized){
//     res.status(401).send("unauthorized access")
// }else{
//     next()
// }

// }


// const userAuth = (req,res,next)=>{

//     const token = "xyz"

// const isAdminAuthorized = token === "xyz"

// if(! isAdminAuthorized){
//     res.status(401).send("unauthorized access")
// }else{
//     next()
// }

// }

const userAuth = async(req,res,next)=>{
    try{
        const {token}= req.cookies;
        
        if(!token){

            throw new Error("Token is invalid")
        }
        const decodeObj = await jwt.verify(token, "Dev@Tinder$790")
        const {_id} = decodeObj;
        const user = await User.findById(_id)
        if(!user){
            throw new Error("user not found")
        }
        req.user = user;
        next()

    }catch(err){
        res.status(400).send("Error:" + err.message)
    }
}

module.exports={
    userAuth
}

