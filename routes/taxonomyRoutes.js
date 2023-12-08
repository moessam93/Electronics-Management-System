const express = require('express');
const router = express.Router();

const {
    addTaxonomy,
    getTaxonomy,
    updateTaxonomy,
    deleteTaxonomy
} = require('../controllers/taxonomyController');

router.route('/').post(addTaxonomy).get(getTaxonomy).patch(updateTaxonomy).delete(deleteTaxonomy);
module.exports = router;
