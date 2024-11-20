const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
dotenv.config();

if (!databaseUrl) {
    console.error("DATABASE_URL is undefined. Check your environment variables.");
    throw new Error("DATABASE_URL is undefined.");
}

// Log for debugging
console.log("Resolved DATABASE_URL:", databaseUrl);

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