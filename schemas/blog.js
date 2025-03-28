
const mongoose = require("mongoose")

const blogschema = new mongoose.Schema({
        blogtitle : String,
        blogdesc : String,
        blogimage :  String,
        metatitle : String,
        metadesc :  String,
        metakey : String,
        slugurl : String,
        blogdate : String,
        createdAt: { type: Date, default: Date.now },
  }); 
  const Blog = mongoose.model('blog', blogschema);

  module.exports = Blog