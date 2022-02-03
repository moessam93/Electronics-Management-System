const csvtojson = require('csvtojson');
const emsDB = require('../database/connect');

const exportParts = (req, res) => {
    if (!req.body.path || !req.body.path.endsWith('.csv')) {
        const sql = `create table if not exists export_table (part_number varchar(255) not null primary key);
        insert ignore into export_table select part_number from taxonomy union select part_number from supplier union select part_number from status union select part_number from stock union select part_number from price union select part_number from package;
        select export_table.part_number,taxonomy.family,taxonomy.taxonomy, package.package_name, status.status,supplier.supplier, stock.stock, price.price from export_table 
        left join taxonomy on export_table.part_number=taxonomy.part_number
        left join package on export_table.part_number=package.part_number
        left join status on export_table.part_number=status.part_number
        left join supplier on export_table.part_number=supplier.part_number
        left join stock on export_table.part_number=stock.part_number
        left join price on export_table.part_number=price.part_number;
        drop table export_table`;
        let query = emsDB.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).json(result[2]);
        })
    }

    else if (req.body.path.endsWith('.csv')) {
        csvtojson().fromFile(req.body.path).then((result) => {
            result.forEach((row) => {
                const sql = `create table if not exists export_table (part_number varchar(255) not null primary key);
                insert ignore into export_table set ?`
                emsDB.query(sql, row, (err, result) => {
                    if (err) {
                        throw err;
                    }
                })
            })
        }).then(() => {
            const sql = `select export_table.part_number,taxonomy.family,taxonomy.taxonomy, package.package_name, status.status,supplier.supplier, stock.stock, price.price from export_table 
            left join taxonomy on export_table.part_number=taxonomy.part_number
            left join package on export_table.part_number=package.part_number
            left join status on export_table.part_number=status.part_number
            left join supplier on export_table.part_number=supplier.part_number
            left join stock on export_table.part_number=stock.part_number
            left join price on export_table.part_number=price.part_number;
            drop table export_table`;
            let query = emsDB.query(sql, (err, result) => {
                if (err) {
                    throw err;
                }
                res.status(200).json(result[0]);
            })
        })
    }
}

module.exports = {exportParts};