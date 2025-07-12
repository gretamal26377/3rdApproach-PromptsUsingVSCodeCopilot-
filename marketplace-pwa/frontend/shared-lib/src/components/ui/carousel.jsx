import * as React from "react";

export function Carousel({
  children,
  className = "relative w-full overflow-hidden",
  ...props
}) {
  return (
    <div
      className={`carousel-container bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CarouselContent({
  children,
  className = "flex transition-transform duration-300 ease-in-out",
  ...props
}) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function CarouselItem({
  children,
  className = "flex-shrink-0 w-full",
  ...props
}) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}
