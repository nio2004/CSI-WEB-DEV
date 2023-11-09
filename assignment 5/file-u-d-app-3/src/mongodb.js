const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log(e);
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const LogInCollection= mongoose.model('LogInCollection',logInSchema)

module.exports=LogInCollection