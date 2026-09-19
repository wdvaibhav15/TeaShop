import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, User } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post(`${import.meta.env.VITE_CLIENT_API_URL}/api/auth/login`, {
        email,
        password
      });

      if (response.data.success) {
        console.log("Login successful:", response.data);
        navigate("/");
      }
    } catch (error) {
      console.error("Server Error Response:", error.response?.data);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  
  

  return (
    <div className="py-14 max-w-md mx-auto px-4 sm:px-6">
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 border border-stone-200/80 dark:border-stone-800 shadow-xl space-y-6">
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-amber-100 flex items-center justify-center font-serif text-2xl font-bold mx-auto shadow-md">
            🍵
          </div>
          <h1 className="font-serif-tea text-2xl font-bold text-stone-900 dark:text-stone-100 pt-2">
            Welcome Back to Camellia Leaf
          </h1>
          <p className="text-xs text-stone-500">
            Sign in to access your orders, cellar wishlist, and member benefits.
          </p>
        </div>

        {/* Demo login pills for instant testing */}
        <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Instant Demo Accounts:</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillDemoAccount("customer@teashop.com", "your_customer_password")}
              className="px-3 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 text-xs font-semibold hover:bg-emerald-200 transition-colors flex items-center justify-center gap-1"
            >
              <User className="w-3.5 h-3.5" />
              <span>Customer Demo</span>
            </button>
            <button
              type="button"
              onClick={() => fillDemoAccount("admin@teashop.com", "your_admin_password")}
              className="px-3 py-2 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 text-xs font-semibold hover:bg-amber-200 transition-colors flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@teashop.com"
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-[11px] text-emerald-800 dark:text-emerald-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
              
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs shadow-md shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all"
          >
            <span>Sign In Securely</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-stone-500 pt-2 border-t border-stone-100 dark:border-stone-800">
          New to Camellia Leaf?{" "}
          <Link
            to="/register"
            className="font-bold text-emerald-800 dark:text-emerald-400 hover:underline"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
