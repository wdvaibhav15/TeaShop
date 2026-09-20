import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Moon,
  Menu,
  ChevronDown,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
// Import your user action below if needed (e.g., import { setUser } from "../redux/userSlice")

const Navbar = () => {
  const dispatch = useDispatch();
  const [userDropdown, setUserDropdown] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isAdmin, setIsAdmin] = useState(false); // Set default mode
  const user = useSelector((state) => state.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="sticky top-0 z-40 w-full">
      {/* Top Announcement & Switcher Bar */}
      <div className="bg-emerald-900 text-stone-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span>🌿 Free shipping on orders over $50</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-medium ml-auto">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1 px-2 rounded-full hover:bg-emerald-800 text-emerald-200 transition-colors flex items-center gap-1"
              aria-label="Toggle dark mode"
              type="button"
            >
              <Moon className="w-3.5 h-3.5" />
              <span>{theme === "light" ? "Dark" : "Light"}</span>
            </button>

            {/* Administrator / User Toggle Button */}
            <button
              type="button"
              onClick={() => setIsAdmin((prev) => !prev)}
              className="p-1 px-2 rounded-full hover:bg-emerald-800 text-emerald-200 transition-colors flex items-center gap-1"
            >
              <User className="w-4 h-4" />
              {isAdmin ? (
                <span onClick = {()=>navigate("/")} >User</span>
                ) : (
                <span onClick = {()=>navigate("/admin")} >"Administrator"</span>
                )}
              
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar: HIDE when in Administrator Mode (!isAdmin) */}
      {!isAdmin && (
        <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-stone-50/90 dark:bg-stone-950/90 border-b border-stone-200/80 dark:border-stone-800 transition-colors">
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
                <Link
                  to="/wishlist"
                  className="relative p-2 text-stone-700 dark:text-stone-300 hover:text-emerald-800 dark:hover:text-emerald-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors flex items-center justify-center"
                  aria-label="Wishlist"
                >
                  <Heart className="w-5 h-5" />
                </Link>

                <Link
                  to="/cart"
                  className="relative p-2 text-stone-700 dark:text-stone-300 hover:text-emerald-800 dark:hover:text-emerald-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors flex items-center justify-center"
                  aria-label="Cart"
                >
                  <ShoppingBag className="w-5 h-5" />
                </Link>

                {/* User Dropdown */}
                <div className="relative">
                  <div
                    className="flex items-center gap-1.5 p-1.5 pl-2 pr-2.5 rounded-full border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-900 text-xs font-medium cursor-pointer"
                    onClick={() => setUserDropdown((prev) => !prev)}
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 flex items-center justify-center">
                      <User className="w-3 h-3" />
                    </div>
                    <span className="hidden sm:inline font-medium max-w-[90px] truncate">
                      {user ? user.name : "Account"}
                    </span>
                    <ChevronDown className="w-3 h-3 text-stone-400" />
                  </div>

                  {userDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xl py-2 z-50">
                      {!user ? (
                        <>
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
                        </>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <p className="flex items-center gap-2 px-4 py-2.5 text-xs text-emerald-800 dark:text-emerald-400 font-semibold">
                            <User className="w-4 h-4" />
                            {user.email}
                          </p>

                          <button
                            type="button"
                            onClick={() => {
                              // dispatch(setUser(null));
                              setUserDropdown(false);
                            }}
                            className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 font-semibold"
                          >
                            <User className="w-4 h-4" />
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <button
                  className="md:hidden p-2 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl"
                  aria-label="Toggle menu"
                  type="button"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </header>
      )}
    </div>
  );
};

export default Navbar;