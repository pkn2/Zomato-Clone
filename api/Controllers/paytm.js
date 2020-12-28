const checksum_lib = require("../Paytm/checksum/checksum");
const order = require('../Models/Orderdata');
const qs = require('querystring');
const http = require('http');
const https = require('https');
const paymentDetails = require('../config');
const { insertMany } = require("../Models/Orderdata");




exports.paymentbypaytm = (req, res, next) => {

    const amount = req.body.amount;
    const customerId = req.body.customerId;
    const customerEmail = req.body.customerEmail;
    const customerPhone = req.body.customerPhone;

    if (!amount || !customerId || !customerEmail || !customerPhone) {
        res.status(400).json({ message: 'Payment failed' })
    } else {
        var params = {};
        params['MID'] = paymentDetails.merchant_id;
        params['WEBSITE'] = paymentDetails.website;
        params['CHANNEL_ID'] = paymentDetails.channel_id;
        params['INDUSTRY_TYPE_ID'] = paymentDetails.industry_type;
        params['ORDER_ID'] = 'TEST_' + new Date().getTime();
        params['CUST_ID'] = customerId;
        params['TXN_AMOUNT'] = amount;
        params['CALLBACK_URL'] = 'http://localhost:8080/payment_status';
        params['EMAIL'] = customerEmail;
        params['MOBILE_NO'] = customerPhone;



        checksum_lib.genchecksum(params, paymentDetails.merchant_key, function (err, checksum) {
            var param = {
                ...params,
                CHECKSUMHASH: checksum
            }
            //console.log(param)
            res.json(param)
        });

    }

}


exports.callback = (req, res, next) => {

    var body = '';

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        var html = "";
        var post_data = qs.parse(body);

        // received params in callback
        //console.log('Callback Response: ', post_data, "\n");
        html += "<b>Callback Response</b><br>";
        for (var x in post_data) {
            html += x + " => " + post_data[x] + "<br/>";
        }
        html += "<br/><br/>";

        // verify the checksum
        var checksumhash = post_data.CHECKSUMHASH;

        // delete post_data.CHECKSUMHASH;
        var result = checksum_lib.verifychecksum(post_data, 'tXrQAV1LL_9HN@ga', checksumhash);
        //console.log("Checksum Result => ", result, "\n");
        html += "<b>Checksum Result</b> => " + (result ? "True" : "False");
        html += "<br/><br/>";

        if (result) {

            // Send Server-to-Server request to verify Order Status
            var params = { "MID": paymentDetails.merchant_id, "ORDERID": post_data.ORDERID };

            //PaytmChecksum.generateSignature(params, paymentDetails.merchant_key,function (checksum) {
            checksum_lib.genchecksum(params, paymentDetails.merchant_key, function (err, checksum) {

                params.CHECKSUMHASH = checksum;
                post_data = 'JsonData=' + JSON.stringify(params);
                //console.log(post_data)
                var options = {
                    hostname: 'securegw-stage.paytm.in', // for staging
                    // hostname: 'securegw.paytm.in', // for production
                    port: 443,
                    path: '/order/status',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Length': post_data.length
                    }
                };

                // Set up the request
                var response = "";
                var post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });

                    post_res.on('end', function () {
                        //console.log('S2S Response: ', response, "\n");

                        var _result = JSON.parse(response);
                        html += "<b>Status Check Response</b><br>";
                        for (var x in _result) {
                            html += x + " => " + _result[x] + "<br/>";
                        }

                        var newresult = '';
                        var orderid = '';


                        for (var y in _result) {

                            if (y == "STATUS") {
                                var pk = _result[y];
                                if (pk == 'TXN_SUCCESS') {
                                    newresult += "<center><span><img src='https://icon-library.com/images/4631f6529c.png' height='120px' width='120px' /> </span></center><center style='padding-bottom: 15px;'><span style='color: green; font-size: 50px; font-weight: 600;'>Payment successful. </span></center>"

                                } else {
                                    newresult += "<center><span><img src='https://c7.uihere.com/files/833/287/785/check-mark-international-red-cross-and-red-crescent-movement-american-red-cross-clip-art-red-cross-mark-download-png.jpg' height='100px' width='100px'/></span></center><center style='padding-top: 11px; padding-bottom: 27px;'><span style='color: red; font-size: 50px; font-weight: 600;'>Payment failed!!!</span></center>"
                                }
                            }
                            if (y == "RESPMSG") {
                                var pkn = _result[y];
                                if (pkn == 'Txn Success') {
                                    newresult += "";
                                } else {
                                    newresult += "<center><b style='font-size: 25px; color: brown;'>" + _result[y] + "</b></center><br/>"
                                }

                            }

                        }

                        for (var p in _result) {
                            if (p == "ORDERID") {
                                newresult += "<center><span style='font-size: 32px;'>Your order id : </span>" + "<span style='color: grey; font-size: 18px;'>" + _result[p] + "</span><center><br/>";
                                orderid = _result[p]
                            }
                            if (p == "TXNAMOUNT") {
                                newresult += "<center><span style='font-size: 32px;'>Total amount : </span>" + "<span style='color: grey; font-size: 18px;'>" + _result[p] + "</span><center><br/>"
                            }
                            if (p == "BANKNAME") {
                                newresult += "<center><span style='font-size: 18px;'>Your Bankname : </span>" + "<span style='color: grey; font-size: 18px;'>" + _result[p] + "</span><center><br/>"
                            }
                            if (p == "TXNID") {
                                newresult += "<center><span style='font-size: 32px;'>Your transaction ID : </span>" + "<span style='color: grey; font-size: 18px;'>" + _result[p] + "</span><center><br/>"

                            }
                        }
                        newresult += "<center><a href='http://localhost:3000/'><button style='font-size: 34px; padding: 22px; color: white; background-color: green; border-radius: 7%;'>Back to home</button></a></center>"


                        order.updateMany({
                            order_id: orderid
                        }, {
                            $push: { paymentdetails: _result}
                        }).then(res => {
                            
                        }).catch(err => {
                            console.log(err)
                        });
                        
                        var newnewresult = '';

                        newnewresult = "<div style='width: auto; height: auto; background-color: lavender;'>"+ newresult +"</div>"

                        res.writeHead(200, { 'Content-Type': 'text/html' }); 
                        res.write(newnewresult);
                        res.end();
                    });



                });

                // post the data
                post_req.write(post_data);
                post_req.end();
            });

            console.log("Checksum Matched");
        }
        else {
            console.log("Checksum Mismatched");
            res.json({
                "MESSAGE": "Stop massing around with getwey"
            })
        }
    });

}