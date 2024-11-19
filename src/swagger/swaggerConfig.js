const swaggerJSDoc = require('swagger-jsdoc');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Transaction Management API',
    version: '1.0.0',
    description: 'API documentation for the Transaction Management microservice',
  },
  servers: [
    {
      url: `http://localhost:${port}`,
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/transactions.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
