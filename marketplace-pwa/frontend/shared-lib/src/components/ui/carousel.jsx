import * as React from "react";

export function Carousel({
  children,
  className = "relative w-full overflow-hidden",
  ...props
}) {
  // Find CarouselContent child
  const contentChild = React.Children.toArray(children).find(
    (child) => child.type && child.type.name === "CarouselContent"
  );
  if (!contentChild) {
    return (
      <div className={className} {...props}>
        No CarouselContent found.
      </div>
    );
  }
  const itemCount = React.Children.count(contentChild.props.children);
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Auto-advance slides every 3 seconds
  React.useEffect(() => {
    if (itemCount <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % itemCount);
    }, 3000);
    return () => clearInterval(interval);
  }, [itemCount]);

  const goToPrev = () =>
    setActiveIndex((prev) => (prev - 1 + itemCount) % itemCount);
  const goToNext = () => setActiveIndex((prev) => (prev + 1) % itemCount);

  // Clone CarouselContent and inject props
  const content = React.cloneElement(contentChild, {
    activeIndex,
    itemCount,
  });

  return (
    <div
      className={`carousel-container bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 ${className}`}
      {...props}
    >
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={goToPrev}
          className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          aria-label="Previous slide"
        >
          ◀
        </button>
        <button
          type="button"
          onClick={goToNext}
          className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          aria-label="Next slide"
        >
          ▶
        </button>
      </div>
      {content}
    </div>
  );
}

export function CarouselContent({
  children,
  className = "flex transition-transform duration-300 ease-in-out",
  activeIndex = 0,
  itemCount = 1,
  ...props
}) {
  // Calculate transform based on activeIndex
  const transform = `translateX(-${activeIndex * (100 / itemCount)}%)`;
  return (
    <div
      className={className}
      style={{ width: `${itemCount * 100}%`, transform }}
      {...props}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { style: { width: `${100 / itemCount}%` } })
      )}
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
