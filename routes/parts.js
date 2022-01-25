const express = require('express');
const router = express.Router();
const { addTaxonomy, getAllTaxonomy, getTaxonomyByPartNumber, editTaxonomy, deleteTaxonomy } = require('../controllers/parts');

router.route('/taxonomy').post(addTaxonomy).get(getAllTaxonomy).patch(editTaxonomy).delete(deleteTaxonomy);
router.route('/taxonomy/:part_number').get(getTaxonomyByPartNumber);
// router.route('/pricing')
// router.route('/packages')
// router.route('/supplier')

module.exports = router;
