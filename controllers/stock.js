const csvtojson = require('csvtojson');
const emsDB = require('../database/connect');

const addStock = (req, res) => {
    if (req.body.path) {
        const filePath = req.body.path;
        csvtojson().fromFile(filePath).then((result) => {
            result.forEach((row) => {
                const sql = `create table if not exists stock (part_number varchar(255) NOT NULL PRIMARY KEY, stock int); insert ignore into stock set ?`;
                emsDB.query(sql, row, (err, result) => {
                    if (err) {
                        throw err;
                    }
                })
            })
        })
        res.status(200).send('New Stock Added ...');
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
                        const sql = `create table if not exists stock (part_number varchar(255) NOT NULL PRIMARY KEY, stock int); insert ignore into stock set ?`;
                        emsDB.query(sql, row, (err, result) => {
                            if (err) {
                                throw err;
                            }
                        })
                    })
                })
            }
        })
        res.status(200).send('New Stock Added ...')
    }
}

const getStock = (req, res) => {
    if (!req.body.part_number) {
        const sql = `select * from stock`;
        let query = emsDB.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).json(result);
        })
    }
    else {
        let sql = `select * from stock where part_number="${req.body.part_number}"`;
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

const updateStock = (req, res) => {
    if (req.body.path) {
        const filePath = req.body.path;
        csvtojson().fromFile(filePath).then((result) => {
            result.forEach((row) => {
                const sql = `update stock set stock="${row.stock}" where part_number="${row.part_number}"`;
                emsDB.query(sql, row, (err, result) => {
                    if (err) {
                        throw err;
                    }
                })
            })
        })
        res.status(200).send('Stock Updated ...');
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
                        const sql = `update stock set stock="${row.stock}" where part_number="${row.part_number}"`;
                        emsDB.query(sql, row, (err, result) => {
                            if (err) {
                                throw err;
                            }
                        })
                    })
                })
            }
        })
        res.status(200).send('Stock Updated ...')
    }
}

const deleteStock = (req, res) => {
    if (req.body.path) {
        const filePath = req.body.path;
        csvtojson().fromFile(filePath).then((result) => {
            result.forEach((row) => {
                const sql = `delete from stock where part_number="${row.part_number}"`;
                emsDB.query(sql, row, (err, result) => {
                    if (err) {
                        throw err;
                    }
                })
            })
        })
        res.status(200).send('Stock Delted ...');
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
                        const sql = `delete from stock where part_number="${row.part_number}"`;
                        emsDB.query(sql, row, (err, result) => {
                            if (err) {
                                throw err;
                            }
                        })
                    })
                })
            }
        })
        res.status(200).send('Stock Deleted ...')
    }
}

module.exports = {
    addStock,
    getStock,
    updateStock,
    deleteStock
};