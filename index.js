const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors");
const Cource = require("./schemas/CourceSchema");
const Enquiry = require("./schemas/enquiry");
const Blog = require("./schemas/blog");


//main server
const app = express()

//external configuration
app.use(bodyParser.json());
app.use(express.json());
app.use(cors(origin = "*"));
require("./schemas/mongodb")



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


//blog post
app.post("/addblog" ,async(req,res)=>{
    const blog = new Blog({
        blogtitle : req.body.blogtitle,
        blogdesc : req.body.blogdesc,
        blogimage : req.body.blogimage,
        blogdate : req.body.blogdate,
        metatitle : req.body.metatitle,
        metakey : req.body.metakey,
        metadesc :  req.body.metadesc,
        slugurl : req.body.slugurl,
        createdby : req.body.createdby,
    })
    

    const doc = await blog.save()
    console.log(doc)
     console.log(req.body)
     res.json(req.body)
     try{
         if(blog){
             res.status(200).json({
                 doc:doc,
                 status:true,
                 message:"New Blog Added...!"
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
})

app.get("/allblog",async(req,res)=>{
    const blogss = await Blog.find()
    res.send(blogss)
})


//get by slug 
app.get("/allblog/:id", async(req,res)=>{
    const slug = req.params.id;
    const result = await Blog.findOne({slugurl:slug});
    res.json(result);
});

//get by id
app.get("/allblog/:id", async(req,res)=>{
    const id = req.params.id;
    const result = await Blog.findOne({_id:id});
    res.json(result);
});

// delete blogs
app.delete("/allblog/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const doc = await Blog.findByIdAndDelete(id)
        if(doc){ 
            res.status(200).json({
                doc:doc,
                status:true,
                message:"Blog Deleted...!"
            })
        };
    } catch(err) {
        res.status(404).json({
            error:err,
            message:"Something went wrong"
        });
    }
})

//update blogs
app.patch("/allblog/:id", async(req,res)=>{
    const id = req.params.id;
    const doc = await Blog.findByIdAndUpdate(id, req.body)
    if(doc){
        res.json(req.body);
    }      
    
});


app.listen(2000,()=>{
  console.log("App started...")
})