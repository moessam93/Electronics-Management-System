const express = require('express');
const router = express.Router();
const { addTaxonomy,
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
} = require('../controllers/parts');

router.route('/taxonomy').post(addTaxonomy).get(getTaxonomy).patch(updateTaxonomy).delete(deleteTaxonomy);
router.route('/package').post(addPackage).get(getPackage).patch(updatePackage).delete(deletePackage);
router.route('/price').post(addPrice).get(getPrice).patch(updatePrice).delete(deletePrice);
router.route('/stock').post(addStock).get(getStock).patch(updateStock).delete(deleteStock);
router.route('/supplier').post(addSupplier).get(getSupplier).patch(updateSupplier).delete(deleteSupplier);
router.route('/status').post(addStatus).get(getStatus).patch(updateStatus).delete(deleteStatus);
module.exports = router;
