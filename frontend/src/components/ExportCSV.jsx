import { useTransactions } from "../context/TransactionContext";

export default function ExportCSV() {
  const { filteredTransactions } = useTransactions();

  const handleExport = () => {
    if (!filteredTransactions.length) return;

    const header = ["id,text,amount,category,date"];
    const rows = filteredTransactions.map((t) =>
      [t.id, JSON.stringify(t.text), t.amount, t.category, t.date].join(",")
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 text-xs md:text-sm rounded-xl bg-white/80 dark:bg-[#181A20] border border-gray-200/70 dark:border-white/10 text-gray-700 dark:text-gray-100 hover:bg-teal-50 dark:hover:bg-[#113C3A] transition"
    >
      Export CSV
    </button>
  );
}
