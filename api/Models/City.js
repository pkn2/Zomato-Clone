const mongoose = require('mongoose');

const schema = mongoose.Schema;

const cityschema = new schema({
    _id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    city_id:{
        type:String,
        required: true

    },
    location_id:{
        type:String,
        required: true
    },
    country_name:{
        type:String,
        required: true
    }
})

module.exports=mongoose.models.Location || mongoose.model('Location', cityschema);