const mongoose = require("mongoose");
const { Mongodb } = require("../connectDB.js");
Mongodb().then((data) => {
    console.log(data)
}).catch((e) => {
    console.log(e)
})
const User = require("./userModel.js");
const ContactSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    name: {
        type: String,
        required: [true, "please enter the name"]

    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: [true, "please enter the email"]
    },
    phone: {
        type: String,
        require: [true, "please enter the phone"]
    }

},
    {
        timestamps: true
    })

module.exports = mongoose.model('Contact', ContactSchema);

