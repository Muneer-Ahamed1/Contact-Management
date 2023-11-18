//@desc Get all contacts
//@route get /contact
//@public route
const ErrorHandler = require("../utils/ErrorHandler.js");
const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModel.js");


const getContact = asyncHandler(async(req, res) => {
    console.log("i asdasfddf")
    console.log(req.user)

    const id=req.user.id.toString();

    let contact=await Contact.find({userId:id});
    res.send(contact);

})

const postContact = asyncHandler(async (req, res) => {
    let { name, email, phone } = req.body;
    const id=req.user.id;

        let contacts = await Contact.create({
            name: name,
            email: email,
            phone: phone,
            userId:id
        });
        await contacts.save();
        res.json({ message: "Post Requested.." });

    });


const updateContact = asyncHandler(async(req, res) => {
    console.log("sadfrw3")
    const ID=req.user.id;
    const id = req.params.id;
    const {name,email,phone}=req.body;
    let contact = await Contact.updateOne(
        {$and:[{ _id: id },{userId:ID}]},
        { $set: req.body },
        { new: true } // This option returns the modified document
      );   
      contact=(contact===null)?("Not Fount !"):(contact);

      res.json(contact)
})

const deleteContact = asyncHandler(async(req, res) => {
    const ID=req.user.id;

    const id = req.params.id;
    let contact=await Contact.findByIdAndDelete({_id:id})
    contact=(contact===null)?("Not Fount !"):(contact);

    res.json(contact)
})
const getIdContact=asyncHandler(async(req,res)=>{
    const id=req.params.id;
    const ID=req.user.id;
    console.log("fdsdffsdfsd")

    let contact = await Contact.findOne({ _id: id, userId: ID });
    contact=(contact===null)?("Not Fount !"):(contact);
    res.json(contact);
})

module.exports = { getContact, postContact, updateContact, deleteContact,getIdContact };



