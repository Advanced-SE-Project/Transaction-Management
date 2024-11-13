const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a transaction
/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags:
 *       - Transactions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-11-03T10:00:00Z"
 *               type:
 *                 type: string
 *                 enum: [receive, spent]
 *                 example: "spent"
 *               amount:
 *                 type: number
 *                 example: 150.75
 *               category:
 *                 type: string
 *                 example: "Groceries"
 *               userId:
 *                 type: integer
 *                 example: 1
 *                 description: ID of the user creating the transaction
 *     responses:
 *       200:
 *         description: Created transaction
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-11-03T10:00:00Z"
 *                 type:
 *                   type: string
 *                   example: "spent"
 *                 amount:
 *                   type: number
 *                   example: 150.75
 *                 category:
 *                   type: string
 *                   example: "Groceries"
 *                 userId:
 *                   type: integer
 *                   example: 1
 */
router.post('/transactions', async (req, res) => {
    const { date, type, amount, category, userId } = req.body;
    try {
        const transaction = await prisma.transaction.create({
            data: { date: new Date(date), type, amount, category, userId },
        });
        res.json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Retrieve All Transactions for a Specific User
/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Retrieve all transactions for a specific user
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user to retrieve transactions for
 *     responses:
 *       200:
 *         description: A list of all transactions for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-11-03T10:00:00Z"
 *                   type:
 *                     type: string
 *                     example: "spent"
 *                   amount:
 *                     type: number
 *                     example: 150.75
 *                   category:
 *                     type: string
 *                     example: "Groceries"
 *                   userId:
 *                     type: integer
 *                     example: 1
 */
router.get('/transactions', async (req, res) => {
    const { userId } = req.query;
    try {
        const transactions = await prisma.transaction.findMany({
            where: { userId: parseInt(userId) },
        });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Retrieve Transactions Marked as "Spent" for a Specific User
/**
 * @swagger
 * /transactions/spent:
 *   get:
 *     summary: Retrieve all "spent" transactions for a specific user
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user to retrieve transactions for
 *     responses:
 *       200:
 *         description: A list of transactions marked as "spent" for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-11-03T10:00:00Z"
 *                   type:
 *                     type: string
 *                     example: "spent"
 *                   amount:
 *                     type: number
 *                     example: 150.75
 *                   category:
 *                     type: string
 *                     example: "Groceries"
 *                   userId:
 *                     type: integer
 *                     example: 1
 */
router.get('/transactions/spent', async (req, res) => {
    const { userId } = req.query;
    try {
        const transactions = await prisma.transaction.findMany({
            where: { type: "spent", userId: parseInt(userId) },
        });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Retrieve Transactions Marked as "Receive" for a Specific User
/**
 * @swagger
 * /transactions/receive:
 *   get:
 *     summary: Retrieve all "receive" transactions for a specific user
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user to retrieve transactions for
 *     responses:
 *       200:
 *         description: A list of transactions marked as "receive" for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 2
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-11-04T10:00:00Z"
 *                   type:
 *                     type: string
 *                     example: "receive"
 *                   amount:
 *                     type: number
 *                     example: 1000.00
 *                   category:
 *                     type: string
 *                     example: "Salary"
 *                   userId:
 *                     type: integer
 *                     example: 1
 */
router.get('/transactions/receive', async (req, res) => {
    const { userId } = req.query;
    try {
        const transactions = await prisma.transaction.findMany({
            where: { type: "receive", userId: parseInt(userId) },
        });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Retrieve Transactions by Category for a Specific User
/**
 * @swagger
 * /transactions/category/{category}:
 *   get:
 *     summary: Retrieve transactions by category for a specific user
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: The category to filter by
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user to retrieve transactions for
 *     responses:
 *       200:
 *         description: A list of transactions filtered by category for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 3
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-11-05T12:00:00Z"
 *                   type:
 *                     type: string
 *                     example: "spent"
 *                   amount:
 *                     type: number
 *                     example: 200.00
 *                   category:
 *                     type: string
 *                     example: "Groceries"
 *                   userId:
 *                     type: integer
 *                     example: 1
 */
router.get('/transactions/category/:category', async (req, res) => {
    const { category } = req.params;
    const { userId } = req.query;
    try {
        const transactions = await prisma.transaction.findMany({
            where: { category, userId: parseInt(userId) },
        });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a transaction by id
/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     summary: Update a transaction by ID
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the transaction to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-11-03T10:00:00Z"
 *               type:
 *                 type: string
 *                 enum: [receive, spent]
 *                 example: "receive"
 *               amount:
 *                 type: number
 *                 example: 200.50
 *               category:
 *                 type: string
 *                 example: "Salary"
 *     responses:
 *       200:
 *         description: Updated transaction
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 type:
 *                   type: string
 *                 amount:
 *                   type: number
 *                 category:
 *                   type: string
 *       404:
 *         description: Transaction not found
 */
router.put('/transactions/:id', async (req, res) => {
    const { id } = req.params;
    const { date, type, amount, category } = req.body;
    try {
        const updatedTransaction = await prisma.transaction.update({
            where: { id: parseInt(id) },
            data: { date: new Date(date), type, amount, category },
        });
        res.json(updatedTransaction);
    } catch (error) {
        res.status(404).json({ error: "Transaction not found" });
    }
});

// Delete a transaction by id
/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Delete a transaction by ID
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the transaction to delete
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transaction deleted"
 *       404:
 *         description: Transaction not found
 */
router.delete('/transactions/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.transaction.delete({
            where: { id: parseInt(id) },
        });
        res.json({ message: "Transaction deleted" });
    } catch (error) {
        res.status(404).json({ error: "Transaction not found" });
    }
});

module.exports = router;