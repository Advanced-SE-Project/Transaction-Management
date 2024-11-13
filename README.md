
# Transaction Management Microservice

A microservice for managing transactions, with full CRUD capabilities, designed to handle transactions associated with individual users. This microservice is built with Node.js, Express.js, PostgreSQL, and Prisma ORM. It includes Swagger documentation for easy interaction with the API.

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

- Create, retrieve, update, and delete transactions linked to specific users.
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

Each endpoint requires the `userId` to ensure transactions are managed per user.

- **Create Transaction**
  - **POST** `/api/transactions`
  - Create a new transaction.
  - **Body Parameters**:
    - `date` (string, required): Transaction date in DD-MM-YYYY format.
    - `type` (string, required): Either `receive` or `spent`.
    - `amount` (number, required): The transaction amount.
    - `category` (string, required): The transaction category.
    - `userId` (integer, required): The ID of the user creating the transaction.
  - **Example Response**:
    ```json
    {
      "id": 1,
      "date": "03-11-2023",
      "type": "spent",
      "amount": 150.75,
      "category": "Groceries",
      "userId": 1
    }
    ```

- **Retrieve All Transactions for a User**
  - **GET** `/api/transactions?userId={userId}`
  - Retrieve all transactions for a specific user.
  - **Query Parameters**:
    - `userId` (integer, required): The ID of the user.
  - **Example Response**:
    ```json
    [
      {
        "id": 1,
        "date": "03-11-2023",
        "type": "spent",
        "amount": 150.75,
        "category": "Groceries",
        "userId": 1
      },
      {
        "id": 2,
        "date": "04-11-2023",
        "type": "receive",
        "amount": 2000.00,
        "category": "Salary",
        "userId": 1
      }
    ]
    ```

- **Retrieve Spent Transactions for a User**
  - **GET** `/api/transactions/spent?userId={userId}`
  - Retrieve all transactions where `type` is `spent` for a specific user.
  - **Query Parameters**:
    - `userId` (integer, required): The ID of the user.
  - **Example Response**:
    ```json
    [
      {
        "id": 1,
        "date": "03-11-2023",
        "type": "spent",
        "amount": 150.75,
        "category": "Groceries",
        "userId": 1
      }
    ]
    ```

- **Retrieve Receive Transactions for a User**
  - **GET** `/api/transactions/receive?userId={userId}`
  - Retrieve all transactions where `type` is `receive` for a specific user.
  - **Query Parameters**:
    - `userId` (integer, required): The ID of the user.
  - **Example Response**:
    ```json
    [
      {
        "id": 2,
        "date": "04-11-2023",
        "type": "receive",
        "amount": 2000.00,
        "category": "Salary",
        "userId": 1
      }
    ]
    ```

- **Retrieve Transactions by Category for a User**
  - **GET** `/api/transactions/category/{category}?userId={userId}`
  - Retrieve transactions filtered by a specific category for a specific user.
  - **Path Parameters**:
    - `category` (string, required): The category to filter transactions by.
  - **Query Parameters**:
    - `userId` (integer, required): The ID of the user.
  - **Example Response**:
    ```json
    [
      {
        "id": 1,
        "date": "03-11-2023",
        "type": "spent",
        "amount": 150.75,
        "category": "Groceries",
        "userId": 1
      }
    ]
    ```

- **Update Transaction by ID**
  - **PUT** `/api/transactions/{id}`
  - Update a transaction by ID.
  - **Path Parameters**:
    - `id` (integer, required): The ID of the transaction to update.
  - **Body Parameters**:
    - `date` (string, optional): Updated date in DD-MM-YYYY format.
    - `type` (string, optional): Updated type, either `receive` or `spent`.
    - `amount` (number, optional): Updated amount.
    - `category` (string, optional): Updated category.
    - `userId` (integer, required): The ID of the user.
  - **Example Response**:
    ```json
    {
      "id": 1,
      "date": "03-11-2023",
      "type": "spent",
      "amount": 175.00,
      "category": "Groceries",
      "userId": 1
    }
    ```

- **Delete Transaction by ID**
  - **DELETE** `/api/transactions/{id}?userId={userId}`
  - Delete a transaction by ID.
  - **Path Parameters**:
    - `id` (integer, required): The ID of the transaction to delete.
  - **Query Parameters**:
    - `userId` (integer, required): The ID of the user.
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
