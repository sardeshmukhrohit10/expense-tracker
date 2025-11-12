import { useTransactions } from "../context/TransactionContext";

export default function ExportCSV() {
  const { filteredTransactions } = useTransactions();

  const handleExport = () => {
    const header = ["id,text,amount,category,date"];
    const rows = filteredTransactions.map(t =>
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
      className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-gray-100"
    >
      Export CSV
    </button>
  );
}
