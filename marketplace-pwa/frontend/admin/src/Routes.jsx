// Admin-specific routes
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard.jsx';
import AdminUserManagement from './components/AdminUserManagement.jsx';
import AdminStoreManagement from './components/AdminStoreManagement.jsx';
import AdminProductManagement from './components/AdminProductManagement.jsx';
import AdminOrderManagement from './components/AdminOrderManagement.jsx';
import LoginPage from "shared-lib/src/pages/LoginPage.jsx";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminUserManagement />} />
      <Route path="/admin/stores" element={<AdminStoreManagement />} />
      <Route path="/admin/products" element={<AdminProductManagement />} />
      <Route path="/admin/orders" element={<AdminOrderManagement />} />
      <Route path="/admin/login" element={<LoginPage />} />
    </Routes>
  );
}
