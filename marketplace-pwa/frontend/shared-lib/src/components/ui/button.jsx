import * as React from "react";

const base =
  "inline-flex items-center justify-center font-medium rounded px-4 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed";
const variants = {
  primary: "bg-blue-500 text-white hover:bg-blue-600",
  secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  outline: "border border-gray-300 text-gray-800 bg-white hover:bg-gray-50",
  destructive: "bg-red-700 text-white hover:bg-red-800",
  ghost: "bg-transparent hover:bg-gray-100 text-gray-800",
};

const Button = React.forwardRef(
  ({ className = "", variant = "primary", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={[base, variants[variant] || "", className].join(" ")}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
