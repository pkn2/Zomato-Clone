const order = require('../Models/Orderdata');

exports.oderdata=(req, res, next)=>{
    var name = req.body.name;
    var email_address = req.body.email_address;
    var mobile_no = req.body.mobile_no;
    var address = req.body.address;
    var total_price = req.body.total_price;
    var total_item = req.body.total_item;
    var pin_code=req.body.pin_code;
    var order_id = req.body.order_id;
    

    const orderby = new order({name: name, email_address: email_address, mobile_no: mobile_no, address:address, total_price: total_price, total_item: total_item, pin_code: pin_code, order_id:order_id });


    orderby.save().then(result =>{
        res.status(200).json({message: 'Data saved', isModelisopen: false, orderdetails: result })
    }).catch(err=>{
        res.status(500).json({message: err, isModel: true})
    })   
}