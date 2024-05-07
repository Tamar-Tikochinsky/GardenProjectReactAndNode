const Product=require("../models/Product")

const creatNewProduct=async(req,res)=>{
    const{name,size, price,Image}=req.body
    if(!name || !price){
        return res.status(400).json({message:"!השדות מחיר ושם חובה"})
    }
    const product=await Product.create({name,size, price,Image})
    if(product){
        return res.status(201).json({message:"מוצר חדש נוצר"})
    }
    else{
        return res.status(400).json({message:"לא הצלחנו ליצור מוצר חדש"})
    }
}

const updateProduct=async(req,res)=>{
    const{id,name,size, price,Image}=req.body
    // if(!id || !name ||!price){
    //     return res.status(400).json({message:"!השדות מחיר ושם חובה"})
    // }
    const product=await Product.findById(id).exec()
    if(!product){
        return res.status(201).json({message:"המוצר לא נמצא"})
    }
    product.name=name,
    product.size=size,
    product.price=price,
    product.Image=Image
    const updateProducts=await product.save()
    res.json(`!עודכן ${updateProducts.name} `)
}

const deleteProduct=async(req,res)=>{
    const{id}=req.body
    const product=await Product.findById(id).exec()
    if(!product){
        return res.status(400).json({message:"המוצר לא נמצא"})
    }
    const result=await product.deleteOne()
    const reply=`נמחק המוצר`
    res.json(reply)
}

const getAllProduct=async(req,res)=>{
    const products=await Product.find().lean()
    if(!products?.length){
        return res.status(400).json({message:"לא נמצאו מוצרים"})
    }
    res.json(products)
}

const getProductById=async(req,res)=>{
    const {id} = req.params
    const products=await Product.findById(id).exec()
    if(!products){
        return res.status(400).json({message:"לא נמצאו מוצרים"})
    }
    res.json(`${products.name} ${products.size} ${products.price} ${products.Image}`)
}

module.exports={creatNewProduct,updateProduct,deleteProduct,getAllProduct,getProductById}