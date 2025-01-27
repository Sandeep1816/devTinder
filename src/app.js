 const express = require("express")
 const connectDB = require("./config/database")
 const app = express()
 const User = require("./models/user")
 const  {validateSignupData} = require("./utils/validation")
 const bcrypt = require("bcrypt")
const {userAuth} = require("./middlewares/auth")
 
 const cookieParser = require("cookie-parser")
 const jwt = require("jsonwebtoken")



 app.use(express.json())
 app.use(cookieParser())

//  app.post("/signup", async(req,res)=>{
//     const user = new User(req.body)

// try{
//     await user.save()
//     res.send("user data is posted successfully")
// }catch(err){
//     res.status(400).send("Error occured ")
// }

//  })


app.post("/signup", async(req,res)=>{
    try{
   //validation of data
   validateSignupData(req)


   const {firstName,lastName,emailId,password}= req.body
    // encrypt password
    const passwordHash = await bcrypt.hash(password, 10)
    // console.log(passwordHash)
    //creating new instance of user model
    // const user = new User(req.body)
    const user = new User({
        firstName,
        lastName,
        emailId,
        password:passwordHash,
    })
    await user.save()
    res.send("user data is posted successfully")
}catch(err){
    res.status(400).send("Error occured ")
}

 })

//  app.post("/login", async(req,res)=>{
//     try{
//         const {emailId,password}= req.body
//         const user = await User.findOne({emailId:emailId})
//         if(!user){
//             throw new Error("email is not valid")
//         }
//         const isPassword = await bcrypt.compare(password, user.password)
//         if(isPassword){
//             //create jwt 
//             const token = await jwt.sign({_id:user._id}, "Dev@Tinder$790")
//             console.log(token)
//             //Add the token to cookie and send the response back to user
//             res.cookie("token", token,{expires: new Date(Date.now() +  3600000)})
//             res.send("login success")
//         }else{
//             throw new Error("password is not valid")
//         }

//     }catch(err){
//         res.status(400).send("Error:"+ err.message)
//     }



//  })

app.post("/login", async(req,res)=>{
    try{
        const {emailId,password}= req.body
        const user = await User.findOne({emailId:emailId})
        if(!user){
            throw new Error("email is not valid")
        }
        const isPasswordValid = await user.validatePassword(password)
        if(isPasswordValid){
            //create jwt 
            const token = await user.getJWT()
            console.log(token)
            
            //Add the token to cookie and send the response back to user
            res.cookie("token",token, {
                expires: new Date(Date.now() + 8 * 3600000),
            })
          
           res.send("login successful")
        }else{
            throw new Error("password is not valid")
        }

    }catch(err){
        res.status(400).send("Error:"+ err.message)
    }



 })

 app.get("/profile",userAuth, async(req,res)=>{
    try{
        const user = req.user
        res.send(user)
    }catch(err){
        res.status(400).send("Error"+ err.message)
    }
 })

 
 app.post("/sendConnectionRequest",userAuth, async(req,res)=>{
    const user = req.user
    // sending connection request

    console.log("sending a connection request")
    res.send(user.firstName + " " + "sent connection request")
 })





 app.post("/profile",userAuth, async(req,res)=>{
   try{
    const user = req.user
    res.send(user)

   }catch(err){
    res.status(400).send("Error:" + err.message)
   }
 })




app.get("/signup", async(req,res)=>{
    const fnm = req.body.firstName
    try{
        const users = await User.find({firstName: fnm})
        res.send(users)
    }catch(err){
        res.status(400).send("user not found")
    }

})

app.get("/test", async(req,res)=>{
    const email = req.body.emailId;
    try{
        const user = await User.find({emailId:email})
        if(user.length === 0){
            res.status(400).send("user not found")
        }else{
            res.send(user)
        }
        // res.send(user)
    }catch(err){
        res.status(400).send("data not found")
    }

})

app.get("/dual", async(req,res)=>{
    const duemail = req.body.emailId
    try{
        const user = await  User.findOne({emailId: duemail})
        res.send(user)
    }catch(err){
        res.status(400).send("user not found")
    }
})

//! delete user based on emailId

app.delete("/signup", async(req,res)=>{
    const userId = req.body.userId

    try{
        const user = await User.findOneAndDelete(userId)
        res.send("user deleted successfully")
    }catch(err){
        res.status(400).send("user not deleted")
    }

})

//! update user with userId

// app.patch("/signup", async(req,res)=>{
//     const userId = req.body.userId
    
//     console.log(userId)
//     const data = req.body
//     try{
//         const user = await User.findByIdAndUpdate({_id:userId}, data , {returnDocument:"before"})
//         console.log(user)
//         res.send("user email updated successfully")
//     }catch(err){
//         res.status(400).send("user email is not updated")

//     }
// })

//!update user using emailId

app.patch("/signup", async(req,res)=>{
    const emailId = req.body.emailId
    const data = req.body

    try{
        const user = await User.findOneAndUpdate({emailId:emailId}, data, {returnDocument:"after", runValidators:"true"})
        res.send("user is updated")

    }catch(err){
        res.status(400).send("not updated")
    }
})


 connectDB()
 .then(()=>{
    console.log("database is connected")
    app.listen(7777,()=>{
        console.log(`server is listening to the port 7777`)
     })

}).catch((err)=>{
    console.log("database is not connected")
})









