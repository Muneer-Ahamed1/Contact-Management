const asyncHandler=require("express-async-handler")
const Users=require("../models/userModel.js")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler.js");

// /register it is a public route
const Rigister=asyncHandler(async(req,res)=>{
    let {userName,email,password} = req.body;
    if(!userName || !email || !password){
       throw new ErrorHandler("Enter a all fields",404);
    }
    const emailValid=await Users.find({email:email});  
    Array.from(emailValid).length==0

    if(    Array.from(emailValid).length!==0) {
        throw new ErrorHandler('Email already exists',403);
    }
    else{
        hashPassword= await bcrypt.hashSync(password,10);
        console.log(hashPassword)

       const newUser= await Users.create({
            userName:userName,
            password:hashPassword,
            email:email,

        })
        await newUser.save();
        res.json({ message: "User is added" });
    }

})

//login it public route

const Login=asyncHandler(async(req,res)=>{
    let {email,password,userName}=req.body;
    const emailValid=await Users.find({email:email});  
    const validEmail=Array.from(emailValid).length;
    if(validEmail!==0) {
        const matchPass=await bcrypt.compareSync(password,emailValid[0].password);
        if(matchPass) {
            console.log(emailValid[0].id)
            const token = jwt.sign(
                {
                  user: {
                    username: userName,
                    email: email,
                    id: emailValid[0].id
                  },
                },
                process.env.SCERAT_KEY,
                { expiresIn: "260m" }
              );

            
             res.json({token:token});
        
        }
        else{
            res.send("wrong person");
        }
    }
    else{
        res.send("no such user found");
    }
    
})

module.exports={Rigister,Login};