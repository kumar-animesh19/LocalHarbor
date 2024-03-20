const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const customer = require("../models/customer")
const product = require("../models/product")

const checkUser =  async (req, res) => {
    const existingCustomer = await customer.findOne({email: req.headers.email})
    if (existingCustomer) {
        res.send({Auth:"Decline", Msg:"Email already in use"})
    }
    else{
        res.send({Auth:"Success"})
    }
}  

const customerRegistration = async (req, res)=> {
    try {
        const hashPassword = await bcrypt.hash(req.body.password,10)
        const newCustomer = new customer({
            name : req.body.name,
            email : req.body.email,
            number : req.body.number,
            password : hashPassword
        });
        newCustomer.save()
        .then(()=>
            res.send({Auth:"Success", Msg:"Registration Successful, Login to continue......"})
        )
    }
    catch (error) {
        console.log(error);
    }
}

const customerLogin = async (req,res)=>{
    try {
        const existingCustomer = await customer.findOne({email: req.body.email})
        if(!existingCustomer){
            res.send({Auth:"Decline",Msg:"User doesn't exist"})
        }
        else{
            const matchPassword = await bcrypt.compare(req.body.password, existingCustomer.password)
            if (!matchPassword) {
                res.send({Auth:"Decline",Msg:"Password mismatched"})
            }
            else{
                const token = jwt.sign({email: existingCustomer.email, id: existingCustomer._id}, process.env.SECRET_KEY)
                res.send({Auth:"Success",Name:existingCustomer.name,Token:token})
            }
        }
    } 
    catch (error) {
        console.log(error);
    }
}

const resetPassword = async (req,res)=>{
    try{
        const hashPassword = await bcrypt.hash(req.headers.password,10)
        await  customer.updateOne({email : req.headers.email},{password : hashPassword});
        res.send({Auth:"Success",Msg:"Password changed successfully, Login to continue......"})
    }
    catch(error){
        console.log(error);
    }
}

const fetchOrder = async (req,res)=>{
    try{
        const data = await customer.findOne({_id : req.headers.user_id}).populate("orders")
        res.send({Auth:"Success", Data:data})
    }
    catch(error){
        console.log(error);
    }
}

const fetchCart = async (req,res)=>{
    try{
        const data = await customer.findOne({_id : req.headers.user_id}).populate("cart")
        res.send({Auth:"Success", Data:data})
    }
    catch(error){
        console.log(error);
    }
}

const fetchProducts = async (req,res)=>{
    try{
        const data = await product.find()
        res.send({Auth:"Success", Data:data})
    }
    catch(error){
        console.log(error);
    }
}

const fetchProductDetails = async (req,res)=>{
    try{
        const data = await product.findOne({_id:req.headers.product_id})
        res.send({Auth:"Success",Data:data})
    }
    catch(error){
        console.log(error);
    }
}

const addToCart = async (req,res)=> {
    try{
        await customer.updateOne({_id : req.headers.user_id}, {$push: {cart : req.headers.product_id}})
        res.send({Auth:"Success"})
    }
    catch(error){
        console.log(error);
    }
}

const removeCartProduct = async (req,res)=>{
    try{
        await customer.updateOne({_id : req.headers.user_id},{$pull:{cart : req.headers.product_id}})
        res.send({Auth:"Success",Msg:"Removed Successfully....."});
    }
    catch(error){
        console.log(error);
    }
}

const fetchDetails = async (req,res)=>{
    try{
        const data = await customer.findOne({_id : req.headers.user_id})
        res.send({Auth:"Success", Data:data})
    }
    catch(error){
        console.log(error);
    }
}

const updateName = async (req,res)=>{
    try{
        await customer.updateOne({_id : req.headers.user_id},{name : req.headers.name})
        res.send({Auth:"Success", Name:req.headers.name});
    }
    catch(error){
        console.log(error);
    }
}

const updateEmail = async (req,res)=>{
    try{
        await customer.updateOne({_id : req.headers.user_id},{email : req.headers.email})
        const existingCustomer = await customer.findOne({_id : req.headers.user_id})
        const token = jwt.sign({email: existingCustomer.email, id: existingCustomer._id}, process.env.SECRET_KEY)
        res.send({Auth:"Success", Token: token});
    }
    catch(error){
        console.log(error);
    }
}

const updateContact = async (req,res)=>{
    try{
        await customer.updateOne({_id : req.headers.user_id},{number : req.headers.contact})
        res.send({Auth:"Success"});
    }
    catch(error){
        console.log(error);
    }
}

const deleteAccount = async (req,res) => {
    try{
        await customer.deleteOne({_id : req.headers.user_id})
        res.send({Auth:"Success", Msg:"Account deleted successfully..."})
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {checkUser, customerRegistration, customerLogin, resetPassword, fetchOrder, fetchCart, fetchProducts, fetchProductDetails, addToCart, removeCartProduct, fetchDetails, updateName, updateEmail, updateContact, deleteAccount}