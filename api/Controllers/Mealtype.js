const mealtypes=require('../Models/Mealttype');

exports.getmealtype=(req, res)=>{
    mealtypes.find().then(result =>{
        res.status(200).json({message:"mealtype fatch successfully",meal:result})
    }).catch(err=>{
        res.status(500).json({message: err})
    })
}
