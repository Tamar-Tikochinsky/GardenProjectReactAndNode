require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectDB = require("./config/dbConn")
const corsOptions = require("./config/corsOptions")
const {mongoose}=require("mongoose")
const app=express()
const PORT = process.env.PORT || 1234

connectDB()

app.use(express.json())
app.use(cors(corsOptions))
app.use(express.static("public"))
app.use("/api/user",require("./Routes/User"))
app.use("/api/product",require("./Routes/Product"))
app.use("/api/auth",require("./Routes/authRoutes"))
app.use("/api/basket",require("./Routes/Basket"))

app.get("/",(req,res)=>{
    res.send("this is my home page")
})
console.log(process.env.NODE_ENV)

mongoose.connection.once('open',()=>{
    console.log('connected to mongoDB')
    app.listen(PORT , ()=> {
        console.log(`server run on ${PORT}`)
    })
})

mongoose.connection.on('error',err => {
    console.log(err)
})

