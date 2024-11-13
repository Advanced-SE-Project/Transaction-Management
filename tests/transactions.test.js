const request = require('supertest');
const app = require('../app'); // Adjust the path based on your setup
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Mock transaction data
const mockTransaction = {
  date: "03-11-2023",
  type: "spent",
  amount: 150.75,
  category: "Groceries",
  userId: 1,
};

beforeAll(async () => {
  // Connect to Prisma (Database)
  await prisma.$connect();
});

afterAll(async () => {
  // Clean up database and disconnect
  await prisma.transaction.deleteMany();
  await prisma.$disconnect();
});

describe('Transaction API Endpoints', () => {
  let transactionId;

  // Test for creating a transaction
  it('should create a new transaction', async () => {
    const response = await request(app)
      .post('/api/transactions')
      .send(mockTransaction);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.date).toBe(mockTransaction.date);
    transactionId = response.body.id; // Save the transaction ID for later tests
  });

  // Test for retrieving all transactions for a user
  it('should retrieve all transactions for a specific user', async () => {
    const response = await request(app)
      .get(`/api/transactions`)
      .query({ userId: mockTransaction.userId });
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].userId).toBe(mockTransaction.userId);
  });

  // Test for retrieving spent transactions for a user
  it('should retrieve all spent transactions for a user', async () => {
    const response = await request(app)
      .get(`/api/transactions/spent`)
      .query({ userId: mockTransaction.userId });
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].type).toBe("spent");
  });

  // Test for retrieving receive transactions for a user
  it('should retrieve all receive transactions for a user', async () => {
    // Create a "receive" transaction
    await request(app).post('/api/transactions').send({
      date: "04-11-2023",
      type: "receive",
      amount: 500.00,
      category: "Salary",
      userId: mockTransaction.userId,
    });

    const response = await request(app)
      .get(`/api/transactions/receive`)
      .query({ userId: mockTransaction.userId });
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].type).toBe("receive");
  });

  // Test for updating a transaction by ID
  it('should update a transaction by ID', async () => {
    const updatedData = { ...mockTransaction, amount: 200 };

    const response = await request(app)
      .put(`/api/transactions/${transactionId}`)
      .send(updatedData);
    
    expect(response.status).toBe(200);
    expect(response.body.amount).toBe(200); // Check if the amount is updated
  });

  // Test for deleting a transaction by ID
  it('should delete a transaction by ID', async () => {
    const response = await request(app)
      .delete(`/api/transactions/${transactionId}`)
      .query({ userId: mockTransaction.userId });
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Transaction deleted");
  });
});
