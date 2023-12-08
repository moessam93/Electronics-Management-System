// controllers/priceController.js
const priceService = require('../services/priceService');

const addPrice = (req, res) => {
    if (req.body.path) {
        const filePath = req.body.path;
        priceService.addPricesFromCSV(filePath)
            .then(() => res.status(200).send('New Prices Added ...'))
            .catch((error) => res.status(500).send(error.message));
    } else if (req.files.uploadFile.mimetype === 'text/csv') {
        const uploadedFile = req.files.uploadFile;
        const filePath = "uploads/" + uploadedFile.name;

        uploadedFile.mv(filePath, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Internal Server Error');
            }

            priceService.addPricesFromCSV(filePath)
                .then(() => res.status(200).send('New Prices Added ...'))
                .catch((error) => res.status(500).send(error.message));
        });
    }
};
/**
 * @swagger
 * /api/price/all:
 *   get:
 *     summary: Get a list of parts prices
 *     description: Retrieve a list of parts prices from the database.
 *     responses:
 *       200:
 *         description: A list of parts prices.
 *       500:
 *         description: Internal server error.
 */
const getAllPrices = (req, res) => {
        priceService.getAllPrices()
            .then((result) => res.status(200).json(result))
            .catch((error) => res.status(500).send(error.message));
};

/**
 * @swagger
 * /api/price/{part_number}:
 *   get:
 *     summary: Get a part price
 *     description: Retrieve a part price from the database.
 *     parameters:
 *       - in: path
 *         name: part_number
 *         schema:
 *           type: string
 *         required: true
 *         description: Part number to get the price for.
 *     responses:
 *       200:
 *         description: A part price
 *       404:
 *         description: Part not found
 *       500:
 *         description: Internal server error.
 */
const getPriceByPartNumber = (req,res) => { 
        priceService.getPriceByPartNumber(req.params.part_number)
            .then((result) => {
                if (!result.length) {
                    res.status(404).send(`Part Number ${req.params.part_number} not found`);
                } else {
                    res.status(200).json(result);
                }
            })
            .catch((error) => res.status(500).send(error.message));
};

const updatePrice = (req, res) => {
    if (req.body.path) {
        const filePath = req.body.path;
        priceService.updatePricesFromCSV(filePath)
            .then(() => res.status(200).send('Prices Updated ...'))
            .catch((error) => res.status(500).send(error.message));
    } else if (req.files.uploadFile.mimetype === 'text/csv') {
        const uploadedFile = req.files.uploadFile;
        const filePath = "uploads/" + uploadedFile.name;

        uploadedFile.mv(filePath, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Internal Server Error');
            }

            priceService.updatePricesFromCSV(filePath)
                .then(() => res.status(200).send('Prices Updated ...'))
                .catch((error) => res.status(500).send(error.message));
        });
    }
};

const deletePrice = (req, res) => {
    if (req.body.path) {
        const filePath = req.body.path;
        priceService.deletePricesFromCSV(filePath)
            .then(() => res.status(200).send('Prices Deleted ...'))
            .catch((error) => res.status(500).send(error.message));
    } else if (req.files.uploadFile.mimetype === 'text/csv') {
        const uploadedFile = req.files.uploadFile;
        const filePath = "uploads/" + uploadedFile.name;

        uploadedFile.mv(filePath, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Internal Server Error');
            }

            priceService.deletePricesFromCSV(filePath)
                .then(() => res.status(200).send('Prices Deleted ...'))
                .catch((error) => res.status(500).send(error.message));
        });
    }
};

module.exports = {
    addPrice,
    getAllPrices,
    getPriceByPartNumber,
    updatePrice,
    deletePrice,
};
