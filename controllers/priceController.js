const csvtojson = require('csvtojson');
const emsDB = require('../config/mySqlDB');

const addPrice = (req, res) => {
    if (req.body.path) {
        const filePath = req.body.path;
        csvtojson().fromFile(filePath).then((result) => {
            result.forEach((row) => {
                const sql = `create table if not exists price (part_number varchar(255) NOT NULL PRIMARY KEY, price float); insert ignore into price set ?`;
                emsDB.query(sql, row, (err, result) => {
                    if (err) {
                        throw err;
                    }
                })
            })
        })
        res.status(200).send("New Prices Added ...")
    }
    else if (req.files.uploadFile.mimetype === 'text/csv') {
        const uploadedFile = req.files.uploadFile;
        const filePath = "uploads/" + uploadedFile.name;

        uploadedFile.mv(filePath, (err) => {
            if (err) {
                console.log(err)
            }
            else{
                csvtojson().fromFile(filePath).then((result) => {
                    result.forEach((row) => {
                        const sql = `create table if not exists price (part_number varchar(255) NOT NULL PRIMARY KEY, price float); insert ignore into price set ?`;
                        emsDB.query(sql, row, (err, result) => {
                            if (err) {
                                throw err;
                            }
                        })
                    })
                })
            }
            res.status(200).send("New Prices Added ...")
        })
    }
}

const getPrice = (req, res) => {
    if (!req.body.part_number) {
        const sql = `select * from price`;
        let query = emsDB.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).json(result);
        })
    }
    else {
        let sql = `select * from price where part_number="${req.body.part_number}"`;
        let query = emsDB.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            if (!result.length) {
                res.status(400).send(`Part Number ${req.body.part_number} not found`);
            }
            else
                res.status(200).json(result);
        })
    }
}

const updatePrice = (req, res) => {
    if (req.body.path) {
        const filePath = req.body.path;
        csvtojson().fromFile(filePath).then((result) => {
            result.forEach((row) => {
                const sql = `update price set price="${row.price}" where part_number="${row.part_number}"`;
                emsDB.query(sql, row, (err, result) => {
                    if (err) {
                        throw err;
                    }
                })
            })
        })
        res.status(200).send('Price Updated ...');
    }
    else if (req.files.uploadFile.mimetype === 'text/csv') {
        const uploadedFile = req.files.uploadFile;
        const filePath = "uploads/" + uploadedFile.name;

        uploadedFile.mv(filePath, (err) => {
            if (err) {
                console.log(err)
            }
            else {
                csvtojson().fromFile(filePath).then((result) => {
                    result.forEach((row) => {
                        const sql = `update price set price="${row.price}" where part_number="${row.part_number}"`;
                        emsDB.query(sql, row, (err, result) => {
                            if (err) {
                                throw err;
                            }
                        })
                    })
                })
            }
        })
        res.status(200).send('Price Updated ...')
    }
}

const deletePrice = (req, res) => {
    if (req.body.path) {
        const filePath = req.body.path;
        csvtojson().fromFile(filePath).then((result) => {
            result.forEach((row) => {
                const sql = `delete from price where part_number="${row.part_number}"`;
                emsDB.query(sql, row, (err, result) => {
                    if (err) {
                        throw err;
                    }
                })
            })
        })
        res.status(200).send('Price Delted ...');
    }
    else if (req.files.uploadFile.mimetype === 'text/csv') {
        const uploadedFile = req.files.uploadFile;
        const filePath = "uploads/" + uploadedFile.name;

        uploadedFile.mv(filePath, (err) => {
            if (err) {
                console.log(err)
            }
            else {
                csvtojson().fromFile(filePath).then((result) => {
                    result.forEach((row) => {
                        const sql = `delete from price where part_number="${row.part_number}"`;
                        emsDB.query(sql, row, (err, result) => {
                            if (err) {
                                throw err;
                            }
                        })
                    })
                })
            }
        })
        res.status(200).send('Price Deleted ...')
    }
}

module.exports = {
    addPrice,
    getPrice,
    updatePrice,
    deletePrice
};