const express = require('express');
const bp = require('body-parser');
const csvtojson = require('csvtojson');
const emsDB = require('./database/connect');

const app = express();

emsDB.connect(()=>{
    try {
        console.log('MySQL database is connected ...')
    } catch (error) {
        console.log(error);
    }
})

//bodyparser
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.listen(4000,()=>{
    console.log('Server is listening to port 4000 ...');
})