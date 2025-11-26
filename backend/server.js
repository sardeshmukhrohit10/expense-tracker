const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const transactionRoutes = require("./src/routes/transactionRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/transactions", transactionRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Expense Tracker API is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
