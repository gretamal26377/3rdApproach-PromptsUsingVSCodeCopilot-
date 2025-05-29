import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import AdminRoutes from "./admin/routes.jsx";
import CustomerRoutes from "./customer/routes.jsx";

// Navigation bars for each area
import { Button } from "./shared/ui.button";
import { ShoppingCart } from "lucide-react";
import authService from "./shared/services/authService";

function AdminNav() {
  const { isLoggedIn, isAdmin, logout } = useContext(AuthContext);
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/admin" className="text-xl font-bold text-gray-800">
          Admin Panel
        </a>
        <div className="flex items-center gap-4">
          {isLoggedIn && isAdmin && (
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

function CustomerNav({ cart, handleLogout }) {
  const { isLoggedIn, isAdmin } = useContext(AuthContext);
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-bold text-gray-800">
          Marketplace-PWA
        </a>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <a href="/cart" className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {/* reduce: method that iterates over each element in the
                        cart array and applies a callback function to calculates the
                        total number of items in the cart */}
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </a>
              {isAdmin && (
                <a href="/admin" className="text-gray-700 hover:text-blue-500">
                  Admin
                </a>
              )}
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <a href="/login" className="text-gray-700 hover:text-blue-500">
                Login
              </a>
              <a href="/signup" className="text-gray-700 hover:text-blue-500">
                Signup
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function AppContent() {
  const { isLoggedIn, user, isAdmin, login, logout } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const location = useLocation();

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
      if (existingItem && existingItem.quantity > 1) {
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

  // Separate admin and customer route trees
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Issue?: From here onwards, code should be checked for responsiveness
  return (
    <div className="min-h-screen bg-gray-100">
      {isAdminRoute ? (
        <AdminNav />
      ) : (
        <CustomerNav cart={cart} handleLogout={logout} />
      )}

      {/* main: This is an HTML5 semantic element that represents the dominant/main content of the document's <body> */}
      <main className="container mx-auto p-4">
        {isAdminRoute ? (
          <AdminRoutes />
        ) : (
          <CustomerRoutes
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
          />
        )}
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
}

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
