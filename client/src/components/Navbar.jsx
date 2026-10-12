
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Heart,
  LogOut,
  ClipboardList,
  Home,
  Leaf,
  Info,
  Phone,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { logoutUser } from "../redux/userSlice";
import toast from "react-hot-toast";
import { setSearchTerm } from "../redux/searchSlice";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuPage = location.pathname === "/menu";

  const [searchInput, setSearchInput] = useState("");
  const [userDropdown, setUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const user = useSelector((state) => state.user?.user);
  const wishlistItems = useSelector(
    (state) => state.wishlist?.wishlistItems || []
  );

  const userDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setUserDropdown(false);
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  // Close menus when the route changes
  useEffect(() => {
    setUserDropdown(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Apply and save theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    dispatch(setSearchTerm(value));
  };

  const handleOrders = () => {
    setUserDropdown(false);
    setMobileMenuOpen(false);
    navigate("/my-orders");
  };

  const handleLogout = () => {
    setUserDropdown(false);
    setMobileMenuOpen(false);

    dispatch(logoutUser());

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");
    navigate("/");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const mobileLinkClass =
    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium " +
    "text-stone-700 transition-colors hover:bg-emerald-50 hover:text-emerald-800 " +
    "dark:text-stone-200 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-400";

  return (
    <header className="sticky top-8 z-40 w-full border-b border-stone-200/80 bg-stone-50/95 backdrop-blur-md transition-colors dark:border-stone-800 dark:bg-stone-950/95">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Navbar */}
        <div className="flex h-16 items-center justify-between gap-3">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="group flex shrink-0 items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-800 text-lg font-bold text-amber-100 shadow-sm transition-colors group-hover:bg-emerald-700">
              🍵
            </div>

            <div>
              <span className="block font-serif text-lg font-bold leading-none tracking-tight text-stone-900 dark:text-stone-100 sm:text-xl">
                Camellia Leaf
              </span>

              <span className="text-[9px] font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 sm:text-[10px]">
                Artisanal Tea Co.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-5 text-sm font-medium text-stone-700 dark:text-stone-300 lg:flex xl:gap-7">
            <Link
              to="/"
              className="transition-colors hover:text-emerald-800 dark:hover:text-emerald-400"
            >
              Home
            </Link>

            <Link
              to="/menu"
              className="transition-colors hover:text-emerald-800 dark:hover:text-emerald-400"
            >
              Menu Card
            </Link>

            <Link
              to="/about"
              className="transition-colors hover:text-emerald-800 dark:hover:text-emerald-400"
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className="transition-colors hover:text-emerald-800 dark:hover:text-emerald-400"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Search */}
          {menuPage && (
            <div className="relative hidden w-full max-w-xs lg:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />

              <input
                type="text"
                placeholder="Search teas, origins, aromas..."
                value={searchInput}
                onChange={handleSearch}
                className="w-full rounded-full border border-stone-200 bg-stone-100/90 py-2 pl-9 pr-4 text-xs text-stone-900 placeholder-stone-400 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-700 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100"
              />
            </div>
          )}

          {/* Right Action Icons */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">

            {/* Wishlist */}
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative flex items-center justify-center rounded-full p-2 text-stone-700 transition-colors hover:bg-stone-100 hover:text-emerald-800 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-emerald-400"
            >
              <FaHeart size={21} />

              {wishlistItems.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              aria-label="Cart"
              className="flex items-center justify-center rounded-full p-2 text-stone-700 transition-colors hover:bg-stone-100 hover:text-emerald-800 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-emerald-400"
            >
              <ShoppingBag className="h-5 w-5" />
            </Link>

            {/* User Dropdown */}
            {/* User Dropdown - Desktop Only */}
            <div className="relative hidden lg:block" ref={userDropdownRef}>
              <button
                type="button"
                aria-expanded={userDropdown}
                aria-haspopup="true"
                onClick={() => setUserDropdown((prev) => !prev)}
                className="flex cursor-pointer items-center gap-1.5 rounded-full border border-stone-200 bg-white px-2 py-1.5 text-xs font-medium text-stone-700 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 sm:pr-2.5"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                  <User className="h-3 w-3" />
                </span>

                <span className="hidden max-w-[90px] truncate sm:inline">
                  {user ? user.name || user.email : "Account"}
                </span>

                <ChevronDown
                  className={`h-3 w-3 text-stone-400 transition-transform ${
                    userDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {userDropdown && (
                <div className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-stone-200 bg-white py-2 shadow-xl dark:border-stone-800 dark:bg-stone-900">

                  {!user ? (
                    <>
                      <Link
                        to="/register"
                        onClick={() => setUserDropdown(false)}
                        className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
                      >
                        <User className="h-4 w-4" />
                        Register
                      </Link>

                      <Link
                        to="/login"
                        onClick={() => setUserDropdown(false)}
                        className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
                      >
                        <User className="h-4 w-4" />
                        Login
                      </Link>
                    </>
                  ) : (
                    <>
                      <p className="break-all px-4 py-3 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                        {user.email}
                      </p>

                      <button
                        type="button"
                        onClick={handleOrders}
                        className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium text-stone-700 hover:bg-emerald-50 dark:text-stone-200 dark:hover:bg-emerald-950/30"
                      >
                        <ClipboardList className="h-4 w-4" />
                        My Orders
                      </button>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Working Mobile Menu Toggle */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => {
                setMobileMenuOpen((prev) => !prev);
                setUserDropdown(false);
              }}
              className="flex items-center justify-center rounded-xl p-2 text-stone-700 transition-colors hover:bg-stone-100 hover:text-emerald-800 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-emerald-400 lg:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            ref={mobileMenuRef}
            className="border-t border-stone-200 py-4 dark:border-stone-800 lg:hidden"
          >
            <nav className="flex flex-col gap-1">

              <Link
                to="/"
                onClick={closeMobileMenu}
                className={mobileLinkClass}
              >
                <Home className="h-5 w-5" />
                Home
              </Link>

              <Link
                to="/menu"
                onClick={closeMobileMenu}
                className={mobileLinkClass}
              >
                <Leaf className="h-5 w-5" />
                Menu Card
              </Link>

              <Link
                to="/about"
                onClick={closeMobileMenu}
                className={mobileLinkClass}
              >
                <Info className="h-5 w-5" />
                About Us
              </Link>

              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className={mobileLinkClass}
              >
                <Phone className="h-5 w-5" />
                Contact
              </Link>

              <Link
                to="/wishlist"
                onClick={closeMobileMenu}
                className={mobileLinkClass}
              >
                <Heart className="h-5 w-5" />
                Wishlist
                {wishlistItems.length > 0 && (
                  <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                onClick={closeMobileMenu}
                className={mobileLinkClass}
              >
                <ShoppingBag className="h-5 w-5" />
                Cart
              </Link>

              {/* Search on Mobile */}
              {menuPage && (
                <div className="relative px-4 py-2">
                  <Search className="absolute left-7 top-5 h-4 w-4 text-stone-400" />

                  <input
                    type="text"
                    placeholder="Search teas, origins, aromas..."
                    value={searchInput}
                    onChange={handleSearch}
                    className="w-full rounded-xl border border-stone-200 bg-stone-100 py-3 pl-9 pr-3 text-sm text-stone-900 outline-none focus:ring-2 focus:ring-emerald-700 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100"
                  />
                </div>
              )}

              <div className="my-2 border-t border-stone-200 dark:border-stone-800" />

              {!user ? (
                <>
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className={mobileLinkClass}
                  >
                    <User className="h-5 w-5" />
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className={mobileLinkClass}
                  >
                    <User className="h-5 w-5" />
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <div className="mx-4 mb-1 flex items-center gap-3 rounded-xl bg-emerald-50 p-3 dark:bg-emerald-950/30">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                      <User className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-300">
                        Signed in
                      </p>
                      <p className="truncate text-sm text-stone-600 dark:text-stone-300">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleOrders}
                    className={`${mobileLinkClass} w-full text-left`}
                  >
                    <ClipboardList className="h-5 w-5" />
                    My Orders
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`${mobileLinkClass} w-full text-left !text-red-600 dark:!text-red-400`}
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </>
              )}

            </nav>
          </div>
        )}

      </div>
    </header>
  );
};

export default Navbar;
