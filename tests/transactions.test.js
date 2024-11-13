const request = require('supertest');
const app = require('../app'); // Adjust path if necessary

// Mock transaction data
const mockTransaction = {
  date: "03-11-2023",
  type: "spent",
  amount: 150.75,
  category: "Groceries",
  userId: 1,
};

describe('Transaction API Endpoints', () => {
  it('should create a new transaction', async () => {
    const response = await request(app)
      .post('/api/transactions')
      .send(mockTransaction);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.date).toBe(mockTransaction.date);
  });
});
