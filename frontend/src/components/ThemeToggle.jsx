import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark((v) => !v)}
      className="px-4 py-2 text-xs md:text-sm rounded-xl bg-white/80 dark:bg-[#181A20] border border-gray-200/70 dark:border-white/10 text-gray-700 dark:text-gray-100 hover:bg-teal-50 dark:hover:bg-[#113C3A] transition"
      aria-label="Toggle theme"
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
