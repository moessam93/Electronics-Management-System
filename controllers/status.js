const csvtojson = require('csvtojson');
const emsDB = require('../database/connect');

const addStatus = (req, res) => {
    if (req.body.path) {
        const filePath = req.body.path;
        csvtojson().fromFile(filePath).then((result) => {
            result.forEach((row) => {
                const sql = `create table if not exists status (part_number varchar(255) NOT NULL PRIMARY KEY, status varchar(255)); insert ignore into status set ?`;
                emsDB.query(sql, row, (err, result) => {
                    if (err) {
                        throw err;
                    }
                })
            })
        })
        res.status(200).send('New Status Added ...');
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
                        const sql = `create table if not exists status (part_number varchar(255) NOT NULL PRIMARY KEY, status varchar(255)); insert ignore into status set ?`;
                        emsDB.query(sql, row, (err, result) => {
                            if (err) {
                                throw err;
                            }
                        })
                    })
                })
            }
        })
        res.status(200).send('New Status Added ...')
    }
}

const getStatus = (req, res) => {
    if (!req.body.part_number) {
        const sql = `select * from status`;
        let query = emsDB.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).json(result);
        })
    }
    else {
        let sql = `select * from status where part_number="${req.body.part_number}"`;
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

const updateStatus = (req, res) => {
    if (req.body.path) {
        const filePath = req.body.path;
        csvtojson().fromFile(filePath).then((result) => {
            result.forEach((row) => {
                const sql = `update status set status="${row.status}" where part_number="${row.part_number}"`;
                emsDB.query(sql, row, (err, result) => {
                    if (err) {
                        throw err;
                    }
                })
            })
        })
        res.status(200).send('Status Updated ...');
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
                        const sql = `update status set status="${row.status}" where part_number="${row.part_number}"`;
                        emsDB.query(sql, row, (err, result) => {
                            if (err) {
                                throw err;
                            }
                        })
                    })
                })
            }
        })
        res.status(200).send('Status Updated ...')
    }
}

const deleteStatus = (req, res) => {
    if (req.body.path) {
        const filePath = req.body.path;
        csvtojson().fromFile(filePath).then((result) => {
            result.forEach((row) => {
                const sql = `delete from status where part_number="${row.part_number}"`;
                emsDB.query(sql, row, (err, result) => {
                    if (err) {
                        throw err;
                    }
                })
            })
        })
        res.status(200).send('Status Delted ...');
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
                        const sql = `delete from status where part_number="${row.part_number}"`;
                        emsDB.query(sql, row, (err, result) => {
                            if (err) {
                                throw err;
                            }
                        })
                    })
                })
            }
        })
        res.status(200).send('Status Deleted ...')
    }
}

module.exports = {
    addStatus,
    getStatus,
    updateStatus,
    deleteStatus
};