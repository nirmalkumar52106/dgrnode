const express = require("express")

const app = express()


app.get("/", (req,res)=>{
  res.send([
    {namee : "hello"}
  ])
})

app.listen(2000,()=>{
  console.log("App started...")
})