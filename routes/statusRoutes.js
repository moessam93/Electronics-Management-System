const express = require('express');
const router = express.Router();

const {
    addStatus,
    getStatus,
    updateStatus,
    deleteStatus
} = require('../controllers/statusController');

router.route('/').post(addStatus).get(getStatus).patch(updateStatus).delete(deleteStatus);
module.exports = router;