const jwt=require("jsonwebtoken");
const ErrorHandler=require("../utils/ErrorHandler.js");

const validate_user=(req,res,next)=>{
    let token = req.header('token-jwt');
    if(token.startsWith("Bear")) {
        const secretClientText=token.split(" ")[2];
        console.log(secretClientText)
        

        jwt.verify(secretClientText,process.env.SCERAT_KEY,(err,decode)=>{
            if(err){
                throw new ErrorHandler("Not Verfied user",404);
        }
        else{
            req.user=decode.user;
            console.log("auth")
            next();
        }
    })
    }
    if(!token) return res.status(401).send({auth:false , message:"No Token Provided"});

}
module.exports=validate_user;