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
        backgroundColor: ["#22C55E", "#EF4444"], // green & red
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
    <div className="bg-white dark:bg-[#181A20] border border-gray-200/70 dark:border-white/10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_0_20px_rgba(255,255,255,0.04)] w-full h-full flex flex-col items-center p-6 md:p-7">
      <h2 className="text-xl font-semibold tracking-tight text-teal-600 dark:text-teal-400 mb-4">
        Income vs Expense
      </h2>
      <div className="relative w-40 h-40 my-2 flex items-center justify-center">
        <Doughnut data={data} options={options} />
        <div className="absolute text-center leading-tight">
          <p className="text-xs text-gray-500 dark:text-gray-400">Balance</p>
          <p className="text-lg font-semibold text-teal-600 dark:text-teal-400">
            ₹{balance.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="flex justify-around w-full text-xs md:text-sm font-medium mt-2 text-gray-700 dark:text-gray-200">
        <div className="flex flex-col items-center">
          <span className="text-emerald-400">Income</span>
          <span>{incomePercent}%</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-rose-400">Expense</span>
          <span>{expensePercent}%</span>
        </div>
      </div>
    </div>
  );
}
