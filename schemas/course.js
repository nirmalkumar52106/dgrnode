
const mongoose = require("mongoose")


const instructorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  image: String,
  subject : String,
  facebook : String,
  twitter :  String,
  mobile : String,
  instagram : String,
});

const curriculumSchema = new mongoose.Schema({
  title: String,
  description: String,
  videourl : String,
});

const courseschema = new mongoose.Schema({
    cardimage : String,
    coursecategory : String,
    courcedesc :  String,
    courcecreatedby : String,
    courceprice :  String,
    courseoverview : String,
    whatyoulearn :  String,
    slug : String,
    title : String,
    metatitle : String,
    metadescription : String,
    metakeyword : String,
    coursestatus : String,
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" },
    curriculum: [{ type: mongoose.Schema.Types.ObjectId, ref: "Curriculum" }],
    createdAt: { type: Date, default: Date.now },
  }); 


  const Course = mongoose.model('course', courseschema);
  const Instructor = mongoose.model("Instructor" , instructorSchema)
  const Curriculum = mongoose.model("Curriculum" , curriculumSchema)

 module.exports = {
  Course,
  Instructor,
  Curriculum
};