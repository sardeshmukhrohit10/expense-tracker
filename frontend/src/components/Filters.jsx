import { useTransactions } from "../context/TransactionContext";

export default function Filters() {
  const {
    query,
    setQuery,
    category,
    setCategory,
    month,
    setMonth,
    categories,
  } = useTransactions();

  return (
    <div className="bg-white dark:bg-[#181A20] border border-gray-200/70 dark:border-white/10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_0_20px_rgba(255,255,255,0.04)] w-full max-w-5xl mb-6 p-4 md:p-5 grid gap-3 md:grid-cols-3">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search title..."
        className="bg-gray-50 dark:bg-[#111317] border border-gray-300/60 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500/70 dark:focus:ring-teal-400/70 transition"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-gray-50 dark:bg-[#111317] border border-gray-300/60 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500/70 dark:focus:ring-teal-400/70 transition"
      >
        <option>All</option>
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="bg-gray-50 dark:bg-[#111317] border border-gray-300/60 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500/70 dark:focus:ring-teal-400/70 transition"
      />
    </div>
  );
}
