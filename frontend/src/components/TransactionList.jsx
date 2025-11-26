import { useState, useEffect } from "react";
import { useTransactions } from "../context/TransactionContext";
import axios from "axios"; // Make sure axios is installed

export default function TransactionList() {
  const { filteredTransactions, setFilteredTransactions, deleteTransaction } = useTransactions();
  const [loading, setLoading] = useState(true);

  // Fetch transactions from backend on component mount
  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await axios.get("http://localhost:5000/api/transactions");
        setFilteredTransactions(response.data); // Assuming 'setFilteredTransactions' updates context
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    }

    fetchTransactions();
  }, [setFilteredTransactions]);

  const handleDeleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`);
      deleteTransaction(id); // Remove from context after successful backend deletion
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  if (loading) {
    return <p>Loading transactions...</p>;
  }

  return (
    <div className="bg-white dark:bg-[#181A20] border border-gray-200/70 dark:border-white/10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_0_20px_rgba(255,255,255,0.04)] w-full max-w-5xl p-6 md:p-7">
      <h2 className="text-xl font-semibold tracking-tight mb-4 text-teal-600 dark:text-teal-400">
        History
      </h2>

      {filteredTransactions.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No transactions found.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {filteredTransactions.map((t) => (
            <li
              key={t.id}
              className={`flex justify-between items-center rounded-xl px-4 py-3 bg-gray-50 dark:bg-[#111317] border-l-4 ${
                t.amount > 0 ? "border-emerald-400" : "border-rose-400"
              } transition-all duration-200 hover:bg-gray-100/70 dark:hover:bg-white/5 hover:shadow-md hover:shadow-black/10 dark:hover:shadow-white/5`}
            >
              <div>
                <p className="font-medium text-sm md:text-base text-gray-800 dark:text-gray-100">
                  {t.text}
                </p>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  {t.category} • {t.date}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`font-semibold text-sm md:text-base ${
                    t.amount > 0 ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {t.amount > 0 ? "+" : "-"}₹
                  {Math.abs(t.amount).toLocaleString()}
                </span>
                <button
                  onClick={() => handleDeleteTransaction(t.id)}
                  className="text-xs px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition"
                  aria-label="Delete transaction"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
