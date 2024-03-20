const express = require("express")
const customerRouter = express.Router();
const authCustomer =  require("../middleware/authCustomer");
const {checkUser, customerRegistration, customerLogin, resetPassword, fetchOrder,fetchCart, fetchProducts, fetchProductDetails, addToCart, removeCartProduct, fetchDetails, updateName, updateEmail, updateContact, deleteAccount} = require("../controllers/customerController")

customerRouter.get("/checkUser", checkUser)
customerRouter.post("/customerRegistration", customerRegistration)
customerRouter.post("/customerLogin", customerLogin)
customerRouter.put("/resetPassword", resetPassword)
customerRouter.get("/fetchOrder", authCustomer, fetchOrder)
customerRouter.get("/fetchCart", authCustomer, fetchCart)
customerRouter.get("/fetchProducts", fetchProducts)
customerRouter.get("/fetchProductDetails", fetchProductDetails)
customerRouter.put("/addToCart", authCustomer, addToCart)
customerRouter.delete("/removeCartProduct", authCustomer, removeCartProduct)
customerRouter.get("/fetchDetails", authCustomer, fetchDetails)
customerRouter.put("/updateName", authCustomer, updateName)
customerRouter.put("/updateEmail", authCustomer, updateEmail)
customerRouter.put("/updateContact", authCustomer, updateContact)
customerRouter.delete("/deleteAccount", authCustomer, deleteAccount)

module.exports = customerRouter