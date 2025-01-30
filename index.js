const express = require("express")

const app = express()


app.get("/", (req,res)=>{
  res.send([
    {namee : "hello"}
  ])
})

app.get("/students" ,(req,res)=>{
    res.send([
        {
            student : "Nirmal kumar"
        }
    ])
})

app.listen(2000,()=>{
  console.log("App started...")
})