import React, { useEffect, useState } from "react";
import ToggleSwitch from "./toggle-switch";

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
      <ToggleSwitch
        checked={mode === "dark"}
        onChange={(e) => setMode(e.target.checked ? "dark" : "light")}
        label={mode === "dark" ? "Dark Mode" : "Light Mode"}
        className="px-3 py-1"
      />
    </div>
  );
}
