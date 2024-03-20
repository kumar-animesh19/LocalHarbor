const mongoose = require("mongoose")

const sellerSchema = mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    shop_name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
    },
    number : {
        type:Number,
        required:true
    },
    gstin :{
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true
    },
    products : [{
        type: mongoose.Schema.Types.ObjectId,  
        ref:"product"
    }]
}, {timestamps:true})

module.exports = mongoose.model('seller',sellerSchema)