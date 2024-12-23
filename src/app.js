 const express = require("express")
 const app = express()

app.use("/home",(req,res)=>{
    res.send("hello from server side")

})

app.use("/users",(req,res)=>{
    res.send("i am from users")

})


 app.listen(8080,()=>{
    console.log(`server is listening to the port 8080`)
 })