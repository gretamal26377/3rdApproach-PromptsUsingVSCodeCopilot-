import * as React from "react";

const Input = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input
      className={`block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm py-3 ${className}`}
      // className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
