const mongoose = require("mongoose");
const { Mongodb } = require("../connectDB.js");
const contactModel = require("./contactModel.js");
Mongodb().then().catch((e) => console.log(e))

const user = mongoose.Schema({
  
    userName: { type: String, required: [true, "Enter name"] },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }

},
    { timestamps: true }
)



module.exports = mongoose.model('USERS', user);