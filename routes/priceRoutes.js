const express = require('express');
const router = express.Router();

const {
    addPrice,
    getPrice,
    updatePrice,
    deletePrice
} = require('../controllers/priceController');

router.route('/').post(addPrice).get(getPrice).patch(updatePrice).delete(deletePrice);
module.exports = router;