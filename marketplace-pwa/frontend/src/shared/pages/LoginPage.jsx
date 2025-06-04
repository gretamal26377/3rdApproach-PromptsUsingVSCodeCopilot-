import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Login from "../components/Login"; // Import Login Component
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  // Purpose: To bring the login function from the AuthContext to this component
  const { login } = useContext(AuthContext);
  // Purpose: To navigate programmatically. For example, navigate("/login") to trigger navigating to the login page
  const navigate = useNavigate();

  const handleLoginSuccess = (user) => {
    login(user);
    navigate("/"); // Issue: Modify to redirect to Admin or Customer HomePage accordingly after login
  };

  return (
    <Login onLogin={handleLoginSuccess} /> // Pass the login function
  );
};

export default LoginPage;
