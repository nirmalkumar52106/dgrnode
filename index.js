const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors");
const Enquiry = require("./schemas/enquiry");
const Blog = require("./schemas/blog");
const Dgr = require("./schemas/dgr");
const { Course, Instructor, Curriculum } = require("./schemas/course");
const WebEnq = require("./schemas/webEnquiry");
const Student = require("./schemas/student");
const bcrypt = require('bcryptjs');
const Attendence = require("./schemas/attendence");


 
//main server
const app = express()

//external configuration
app.use(bodyParser.json());
app.use(express.json());
app.use(cors(origin = "*"));
require("./schemas/mongodb")



//student register
app.post("/studentregister", async (req, res) => {
  try {
    const { studentId, password, name, email, mobile , parentMobile, address } = req.body;

    const existing = await Student.findOne({ studentId });
    if (existing) {
      return res.status(400).json({ success: false, message: "Student already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      studentId,
      password: hashedPassword,
      name,
      email,
      mobile,
      parentMobile,
      address
    });

    await newStudent.save();
    res.status(200).json({ success: true, message: "Student registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Registration failed", error: error.message });
  }
});

//student login api
// app.post("/studentlogin", async (req, res) => {
//   const { studentId, password } = req.body;

//   const student = await Student.findOne({ studentId });
//   if (!student) return res.status(404).send("Student not found");

//   const isMatch = await bcrypt.compare(password, student.password);
//   if (!isMatch) return res.status(401).send("Invalid credentials");

//   const token = jwt.sign({ id: student._id }, "secretKey", { expiresIn: "1d" });

//   res.json({
//     token,
//     student: {
//       studentId: student.studentId,
//       name: student.name,
//       email: student.email
//     }
//   });
// });


//all student
app.get("/allstudents", async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json({ success: true, students });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch students" });
  }
});

app.get('/get-student', async (req, res) => {
  const { studentId } = req.query;

  try {
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    res.json({ success: true, student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


//student attendence
app.post('/markattendance', async (req, res) => {
  try {
    let { attendance } = req.body;

    if (!Array.isArray(attendance)) {
      attendance = [attendance];
    }

    for (const entry of attendance) {
      const { studentId, date, status } = entry;

      // Check existing attendance
      const existing = await Attendence.findOne({ studentId, date });

      if (existing) {
        await Attendence.updateOne({ _id: existing._id }, { $set: { status } });
      } else {
        const newEntry = new Attendence({ studentId, date, status });
        await newEntry.save();
      }
    }
    res.status(200).json({ success: true, message: 'Attendance processed & SMS sent (if Absent)' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


//attendence summary
app.get('/attendance-summary/:date', async (req, res) => {
  const { date } = req.params;
  const formattedDate = new Date(date).toISOString().split('T')[0]; // format date

  try {
    const allAttendance = await Attendence.find({ date: formattedDate });

    const total = allAttendance.length;
    const present = allAttendance.filter(a => a.status === 'Present').length;
    const absent = allAttendance.filter(a => a.status === 'Absent').length;

    res.json({
      success: true,
      date: formattedDate,
      total,
      present,
      absent
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error fetching summary' });
  }
});

// Get Attendance for a Student
app.get('/attendance/:studentId', async (req, res) => {
  try {
    const attendance = await Attendence.find({ studentId: req.params.studentId }).sort({ date: -1 });
    res.status(200).json({ success: true, data: attendance });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

//get attendence per day
app.get('/studentswithtodayattendance', async (req, res) => {
  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Fetch all attendance records for today
    const attendanceRecords = await Attendence.find({ date: today });

    // Map studentId to attendance status
    const attendanceMap = {};
    attendanceRecords.forEach(record => {
      attendanceMap[record.studentId] = record.status; // e.g. "Present" or "Absent"
    });

    // Fetch all students
    const students = await Student.find({});

    // Combine students with attendance info
    const result = students.map(student => ({
      studentId: student.studentId,
      name: student.name,
      email: student.email,
      mobile: student.mobile,
      parentEmail: student.parentEmail,
      address: student.address,
      attendance: attendanceMap[student.studentId] || 'Not Marked'
    }));

    res.json({ success: true, students: result });
  } catch (error) {
    console.error("Error fetching students with attendance:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//update attendence
app.post('/updateattendance', async (req, res) => {
  try {
    const { studentId, status } = req.body;
    if (!studentId || !status) return res.json({ success: false, message: 'Missing data' });

    const today = new Date().toISOString().slice(0, 10);

    const existing = await Attendence.findOne({ studentId, date: today });

    if (existing) {
      existing.status = status;
      await existing.save();
    } else {
      const newAttendance = new Attendence({ studentId, date: today, status });
      await newAttendance.save();
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: 'Error updating attendance' });
  }
});

//get by date attendence
app.get('/getattendance/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const attendanceRecords = await Attendence.find({ studentId }).sort({ date: 1 }); // oldest to newest
    res.json({ success: true, attendance: attendanceRecords });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: 'Error fetching attendance' });
  }
});


//fees pay
app.post('/update-fees', async (req, res) => {
  const { studentId, total, paid = 0, dueDate, emi } = req.body;

  try {
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    student.fees.total = total;
    student.fees.paid = paid;
    student.fees.dueDate = dueDate;
    student.fees.emi = emi;
    if (!student.fees.paymentHistory) student.fees.paymentHistory = [];

    await student.save();
    res.json({ success: true, message: 'Fees info updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


//pay fees
// POST /payfees
// Request body: { studentId, amount, mode }
app.post('/payfees', async (req, res) => {
  const { studentId, amount, mode } = req.body;

  if (!studentId || !amount || !mode) {
    return res.status(400).json({ success: false, message: 'Please provide studentId, amount, and mode' });
  }

  try {
    // Find student by studentId
    const student = await Student.findOne({ studentId });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Check if amount is valid and does not exceed due amount
    const dueAmount = (student.fees.total || 0) - (student.fees.paid || 0);
    if (amount <= 0) {
      return res.status(400).json({ success: false, message: 'Amount must be greater than zero' });
    }
    if (amount > dueAmount) {
      return res.status(400).json({ success: false, message: `Amount exceeds due fees. Due amount is ${dueAmount}` });
    }

    // Add payment to paymentHistory
    student.fees.paymentHistory.push({
      amount,
      date: new Date(),
      mode,
    });

    // Update paid amount
    student.fees.paid = (student.fees.paid || 0) + amount;

    await student.save();

    return res.json({ success: true, message: 'Fees paid successfully' });
  } catch (err) {
    console.error('Pay fees error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});



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

//website Enquiry Api
//enquiryapis###################################################################
app.post("/webaddenq",async(req,res)=>{
    let webenquiry = new WebEnq()
    webenquiry.enqname = req.body.enqname;
    webenquiry.enqmobile = req.body.enqmobile;
    webenquiry.enqemail = req.body.enqemail;
    webenquiry.enqCourse = req.body.enqCourse;
    webenquiry.enqDate =  new Date();
    webenquiry.isRead =  false;
   const doc = await webenquiry.save()
    res.json(req.body)
    try{
        if(webenquiry){
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

//notify enquiry
app.put("/markenquiryread/:id", async (req, res) => {
  try {
    const result = await WebEnq.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json({ status: true, data: result });
  } catch (err) {
    res.status(500).json({ status: false, error: err });
  }
});


//get
app.get("/allwebaddenq", async (req,res)=>{
    const webenqq = await WebEnq.find();
    res.send(webenqq);
});

//delete

app.delete("/allwebaddenq/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const doc = await WebEnq.findByIdAndDelete(id)      
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



app.listen(2000,()=>{
  console.log("App started...")
})