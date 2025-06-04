import React, { useContext } from "react";
import { AuthContext } from "../../shared/context/AuthContext";
import Login from "../../shared/components/Login"; // Import Login Component
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  // Purpose: To bring the login function from the AuthContext to this component
  const { login } = useContext(AuthContext);
  // Purpose: To navigate programmatically. For example, navigate("/login") to trigger navigating to the login page
  const navigate = useNavigate();

  const handleLoginSuccess = (user) => {
    login(user);
    navigate("/"); // Redirect to home page after login
  };

  return (
    <Login onLogin={handleLoginSuccess} /> // Pass the login function
  );
};

export default LoginPage;
