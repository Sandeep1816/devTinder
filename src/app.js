 const express = require("express")
 const connectDB = require("./config/database")
 const app = express()
 const User = require("./models/user")

 app.use(express.json())

 app.post("/signup", async(req,res)=>{
    const user = new User(req.body)

try{
    await user.save()
    res.send("user data is posted successfully")
}catch(err){
    res.status(400).send("Error occured ")
}

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









