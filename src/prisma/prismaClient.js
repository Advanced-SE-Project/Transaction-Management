const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
dotenv.config();

// Debugging environment variables
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DATABASE_URL_TEST:", process.env.DATABASE_URL_TEST);
console.log("DATABASE_URL:", process.env.DATABASE_URL);

// Choose the correct database URL based on NODE_ENV
const databaseUrl = process.env.NODE_ENV === 'test'
    ? process.env.DATABASE_URL_TEST
    : process.env.DATABASE_URL;

if (!databaseUrl) {
    console.error("DATABASE_URL is undefined. Check your environment variables.");
    throw new Error("DATABASE_URL is undefined.");
}

// Log for debugging
console.log("Resolved DATABASE_URL:", databaseUrl);

// Initialize PrismaClient with the selected database URL
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: databaseUrl,
        },
    },
});

module.exports = prisma;
