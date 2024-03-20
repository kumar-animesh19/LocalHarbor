const mongoose = require("mongoose")

const customerSchema = mongoose.Schema({
    name : {
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
    password : {
        type:String,
        required:true
    },
    cart : [{
        type: mongoose.Schema.Types.ObjectId, 
        ref:"product"
    }],
    orders : [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "product"
    }]
}, {timestamps:true})

module.exports = mongoose.model('customer',customerSchema)