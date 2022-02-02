const express = require('express');
const router = express.Router();

const {addTaxonomy,getTaxonomy,updateTaxonomy,deleteTaxonomy} = require('../controllers/taxonomy');
const {addPackage,getPackage,updatePackage,deletePackage} = require('../controllers/package');
const {addPrice,getPrice,updatePrice,deletePrice} = require('../controllers/price');
const {addStatus,getStatus,updateStatus,deleteStatus} = require('../controllers/status');
const {addStock,getStock,updateStock,deleteStock} = require('../controllers/stock');
const {addSupplier,getSupplier,updateSupplier,deleteSupplier} = require('../controllers/supplier');
const {exportParts} = require('../controllers/parts');

router.route('/api/taxonomy').post(addTaxonomy).get(getTaxonomy).patch(updateTaxonomy).delete(deleteTaxonomy);
router.route('/api/package').post(addPackage).get(getPackage).patch(updatePackage).delete(deletePackage);
router.route('/api/price').post(addPrice).get(getPrice).patch(updatePrice).delete(deletePrice);
router.route('/api/stock').post(addStock).get(getStock).patch(updateStock).delete(deleteStock);
router.route('/api/supplier').post(addSupplier).get(getSupplier).patch(updateSupplier).delete(deleteSupplier);
router.route('/api/status').post(addStatus).get(getStatus).patch(updateStatus).delete(deleteStatus);
router.route('/api/export_parts').get(exportParts);

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
