import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "shared-lib";
import { Input } from "shared-lib";
import { Card, CardContent, CardHeader, CardTitle } from "shared-lib";
import { Badge } from "shared-lib";
import { Carousel, CarouselContent, CarouselItem } from "shared-lib";
import { ScrollArea } from "shared-lib";
import { cn } from "shared-lib";
import { Store, ShoppingBag, Search, ChevronRight } from "lucide-react";

// Mock data for stores and products (replace with actual API calls)
const mockStores = [
  {
    id: 1,
    name: "Electronics Store",
    description: "Your one-stop shop for the latest electronics.",
  },
  {
    id: 2,
    name: "Fashion Hub",
    description: "Trendy clothing and accessories for all styles.",
  },
  {
    id: 3,
    name: "Home & Garden",
    description: "Find everything you need for your home and garden.",
  },
  {
    id: 4,
    name: "Bookstore",
    description: "A wide selection of books for every reader.",
  },
  {
    id: 5,
    name: "Sports Center",
    description: "Gear up for your favorite sports and activities.",
  },
  {
    id: 6,
    name: "Grocery Market",
    description: "Fresh produce, pantry staples, and more.",
  },
];

const mockProducts = [
  {
    id: 1,
    name: "Laptop",
    description: "Powerful laptop for work and play",
    price: 1200,
    storeId: 1,
  },
  {
    id: 2,
    name: "Smartphone",
    description: "Latest smartphone with amazing features",
    price: 1000,
    storeId: 1,
  },
  {
    id: 3,
    name: "T-Shirt",
    description: "Comfortable and stylish t-shirt",
    price: 25,
    storeId: 2,
  },
  {
    id: 4,
    name: "Jeans",
    description: "Classic jeans for a perfect fit",
    price: 50,
    storeId: 2,
  },
  {
    id: 5,
    name: "Sofa",
    description: "Cozy sofa for your living room",
    price: 500,
    storeId: 3,
  },
  {
    id: 6,
    name: "Garden Tools Set",
    description: "Essential tools for gardening",
    price: 75,
    storeId: 3,
  },
  {
    id: 7,
    name: "Bestseller Novel",
    description: "A gripping novel by a renowned author",
    price: 20,
    storeId: 4,
  },
  {
    id: 8,
    name: "Mystery Thriller",
    description:
      "An exciting mystery that will keep you on the edge of your seat",
    price: 18,
    storeId: 4,
  },
  {
    id: 9,
    name: "Running Shoes",
    description: "High-performance shoes for running",
    price: 100,
    storeId: 5,
  },
  {
    id: 10,
    name: "Basketball",
    description: "Official size basketball",
    price: 30,
    storeId: 5,
  },
  {
    id: 11,
    name: "Organic Apples",
    description: "Fresh, locally grown organic apples",
    price: 5,
    storeId: 6,
  },
  {
    id: 12,
    name: "Whole Wheat Bread",
    description: "Healthy and delicious whole wheat bread",
    price: 4,
    storeId: 6,
  },
];

const HomePage = () => {
  const [stores, setStores] = useState(mockStores);
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredStores, setFeaturedStores] = useState(mockStores.slice(0, 3));

  // New: control dropdown visibility and detect outside clicks
  const wrapperRef = useRef(null);
  const resultsRef = useRef(null);
  const [showResults, setShowResults] = useState(false);

  // New: keyboard navigation
  const navigate = useNavigate();
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // New: live region announcement state
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setStores(mockStores);
      setProducts(mockProducts);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update announcement when results or highlight change
  useEffect(() => {
    if (!showResults || searchTerm.trim() === "") {
      setAnnouncement("");
      return;
    }

    const storeCount = filteredStores.length;
    const productCount = filteredProducts.length;
    let msg = `${storeCount} store${
      storeCount !== 1 ? "s" : ""
    } and ${productCount} product${
      productCount !== 1 ? "s" : ""
    } found.`;

    if (highlightedIndex >= 0 && flattenedResults[highlightedIndex]) {
      msg += ` Selected ${flattenedResults[highlightedIndex].title}.`;
    }

    setAnnouncement(msg);
  }, [
    filteredStores,
    filteredProducts,
    highlightedIndex,
    showResults,
    searchTerm,
    flattenedResults,
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setShowResults(true);
  };

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Flatten results for keyboard navigation
  const flattenedResults = useMemo(() => {
    const storesItems = filteredStores.map((s) => ({
      type: "store",
      id: s.id,
      path: `/stores/${s.id}`,
      title: s.name,
    }));
    const productsItems = filteredProducts.map((p) => ({
      type: "product",
      id: p.id,
      path: `/products/${p.id}`,
      title: p.name,
    }));
    return [...storesItems, ...productsItems];
  }, [filteredStores, filteredProducts]);

  // Keep highlighted index in sync when results change
  useEffect(() => {
    if (!showResults) return;
    setHighlightedIndex((prev) => {
      const count = flattenedResults.length;
      if (count === 0) return -1;
      if (prev < 0) return 0;
      return prev % count; // keep within bounds (cyclical modulo)
    });
  }, [flattenedResults, showResults]);

  // Scroll highlighted item into view when it changes
  useEffect(() => {
    if (highlightedIndex < 0) return;
    if (!wrapperRef.current) return;
    const el = wrapperRef.current.querySelector(
      `[data-global-index="${highlightedIndex}"]`
    );
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  const handleKeyDown = (e) => {
    if (!showResults) return;
    const count = flattenedResults.length;
    if (count === 0) return;

    // calculate visible count based on results container height (estimate item height = 48px)
    const visibleCount = resultsRef.current
      ? Math.max(1, Math.floor(resultsRef.current.clientHeight / 48))
      : 5;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => {
        const current = prev < 0 ? 0 : prev;
        return (current + 1) % count; // cyclical down
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => {
        const current = prev < 0 ? 0 : prev;
        return (current - 1 + count) % count; // cyclical up
      });
    } else if (e.key === "PageDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => {
        const current = prev < 0 ? 0 : prev;
        return (current + visibleCount) % count; // page down
      });
    } else if (e.key === "PageUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => {
        const current = prev < 0 ? 0 : prev;
        return (current - visibleCount + count) % count; // page up
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      const idx = highlightedIndex >= 0 ? highlightedIndex : 0;
      if (flattenedResults[idx]) {
        const item = flattenedResults[idx];
        setShowResults(false);
        navigate(item.path);
      }
    } else if (e.key === "Escape") {
      setShowResults(false);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8 bg-background text-text dark:bg-background-dark dark:text-text-dark min-h-screen">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-text-dark mb-4">
          Discover Amazing Products and Stores
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-200 mb-8">
          Explore a wide variety of products from trusted stores
        </p>
      </div>

      {/* Sticky Search Bar (now below CustomerNav, with top offset) */}
      <div className="flex justify-center sticky top-[5.5rem] md:top-20 z-20 bg-background text-text dark:bg-background-dark dark:text-text-dark py-2">
        <div className="w-full max-w-md relative" ref={wrapperRef}>
          <Input
            type="text"
            placeholder="Search for products or stores..."
            value={searchTerm}
            onChange={handleSearch}
            onFocus={() => setShowResults(true)}
            onKeyDown={handleKeyDown}
            className="pr-10 bg-white text-text dark:bg-gray-900 dark:text-text-dark"
            aria-label="Search for products or stores"
            aria-haspopup="listbox"
            aria-expanded={showResults}
            aria-controls="search-results"
            aria-activedescendant={
              highlightedIndex >= 0 ? `result-${highlightedIndex}` : undefined
            }
          />

          {/* Live region for screen readers */}
          <div
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            {announcement}
          </div>

          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Search className="h-5 w-5 text-gray-500 dark:text-gray-200" />
          </span>

          {/* Dropdown: grouped search results */}
          {showResults && searchTerm.trim() !== "" && (
            <div
              id="search-results"
              ref={resultsRef}
              role="listbox"
              aria-label="Search results"
              className="absolute left-0 right-0 mt-2 bg-background dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 max-h-60 overflow-auto"
            >
              <div className="p-2">
                {/* Stores Group with count */}
                <div>
                  <h3 className="text-sm font-semibold px-2 py-1 text-gray-700 dark:text-gray-200">
                    Stores ({filteredStores.length})
                  </h3>
                  {filteredStores.length === 0 ? (
                    <div className="px-2 py-1 text-sm text-gray-500 dark:text-gray-400">
                      No stores found
                    </div>
                  ) : (
                    filteredStores.map((s) => {
                      const globalIndex = flattenedResults.findIndex(
                        (it) => it.type === "store" && it.id === s.id
                      );
                      const isHighlighted = globalIndex === highlightedIndex;
                      return (
                        <Link
                          key={s.id}
                          to={`/stores/${s.id}`}
                          onClick={() => setShowResults(false)}
                          data-global-index={globalIndex}
                          id={`result-${globalIndex}`}
                          role="option"
                          aria-selected={isHighlighted}
                          className={`block px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-text dark:text-text-dark ${
                            isHighlighted ? "bg-gray-100 dark:bg-gray-800" : ""
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{s.name}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              View
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {s.description}
                          </div>
                        </Link>
                      );
                    })
                  )}
                </div>

                <hr className="my-2 border-gray-200 dark:border-gray-700" />

                {/* Products Group with count */}
                <div>
                  <h3 className="text-sm font-semibold px-2 py-1 text-gray-700 dark:text-gray-200">
                    Products & Services ({filteredProducts.length})
                  </h3>
                  {filteredProducts.length === 0 ? (
                    <div className="px-2 py-1 text-sm text-gray-500 dark:text-gray-400">
                      No products found
                    </div>
                  ) : (
                    filteredProducts.map((p) => {
                      const globalIndex = flattenedResults.findIndex(
                        (it) => it.type === "product" && it.id === p.id
                      );
                      const isHighlighted = globalIndex === highlightedIndex;
                      return (
                        <Link
                          key={p.id}
                          to={`/products/${p.id}`}
                          onClick={() => setShowResults(false)}
                          data-global-index={globalIndex}
                          id={`result-${globalIndex}`}
                          role="option"
                          aria-selected={isHighlighted}
                          className={`block px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-text dark:text-text-dark ${
                            isHighlighted ? "bg-gray-100 dark:bg-gray-800" : ""
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{p.name}</span>
                            <Badge variant="outline">${p.price}</Badge>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {p.description}
                          </div>
                        </Link>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Featured Stores Carousel */}
      <section className="bg-white dark:bg-gray-900 rounded-lg p-4">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-text dark:text-text-dark">
          <Store className="h-6 w-6 text-blue-500" />
          Featured Stores
        </h2>
        <Carousel className="w-full overflow-hidden">
          <CarouselContent>
            {featuredStores.map((store) => (
              <CarouselItem
                key={store.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <Card className="transition-transform transform hover:scale-105 hover:shadow-lg bg-background dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-text dark:text-text">
                      {store.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-200">
                      {store.description}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="text-center mt-4">
          <Button variant="outline" asChild>
            <Link to="/stores">
              View all Stores <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Product Categories (Horizontal Scroll) */}
      <section className="bg-white dark:bg-gray-900 rounded-lg p-4">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-text dark:text-text">
          <ShoppingBag className="h-6 w-6 text-blue-500" />
          Product Categories
        </h2>
        <ScrollArea className="w-full">
          <div className="flex gap-4 p-4">
            {/** Issue: It must be modified to be a dynamic list of Categories coming from DB Model and links to the Category pages */}
            <Badge variant="secondary" className="whitespace-nowrap">
              Electronics
            </Badge>
            <Badge variant="secondary" className="whitespace-nowrap">
              Fashion
            </Badge>
            <Badge variant="secondary" className="whitespace-nowrap">
              Home & Garden
            </Badge>
            <Badge variant="secondary" className="whitespace-nowrap">
              Books
            </Badge>
            <Badge variant="secondary" className="whitespace-nowrap">
              Sports
            </Badge>
            <Badge variant="secondary" className="whitespace-nowrap">
              Groceries
            </Badge>
            <Badge variant="secondary" className="whitespace-nowrap">
              Toys
            </Badge>
            <Badge variant="secondary" className="whitespace-nowrap">
              Furniture
            </Badge>
            <Badge variant="secondary" className="whitespace-nowrap">
              Beauty
            </Badge>
          </div>
        </ScrollArea>
        <div className="text-center mt-4">
          <Button variant="outline" asChild>
            <a href="/products">
              View all Products <ChevronRight className="ml-2 h-4 w-4" />
              {/** Issue?: Not sure if this path works because I don't see backend call/connection */}
            </a>
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white dark:bg-gray-900 rounded-lg p-4">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-text dark:text-text">
          <ShoppingBag className="h-6 w-6 text-blue-500" />
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.slice(0, 6).map((product) => (
            <Card
              key={product.id}
              className="transition-transform transform hover:scale-105 hover:shadow-lg bg-background dark:bg-gray-800"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-text dark:text-text">
                  {product.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-200 mb-2">
                  {product.description}
                </p>
                <Badge variant="outline">Price: ${product.price}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
