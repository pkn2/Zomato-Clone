const Location=require('../Models/City');

exports.city=(req, res)=>{
    Location.find().then(result =>{
        res.status(200).json({message: 'city fatch successsfully',cityname:result})
    }).catch(err=>{
        res.status(500).json({message: err})
    })
}

