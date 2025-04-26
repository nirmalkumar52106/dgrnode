

const mongoose = require("mongoose") 

const dgrschema = new mongoose.Schema({
    text : String,
  }); 
  const  Dgr = mongoose.model('dgr', dgrschema);

  module.exports= Dgr