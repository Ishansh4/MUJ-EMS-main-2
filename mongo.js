const app = require('express')();
const http = require('http').Server(app);
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://taunkishansh:c0AiWU5njC64WjY5@manage.zwvngo6.mongodb.net/?retryWrites=true&w=majority")

.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})


const newSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = mongoose.model("collection",newSchema)

module.exports=collection

