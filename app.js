const express = require('express');
const bp = require('body-parser');
const emsDB = require('./database/connect');
const partsRouter = require('./routes/parts');
const fileUpload = require('express-fileupload');

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

app.use(express.static('./public'));
app.use(fileUpload());
app.use('/',partsRouter);

app.listen(4000,()=>{
    console.log('Server is listening to port 4000 ...');
})