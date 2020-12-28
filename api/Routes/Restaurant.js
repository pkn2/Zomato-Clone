const express= require('express');

const mealcontroler=require('../Controllers/Mealtype');
const locationcontroler=require('../Controllers/City');
const rescontroler=require('../Controllers/Restaurant');
const usercontroler=require('../Controllers/User');
const itemcontroler=require('../Controllers/Item');
const ordercontroler=require('../Controllers/Orderdata');
const paymentcontroler=require('../Controllers/paytm');


const router=express.Router();

router.get('/mealtype',mealcontroler.getmealtype);
router.get('/rest', rescontroler.getres);
router.get('/resbyid/:resId', rescontroler.getRestaurantById);
router.get('/resbycity/:cityId', rescontroler.getRestaurantBycity);
router.get('/itembyid/:resId', itemcontroler.itemsbyid);
router.get('/citylist',locationcontroler.city);
router.post('/paytmpayment',paymentcontroler.paymentbypaytm);
router.post('/payment_status',paymentcontroler.callback);

router.post('/res', rescontroler.filerres);

router.post('/singup', usercontroler.signup);
router.post('/login', usercontroler.login);

router.post('/orderdata', ordercontroler.oderdata)
 
module.exports=router;