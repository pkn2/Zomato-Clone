const mongoose = require('mongoose');

const schema = mongoose.Schema;

const itemschema = new schema({
    _id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    price:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    rating:{
        type:String,
        required: true
    },
    restaurant:{
        type:Array,
        required: true
    },
    img:{
        type:String,
        required: true
    }

})

module.exports=mongoose.models.items || mongoose.model('items', itemschema);