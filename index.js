const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors");
const Cource = require("./schemas/CourceSchema");
const Enquiry = require("./schemas/enquiry");

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
   const doc= await cource.save()
   console.log(doc)
    console.log(req.body)
    res.json(req.body)
    try{
        if(cource){
            res.status(200).json({
                doc:doc,
                status:true,
                message:"Cource Created...!"
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

//enquiryapis
app.post("/addenquiry",async(req,res)=>{
    let enquiry = new Enquiry()
    enquiry.namee = req.body.namee;
    enquiry.mobile = req.body.mobile;
    enquiry.email = req.body.email;
    enquiry.adress = req.body.adress;
    enquiry.dob = req.body.dob;
    enquiry.cource = req.body.cource;
    enquiry.responsee = req.body.responsee;
    enquiry.statuss = req.body.statuss;
    enquiry.comments = req.body.comments;
    enquiry.enqdate = req.body.enqdate;
   const doc = await enquiry.save()
   console.log(doc)
    console.log(req.body)
    res.json(req.body)
    try{
        if(enquiry){
            res.status(200).json({
                doc:doc,
                status:true,
                message:"New Enquiry Added...!"
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


//get
app.get("/allenquiry", async (req,res)=>{
    const user = await Enquiry.find();
    res.send(user);
});

//delete

app.delete("/allenquiry/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const doc = await Enquiry.findByIdAndDelete(id)
        console.log(req.body);      
        if(doc){ 
            res.status(200).json({
                doc:doc,
                status:true,
                message:"Enquiry Deleted...!"
            })
        };
    } catch(err) {
        res.status(404).json({
            error:err,
            message:"Something went wrong"
        });
    }
})

//get by id
app.get("/allenquiry/:id", async(req,res)=>{
    const id = req.params.id;
    const result = await Enquiry.findOne({_id:id});
    res.json({"user":result});
});

//enquiry update
app.patch("/allenquiry/:id", async(req,res)=>{
    const id = req.params.id;
    const doc = await Enquiry.findByIdAndUpdate(id, req.body)
    console.log(doc);
    console.log("patch body",req.body);      
    res.json(req.body);
});

app.listen(2000,()=>{
  console.log("App started...")
})