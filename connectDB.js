const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

async function Mongodb() {
  await mongoose.connect(process.env.MONGO_URI);
}

module.exports = { Mongodb };
