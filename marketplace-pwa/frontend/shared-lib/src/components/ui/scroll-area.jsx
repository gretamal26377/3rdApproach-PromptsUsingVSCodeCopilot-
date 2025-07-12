import * as React from "react";

const ScrollArea = React.forwardRef(
  // The scrolling here is managed by the className "overflow-x-auto" and -x- makes it horizontal
  ({ className = "overflow-x-auto", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`overflow-auto bg-gray-50 dark:bg-gray-900 rounded ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ScrollArea.displayName = "ScrollArea";

export default ScrollArea;
