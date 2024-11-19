const express = require('express');
const transactionRoutes = require('./src/routes/transactions');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/swagger/swaggerConfig');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;

// Middleware
app.use(express.json());

// Swagger setup
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Set up Swagger UI

app.use((req, res, next) => {
  console.log(`Transaction Microservice received request: ${req.method} ${req.url}`);
  console.log('Request Body:', req.body);
  next();
});

app.use((req, res, next) => {
  console.log('Transaction Microservice - Incoming Request:', {
    method: req.method,
    url: req.originalUrl,
    body: req.body,
  });
  next();
});

// Routes
app.use('/api', transactionRoutes);

// Only start the server if not in test mode
if (process.env.NODE_ENV !== 'test' || process.env.INTEGRATION_TEST === 'true') {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/swagger`);
    console.log(process.env.NODE_ENV);
  });
}

// Export the app instance for testing
module.exports = app;
