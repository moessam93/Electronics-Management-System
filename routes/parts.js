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
    deleteStatus,
    exportParts,
} = require('../controllers/parts');

router.route('/taxonomy').post(addTaxonomy).get(getTaxonomy).patch(updateTaxonomy).delete(deleteTaxonomy);
router.route('/package').post(addPackage).get(getPackage).patch(updatePackage).delete(deletePackage);
router.route('/price').post(addPrice).get(getPrice).patch(updatePrice).delete(deletePrice);
router.route('/stock').post(addStock).get(getStock).patch(updateStock).delete(deleteStock);
router.route('/supplier').post(addSupplier).get(getSupplier).patch(updateSupplier).delete(deleteSupplier);
router.route('/status').post(addStatus).get(getStatus).patch(updateStatus).delete(deleteStatus);
router.route('/export_parts').get(exportParts);

router.route('/upload/add-taxonomy').post(addTaxonomy);
router.route('/upload/add-package').post(addPackage);
router.route('/upload/add-price').post(addPrice);
router.route('/upload/add-stock').post(addStock);
router.route('/upload/add-supplier').post(addSupplier);
router.route('/upload/add-status').post(addStatus);

router.route('/upload/update-taxonomy').post(updateTaxonomy);
router.route('/upload/update-package').post(updatePackage);
router.route('/upload/update-price').post(updatePrice);
router.route('/upload/update-stock').post(updateStock);
router.route('/upload/update-supplier').post(updateSupplier);
router.route('/upload/update-status').post(updateStatus);

router.route('/upload/delete-taxonomy').post(deleteTaxonomy);
router.route('/upload/delete-package').post(deletePackage);
router.route('/upload/delete-price').post(deletePrice);
router.route('/upload/delete-stock').post(deleteStock);
router.route('/upload/delete-supplier').post(deleteSupplier);
router.route('/upload/delete-status').post(deleteStatus);

module.exports = router;
