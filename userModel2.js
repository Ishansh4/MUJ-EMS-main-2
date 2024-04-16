const app = require('express')();
const http = require('http').Server(app);
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://taunkishansh:c0AiWU5njC64WjY5@manage.zwvngo6.mongodb.net/?retryWrites=true&w=majority")

.then(()=>{
    console.log("mongodb connected3");
})
.catch(()=>{
    console.log('failed3');
})


const newSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    regno:{
        type:String,
        required:true
    },
    selectedField:{
        type:String,
        required:true
    },
    newselectedField:{
        type:String,
        required:true
    },
})

const user = mongoose.model("change",newSchema)

module.exports=user