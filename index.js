const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors");
const Enquiry = require("./schemas/enquiry");
const Blog = require("./schemas/blog");
const Users = require("./schemas/students");
const Dgr = require("./schemas/dgr");
const { Course, Instructor, Curriculum } = require("./schemas/course");

 
//main server
const app = express()

//external configuration
app.use(bodyParser.json());
app.use(express.json());
app.use(cors(origin = "*"));
require("./schemas/mongodb")



//enquiryapis###################################################################
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
    res.json(req.body);
});


//blog post####################################################################
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
app.get("/allblogs/:id", async(req,res)=>{
    const id = req.params.id;
    const result = await Blog.findOne({_id:id});
    res.json({"result" : result});
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


app.post("/signup" ,async(req,res)=>{
    const users = new Users({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        useremail : req.body.useremail,
        usermobile : req.body.usermobile,
        password : req.body.password,
        confirmpassword : req.body.confirmpassword,
        image :  req.body.image,
    })
    

    const doc = await users.save()
     res.json(req.body)
     try{
         if(users){
             res.status(200).json({
                 doc:doc,
                 status:true,
                 message:"User Signup successfulyy...!"
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


app.get("/login" , async(req,res)=>{
    const allusers = await Users.find()
    res.send(allusers)
})


//dgrapi
app.post("/remove" ,async(req,res)=>{
    const textapi = new Dgr({
        text : req.body.text,
    })
    

    const doc = await textapi.save()
     res.json(req.body)
     try{
         if(textapi){
             res.status(200).json({
                 doc:doc,
                 status:true,
                 message:"removed"
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


app.get("/getremovedata" , async(req,res)=>{
    const textapi = await Dgr.find()
    res.send(textapi)
})


//add courses##############################################################################
app.post("/addcourse" ,async(req,res)=>{
    try {
    const { cardimage ,
         coursecategory , 
         courcedesc ,
          courcecreatedby
          , courceprice , 
          instructor, 
          curriculum ,
        courseoverview,
       whatyoulearn,
       slug,
      title,
      metatitle,
      metadescription,
      metakeyword,
      coursestatus
} = req.body;

    // Step 1: Create Instructor
    const newInstructor = new Instructor(instructor)
    await newInstructor.save();

  
    const curriculumIds = [];
    for (const item of curriculum) {
      const newCurriculum = new Curriculum(item);
      await newCurriculum.save();
      curriculumIds.push(newCurriculum._id);
    }

    
    const newCourse = new Course({
      cardimage : cardimage,
      coursecategory : coursecategory,
      courcedesc : courcedesc,
      courcecreatedby : courcecreatedby,
      courceprice : courceprice,
      courseoverview : courseoverview,
      whatyoulearn : whatyoulearn,
      slug : slug,
      title : title,
      metatitle : metatitle,
      metadescription : metadescription,
      metakeyword : metakeyword,
      coursestatus : coursestatus,
      instructor: newInstructor._id,
      curriculum: curriculumIds,
    });

    await newCourse.save();

    res.status(201).json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Internal server error" });
  }


//     const course = new Course({
//         cardimage : req.body.cardimage,
//         coursecategory : req.body.coursecategory,
//         courcedesc : req.body.courcedesc,
//         courcecreatedby : req.body.courcecreatedby,
//         courceprice : req.body.courceprice,
//         instructor : req.body.instructor,
//         createdby : req.body.createdby,
//     })
    

//     const doc = await course.save()
//     console.log(doc)
//      console.log(req.body)
//      res.json(req.body)
//      try{
//          if(course){
//              res.status(200).json({
//                  doc:doc,
//                  status:true,
//                  message:"New Course Added...!"
//              })
//          }
//          else{
//              res.status(404).json({
//                  error:err,
//                  message:"Something went wrong"
//              });
//          }
//      }catch(err){ 
//  console.log(err)
//      }
})

app.get("/allcourse",async(req,res)=>{
    const courses = await Course.find()
    res.send(courses)
})


app.patch("/allcourse/:id", async(req,res)=>{
    const id = req.params.id;
    const doc = await Course.findByIdAndUpdate(id, req.body)     
    res.json(req.body);
});

app.delete("/allcourse/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const doc = await Course.findByIdAndDelete(id)      
        if(doc){ 
            res.status(200).json({
                doc:doc,
                status:true,
                message:"Course Deleted...!"
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
app.get("/allcourse/:id", async(req,res)=>{
    try {
        
    const course = await Course.findById(req.params.id)
      .populate("instructor") 
      .populate("curriculum");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//get by slug
app.get("/allcourses/:id", async(req,res)=>{
    try {
        const slug = req.params.id;
    const course = await Course.findOne({slug:slug})
      .populate("instructor") 
      .populate("curriculum");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Server error" });
  }
});




app.listen(2000,()=>{
  console.log("App started...")
})