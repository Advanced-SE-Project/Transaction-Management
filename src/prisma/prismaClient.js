const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
dotenv.config();

// Choose the correct database URL based on NODE_ENV
const databaseUrl = process.env.NODE_ENV === 'test'
    ? process.env.DATABASE_URL_TEST
    : process.env.DATABASE_URL;

// Initialize PrismaClient with the selected database URL
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: databaseUrl,
        },
    },
});

module.exports = prisma;