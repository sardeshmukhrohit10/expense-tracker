import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";

export default function TransactionForm() {
  const { addTransaction, categories } = useTransactions();
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other");
  const [type, setType] = useState("Income");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !amount) return;
    const absAmount = Math.abs(Number(amount));
    const signedAmount = type === "Expense" ? -absAmount : absAmount;

    const newTx = {
      id: Date.now(),
      text: text.trim(),
      amount: signedAmount,
      category,
      type,
      date,
    };
    addTransaction(newTx);
    setText("");
    setAmount("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md w-full max-w-5xl mb-4"
    >
      <div className="grid md:grid-cols-6 gap-3">
        <input
          type="text"
          placeholder="Title"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 rounded-lg p-2 md:col-span-2"
        />
        <input
          type="number"
          min="0"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 rounded-lg p-2"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 rounded-lg p-2"
        >
          <option>Income</option>
          <option>Expense</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 rounded-lg p-2"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 rounded-lg p-2"
        />
        <button
          type="submit"
          className="bg-primary text-white py-2 rounded-lg hover:bg-indigo-600 w-full"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
