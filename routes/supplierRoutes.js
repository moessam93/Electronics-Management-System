const express = require('express');
const router = express.Router();

const {
    addSupplier,
    getSupplier,
    updateSupplier,
    deleteSupplier
} = require('../controllers/supplierController');

router.route('/').post(addSupplier).get(getSupplier).patch(updateSupplier).delete(deleteSupplier);
module.exports = router;