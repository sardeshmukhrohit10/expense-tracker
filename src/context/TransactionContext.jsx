import { createContext, useContext, useEffect, useMemo, useState } from "react";

const TransactionContext = createContext();
export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  // Filters
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [month, setMonth] = useState(""); // format "YYYY-MM"

  const categories = ["Food", "Rent", "Travel", "Shopping", "Salary", "Insurance", "Other"];

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (t) =>
    setTransactions((prev) => [t, ...prev]);

  const deleteTransaction = (id) =>
    setTransactions((prev) => prev.filter((t) => t.id !== id));

  // Aggregates
  const income = transactions.filter(t => t.amount > 0)
    .reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter(t => t.amount < 0)
    .reduce((s, t) => s + Math.abs(t.amount), 0);
  const balance = income - expense;

  // Derived filtered list
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesQuery = query
        ? t.text.toLowerCase().includes(query.toLowerCase())
        : true;
      const matchesCategory = category === "All" ? true : t.category === category;
      const matchesMonth = month
        ? (t.date || "").startsWith(month) // "YYYY-MM"
        : true;
      return matchesQuery && matchesCategory && matchesMonth;
    });
  }, [transactions, query, category, month]);

  return (
    <TransactionContext.Provider value={{
      // data
      transactions,
      filteredTransactions,
      categories,
      income, expense, balance,
      // actions
      addTransaction, deleteTransaction,
      // filters
      query, setQuery,
      category, setCategory,
      month, setMonth,
    }}>
      {children}
    </TransactionContext.Provider>
  );
};
