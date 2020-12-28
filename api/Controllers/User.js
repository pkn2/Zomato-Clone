const user=require('../Models/User');



exports.login=(req, res, next)=>{
    var email = req.body.email;
    var password = req.body.password;

    user.find({email:email, password:password}).then(result =>{

        if (result.length >= 1) {
            res.status(200).json({message: 'User logedIn successsfully', modelHandeler: false, isAuthentigation: true, user:result })
        } else {
            res.status(200).json({message: 'User Not exist!', modelHandeler: true, isAuthentigation: false, user:result })
        }

        
    }).catch(err=>{
        res.status(500).json({message: err})
    })
}



exports.signup=(req, res, next)=>{
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var Mob_number = req.body.Mob_number;
    var password = req.body.password;

    const singinuser = new user({first_name: first_name, last_name: last_name, email: email, Mob_number:Mob_number, password: password});

    user.find({email:email}).then(responce=>{

        if(responce.length >= 1){
            res.status(200).json({message: "User Already exist.", isModel: true})
        }else{
            singinuser.save().then(result =>{
                res.status(200).json({message: 'User SignedUp successsfully',isModel: false, users: result })
            }).catch(err=>{
                res.status(500).json({message: err})
            })
        }

    })

    
}