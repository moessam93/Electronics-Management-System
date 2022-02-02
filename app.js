const express = require('express');
const bp = require('body-parser');
const emsDB = require('./database/connect');
const mainRouter = require('./routes/main');
const fileUpload = require('express-fileupload');
const app = express();
require('dotenv').config();

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
app.use('/',mainRouter);
const port=process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`Server is listening to port ${port} ...`);
})