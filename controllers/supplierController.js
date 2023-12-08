const csvtojson = require('csvtojson');
const emsDB = require('../config/mySqlDB');

const addSupplier = (req, res) => {
    if (req.body.path) {
        const filePath = req.body.path;
        csvtojson().fromFile(filePath).then((result) => {
            result.forEach((row) => {
                const sql = `create table if not exists supplier (part_number varchar(255) NOT NULL PRIMARY KEY, supplier varchar(255)); insert ignore into supplier set ?`;
                emsDB.query(sql, row, (err, result) => {
                    if (err) {
                        throw err;
                    }
                })
            })
        })
        res.status(200).send('New Suppliers Added ...');
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
                        const sql = `create table if not exists supplier (part_number varchar(255) NOT NULL PRIMARY KEY, supplier varchar(255)); insert ignore into supplier set ?`;
                        emsDB.query(sql, row, (err, result) => {
                            if (err) {
                                throw err;
                            }
                        })
                    })
                })
            }
        })
        res.status(200).send('New Suppliers Added ...')
    }
}

const getSupplier = (req, res) => {
    if (!req.body.part_number) {
        const sql = `select * from supplier`;
        let query = emsDB.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).json(result);
        })
    }
    else {
        let sql = `select * from supplier where part_number="${req.body.part_number}"`;
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

const updateSupplier = (req, res) => {
    if (req.body.path) {
        const filePath = req.body.path;
        csvtojson().fromFile(filePath).then((result) => {
            result.forEach((row) => {
                const sql = `update supplier set supplier="${row.supplier}" where part_number="${row.part_number}"`;
                emsDB.query(sql, row, (err, result) => {
                    if (err) {
                        throw err;
                    }
                })
            })
        })
        res.status(200).send('Supplier Updated ...');
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
                        const sql = `update supplier set supplier="${row.supplier}" where part_number="${row.part_number}"`;
                        emsDB.query(sql, row, (err, result) => {
                            if (err) {
                                throw err;
                            }
                        })
                    })
                })
            }
        })
        res.status(200).send('Supplier Updated ...')
    }
}

const deleteSupplier = (req, res) => {
    if (req.body.path) {
        const filePath = req.body.path;
        csvtojson().fromFile(filePath).then((result) => {
            result.forEach((row) => {
                const sql = `delete from supplier where part_number="${row.part_number}"`;
                emsDB.query(sql, row, (err, result) => {
                    if (err) {
                        throw err;
                    }
                })
            })
        })
        res.status(200).send('Supplier Delted ...');
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
                        const sql = `delete from supplier where part_number="${row.part_number}"`;
                        emsDB.query(sql, row, (err, result) => {
                            if (err) {
                                throw err;
                            }
                        })
                    })
                })
            }
        })
        res.status(200).send('Supplier Deleted ...')
    }
}

module.exports = {
    addSupplier,
    getSupplier,
    updateSupplier,
    deleteSupplier
};