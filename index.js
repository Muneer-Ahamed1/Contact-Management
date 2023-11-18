const express=require("express");
const app=express();
const contacts=require("./Routers/contactRoutes.js");
const errorHandler=require("./middleware/errorHandler.js")
const connectDB=require("./connectDB.js")
const dotenv=require("dotenv").config();
const users=require("./Routers/userRoutes.js");

app.use(express.json());

app.use("/contact",contacts);
app.use("/user",users)
app.use(errorHandler);

let port=process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Listening at ${port}`)
})

