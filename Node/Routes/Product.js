const express = require("express")
const router = express.Router()
const productController = require("../Controller/ProductController")

router.get("/",productController.getAllProduct)
router.get("/:id",productController.getProductById)
router.post("/",productController.creatNewProduct)
router.put("/",productController.updateProduct)
router.delete("/",productController.deleteProduct)

module.exports=router