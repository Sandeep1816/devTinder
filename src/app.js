 const express = require("express")
 const connectDB = require("./config/database")
 const app = express()
 const User = require("./models/user")

 app.post("/signup", async(req,res)=>{
    const user = new User({
        firstName:"Sandeep",
        lastName:"Avala",
        emailId:"sandeep@gmail.com",
        password:"Sandeep@21"
    })
   await user.save()
    res.send("data posted successfully")

 })

 





 connectDB()
 .then(()=>{
    console.log("database is connected")
    app.listen(8080,()=>{
        console.log(`server is listening to the port 8080`)
     })

}).catch((err)=>{
    console.log("database is not connected")
})









