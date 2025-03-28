const mongoose = require("mongoose")

const dburl = "mongodb+srv://kumarnirmal52106:C60nVUk493GG9sw1@cluster0.utzu1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(dburl , {
    useNewUrlParser: true,
      useUnifiedTopology: true, 
      family: 4 
}).then(()=>{
    console.log("success")
}).catch((error)=>{
    console.log("error" , error)
})