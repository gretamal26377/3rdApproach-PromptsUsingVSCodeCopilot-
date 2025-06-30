import React, { useContext } from "react";
import { useLocation, Link, Routes, Route } from "react-router-dom";
import { AuthContext } from "shared-lib";
import AdminRoutes from "./Routes";
import { Button } from "shared-lib";
import LoginPage from "shared-lib";
import AdminDashboard from "./components/AdminDashboard";

function AdminLanding() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Admin Panel</h1>
      <p className="text-lg text-gray-600 mb-8">
        Welcome to the Marketplace Admin Panel. Please log in to continue
      </p>
    </div>
  );
}

function AppContent() {
  const { isLoggedIn, isAdmin, login, logout } = useContext(AuthContext);
  const location = useLocation();

  return (
    <>
      <AdminLanding />
      {!isLoggedIn ? (
        <main className="container mx-auto p-4">
          <LoginPage onLogin={login} />
        </main>
      ) : (
        <>
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
          <div className="min-h-screen bg-gray-100">
            <AdminDashboard />
            <main className="container mx-auto p-4">
              <AdminRoutes />
            </main>
          </div>
        </>
      )}
      <footer className="bg-gray-200 text-center p-4 mt-8">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} Marketplace Admin Web App. All
          rights reserved
        </p>
      </footer>
    </>
  );
}

const App = () => <AppContent />;

export default App;
