const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // Specify the version of OpenAPI
    info: {
      title: 'EMS API',
      version: '1.0.0',
      description: 'Description of your API',
    },
  },
  apis: ['./controllers/*.js'], // Specify the path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
