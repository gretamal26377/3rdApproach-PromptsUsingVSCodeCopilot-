import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { HomePage } from "./pages/HomePage";
import { StorePage } from "./pages/StorePage";
import { ProductPage } from "./pages/ProductPage";
import { CartPage } from "./pages/CartPage";
import { AdminPage } from "./pages/AdminPage";
import { Button } from "./components/ui/button";
import { ShoppingCart } from "lucide-react";
import { cn } from "./lib/utils"; // Issue?

// Issue: There's no search bar in the header

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Issue: Change user to customer
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // Issue: Change all logic for Role approach
  // Purpose: To navigate programmatically. For example, navigate("/login") to trigger navigating to the login page
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve data from the browser's window object local storage
    const storedUser = localStorage.getItem("user");
    const storedCart = localStorage.getItem("cart");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
      setIsAdmin(JSON.parse(storedUser).is_admin);
    }
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []); // [] empty dependency array to run only once on mount

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setIsAdmin(userData.is_admin);
    navigate("/");
  };

  const handleSignup = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    navigate("/");
  };

  // Warning: Not function to manage Customer Account Closure

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setIsAdmin(false);
    setCart([]);
    navigate("/");
  };

  const addToCart = (product) => {
    // prevCart is the previous state of the cart automatically passed by React
    setCart((prevCart) => {
      // prevCart.find checks if the product already exists in the cart using item to go through each product in the cart
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    // Warning: Here it's used productId instead of product.id as in addToCart
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter((item) => item.id !== productId);
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const authContextValue = {
    isLoggedIn,
    user,
    isAdmin,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {" "}
      {/* Warning: authContextValue is passed but not used in the code? */}
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Marketplace-PWA
            </Link>
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <Link to="/cart" className="relative">
                    <ShoppingCart className="h-6 w-6 text-gray-700" />
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                        {/* reduce: method that iterates over each element in the
                        array and applies a callback function to calculates the
                        total number of items in the cart */}
                        {cart.reduce((total, item) => total + item.quantity, 0)}
                      </span>
                    )}
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="text-gray-700 hover:text-blue-500"
                    >
                      Admin
                    </Link>
                  )}
                  <Button variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-500"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="text-gray-700 hover:text-blue-500"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* main: This is an HTML5 semantic element that represents the dominant/main content of the document's <body> */}
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* This route allows users navigate to a specific store by providing storeId parameter in the URL.
            The StorePage component can then use storeId to fetch that store's data. addToCart prop allows
            StorePage component adding products from the store to the customer's cart */}
            <Route
              path="/stores/:storeId"
              element={<StorePage addToCart={addToCart} />}
            />
            <Route
              path="/products/:productId"
              element={<ProductPage addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={
                <CartPage
                  cart={cart}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  clearCart={clearCart}
                />
              }
            />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>

        <footer className="bg-gray-200 text-center p-4 mt-8">
          {/* p: This is an HTML5 semantic element that represents a paragraph */}
          <p className="text-gray-600">
            {/* &copy;: This is an HTML entity that represents the copyright symbol
                {new Date().getFullYear()}: This JS expression gets the current year */}
            &copy; {new Date().getFullYear()} Marketplace-PWA. All rights
            reserved.
          </p>
        </footer>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
