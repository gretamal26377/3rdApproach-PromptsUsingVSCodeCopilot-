import React, { useEffect, useState } from "react";
// import Button from "./button";

const getInitialMode = () => {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme");
  if (stored) return stored;
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
};

export default function DarkModeToggle() {
  const [mode, setMode] = useState(getInitialMode);

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", mode);
  }, [mode]);

  return (
    <div className="flex items-center gap-2">
      <button
        className={`px-3 py-1 rounded bg-gray-200 text-gray-800 border dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 ${
          mode === "light" ? "ring-2 ring-blue-500" : ""
        }`}
        onClick={() => setMode("light")}
        aria-label="Switch to light mode"
      >
        ☀️ Light
      </button>
      <button
        className={`px-3 py-1 rounded bg-gray-200 text-gray-800 border dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 ${
          mode === "dark" ? "ring-2 ring-blue-500" : ""
        }`}
        onClick={() => setMode("dark")}
        aria-label="Switch to dark mode"
      >
        🌙 Dark
      </button>
    </div>
  );
}
