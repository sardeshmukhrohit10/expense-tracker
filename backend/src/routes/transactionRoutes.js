const express = require("express");
const router = express.Router();

const {
  getTransactions,
  createTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

// Routes
router.get("/", getTransactions);        // GET all
router.post("/", createTransaction);     // Create new
router.delete("/:id", deleteTransaction); // Delete by ID

module.exports = router;
