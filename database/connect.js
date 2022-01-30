const mysql = require('mysql');
require('dotenv').config();

const emsDB = mysql.createConnection({
    host:'localhost',
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:'ems',
    multipleStatements:'true'
});

module.exports = emsDB;