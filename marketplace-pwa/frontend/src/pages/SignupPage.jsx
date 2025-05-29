import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Signup from "../shared/components/Signup"; // Import Signup Component
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  // Purpose: To bring the signup function from the AuthContext to this Component
  const { signup } = useContext(AuthContext);
  // Purpose: To navigate programmatically. For example, navigate("/login") to trigger navigating to the login page
  const navigate = useNavigate();

  const handleSignupSuccess = (user) => {
    signup(user);
    navigate("/"); // Redirect to home page after signup
  };

  return (
    <Signup onSignup={handleSignupSuccess} /> // Pass signup function
  );
};

export default SignupPage;
