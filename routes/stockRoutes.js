const express = require('express');
const router = express.Router();

const {
    addStock,
    getStock,
    updateStock,
    deleteStock
} = require('../controllers/stockController');

router.route('/').post(addStock).get(getStock).patch(updateStock).delete(deleteStock);
module.exports = router;