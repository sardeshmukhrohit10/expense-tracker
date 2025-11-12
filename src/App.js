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
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md w-full h-full flex flex-col">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-4 text-center">
        Summary
      </h2>

      <div className="flex flex-col justify-center gap-4 text-gray-700 dark:text-gray-200 text-base flex-1">
        <div className="flex justify-between">
          <span>Income</span>
          <span className="text-green-600 font-semibold">₹{income}</span>
        </div>

        <div className="flex justify-between">
          <span>Expense</span>
          <span className="text-red-600 font-semibold">₹{expense}</span>
        </div>

        <hr className="my-3 border-gray-200 dark:border-gray-700" />

        <div className="flex justify-between font-bold text-primary text-lg">
          <span>Balance</span>
          <span>₹{balance}</span>
        </div>
      </div>
    </div>
  );
}


export default function App() {
  return (
    <TransactionProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <header className="max-w-5xl mx-auto p-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            Expense Tracker
          </h1>
          <div className="flex gap-3">
            <ExportCSV />
            <ThemeToggle />
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-center gap-6 max-w-5xl mx-auto mb-6">
            <div className="flex-1 flex items-stretch">
              <Summary />
            </div>
            <div className="flex-1 flex items-stretch">
              <SummaryChart />
            </div>
          </div>

          <Filters />
          <TransactionForm />
          <TransactionList />
        </main>
      </div>
    </TransactionProvider>
  );
}
