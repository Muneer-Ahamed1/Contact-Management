const express = require("express");
const router = express.Router();
const {Rigister,Login}=require("../Controllers/userController.js")
const validate_user=require("../middleware/validation_Jwt.js");

router.route("/register").post(Rigister)

router.route("/login").post(Login);

router.route("/current").post(validate_user,(req,res)=>{
    console.log("i am here")
    res.send({message:"you are logged in"})
})

module.exports=router;