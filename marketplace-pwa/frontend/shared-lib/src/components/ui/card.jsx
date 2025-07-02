import * as React from "react";

export function Card({ children, className = "bg-white rounded-lg shadow-md p-4", ...props }) {
  return <div className={className} {...props}>{children}</div>;
}

export function CardHeader({ children, className = "mb-2" }) {
  return <div className={className}>{children}</div>;
}

export function CardTitle({ children, className = "text-lg font-semibold" }) {
  return <div className={className}>{children}</div>;
}

export function CardContent({ children, className = "mb-2" }) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({ children, className = "pt-2 border-t mt-2" }) {
  return <div className={className}>{children}</div>;
}
