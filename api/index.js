var Express = require("express");
var Mongoclient=require ("mongodb" ).MongoClient;
var cors=require ("cors"); 
const multer=require ("multer");

var app= Express();
app.use(cors());

var CONNECTION_STRING="mongodb+srv://taunkishansh:MLhuWA6eKG1PithY@cluster2.xhqljtl.mongodb.net/?retryWrites=true&w=majority";
//MLhuWA6eKG1PithY


var DATABASENAME="students";
var database;

app.listen(10,()=>{
    Mongoclient.connect(CONNECTION_STRING,(error,client)=>{
        database=client.db(DATABASENAME);
        console.log("MongoDB connection Sucessfull"); 
    })
})
