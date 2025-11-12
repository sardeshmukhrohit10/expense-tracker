import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useTransactions } from "../context/TransactionContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SummaryChart() {
  const { income, expense } = useTransactions();
  const total = income + expense;
  const incomePercent = total ? ((income / total) * 100).toFixed(1) : 0;
  const expensePercent = total ? ((expense / total) * 100).toFixed(1) : 0;
  const balance = income - expense;

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ["#4f46e5", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false } },
    cutout: "75%",
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md w-full h-full flex flex-col items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-2">
        Income vs Expense
      </h2>

      <div className="relative w-44 h-44 my-2 flex items-center justify-center">
        <Doughnut data={data} options={options} />
        <div className="absolute text-center leading-tight">
          <p className="text-xs text-gray-500 dark:text-gray-400">Balance</p>
          <p className="text-lg font-bold text-primary">
            ₹{balance.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex justify-around w-full text-sm font-medium mt-2 text-gray-700 dark:text-gray-200">
        <div className="flex flex-col items-center">
          <span className="text-green-600">Income</span>
          <span>{incomePercent}%</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-red-600">Expense</span>
          <span>{expensePercent}%</span>
        </div>
      </div>
    </div>
  );
}
