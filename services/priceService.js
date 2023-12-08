// services/priceService.js
const csvtojson = require('csvtojson');
const emsDB = require('../config/mySqlDB');

const addPricesFromCSV = async (filePath) => {
    return new Promise((resolve, reject) => {
        csvtojson().fromFile(filePath).then((result) => {
            result.forEach((row) => {
                const sql = `CREATE TABLE IF NOT EXISTS price (part_number VARCHAR(255) NOT NULL PRIMARY KEY, price FLOAT); INSERT IGNORE INTO price SET ?`;
                emsDB.query(sql, row, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                });
            });
            resolve();
        });
    });
};

const getAllPrices = async () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM price`;
        emsDB.query(sql, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};

const getPriceByPartNumber = async (partNumber) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM price WHERE part_number="${partNumber}"`;
        emsDB.query(sql, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};

const updatePricesFromCSV = async (filePath) => {
    const result = await csvtojson().fromFile(filePath);

    for (const row of result) {
        const sql = `update price set price="${row.price}" where part_number="${row.part_number}"`;
        try {
            await emsDB.query(sql, row);
        } catch (error) {
            throw error;
        }
    }
};

const deletePricesFromCSV = async (filePath) => {
    const result = await csvtojson().fromFile(filePath);

    for (const row of result) {
        const sql = `delete from price where part_number="${row.part_number}"`;
        try {
            await emsDB.query(sql, row);
        } catch (error) {
            throw error;
        }
    }
};

module.exports = {
    addPricesFromCSV,
    getAllPrices,
    getPriceByPartNumber,
    updatePricesFromCSV,
    deletePricesFromCSV,
};
