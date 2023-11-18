const express = require("express");
const app=express();


const router = express.Router();  // Corrected by adding () to create a router instance
const validation=require("../middleware/validation_Jwt.js")
const{getContact,postContact,updateContact,deleteContact,getIdContact}=require("../Controllers/contactControllers.js")


router.route("/")
.get(validation,getContact)
.post(validation,postContact)

router.route("/:id")
.put(validation,updateContact)
.get(validation,getIdContact)
.delete(validation,deleteContact);


module.exports = router;

