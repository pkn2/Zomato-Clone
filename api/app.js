const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const resroutes=require('./Routes/Restaurant');

const app=express();





app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use(bodyParser.json());

app.use('/', resroutes);

mongoose.connect('mongodb+srv://root:<password>.ciuc4.mongodb.net/<DB Nanme>?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(res=>{
    console.log('connected');
    app.listen(8080, () => {
        console.log("server running at port 8080")
    });
}).catch(err=>{
    console.log(err);
})

