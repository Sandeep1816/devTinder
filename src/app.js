 const express = require("express")
 const app = express()

// app.get("/user", (req,res)=>{
//     console.log(req.query)
//     res.send({"name":"sandeep", "age":22})

// })
// app.get("/person/:personId", (req,res)=>{
//     console.log(req.params)
//     res.send({"email": "sandep@gmail.com", "password": "sandeep!21"})

// })
//! route handler

app.get("/user", (req,res,next)=>{
    console.log("first 1st route handler")
    // res.send("Response")
    next()

}, 
(req,res,next )=>{
    console.log("2nd route handler")
    // res.send("2nd response")
    next()


},
(req,res)=>{
    res.send("3rd route handler")

}
)


 app.listen(8080,()=>{
    console.log(`server is listening to the port 8080`)
 })