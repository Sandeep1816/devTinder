// const express = require("express")
// const authRouter = express.Router()
// const bcrypt = require("bcrypt")
//  const {validateSignupData} = require("./utils/validation")
//  const User = require("./models/user")

// // app.post("/signup", async(req,res)=>{
// //     try{
// //    //validation of data
// //    validateSignupData(req)


// //    const {firstName,lastName,emailId,password}= req.body
// //     // encrypt password
// //     const passwordHash = await bcrypt.hash(password, 10)
// //     // console.log(passwordHash)
// //     //creating new instance of user model
// //     // const user = new User(req.body)
// //     const user = new User({
// //         firstName,
// //         lastName,
// //         emailId,
// //         password:passwordHash,
// //     })
// //     await user.save()
// //     res.send("user data is posted successfully")
// // }catch(err){
// //     res.status(400).send("Error occured ")
// // }

// //  })

// //  app.post("/login", async(req,res)=>{
// //     try{
// //         const {emailId,password}= req.body
// //         const user = await User.findOne({emailId:emailId})
// //         if(!user){
// //             throw new Error("email is not valid")
// //         }
// //         const isPassword = await bcrypt.compare(password, user.password)
// //         if(isPassword){
// //             //create jwt 
// //             const token = await jwt.sign({_id:user._id}, "Dev@Tinder$790")
// //             console.log(token)
// //             //Add the token to cookie and send the response back to user
// //             res.cookie("token", token,{expires: new Date(Date.now() +  3600000)})
// //             res.send("login success")
// //         }else{
// //             throw new Error("password is not valid")
// //         }

// //     }catch(err){
// //         res.status(400).send("Error:"+ err.message)
// //     }



// //  })



// module.exports = authRouter;