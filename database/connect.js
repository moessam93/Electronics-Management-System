const mysql = require('mysql');

const emsDB = mysql.createConnection({
    host:'localhost',
    user:'moessam',
    password:'12345678',
    database:'ems'
});

module.exports = emsDB;