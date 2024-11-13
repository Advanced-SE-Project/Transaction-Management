const express = require('express');
const transactionRoutes = require('./routes/transactions');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const app = express();
const PORT = 3000;

// Swagger setup
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Transaction Management API',
    version: '1.0.0',
    description: 'API documentation for the Transaction Management microservice',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/transactions.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Set up Swagger UI

// Middleware
app.use(express.json());

// Routes
app.use('/api', transactionRoutes);

// Only start the server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/swagger`);
  });
}

// Export the app instance for testing
module.exports = app;
