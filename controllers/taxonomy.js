const csvtojson = require('csvtojson');
const emsDB = require('../database/connect');

const addTaxonomy = (req, res) => {
    if (req.body.path) {
        const filePath = req.body.path;
        csvtojson().fromFile(filePath).then((result) => {
            result.forEach((row) => {
                const sql = `create table if not exists taxonomy(part_number VARCHAR(255) NOT NULL PRIMARY KEY,
                family VARCHAR(255), taxonomy VARCHAR(255)); insert ignore into taxonomy set ?`;
                emsDB.query(sql, row, (err, result) => {
                    if (err) {
                        throw err;
                    }
                })
            })
        })
        res.status(200).send('New Taxonomy Added ...');
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
                        const sql = `create table if not exists taxonomy(part_number VARCHAR(255) NOT NULL PRIMARY KEY,
                        family VARCHAR(255), taxonomy VARCHAR(255)); insert ignore into taxonomy set ?`;
                        emsDB.query(sql, row, (err, result) => {
                            if (err) {
                                throw err;
                            }
                        })
                    })
                })
            }
        })
        res.status(200).send('New Taxonomy Added ...')
    }
}

const getTaxonomy = (req, res) => {
    if (!req.body.part_number) {
        const sql = `select * from taxonomy`;
        let query = emsDB.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).json(result);
        })
    }
    else {
        let sql = `select * from taxonomy where part_number="${req.body.part_number}"`;
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

const updateTaxonomy = (req, res) => {
    if (req.body.path) {
        const filePath = req.body.path;
        csvtojson().fromFile(filePath).then((result) => {
            result.forEach((row) => {
                const sql = `update taxonomy set taxonomy="${row.taxonomy}" , family="${row.family}" where part_number="${row.part_number}"`;
                emsDB.query(sql, row, (err, result) => {
                    if (err) {
                        throw err;
                    }
                })
            })
        })
        res.status(200).send('Taxonomy Updated ...');
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
                        const sql = `update taxonomy set taxonomy="${row.taxonomy}" , family="${row.family}" where part_number="${row.part_number}"`;
                        emsDB.query(sql, row, (err, result) => {
                            if (err) {
                                throw err;
                            }
                        })
                    })
                })
            }
        })
        res.status(200).send('Taxonomy Updated ...')
    }
}

const deleteTaxonomy = (req, res) => {
    if (req.body.path) {
        const filePath = req.body.path;
        csvtojson().fromFile(filePath).then((result) => {
            result.forEach((row) => {
                const sql = `delete from taxonomy where part_number="${row.part_number}"`;
                emsDB.query(sql, row, (err, result) => {
                    if (err) {
                        throw err;
                    }
                })
            })
        })
        res.status(200).send('Taxonomy Deleted ...');
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
                        const sql = `delete from taxonomy where part_number="${row.part_number}"`;
                        emsDB.query(sql, row, (err, result) => {
                            if (err) {
                                throw err;
                            }
                        })
                    })
                })
            }
        })
        res.status(200).send('Taxonomy Deleted ...')
    }
}

module.exports = {
    addTaxonomy,
    getTaxonomy,
    updateTaxonomy,
    deleteTaxonomy
};