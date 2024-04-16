const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://taunkishansh:c0AiWU5njC64WjY5@manage.zwvngo6.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("mongodb connected4");
})

.catch(()=>{
    console.log('failed');
})


const newSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    selectedField:{
        type:String,
        required:true
    },
    totalseats: Number,
    description: String,
    faculty: String,
    faculty_id: String
})

const collection = mongoose.model("iron",newSchema)
module.exports = collection