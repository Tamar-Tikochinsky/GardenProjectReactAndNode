const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        trim:true
    },
    phone:{
        type:String
    }
})
module.exports=mongoose.model('User',userSchema)