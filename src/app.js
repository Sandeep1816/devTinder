 const express = require("express")
 const app = express()

//  app.get("/getUserData", (req,res)=>{
//     throw new Error("abcdefg")

//     res.send("User data is sent")

//  })

//  app.use("/", (err,req,res,next)=>{
//     if(err){
//         res.status(500).send("something went wrong")
//     }
//  })

app.get("/getUserData", (req,res)=>{
    try{
        throw new Error("abcdef")

        res.send("User data sent")
    } catch (err){
        res.status(500).send("some error contact suppert team")
        

    }
})







 app.listen(8080,()=>{
    console.log(`server is listening to the port 8080`)
 })