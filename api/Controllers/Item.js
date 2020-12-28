const items=require('../Models/Item');

exports.itemsbyid=(req, res)=>{
    const resId = req.params.resId;
    items.find({restaurant:resId}).then(result =>{
        res.status(200).json({message: 'city fatch successsfully',cityname:result})
    }).catch(err=>{
        res.status(500).json({message: err})
    })
}
