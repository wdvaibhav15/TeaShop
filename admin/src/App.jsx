import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminWelcome from './pages/AdminWelcome';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Navbar from './components/Navbar';
import ResetPassword from './pages/ResetPassword';
import VerifyOTP from './components/VerifyOTP';
import NewPass from './components/NewPass';
import AdminDashboardPage from './pages/AdminDashboardPage';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 selection:bg-emerald-200 selection:text-emerald-950 transition-colors duration-200">
      <Navbar/>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<AdminWelcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/forgot-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/new-password" element={<NewPass />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;