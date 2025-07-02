import * as React from "react";

const base = "flex items-start gap-3 p-4 rounded border text-sm";
const variants = {
  default: "bg-blue-50 border-blue-200 text-blue-800",
  destructive: "bg-red-50 border-red-200 text-red-800",
  success: "bg-green-50 border-green-200 text-green-800",
};

export function Alert({ children, className = "", variant = "default", ...props }) {
  return (
    <div className={[base, variants[variant] || "", className].join(" ")} {...props}>
      {children}
    </div>
  );
}

export function AlertTitle({ children, className = "font-bold" }) {
  return <div className={className}>{children}</div>;
}

export function AlertDescription({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}
