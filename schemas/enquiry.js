
const mongoose = require("mongoose")

const enquiryschema = new mongoose.Schema({
        namee : String,
        mobile : String,
        email : String,
        adress : String,
        dob : String,
        cource :  String,
        response : String,
        status : String,
        createdAt: { type: Date, default: Date.now },
  }); 
  const Enquiry = mongoose.model('enquiry', enquiryschema);

  module.exports = Enquiry