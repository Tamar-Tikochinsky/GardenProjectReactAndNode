const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    price:{
        type:Number,
        required:true
    },
    size:{
        type:String
    },
    Image:{
        type:String
    }



})
module.exports=mongoose.model('Product',productSchema)