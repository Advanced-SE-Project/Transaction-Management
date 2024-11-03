// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Transaction Management', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'API documentation for my Transaction Management Microservice', // Short description of the API
  },
  servers: [
    {
      url: 'http://localhost:3000', // URL of the running server
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./app.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
