const express = require("express")
const router = express.Router()
const userContoller = require("../Controller/UserContoller")

router.post("/",userContoller.creatNewUser)
router.delete("/",userContoller.deleteUser)
router.put("/",userContoller.updateUser)

module.exports=router