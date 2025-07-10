import React, { useEffect, useState } from "react";
import Button from "./button";

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
    <Button
      variant="secondary"
      className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border dark:border-gray-700"
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
    >
      {mode === "dark" ? "🌙 Dark" : "☀️ Light"}
    </Button>
  );
}
