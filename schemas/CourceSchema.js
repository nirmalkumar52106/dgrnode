
const mongoose=require("mongoose")

const CourceSchema = new mongoose.Schema({
    courcename : String,
    courcedescription : String,
  }); 
  const Cource = mongoose.model('newemployes', CourceSchema);

  module.exports=Cource