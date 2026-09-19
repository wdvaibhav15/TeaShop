import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, User, ArrowRight } from "lucide-react";
import axios from "axios";




const RegisterPage =() => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
 

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_CLIENT_API_URL}/api/auth/register`, {
        name,
        email,
        password,
        confirmPassword,
      });
      

      if(response.data.success) {
        
        navigate("/login");
      }
    } catch (error) {
      // This will print the precise error message sent by your backend database/server
      console.error("Server Error Response:", error.response?.data);
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
            Create Your Tea Account
          </h1>
          <p className="text-xs text-stone-500">
            Join our society to track orders, save tasting wishlists, and receive 15% off.
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
              <input
                type="text"

                placeholder="e.g. Eleanor Vance"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
              <input
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
              Confirm Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleRegister}
            className="w-full py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs shadow-md shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all"
          >
            <span>Complete Registration</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-stone-500 pt-2 border-t border-stone-100 dark:border-stone-800">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-emerald-800 dark:text-emerald-400 hover:underline"
          >
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

