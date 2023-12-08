const express = require('express');
const router = express.Router();

const {
    addPrice,
    getAllPrices,
    getPriceByPartNumber,
    updatePrice,
    deletePrice
} = require('../controllers/priceController');

router.route('/').post(addPrice).patch(updatePrice).delete(deletePrice);
router.route('/All').get(getAllPrices);
router.route('/:part_number').get(getPriceByPartNumber);
module.exports = router;