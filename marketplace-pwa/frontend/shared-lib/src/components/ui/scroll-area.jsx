import * as React from "react";

const ScrollArea = React.forwardRef(
  // The scrolling here is managed by the className "overflow-x-auto" and -x- makes it horizontal
  ({ className = "overflow-x-auto", ...props }, ref) => (
    <div ref={ref} className={className} {...props} />
  )
);

ScrollArea.displayName = "ScrollArea";

export default ScrollArea;
