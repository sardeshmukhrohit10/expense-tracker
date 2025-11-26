const pool = require("../config/db");

// GET /api/transactions
exports.getTransactions = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, title, amount, type, category, date, created_at FROM transactions ORDER BY date DESC, id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ error: "Server error while fetching transactions" });
  }
};

// POST /api/transactions
exports.createTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;

    if (!title || !amount || !type || !category || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const numericAmount = Number(amount);
    if (Number.isNaN(numericAmount)) {
      return res.status(400).json({ error: "Amount must be a number" });
    }

    const result = await pool.query(
      `INSERT INTO transactions (title, amount, type, category, date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, title, amount, type, category, date, created_at`,
      [title.trim(), numericAmount, type, category, date]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating transaction:", err);
    res.status(500).json({ error: "Server error while creating transaction" });
  }
};

// DELETE /api/transactions/:id
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM transactions WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted", id });
  } catch (err) {
    console.error("Error deleting transaction:", err);
    res.status(500).json({ error: "Server error while deleting transaction" });
  }
};
