const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resschema = new Schema({
    _id:{
        type:String,
        required:true
    },
    city_name:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    area:{
        type: String,
        required: true
    },
    locality:{
        type: String,
        required: true
    },
    thumb:{
        type:String,    

    },
    cost:{
        type:String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    type:{
        mealtype:{
            type:String,
            required: true
        },
        name:{
            type:String,
            required: true
        }
    },
    Cuisine:{
        cuisine:{
            type:String,
            required: true
        },
        name:{
            type:String,
            required: true
        }
    }
})

module.exports=mongoose.model('restaurants', resschema);