// controllers/priceController.js

const priceService = require('../services/priceService');
const priceDTOs = require('../DTOs/price/priceDTOs');

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
 *     summary: Get a paginated list of parts prices
 *     tags: 
 *          - Price
 *     description: Retrieve a paginated list of parts prices from the database.
 *     parameters:
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The number of items to return per page.
 *       - in: query
 *         name: pageNum
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The page number to retrieve.
 *       - in: query
 *         name: searchKeyword
 *         schema:
 *           type: string
 *         description: Optional keyword to search for in part numbers.
 *     responses:
 *       200:
 *         description: A paginated list of parts prices.
 *       400:
 *         description: Bad request. Invalid pageSize or pageNum.
 *       500:
 *         description: Internal server error.
 */
const getAllPrices = (req, res) => {
    const { pageSize, pageNum, searchKeyword } = req.query;
    const requestDto = new priceDTOs.GetAllPricesRequestDto(pageNum, pageSize, searchKeyword);

    priceService.getAllPrices(requestDto)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).send(error.message));
  };

/**
 * @swagger
 * /api/price/{partNumber}:
 *   get:
 *     summary: Get a part price
 *     tags: 
 *          - Price
 *     description: Retrieve a part price from the database.
 *     parameters:
 *       - in: path
 *         name: partNumber
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
    const partNumber = req.params.partNumber;
    const requestDto = new priceDTOs.GetSinglePartPriceRequestDto(partNumber);

        priceService.getPriceByPartNumber(requestDto)
            .then((result) => {
                if (!(result && result.partNumber && result.price)) {
                    res.status(404).send(`Part Number ${requestDto.partNumber} not found`);
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
