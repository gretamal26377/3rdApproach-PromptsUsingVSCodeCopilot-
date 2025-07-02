import * as React from "react";

const Label = React.forwardRef(
  (
    {
      className = "block text-sm font-medium text-gray-700",
      htmlFor,
      ...props
    },
    ref
  ) => <label ref={ref} htmlFor={htmlFor} className={className} {...props} />
);

Label.displayName = "Label";

export default Label;
