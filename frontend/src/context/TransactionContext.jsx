import { createContext, useContext, useEffect, useMemo, useState } from "react";

const TransactionContext = createContext();
export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [month, setMonth] = useState("");

  const categories = [
    "Food",
    "Rent",
    "Travel",
    "Shopping",
    "Salary",
    "Insurance",
    "Other",
  ];

  // Fetch from backend
  const fetchTransactions = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/transactions");
      const data = await res.json();
      setTransactions(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Add to backend
  const addTransaction = async (tx) => {
    try {
      const res = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: tx.text,
          amount: tx.amount,
          type: tx.type,
          category: tx.category,
          date: tx.date,
        }),
      });

      const newTx = await res.json();

      setTransactions((prev) => [newTx, ...prev]);
    } catch (error) {
      console.error("Failed to add transaction:", error);
    }
  };

  // Delete from backend
  const deleteTransaction = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/transactions/${id}`, {
        method: "DELETE",
      });

      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };

  // Aggregations
  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);

  const balance = income - expense;

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesQuery = query
        ? t.title.toLowerCase().includes(query.toLowerCase())
        : true;

      const matchesCategory =
        category === "All" ? true : t.category === category;

      const matchesMonth = month
        ? t.date.startsWith(month)
        : true;

      return matchesQuery && matchesCategory && matchesMonth;
    });
  }, [transactions, query, category, month]);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        filteredTransactions,
        income,
        expense,
        balance,
        categories,
        category,
        setCategory,
        query,
        setQuery,
        month,
        setMonth,
        loading,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
