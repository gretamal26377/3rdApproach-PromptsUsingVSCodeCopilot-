import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import AdminRoutes from "./admin/routes.jsx";
import CustomerRoutes from "./customer/routes.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./shared/context/AuthContext.jsx";
import { register } from "./serviceWorker";

const isAdminBuild = process.env.REACT_APP_ADMIN === "1";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>{isAdminBuild ? <AdminRoutes /> : <App />}</AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

register(); // Call the Service Worker Register Function
