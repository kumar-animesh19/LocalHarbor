const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    seller_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"seller"
    },
    category : {
        type:String,
        required:true
    },
    sub_category : {
        type:String,
        required:true
    },
    gender : {
        type:String   
    },
    product_name : {
        type:String,
        required:true
    },
    product_brand : {
        type:String,
        required:true
    },
    mrp : {
        type:Number,
        required:true
    },
    selling_price : {
        type:Number,
        required:true
    },
    discount : {
        type:Number,
        required:true
    },
    size :{
        type:String
    },
    color : {
        type:String
    },
    quantity : {
        type:String
    },
    description : {
        type:String,
        required:true
    },
    product_image :{ 
        type:String,
        required:true
    }
}, {timestamps:true})

module.exports = mongoose.model('product',productSchema)