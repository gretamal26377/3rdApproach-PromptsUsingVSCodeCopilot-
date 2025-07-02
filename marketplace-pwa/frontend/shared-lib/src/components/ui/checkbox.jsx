import * as React from "react";

const Checkbox = React.forwardRef(({ className = "h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500", ...props }, ref) => (
  <input
    type="checkbox"
    ref={ref}
    className={className}
    {...props}
  />
));

Checkbox.displayName = "Checkbox";

export default Checkbox;
