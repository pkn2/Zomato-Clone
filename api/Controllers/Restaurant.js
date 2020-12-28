const restaurants = require('../Models/Restaurant');



exports.getres = (req, res) => {
    restaurants.find().then(result => {
        res.status(200).json({ result })
    }).catch(err => {
        res.status(500).json({ message: err })
    })
}

exports.getRestaurantById = (req, res, next) => {
    const resId = req.params.resId;
    restaurants.findById(resId).then(result => {
        res.status(200).json({ message: "Restaurant Fetched Sucessfully", restaurant: result })
    }).catch(err => console.log(err));
}



/*
exports.filerres = (req, res) => {
    var aa;
    var location = req.body.location;
    var cuisine = req.body.cuisine;
    var mealtype = req.body.mealtype;
    var lcost = req.body.lcost;
    var hcost = req.body.hcost;
    var sort = req.body.sort ? req.body.sort : 1;

    const page = req.body.page ? parseInt(req.body.page) : 1;

    const pagination = req.body.pagination ? parseInt(req.body.pagination) : 5;



    if (location != '' && mealtype != '' && cuisine != '' && lcost != '' && hcost != '') {
        aa = restaurants.find(
            {
                city_name: location,
                type: { $elemMatch: { name: mealtype } },
                Cuisine: { $elemMatch: { name: cuisine } },
                cost: { $lt: hcost, $gt: lcost }
            }
        ).sort({ cost: sort }).skip((page - 1) * pagination).limit(pagination).then(result => {
            res.status(200).json({message: `list of item = ${result.length} and page no is=${page}`, Output: result})
        }).catch(err => {
            res.status(500).json({ message: err })
        })
    }

    if (location == '' && mealtype != '' && cuisine != '' && lcost != '' && hcost != '') {
        aa = restaurants.find(
            {
                type: { $elemMatch: { name: mealtype } },
                Cuisine: { $elemMatch: { name: cuisine } },
                cost: { $lt: hcost, $gt: lcost }
            }
        ).sort({ cost: sort }).skip((page - 1) * pagination).limit(pagination).then(result => {
            res.status(200).json({message: `list of item = ${result.length} and page no is=${page}`, Output: result})
        }).catch(err => {
            res.status(500).json({ message: err })
        })
    }

    if (location == '' && mealtype == '' && cuisine != '' && lcost != '' && hcost != '') {
        aa = restaurants.find(
            {
                Cuisine: { $elemMatch: { name: cuisine } },
                cost: { $lt: hcost, $gt: lcost }
            }
        ).sort({ cost: sort }).skip((page - 1) * pagination).limit(pagination).then(result => {
            res.status(200).json({message: `list of item = ${result.length} and page no is=${page}`, Output: result})
        }).catch(err => {
            res.status(500).json({ message: err })
        })
    }

    if (location == '' && mealtype == '' && cuisine == '' && lcost != '' && hcost != '') {
        aa = restaurants.find(
            {
                cost: { $lt: hcost, $gt: lcost }
            }
        ).sort({ cost: sort }).skip((page - 1) * pagination).limit(pagination).then(result => {
            res.status(200).json({message: `list of item = ${result.length} and page no is=${page}`, Output: result})
        }).catch(err => {
            res.status(500).json({ message: err })
        })
    }

    if (location == '' && mealtype == '' && cuisine == '' && lcost == '' && hcost == '') {
        aa = restaurants.find(

        ).sort({ cost: sort }).skip((page - 1) * pagination).limit(pagination).then(result => {
            res.status(200).json({message: `list of item = ${result.length} and page no is=${page}`, Output: result})
        }).catch(err => {
            res.status(500).json({ message: err })
        })
    }

    if (location != '' && mealtype != '' && cuisine != '' && lcost == '' && hcost == '') {
        aa = restaurants.find({
            city_name: location,
            type: { $elemMatch: { name: mealtype } },
            Cuisine: { $elemMatch: { name: cuisine } }
        }).sort({ cost: sort }).skip((page - 1) * pagination).limit(pagination).then(result => {
            res.status(200).json({message: `list of item = ${result.length} and page no is=${page}`, Output: result})
        }).catch(err => {
            res.status(500).json({ message: err })
        })
    }

    if (location != '' && mealtype != '' && cuisine == '' && lcost == '' && hcost == '') {
        aa = restaurants.find(
            {
                city_name: location,
                type: { $elemMatch: { name: mealtype } }
            }
        ).sort({ cost: sort }).skip((page - 1) * pagination).limit(pagination).then(result => {
            res.status(200).json({ message: `list of item = ${result.length} and page no is=${page}`, Output: result})
        }).catch(err => {
            res.status(500).json({ message: err })
        })
    }


    if (location != '' && mealtype == '' && cuisine == '' && lcost == '' && hcost == '') {
    

        aa = restaurants.find(
            {
                city_name: location,
            }
        ).sort({ cost: sort }).skip((page - 1) * pagination).limit(pagination).then(result => {
            res.status(200).json({message: `list of item = ${result.length} and page no is=${page}`, Output: result})

        }).catch(err => {
            res.status(500).json({ message: err })
        })

    }

    if (location == '' && mealtype != '' && cuisine == '' && lcost != '' && hcost != '') {
        aa = restaurants.find(
            {
                type: { $elemMatch: { name: mealtype } },
                cost: { $lt: hcost, $gt: lcost }
            }
        ).sort({ cost: sort }).skip((page - 1) * pagination).limit(pagination).then(result => {
            res.status(200).json({message: `list of item = ${result.length} and page no is=${page}`, Output: result})
        }).catch(err => {
            res.status(500).json({ message: err })
        })
    }

    if (location == '' && mealtype != '' && cuisine != '' && lcost == '' && hcost == '') {
        aa = restaurants.find(
            {
                type: { $elemMatch: { name: mealtype } },
                Cuisine: { $elemMatch: { name: cuisine } },
            }
        ).sort({ cost: sort }).skip((page - 1) * pagination).limit(pagination).then(result => {
            res.status(200).json({ message: `list of item = ${result.length} and page no is=${page}`, Output: result})
        }).catch(err => {
            res.status(500).json({ message: err })
        })
    }

    if (location != '' && mealtype == '' && cuisine == '' && lcost != '' && hcost != '') {
        aa = restaurants.find(
            {
                city_name: location,
                cost: { $lt: hcost, $gt: lcost }
            }
        ).sort({ cost: sort }).skip((page - 1) * pagination).limit(pagination).then(result => {
            res.status(200).json({ message: `list of item = ${result.length} and page no is=${page}`, Output: result })
        }).catch(err => {
            res.status(500).json({ message: err })
        })
    }

    if (location != '' && mealtype == '' && cuisine != '' && lcost == '' && hcost == '') {
        aa = restaurants.find(
            {
                city_name: location,
                Cuisine: { $elemMatch: { name: cuisine } }
            }
        ).sort({ cost: sort }).skip((page - 1) * pagination).limit(pagination).then(result => {
            res.status(200).json({message: `list of item = ${result.length} and page no is=${page}`, Output: result})
        }).catch(err => {
            res.status(500).json({ message: err })
        })
    }


    if (location == '' && mealtype == '' && cuisine != '' && lcost == '' && hcost == '') {
        aa = restaurants.find(
            {
                Cuisine: { $elemMatch: { name: cuisine } }
            }
        ).sort({ cost: sort }).skip((page - 1) * pagination).limit(pagination).then(result => {
            res.status(200).json({ message: `list of item = ${result.length} and page no is=${page}`, Output: result })
        }).catch(err => {
            res.status(500).json({ message: err })
        })
    }

    if (location == '' && mealtype != '' && cuisine == '' && lcost == '' && hcost == '') {
        aa = restaurants.find(
            {
                type: { $elemMatch: { name: mealtype } }
            }
        ).sort({ cost: sort }).skip((page - 1) * pagination).limit(pagination).then(result => {
            res.status(200).json({message: `list of item = ${result.length} and page no is=${page}`, Output: result})
        }).catch(err => {
            res.status(500).json({ message: err })
        })
    }

    if (location != '' && mealtype == '' && cuisine != '' && lcost != '' && hcost != '') {
        aa = restaurants.find(
            {
                city_name: location,
                Cuisine: { $elemMatch: { name: cuisine } },
                cost: { $lt: hcost, $gt: lcost }
            }
        ).sort({ cost: sort }).skip((page - 1) * pagination).limit(pagination).then(result => {
            res.status(200).json({message: `list of item = ${result.length} and page no is=${page}`, Output: result})
        }).catch(err => {
            res.status(500).json({ message: err })
        })
    }

    if (location != '' && mealtype != '' && cuisine == '' && lcost != '' && hcost != '') {
        aa = restaurants.find(
            {
                city_name: location,
                type: { $elemMatch: { name: mealtype } },
                cost: { $lt: hcost, $gt: lcost }
            }
        ).sort({ cost: sort }).skip((page - 1) * pagination).limit(pagination).then(result => {
            res.status(200).json({message: `list of item = ${result.length} and page no is=${page}`, Output: result, out:result.length})
        }).catch(err => {
            res.status(500).json({ message: err })
        })
    }
}
 */


exports.filerres = (req, res, next) => {
    var location = req.body.location;
    var cuisine = req.body.cuisine;
    var mealtype = req.body.mealtype;
    var lcost = req.body.lcost;
    var hcost = req.body.hcost;
    var sort = req.body.sort ? req.body.sort : 1;
    const page = req.body.page ? req.body.page : 1;

    let start;
    let end;

    start = Number(page * 4) - 4;
    end = Number(page * 4);
    let payload = {};

    if (mealtype) {
        payload = {
            'type.mealtype': Number(mealtype)
        }
    }
    if (mealtype && hcost && lcost) {
        payload = {
            'type.mealtype': Number(mealtype),
            cost: { $lt: hcost, $gt: lcost }
        }
    }
    if (mealtype && location) {
        payload = {
            'type.mealtype': mealtype,
            city: location
        }
    }
    if (mealtype && location && hcost && lcost) {
        payload = {
            'type.mealtype': mealtype,
            city: location,
            cost: { $lt: hcost, $gt: lcost }
        }
    }

    if (mealtype && cuisine) {
        payload = {
            'type.mealtype': Number(mealtype),
            //"Cuisine.cuisine": { $in : cuisine}
            Cuisine: { $elemMatch: { cuisine: { $in: cuisine } } }
        }
    }
    if (mealtype && cuisine && location) {
        payload = {
            'type.mealtype': mealtype,
            "Cuisine.cuisine": { $in: cuisine },
            city: location,
        }
    }
    if (mealtype && cuisine && location && hcost && lcost) {
        payload = {
            'type.mealtype': mealtype,
            "Cuisine.cuisine": { $in: cuisine },
            city: location,
            cost: { $lt: hcost, $gt: lcost }
        }

        /*restaurants.find([
            {
                '$match': {
                    'Cuisine': {
                        '$elemMatch': {
                            'cuisine': {
                                '$in': [
                                    cuisine
                                ]
                            }
                        }
                    },
                    'type': {
                        '$elemMatch': {
                            'mealtype': mealtype
                        }
                    },
                    'city': location,
                    'cost': {
                        '$lt': hcost
                    },
                    'cost': {
                        '$gt': lcost
                    }
                }
            }
        ]).then(result => {
            res.status(200).json({ message: "Resturent Fatch Successfully", resturants: result})
        }).catch(err => {
            res.status(500).json({ message: err })
        });*/



    }
    if (mealtype && cuisine && hcost && lcost) {
        payload = {
            'type.mealtype': mealtype,
            "Cuisine.cuisine": { $in: cuisine },
            cost: { $lt: hcost, $gt: lcost }
        }
    }

    restaurants.find(payload).sort({ cost: sort }).then(result => {
        const count = result.length / 4;
        const arr = [];
        const resultvaue = result.slice(start, end);
        for (var i = 0; i < count; i++) {
            arr.push(i + 1);
        }
        res.status(200).json({ message: "Resturent Fatch Successfully", resturants: resultvaue, page: arr, totalresult: result.length })
    }).catch(err => {
        res.status(500).json({ message: err })
    });

}




exports.getRestaurantBycity = (req, res, next) => {
    const cityId = req.params.cityId;
    restaurants.find({ city: cityId }).then(result => {
        res.status(200).json({ message: "Restaurant Fetched Sucessfully", restbyloc: result })
    }).catch(err => console.log(err));
}