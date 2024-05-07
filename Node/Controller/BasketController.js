const Basket=require("../models/Basket")
const producById = require("../Controller/ProductController")

const addNewProductToBasket=async(req,res)=>{
    const{userId,productId}=req.body
    if(!productId || !userId){
        return res.status(400).json({message:"! כל השדות חובה "})
    }
    const newProduct=await Basket.create({userId,productId})
    if(newProduct){
        return res.status(201).json({message:"מוצר חדש נוסף לסל"})
    }
    else{
        return res.status(400).json({message:"לא הצלחנו להוסיף את המוצר לסל"})
    }
}

const getBasketById=async (req,res)=>{
    const {id} = req.params
    const basket = await Basket.find({"userId":id}).exec()
    if(!basket){
        return res.status(400).json({message:"לא נמצאו מוצרים בסל"})
    }
    // res.json(producById.getProductById(basket.producId))
    res.json(basket)
}

const deleteProductFromBasket = async (req,res)=>{
    const{id}=req.params
    const product = await Basket.findById(id).exec()
    if(!product){
        return res.status(400).json({message:"המוצר לא נמצא"})
    }
    const result=await product.deleteOne()
    const reply=`נמחק'${result.userName} המוצר' `
    res.json(reply)
}

const getAllBasket = async (req,res)=>{
    // console.log(req.user)
    const basket = await Basket.find().lean()
    if(!basket?.length){
        return res.status(400).json({message:"no tasks found"})
    }
    res.json(basket)
}


module.exports={addNewProductToBasket,getBasketById,deleteProductFromBasket,getAllBasket}