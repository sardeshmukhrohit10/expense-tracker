import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import SummaryChart from "./components/SummaryChart";
import Filters from "./components/Filters";
import ThemeToggle from "./components/ThemeToggle";
import ExportCSV from "./components/ExportCSV";
import {
  TransactionProvider,
  useTransactions,
} from "./context/TransactionContext";

function Summary() {
  const { income, expense, balance } = useTransactions();

  return (
    <div className="bg-white dark:bg-[#181A20] border border-gray-200/70 dark:border-white/10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_0_20px_rgba(255,255,255,0.04)] w-full h-full flex flex-col p-6 md:p-7">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold tracking-tight text-teal-600 dark:text-teal-400">
          Summary
        </h2>
        <span className="text-xs px-2 py-1 rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300">
          Overview
        </span>
      </div>

      <div className="flex flex-col gap-4 text-sm md:text-base flex-1">
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Income</span>
          <span className="font-semibold text-emerald-500">
            ₹{income.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Expense</span>
          <span className="font-semibold text-rose-500">
            ₹{expense.toLocaleString()}
          </span>
        </div>

        <div className="border-t border-gray-200 dark:border-white/10 my-2" />

        <div className="flex justify-between items-baseline">
          <span className="text-gray-700 dark:text-gray-200 font-medium">
            Balance
          </span>
          <span className="text-xl md:text-2xl font-semibold text-teal-600 dark:text-teal-400">
            ₹{balance.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <TransactionProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-[#0D0F12] text-gray-900 dark:text-gray-100">
        <header className="max-w-5xl mx-auto px-6 pt-10 pb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Expense Tracker
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Monitor your cashflow with a beautifully crafted premium dashboard.
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <ExportCSV />
            <ThemeToggle />
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 pb-16">
          {/* Summary + Chart */}
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-8 md:mb-10">
            <div className="flex-1 flex items-stretch">
              <Summary />
            </div>
            <div className="flex-1 flex items-stretch">
              <SummaryChart />
            </div>
          </div>

          {/* Filters, Form, History */}
          <Filters />
          <TransactionForm />
          <TransactionList />
        </main>
      </div>
    </TransactionProvider>
  );
}
