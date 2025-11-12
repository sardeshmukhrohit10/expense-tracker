import { useTransactions } from "../context/TransactionContext";

export default function Filters() {
  const { query, setQuery, category, setCategory, month, setMonth, categories } =
    useTransactions();

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md w-full max-w-5xl mb-4 grid gap-3 md:grid-cols-3">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search title..."
        className="border dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 rounded-lg p-2"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 rounded-lg p-2"
      >
        <option>All</option>
        {categories.map((c) => <option key={c}>{c}</option>)}
      </select>
      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="border dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 rounded-lg p-2"
      />
    </div>
  );
}
