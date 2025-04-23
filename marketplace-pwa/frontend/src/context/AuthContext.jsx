import React, { useState, useEffect, createContext } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  isAdmin: false,
  login: () => {},
  signup: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Issue: Change user to customer
  const [isAdmin, setIsAdmin] = useState(false); // Issue: Change all logic for Role approach
  // Purpose: To navigate programmatically. For example, navigate("/login") to trigger navigating to the login page
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setIsLoggedIn(true);
      setIsAdmin(currentUser.is_admin);
    }
  }, []);

  const handleLogin = async (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setIsAdmin(userData.is_admin);
    navigate("/");
  };

  const handleSignup = async (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setIsAdmin(userData.is_admin);
    navigate("/");
  };

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setUser(null);
    setIsAdmin(false);
    navigate("/");
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
      {children}
    </AuthContext.Provider>
  );
};
