// services/priceService.js
const csvtojson = require('csvtojson');
const emsDB = require('../config/mySqlDB');
const priceDTOs = require('../DTOs/price/priceDTOs');

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

const getAllPrices = async (getAllPricesRequestDto) => {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT SQL_CALC_FOUND_ROWS part_number, price FROM price 
        WHERE part_number LIKE '%${getAllPricesRequestDto.searchKeyword}%' 
        LIMIT ${getAllPricesRequestDto.pageSize} OFFSET ${getAllPricesRequestDto.pageSize * (getAllPricesRequestDto.pageNum - 1)};
        SELECT FOUND_ROWS() as totalRecords;`;

        emsDB.query(sql, [getAllPricesRequestDto.searchKeyword, 
            getAllPricesRequestDto.pageSize,
            getAllPricesRequestDto.pageSize * (getAllPricesRequestDto.pageNum - 1)], (err, result) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
                reject(err);
            }
            else {
                // Process the result as needed
                const data = result[0];
                const totalRecords = result[1][0].totalRecords;
                const response = new priceDTOs.GetAllPricesResponseDto(totalRecords, data);
                resolve(response);
            }
        });
    });
};

const getPriceByPartNumber = async (getSinglePartPriceRequestDto) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM price WHERE part_number="${getSinglePartPriceRequestDto.partNumber}"`;
        emsDB.query(sql, (err, result) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
                reject(err);
            }
            else{
                let response;
                if (result.length > 0){
                    response = new priceDTOs.GetSinglePartPriceResponseDto(result[0].part_number, result[0].price);
                }
                else{
                    response = null;
                }
                resolve(response);
            }
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
