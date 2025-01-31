const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors");
const Cource = require("./schemas/CourceSchema");

//main server
const app = express()

//external configuration
app.use(bodyParser.json());
app.use(express.json());
app.use(cors(origin = "*"));
require("./schemas/mongodb")

//cource apis

//Add cource
app.post("/addcource",async(req,res)=>{
    let cource = new Cource()
    cource.courcename=req.body.courcename;
    cource.courcedescription=req.body.courcedescription;
   const doc= await user.save()
   console.log(doc)
    console.log(req.body)
    res.json(req.body)
    try{
        if(cource){
            res.status(200).json({
                doc:doc,
                status:true,
                message:"User Created...!"
            })
        }
        else{
            res.status(404).json({
                error:err,
                message:"Something went wrong"
            });
        }
    }catch(err){ 
console.log(err)
    }
   
});

app.listen(2000,()=>{
  console.log("App started...")
})