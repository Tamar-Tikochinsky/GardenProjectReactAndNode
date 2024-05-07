const express = require("express")
const router = express.Router()
const authController = require("../Controller/AuthController")

router.post("/login",authController.login)
router.post("/register",authController.register)

module.exports = router


