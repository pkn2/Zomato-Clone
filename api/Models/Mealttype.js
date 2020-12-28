const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealschema = new Schema({
    _id:{
        type:String,
        required:true
    },
    name:{
        type: String,
        required: true
    },
    content:{
        type:String,    

    },
    image:{
        type:String,
        required: true
    }
})

module.exports=mongoose.model('mealtypes', mealschema);