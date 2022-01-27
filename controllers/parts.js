const csvtojson = require('csvtojson');
const emsDB = require('../database/connect');

const addTaxonomy = (req, res) => {
    csvtojson().fromFile(req.body.path).then((result) => {
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
    res.status(200).send('New taxonomy added');
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
    res.status(200).send('Taxonokmy Updated');
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
    res.status(200).send('Taxonomy Deleted');
}

const addPackage = (req, res) => {
    csvtojson().fromFile(req.body.path).then((result) => {
        result.forEach((row) => {
            const sql = `create table if not exists package (part_number varchar(255) NOT NULL PRIMARY KEY, package_name varchar(255)); insert ignore into package set ?`;
            emsDB.query(sql, row, (err, result) => {
                if (err) {
                    throw err;
                }
            })
        })
    })
    res.status(200).send('New package added');
}

const getPackage = (req, res) => {
    if (!req.body.part_number) {
        const sql = `select * from package`;
        let query = emsDB.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).json(result);
        })
    }
    else {
        let sql = `select * from package where part_number="${req.body.part_number}"`;
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

const updatePackage = (req, res) => {
    csvtojson().fromFile(req.body.path).then((result) => {
        result.forEach((row) => {
            const sql = `update package set package_name="${row.package_name}" where part_number="${row.part_number}"`;
            emsDB.query(sql, row, (err, result) => {
                if (err) {
                    throw err;
                }
            })
        })
    })
    res.status(200).send('Package Updated');
}

const deletePackage = (req, res) => {
    csvtojson().fromFile(req.body.path).then((result) => {
        result.forEach((row) => {
            const sql = `delete from package where part_number="${row.part_number}"`;
            emsDB.query(sql, row, (err, result) => {
                if (err) {
                    throw err;
                }
            })
        })
    })
    res.status(200).send('Package Deleted');
}

//create pricing controllers
const addPrice = (req, res) => {
    csvtojson().fromFile(req.body.path).then((result) => {
        result.forEach((row) => {
            const sql = `create table if not exists price (part_number varchar(255) NOT NULL PRIMARY KEY, price float); insert ignore into price set ?`;
            emsDB.query(sql, row, (err, result) => {
                if (err) {
                    throw err;
                }
            })
        })
    })
    res.status(200).send('New prices added');
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
    csvtojson().fromFile(req.body.path).then((result) => {
        result.forEach((row) => {
            const sql = `update price set price="${row.price}" where part_number="${row.part_number}"`;
            emsDB.query(sql, row, (err, result) => {
                if (err) {
                    throw err;
                }
            })
        })
    })
    res.status(200).send('Price Updated');
}

const deletePrice = (req, res) => {
    csvtojson().fromFile(req.body.path).then((result) => {
        result.forEach((row) => {
            const sql = `delete from price where part_number="${row.part_number}"`;
            emsDB.query(sql, row, (err, result) => {
                if (err) {
                    throw err;
                }
            })
        })
    })
    res.status(200).send('Price Deleted');
}


//create stock controllers
const addStock = (req, res) => {
    csvtojson().fromFile(req.body.path).then((result) => {
        result.forEach((row) => {
            const sql = `create table if not exists stock (part_number varchar(255) NOT NULL PRIMARY KEY, stock int); insert ignore into stock set ?`;
            emsDB.query(sql, row, (err, result) => {
                if (err) {
                    throw err;
                }
            })
        })
    })
    res.status(200).send('New stock added');
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
    csvtojson().fromFile(req.body.path).then((result) => {
        result.forEach((row) => {
            const sql = `update stock set stock="${row.stock}" where part_number="${row.part_number}"`;
            emsDB.query(sql, row, (err, result) => {
                if (err) {
                    throw err;
                }
            })
        })
    })
    res.status(200).send('Stock Updated');
}

const deleteStock = (req, res) => {
    csvtojson().fromFile(req.body.path).then((result) => {
        result.forEach((row) => {
            const sql = `delete from stock where part_number="${row.part_number}"`;
            emsDB.query(sql, row, (err, result) => {
                if (err) {
                    throw err;
                }
            })
        })
    })
    res.status(200).send('Stock Deleted');
}

//add manufactures/suppliers
const addSupplier = (req, res) => {
    csvtojson().fromFile(req.body.path).then((result) => {
        result.forEach((row) => {
            const sql = `create table if not exists supplier (part_number varchar(255) NOT NULL PRIMARY KEY, supplier varchar(255)); insert ignore into supplier set ?`;
            emsDB.query(sql, row, (err, result) => {
                if (err) {
                    throw err;
                }
            })
        })
    })
    res.status(200).send('New supplier added');
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
    csvtojson().fromFile(req.body.path).then((result) => {
        result.forEach((row) => {
            const sql = `update supplier set supplier="${row.supplier}" where part_number="${row.part_number}"`;
            emsDB.query(sql, row, (err, result) => {
                if (err) {
                    throw err;
                }
            })
        })
    })
    res.status(200).send('Supplier Updated');
}

const deleteSupplier = (req, res) => {
    csvtojson().fromFile(req.body.path).then((result) => {
        result.forEach((row) => {
            const sql = `delete from supplier where part_number="${row.part_number}"`;
            emsDB.query(sql, row, (err, result) => {
                if (err) {
                    throw err;
                }
            })
        })
    })
    res.status(200).send('Supplier Deleted');
}

//add part status
const addStatus = (req, res) => {
    csvtojson().fromFile(req.body.path).then((result) => {
        result.forEach((row) => {
            const sql = `create table if not exists status (part_number varchar(255) NOT NULL PRIMARY KEY, status varchar(255)); insert ignore into status set ?`;
            emsDB.query(sql, row, (err, result) => {
                if (err) {
                    throw err;
                }
            })
        })
    })
    res.status(200).send('New status added');
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
    csvtojson().fromFile(req.body.path).then((result) => {
        result.forEach((row) => {
            const sql = `update status set status="${row.status}" where part_number="${row.part_number}"`;
            emsDB.query(sql, row, (err, result) => {
                if (err) {
                    throw err;
                }
            })
        })
    })
    res.status(200).send('Status Updated');
}

const deleteStatus = (req, res) => {
    csvtojson().fromFile(req.body.path).then((result) => {
        result.forEach((row) => {
            const sql = `delete from status where part_number="${row.part_number}"`;
            emsDB.query(sql, row, (err, result) => {
                if (err) {
                    throw err;
                }
            })
        })
    })
    res.status(200).send('Status Deleted');
}

module.exports = {
    addTaxonomy,
    getTaxonomy,
    updateTaxonomy,
    deleteTaxonomy,
    addPackage,
    getPackage,
    updatePackage,
    deletePackage,
    addPrice,
    getPrice,
    updatePrice,
    deletePrice,
    addStock,
    getStock,
    updateStock,
    deleteStock,
    addSupplier,
    getSupplier,
    updateSupplier,
    deleteSupplier,
    addStatus,
    getStatus,
    updateStatus,
    deleteStatus
};