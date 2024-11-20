const request = require('supertest');
const app = require('../../../app');

describe('App Initialization and Miscellaneous Endpoints', () => {

  // Test for an unknown route
  it('should respond with 404 for an unknown route', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.status).toBe(404);
  });

  // Test to check if Swagger documentation is accessible
  it('should serve the Swagger documentation at /swagger', async () => {
    const response = await request(app).get('/swagger').redirects(1);
    expect(response.status).toBe(200);
    expect(response.text).toContain('Swagger UI'); // Check if the page contains Swagger UI content
  });

});