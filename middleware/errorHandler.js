const errorHandler=(err,req,res,next)=>{
    const {message,status}=err;
    res.status(status || 500).json({message:message})

}
module.exports=errorHandler;