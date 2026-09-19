import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Moon,
  Menu,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const [userDropdown, setUserDropdown] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-stone-50/90 dark:bg-stone-950/90 border-b border-stone-200/80 dark:border-stone-800 transition-colors">
      {/* Top Announcement Bar */}
      <div className="bg-emerald-900 text-stone-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span>🌿 Free shipping on orders over $50</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-medium ml-auto">
            <button
              className="p-1 px-2 rounded-full hover:bg-emerald-800 text-emerald-200 transition-colors flex items-center gap-1"
              aria-label="Toggle dark mode"
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Theme</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-emerald-800 text-amber-100 flex items-center justify-center font-serif text-lg font-bold shadow-sm group-hover:bg-emerald-700 transition-colors">
              🍵
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 block leading-none">
                Camellia Leaf
              </span>
              <span className="text-[10px] tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold uppercase">
                Artisanal Tea Co.
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700 dark:text-stone-300">
            <Link
              to="/"
              className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors"
            >
              Shop All
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors py-2">
                Categories
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 transition-transform" />
              </button>
            </div>
            <Link
              to="/about"
              className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="relative hidden lg:block max-w-xs w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search teas, origins, aromas..."
                className="w-full bg-stone-100/90 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-full pl-9 pr-4 py-1.5 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 transition-all"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Right Action Icons: Wishlist, Cart, User */}
          <div className="flex items-center gap-2.5">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-stone-700 dark:text-stone-300 hover:text-emerald-800 dark:hover:text-emerald-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors flex items-center justify-center"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-stone-700 dark:text-stone-300 hover:text-emerald-800 dark:hover:text-emerald-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors flex items-center justify-center"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
            </Link>

            {/* User Dropdown Container */}
            {/* User Dropdown Container */}
            <div className="relative">
              {/* Dropdown Trigger Button */}
              <div
                className="flex items-center gap-1.5 p-1.5 pl-2 pr-2.5 rounded-full border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-900 text-xs font-medium cursor-pointer"
                onClick={() => setUserDropdown((prev) => !prev)}
              >
                <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 flex items-center justify-center">
                  <User className="w-3 h-3" />
                </div>
                <span className="hidden sm:inline font-medium max-w-[90px] truncate">
                  Account
                </span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </div>

              {/* Dropdown Menu List (Only shows when userDropdownOpen is true) */}
              {userDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xl py-2 z-50">
                  <Link
                    to="/register"
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs text-emerald-800 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 font-semibold"
                  >
                    <User className="w-4 h-4" />
                    Register
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs text-emerald-800 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 font-semibold"
                  >
                    <User className="w-4 h-4" />
                    Login
                  </Link>
                  <Link
                    to="/"
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs text-emerald-800 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 font-semibold"
                  >
                    <User className="w-4 h-4" />
                    Logout
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
