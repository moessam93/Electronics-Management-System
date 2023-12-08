const express = require('express');
const router = express();

const taxonomyRoutes = require('./taxonomyRoutes');
const packageRoutes = require('./packageRoutes');
const priceRoutes = require('./priceRoutes');
const stockRoutes = require('./stockRoutes');
const supplierRoutes = require('./supplierRoutes');
const statusRoutes = require('./statusRoutes');
// const bomRoutes = require('./bomRoutes');

router.use('/api/taxonomy', taxonomyRoutes);
router.use('/api/package', packageRoutes);
router.use('/api/price', priceRoutes);
router.use('/api/stock', stockRoutes);
router.use('/api/supplier', supplierRoutes);
router.use('/api/status', statusRoutes);
// router.use('/api/bom', bomRoutes);

module.exports = router;
