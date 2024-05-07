const User=require("../models/User")

const creatNewUser=async(req,res)=>{
    const{userName,password,email,phone}=req.body
    if(!userName || !password){
        return res.status(400).json({message:"! השדות שם משצמש וסיסמא חובה"})
    }
    const user= await User.create({userName,password,email,phon})
    if(user){
        return res.status(201).json({message:"משתמש חדש נוצר"})
    }
    else{
        return res.status(400).json({message:"לא הצלחנו ליצור משתמש חדש"})
    }
}

const updateUser=async(req,res)=>{
    const{id,userName,password,email,phone}=req.body
    if(!id || !userName || !password){
        return res.status(400).json({message:"! השדות שם משצמש וסיסמא חובה"})
    }
    const user=await User.findById(id).exec()
    if(!user){
        return res.status(201).json({message:"המשתמש לא נמצא"})
    }
    user.userName=userName,
    user.password=password,
    user.email=email,
    user.phone=phone
    res.json(`!עודכן ${updateUser.userName} `)
}
    
const deleteUser =async(req,res)=>{
    const {id}=req.body
    const user=await User.findById(id).exec()
    if(!user){
        return res.status(400).json({message:"המשתמש לא נמצא"})
    }
    const result=await user.deleteOne()
    const reply=`נמחק'${result.userName}המשתמש' `
    res.json(reply)
}



module.exports={creatNewUser,updateUser,deleteUser}