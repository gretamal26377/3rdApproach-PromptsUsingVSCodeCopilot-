import * as React from "react";

const Input = React.forwardRef(
  (
    {
      className = "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm",
      ...props
    },
    ref
  ) => <input ref={ref} className={className} {...props} />
);

Input.displayName = "Input";

export default Input;
