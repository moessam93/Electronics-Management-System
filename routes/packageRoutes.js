const express = require('express');
const router = express.Router();

const {
    addPackage,
    getPackage,
    updatePackage,
    deletePackage
} = require('../controllers/packageController');

router.route('/').post(addPackage).get(getPackage).patch(updatePackage).delete(deletePackage);
module.exports = router;

