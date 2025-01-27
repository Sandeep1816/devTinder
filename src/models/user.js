const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        lowercase:true,
        required:true,
        // unique:true,
        trim:true,
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error("Invalid emailId")
        //     }
        // }
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    },
    photoUrl:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/previews/011/153/360/non_2x/3d-web-developer-working-on-project-illustration-png.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid image url")
            }
        }

    },
    about:{
        type:String
    },
    skills:{
        type:[String]
    },
    password:{
        type:String,
        required:true,
        // validate(value){
        //     if(!validator.isStrongPassword){
        //         throw new Error("Make as strong password")
        //     }
        // }

    }
})

userSchema.methods.getJWT = async function(){
    const user = this;
    const token =  await jwt.sign({_id:user._id}, "Dev@Tinder$790",{expiresIn:"7d"})
    return token;
}
userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash)
    return isPasswordValid;
}


const User = mongoose.model("User", userSchema)

module.exports = User

// module.exports = mongoose.model("User", userSchema)