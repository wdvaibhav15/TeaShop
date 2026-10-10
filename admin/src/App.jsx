import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import AdminWelcome from "./pages/AdminWelcome";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ResetPassword from "./pages/ResetPassword";
import VerifyOTP from "./components/VerifyOTP";
import NewPass from "./components/NewPass";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import CafeSetting from "./pages/CafeSetting";
import { Toaster } from "react-hot-toast";

// Check persistent login information.
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  return Boolean(token && user);
};

// Protect admin-only pages.
const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

// Prevent logged-in admins from returning to public pages.
const PublicRoute = () => {
  if (isAuthenticated()) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return <Outlet />;
};

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 selection:bg-emerald-200 selection:text-emerald-950 transition-colors duration-200">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#292524",
            color: "#fff",
            border: "1px solid #44403c",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
        }}
      />

      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* Public pages: only while logged out */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<AdminWelcome />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Password recovery pages */}
          <Route path="/forgot-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/new-password" element={<NewPass />} />

          {/* Protected admin pages */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
            <Route path="/cafe-settings" element={<CafeSetting />} />
          </Route>

          {/* Unknown route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
