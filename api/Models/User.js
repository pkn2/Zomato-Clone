const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userschema = new schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    Mob_number:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
   
});

module.exports=mongoose.model('user', userschema);