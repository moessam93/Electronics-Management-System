const express = require('express');
const bp = require('body-parser');
const emsDB = require('./config/mySqlDB');
const mainRouter = require('./routes/main');
const fileUpload = require('express-fileupload');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();
require('dotenv').config();
// Serve Swagger UI

emsDB.connect(()=>{
    try {
        console.log('MySQL database is connected ...')
    } catch (error) {
        console.log(error);
    }
})
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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