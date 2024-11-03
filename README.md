
# Transaction Management Microservice

A microservice for managing transactions, with full CRUD capabilities. This microservice is built with Node.js, Express.js, PostgreSQL, and Prisma ORM. It includes Swagger documentation for easy interaction with the API.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Microservice](#running-the-microservice)
- [API Documentation](#api-documentation)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)

## Features

- Create, retrieve, update, and delete transactions.
- Filter transactions by type (`spent` or `receive`) and category.
- Documentation with Swagger UI for easy API exploration.

## Installation

1. Clone this repository:

   ```bash
   git clone <repository_url>
   cd transaction-management-microservice
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Environment Variables

This microservice requires a PostgreSQL database. Create a `.env` file in the root directory with the following configuration:

```plaintext
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME"
```

Replace `USER`, `PASSWORD`, and `DATABASE_NAME` with your PostgreSQL credentials.

## Database Setup

1. **Initialize Prisma**: Prisma is used as the ORM. Run the following command to generate Prisma client and set up the database:

   ```bash
   npx prisma migrate dev --name init
   ```

2. **Generate Prisma Client** (if not done automatically):

   ```bash
   npx prisma generate
   ```

This will create the necessary tables in your PostgreSQL database.

## Running the Microservice

To start the server, run:

```bash
npm start
```

The server will start on `http://localhost:3000`.

- Swagger UI is available at: `http://localhost:3000/swagger`
- API base URL: `http://localhost:3000/api`

## API Documentation

The API is documented using Swagger. After starting the server, go to `http://localhost:3000/swagger` to view and interact with the API documentation.

## API Endpoints

### Transaction Endpoints

- **Create Transaction**
  - **POST** `/api/transactions`
  - Create a new transaction.
  - **Body Parameters**:
    - `date` (string, required): Transaction date in ISO format.
    - `type` (string, required): Either `receive` or `spent`.
    - `amount` (number, required): The transaction amount.
    - `category` (string, required): The transaction category.
  - **Example Response**:
    ```json
    {
      "id": 1,
      "date": "2023-11-03T10:00:00Z",
      "type": "spent",
      "amount": 150.75,
      "category": "Groceries"
    }
    ```

- **Retrieve All Transactions**
  - **GET** `/api/transactions`
  - Retrieve all transactions.
  - **Example Response**:
    ```json
    [
      {
        "id": 1,
        "date": "2023-11-03T10:00:00Z",
        "type": "spent",
        "amount": 150.75,
        "category": "Groceries"
      },
      {
        "id": 2,
        "date": "2023-11-04T15:30:00Z",
        "type": "receive",
        "amount": 2000.00,
        "category": "Salary"
      }
    ]
    ```

- **Retrieve Spent Transactions**
  - **GET** `/api/transactions/spent`
  - Retrieve all transactions where `type` is `spent`.
  - **Example Response**:
    ```json
    [
      {
        "id": 1,
        "date": "2023-11-03T10:00:00Z",
        "type": "spent",
        "amount": 150.75,
        "category": "Groceries"
      }
    ]
    ```

- **Retrieve Receive Transactions**
  - **GET** `/api/transactions/receive`
  - Retrieve all transactions where `type` is `receive`.
  - **Example Response**:
    ```json
    [
      {
        "id": 2,
        "date": "2023-11-04T15:30:00Z",
        "type": "receive",
        "amount": 2000.00,
        "category": "Salary"
      }
    ]
    ```

- **Retrieve Transactions by Category**
  - **GET** `/api/transactions/category/{category}`
  - Retrieve transactions filtered by a specific category.
  - **Path Parameters**:
    - `category` (string, required): The category to filter transactions by.
  - **Example Response**:
    ```json
    [
      {
        "id": 1,
        "date": "2023-11-03T10:00:00Z",
        "type": "spent",
        "amount": 150.75,
        "category": "Groceries"
      }
    ]
    ```

- **Update Transaction by ID**
  - **PUT** `/api/transactions/{id}`
  - Update a transaction by ID.
  - **Path Parameters**:
    - `id` (integer, required): The ID of the transaction to update.
  - **Body Parameters**:
    - `date` (string, optional): Updated date in ISO format.
    - `type` (string, optional): Updated type, either `receive` or `spent`.
    - `amount` (number, optional): Updated amount.
    - `category` (string, optional): Updated category.
  - **Example Response**:
    ```json
    {
      "id": 1,
      "date": "2023-11-03T12:00:00Z",
      "type": "spent",
      "amount": 175.00,
      "category": "Groceries"
    }
    ```

- **Delete Transaction by ID**
  - **DELETE** `/api/transactions/{id}`
  - Delete a transaction by ID.
  - **Path Parameters**:
    - `id` (integer, required): The ID of the transaction to delete.
  - **Example Response**:
    ```json
    {
      "message": "Transaction deleted"
    }
    ```

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building the API.
- **PostgreSQL**: Relational database to store transactions.
- **Prisma**: ORM for database interaction.
- **Swagger**: API documentation and testing.

---
