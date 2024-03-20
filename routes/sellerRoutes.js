const express = require("express")
const sellerRouter = express.Router();
const authSeller =  require("../middleware/authSeller");
const upload = require("../middleware/upload")
const {checkSeller, sellerRegistration, sellerLogin, resetSellerPassword, addProduct, fetchSellerProducts, removeProduct, fetchSellerDetails} = require("../controllers/sellerController")

sellerRouter.get("/checkSeller", checkSeller)
sellerRouter.post("/sellerRegistration", sellerRegistration)
sellerRouter.post("/sellerLogin", sellerLogin)
sellerRouter.put("/resetSellerPassword", resetSellerPassword)
sellerRouter.post("/addProduct", authSeller, upload.single('product_image'), addProduct)
sellerRouter.get("/fetchSellerProducts", authSeller, fetchSellerProducts)
sellerRouter.delete("/removeProduct", authSeller, removeProduct)
sellerRouter.get("/fetchSellerDetails", authSeller, fetchSellerDetails)

module.exports = sellerRouter