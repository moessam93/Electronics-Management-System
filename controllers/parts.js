const csvtojson = require('csvtojson');
const emsDB = require('../database/connect');


//taxonomy
const addTaxonomy = (req, res) => {
    csvtojson().fromFile(req.body.path).then((result) => {
        result.forEach((row) => {
            const sql = `insert ignore into taxonomy set ?`;
            emsDB.query(sql, row, (err, result) => {
                if (err) {
                    throw err;
                }
            })
        })
    })
    res.status(200).send('New taxonomy added');
}

const getAllTaxonomy = (req, res) => {
    const sql = `select * from taxonomy`;
    let query = emsDB.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result);
    })
}

const getTaxonomyByPartNumber = (req, res) => {
    let sql = `select * from taxonomy where part_number="${req.params.part_number}"`;
    let query = emsDB.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        if (!result.length) {
            res.status(400).send(`Part Number ${req.params.part_number} not found`);
        }
        else
            res.status(200).json(result);
    })
}

const editTaxonomy = (req, res) => {
    csvtojson().fromFile(req.body.path).then((result) => {
        result.forEach((row) => {
            const sql = `update taxonomy set taxonomy="${row.taxonomy}" , family="${row.family}" where part_number="${row.part_number}"`;
            emsDB.query(sql, row, (err, result) => {
                if (err) {
                    throw err;
                }
            })
        })
    })
    res.status(200).send('Updated');
}

const deleteTaxonomy = (req, res) => {
    csvtojson().fromFile(req.body.path).then((result) => {
        result.forEach((row) => {
            const sql = `delete from taxonomy where part_number="${row.part_number}"`;
            emsDB.query(sql, row, (err, result) => {
                if (err) {
                    throw err;
                }
            })
        })
    })
    res.status(200).send('Deleted');
}


//delete

module.exports = { addTaxonomy, getAllTaxonomy, getTaxonomyByPartNumber, editTaxonomy, deleteTaxonomy };