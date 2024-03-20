const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const fs = require("fs")

const seller = require("../models/seller")
const product = require("../models/product")

const checkSeller =  async (req, res) => {
    const existingSeller = await seller.findOne({email: req.headers.email})
    if (existingSeller) {
        res.send({Auth:"Decline"})
    }
    else{
        res.send({Auth:"Success"})
    }
} 

const sellerRegistration = async (req, res)=> {
    try {
        const existingSeller = await seller.findOne({email: req.body.email})
        if (existingSeller) {
            res.send({Auth:"Decline", Msg:"Email already in use"})
        }
        else{
            const hashPassword = await bcrypt.hash(req.body.password,10)
            const newSeller = new seller({
                name : req.body.name,
                shop_name :req.body.shop_name,
                email : req.body.email,
                number : req.body.number,
                gstin : req.body .gstin,
                password : hashPassword
            });
            newSeller.save()
            .then(()=>
                res.send({Auth:"Success", Msg:"Registration Successful"})
            )
        }
    } catch (error) {
        console.log(error);
    }
}

const sellerLogin = async (req,res)=>{
    try {
        const existingSeller = await seller.findOne({email: req.body.email})
        if(!existingSeller){
            res.send({Auth:"Decline",Msg:"User doesn't exist"})
        }
        else{
            const matchPassword = await bcrypt.compare(req.body.password, existingSeller.password)
            if (!matchPassword) {
                res.send({Auth:"Decline",Msg:"Password mismatched"})
            }
            else{
                const token = jwt.sign({email: existingSeller.email, id: existingSeller._id}, process.env.SECRET_KEY)
                res.send({Auth:"Success",Name:existingSeller.name,Shop_Name:existingSeller.shop_name,Token:token})
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const resetSellerPassword = async (req,res)=>{
    try{
        const hashPassword = await bcrypt.hash(req.headers.password,10)
        await  seller.updateOne({email : req.headers.email},{password : hashPassword});
        res.send({Auth:"Success",Msg:"Password changed successfully, Login to continue......"})
    }
    catch(error){
        console.log(error);
    }
}

const addProduct = async (req, res)=>{
    if(req.filevalidationerror){
        res.send({Auth:"Decline", Msg:"Only jpeg, jpg, png and gif image allowed"})
    }
    else{
        try{
            const newProduct = new product({
                seller_id : req.headers.user_id,
                category : req.body.category,
                sub_category : req.body.sub_category,
                gender : req.body.gender,
                product_name : req.body.product_name,
                product_brand : req.body.product_brand,
                mrp : req.body.mrp,
                selling_price : req.body.selling_price,
                discount : req.body.discount,
                size : req.body.size,
                color : req.body.color,
                quantity : req.body.quantity,
                description : req.body.description,
                product_image : req.file.filename
            });
            const  result = await newProduct.save();
            await seller.updateOne({_id : req.headers.user_id}, {$push: {products : result._id}})
            res.send({Auth:"Success", Msg:"Product added successfully...."}) 
        } catch (error) {
            console.log(error);
        }
    }
}

const fetchSellerProducts = async (req ,res)=>{
    try{
        const data = await seller.findOne({_id : req.headers.user_id}).populate("products")
        res.send({Auth:"Success", Data:data})
    }
    catch(error){
        console.log(error);
    }
}

const removeProduct = async (req,res)=>{
    try{
        const  data = await product.findOne({_id : req.headers.product_id});
        fs.unlinkSync(`./src/uploads/${data.product_image}`)
            
        await product.deleteOne({_id : req.headers.product_id})
        await seller.updateOne({_id : req.headers.user_id},{$pull:{products : req.headers.product_id}})
        res.send({Auth:"Success",Msg:"Deleted Successfully....."});
    }
    catch(error){
        console.log(error);
    }
}

const fetchSellerDetails = async (req,res)=>{
    try{
        const data = await seller.findOne({_id:req.headers.user_id})
        res.send({Auth:"Success",Data:data})
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {checkSeller, sellerRegistration, sellerLogin, resetSellerPassword, addProduct, fetchSellerProducts, removeProduct, fetchSellerDetails}
