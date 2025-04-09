
const mongoose = require("mongoose")

const studentschema = new mongoose.Schema({
        firstname : String,
        lastname : String,
        useremail : String,
        usermobile : String,
        password : String,
        confirmpassword :  String,
        image : String,
        createdAt: { type: Date, default: Date.now },
  }); 
  const Users = mongoose.model('users', studentschema);

  module.exports = Users