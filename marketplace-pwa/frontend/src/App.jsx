import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  //useNavigate,
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
// cn likely a utility function used for conditionally joining class names in React components. Often used with libraries like tailwind-merge or classnames to simplify process of applying CSS classes based on certain conditions
// For example, it might be used to apply a different style to a button when it's disabled
import { cn } from "./lib/utils"; // Issue?
import authService from "./services/authService";

// Issue: There's no search bar in the header
// A: It's located in the HomePage component

const App = () => {
  const { isLoggedIn, user, isAdmin, login, logout } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  // Purpose: To navigate programmatically. For example, navigate("/login") to trigger navigating to the login page
  // const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");

    const fetchUser = async () => {
      const user = await authService.getCurrentUser();
      if (user) {
        login(user); // Use the login function from AuthContext to update the state
      }
    };

    fetchUser();

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
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

  // Issue?: From here onwards, code should be checked for responsiveness
  return (
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
                <Link to="/login" className="text-gray-700 hover:text-blue-500">
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
          {/** Issue: It misses Routes such as: /products, what's called from a HomePage component button */}
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
  );
};

export default App;
