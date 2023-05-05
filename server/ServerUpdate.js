const express = require('express')
const app = express()
const fileUpload = require ('express-fileupload')
const cors = require('cors')


app.use(fileUpload)
app.use(cors())
app.use(express.json)


app.get("/", (req,res)=>{
    res.send("Hello world")
})


app.post("/upload", (req,res)=>{
    res.send("Hello wordl")
})

app.listen(3000,()=>{
    console.log("Server running on port 3000")
})