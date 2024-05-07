const User = require("../models/User")
const jwt= require("jsonwebtoken")
const bcrypt = require("bcrypt")

const login = async (req,res)=>{
    const {userName,password}=req.body
    if(!userName||!password){
        return res.status(400).json({message:"כל השדות חובה"})
    }
    const foundUser= await User.findOne({userName}).lean()
    if(!foundUser){
        return res.status(401).json({message:"!לא מורשה"})
    }
    const match=await bcrypt.compare(password,foundUser.password)
    if(!match){
        return res.status(401).json({message:"!!!לא מורשה"})
    }
    const userInfo={
        id:foundUser.id,
        password:foundUser.password,
        email:foundUser.email,
        phon:foundUser.fhon
    }
    const accessToken=jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken})
}

const register = async (req,res)=>{
    const {userName,password,email,phone}=req.body
    if(!userName || !password || !email || !phone){
        return res.status(400).json({message:"!כל השדות חובה"})
    }
    const duplicate=await User.findOne({userName:userName}).lean()
    if(duplicate){
        return res.status(409).json({message:"כפילות שמות משתמשים"})
    }  
    const hashedPwd=await bcrypt.hash(password,10)
    console.log("yhfcy")

    const userObject={userName,password:hashedPwd,email,phone}
     console.log("aaa")
     console.log(userObject.userName);
    // const user = await User.create(userObject)
    const user = await User.create(userObject)

    console.log("rut")
    if(user){
        console.log("yhfcy")
        return res.status(201).json({message:` נוצר ${user.userName} משתמש חדש`})
    }
    else{ 
        console.log("ttttttttt")
        return res.status(400).json({message:"לא נוצר משתמש חדש"})
    }

}

module.exports = {login,register}  