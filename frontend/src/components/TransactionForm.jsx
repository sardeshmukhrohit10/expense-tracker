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
      className="bg-white dark:bg-[#181A20] border border-gray-200/70 dark:border-white/10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_0_20px_rgba(255,255,255,0.04)] w-full max-w-5xl mb-8 p-4 md:p-6"
    >
      <div className="grid md:grid-cols-6 gap-3">
        <input
          type="text"
          placeholder="Title"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-gray-50 dark:bg-[#111317] border border-gray-300/60 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500/70 dark:focus:ring-teal-400/70 transition md:col-span-2"
        />
        <input
          type="number"
          min="0"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-gray-50 dark:bg-[#111317] border border-gray-300/60 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500/70 dark:focus:ring-teal-400/70 transition"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-gray-50 dark:bg-[#111317] border border-gray-300/60 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500/70 dark:focus:ring-teal-400/70 transition"
        >
          <option>Income</option>
          <option>Expense</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-gray-50 dark:bg-[#111317] border border-gray-300/60 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500/70 dark:focus:ring-teal-400/70 transition"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-gray-50 dark:bg-[#111317] border border-gray-300/60 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500/70 dark:focus:ring-teal-400/70 transition"
        />
        <div className="flex items-center md:col-span-1">
          <button
            type="submit"
            className="
      bg-teal-600 hover:bg-teal-500 
      text-white text-sm font-medium 
      rounded-xl 
      px-6 py-2.5 
      whitespace-nowrap
      shadow-[0_4px_12px_rgba(20,184,166,0.30)]
      hover:shadow-[0_6px_18px_rgba(20,184,166,0.40)]
      transition-all duration-150
    "
          >
            Add Transaction
          </button>
        </div>
      </div>
    </form>
  );
}
