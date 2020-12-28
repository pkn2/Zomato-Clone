const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderschema = new Schema({
    name:{
        type: String,
        required: true
    },
    email_address:{
        type:String
    },
    mobile_no:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required: true
    },
    total_price:{
        type:String
    },
    total_item:{
        type:Array
    },
    paymentdetails:{
        type:Object
    },
    order_id:{
        type:String,
        required: true
    },
    orderTime:{
        type:Date,
        default:Date.now()
    },
    orderstarus:{
        type: Array
    }
})

module.exports=mongoose.model('order', orderschema);