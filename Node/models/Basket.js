const mongoose=require('mongoose')

const basketSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})
module.exports=mongoose.model('Basket',basketSchema)

