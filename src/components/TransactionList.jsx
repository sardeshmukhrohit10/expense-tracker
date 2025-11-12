import { useTransactions } from "../context/TransactionContext";

export default function TransactionList() {
  const { filteredTransactions, deleteTransaction } = useTransactions();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md w-full max-w-5xl">
      <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-100">
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
              className={`flex justify-between items-center border-l-4 ${
                t.amount > 0 ? "border-green-500" : "border-red-500"
              } bg-gray-50 dark:bg-gray-900 rounded-xl p-3 hover:shadow-md transition-all duration-200`}
            >
              {/* Left section */}
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100">
                  {t.text}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  {t.category} • {t.date}
                </p>
              </div>

              {/* Right section */}
              <div className="flex items-center gap-3">
                <span
                  className={`font-semibold text-base ${
                    t.amount > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {t.amount > 0 ? "+" : "-"}₹{Math.abs(t.amount)}
                </span>
                <button
                  onClick={() => deleteTransaction(t.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors duration-150"
                  aria-label="Delete transaction"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
