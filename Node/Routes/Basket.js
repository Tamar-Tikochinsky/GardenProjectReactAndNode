const express = require("express")
const router = express.Router()
const basketController = require("../Controller/BasketController")
const verifyJWT=require("../middelware/verifyJWT")
router.use(verifyJWT)
router.get("/:id",basketController.getBasketById)
router.post("/",basketController.addNewProductToBasket)
router.delete("/:id",basketController.deleteProductFromBasket)
router.get("/",basketController.getAllBasket)

module.exports=router