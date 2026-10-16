
import React, { useState, useRef, useEffect } from "react";
import {
  Bell,
  ChevronDown,
  ShieldCheck,
  LogOut,
  User,
  Coffee,
  Menu,
  X,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = ({ activePage = "Overview", mobileOpen, setMobileOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user?.currentUser);

  const filterRecentNotifications = (notifications) => {
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    return notifications.filter((item) => {
      const createdAt = new Date(item.createdAt).getTime();

      return (
        Number.isFinite(createdAt) &&
        now - createdAt < twentyFourHours &&
        now >= createdAt
      );
    });
  };

  const savedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  const activeUser = currentUser || savedUser;

  const isLoggedIn = Boolean(
    localStorage.getItem("token") && localStorage.getItem("user")
  );

  const pageName =
    location.pathname === "/admin-dashboard"
      ? "Overview"
      : location.pathname === "/cafe-settings"
        ? "Cafe Settings"
        : activePage;

  useEffect(() => {
    let isMounted = true;

    const fetchNotifications = async () => {
      try {
        if (isMounted) setLoadingNotifications(true);

        const response = await axios.get(
          `${import.meta.env.VITE_CLIENT_API_URL}/api/notifications`
        );

        if (isMounted && response.data.success) {
          setNotifications(
            filterRecentNotifications(response.data.notifications || [])
          );
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        if (isMounted) setLoadingNotifications(false);
      }
    };

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsProfileOpen(false);
    setIsNotificationOpen(false);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch(logoutUser());
    toast.success("Logged out successfully! 👋");
    navigate("/", { replace: true });
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      navigate("/admin-dashboard", { replace: true });
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="sticky top-0  z-50 bg-[#FBF9F4]/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand and page information */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {/* DESKTOP: Teacup icon */}
            <div className="hidden md:flex w-11 h-11 rounded-xl bg-emerald-700 items-center justify-center shadow-md">
              <span className="text-xl text-white">🍵</span>
            </div>

            {/* MOBILE: Toggle button linked to parent mobileOpen state */}
            <button
              type="button"
              onClick={() => setMobileOpen && setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={Boolean(mobileOpen)}
              className="flex md:hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 shadow-md transition-all duration-200 active:scale-95 cursor-pointer"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <div>
              <h1 className="font-serif text-xl font-bold text-white leading-none">
                Camellia Leaf
              </h1>

              <p className="text-[10px] tracking-[0.2em] uppercase text-emerald-400 font-semibold mt-1">
                Admin Panel
              </p>
            </div>
          </div>

          <div className="hidden lg:block h-10 w-px bg-stone-700" />

          <div className="hidden lg:flex flex-col">
            <span className="text-xs text-stone-500">
              Dashboard / {pageName}
            </span>

            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-emerald-400">
                Live
              </span>
            </div>
          </div>
        </div>

        {/* Right-side actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-xl
              bg-[#EFE9DD] dark:bg-stone-800
              border border-amber-700/20
              hover:bg-amber-100 dark:hover:bg-stone-700
              transition-all duration-300 group"
          >
            <span className="text-sm font-semibold whitespace-nowrap">
              Freshly Brewed
            </span>

            <span className="coffee-track">
              <Coffee className="text-yellow-500 coffee-cup" />
            </span>
          </button>

          {/* Notifications */}
          {isLoggedIn && (
            <div className="relative">
              <button
                type="button"
                aria-label="Toggle notifications"
                aria-expanded={isNotificationOpen}
                onClick={() => setIsNotificationOpen((prev) => !prev)}
                className="relative flex h-11 w-11 shrink-0 items-center justify-center
                  rounded-xl border border-stone-200 bg-white
                  dark:border-stone-800 dark:bg-stone-950"
              >
                <Bell className="h-5 w-5" />

                {notifications.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5
                    items-center justify-center rounded-full bg-amber-500
                    px-1 text-[10px] font-bold text-white">
                    {notifications.length > 99 ? "99+" : notifications.length}
                  </span>
                )}
              </button>

              {isNotificationOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close notifications"
                    onClick={() => setIsNotificationOpen(false)}
                    className="fixed inset-0 z-[90] bg-black/40"
                  />

                  <div
                    className="
                      fixed left-3 right-3 top-[76px] z-[100]
                      mx-auto flex w-auto max-w-[500px]
                      max-h-[calc(100dvh-92px)] flex-col
                      overflow-hidden rounded-2xl
                      border border-stone-200 bg-white shadow-2xl
                      dark:border-stone-800 dark:bg-stone-900
                      sm:left-auto sm:right-5 sm:top-[90px]
                      sm:mx-0 sm:w-[380px]
                      sm:max-w-[calc(100vw-40px)]
                      lg:right-8 lg:w-[420px]
                    "
                  >
                    <div className="flex shrink-0 items-center justify-between gap-3
                      border-b border-stone-200 p-4
                      dark:border-stone-800">
                      <h3 className="text-base font-semibold sm:text-lg">
                        Notifications
                      </h3>

                      <div className="flex shrink-0 items-center gap-2">
                        <span className="whitespace-nowrap rounded-full
                          bg-emerald-100 px-2.5 py-1 text-xs text-emerald-700">
                          {notifications.length} New
                        </span>

                        <button
                          type="button"
                          aria-label="Close notifications"
                          onClick={() => setIsNotificationOpen(false)}
                          className="rounded-lg p-1.5 text-stone-500
                            hover:bg-stone-100 dark:hover:bg-stone-800"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                      {loadingNotifications ? (
                        <div className="p-8 text-center text-sm text-stone-500">
                          Loading notifications...
                        </div>
                      ) : notifications.length === 0 ? (
                        <div className="px-4 py-10 text-center sm:py-12">
                          <div className="mb-3 text-5xl">🔔</div>
                          <h3 className="font-semibold">
                            No Notifications
                          </h3>
                          <p className="mx-auto mt-2 max-w-xs text-xs leading-5
                            text-stone-500">
                            Orders, subscribers and feedback will appear here.
                          </p>
                        </div>
                      ) : (
                        notifications.map((item) => (
                          <div
                            key={item._id}
                            className="border-b border-stone-100 p-3
                              transition-colors hover:bg-stone-50
                              dark:border-stone-800 dark:hover:bg-stone-800
                              sm:p-4"
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`flex h-10 w-10 shrink-0 items-center
                                  justify-center rounded-xl text-lg text-white ${
                                    item.type === "order"
                                      ? "bg-emerald-600"
                                      : item.type === "subscriber"
                                      ? "bg-blue-600"
                                      : "bg-amber-600"
                                  }`}
                              >
                                {item.type === "order"
                                  ? "🛒"
                                  : item.type === "subscriber"
                                  ? "📩"
                                  : "💬"}
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-start
                                  justify-between gap-x-2 gap-y-1">
                                  <h4 className="break-words text-sm font-semibold">
                                    {item.title}
                                  </h4>

                                  <span className="shrink-0 text-[10px]
                                    text-stone-500">
                                    {item._createdAt_
                                      ? new Date(item._createdAt_).toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })
                                      : ""}
                                  </span>
                                </div>

                                <p className="mt-1 break-words text-xs leading-5
                                  text-stone-500">
                                  {item.message}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="shrink-0 border-t border-stone-200 p-3
                      text-center dark:border-stone-800">
                      <button
                        type="button"
                        onClick={() => setIsNotificationOpen(false)}
                        className="w-full rounded-lg py-2 text-sm font-medium
                          text-emerald-600 transition hover:bg-emerald-50
                          dark:hover:bg-emerald-950/40"
                      >
                        Close Notifications
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Profile and authentication */}
          <div ref={dropdownRef} className="relative">
            {isLoggedIn && activeUser ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="flex items-center gap-3 px-2 py-1.5 rounded-2xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-900 text-white font-bold flex items-center justify-center">
                    {activeUser.name?.charAt(0)?.toUpperCase() || "A"}
                  </div>

                  <div className="hidden md:flex flex-col text-left">
                    <span className="text-sm font-semibold text-stone-900 dark:text-white flex items-center gap-1">
                      Administrator
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </span>

                    <span className="text-xs text-stone-500 dark:text-stone-400">
                      {activeUser.email}
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden">
                    <div className="p-4 border-b border-stone-200 dark:border-stone-800">
                      <p className="font-semibold text-stone-800 dark:text-white">
                        Administrator
                      </p>

                      <p className="text-xs text-stone-500 mt-1 truncate">
                        {activeUser.email}
                      </p>
                    </div>

                    <div className="p-2">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <button
                type="button"
                onClick={handleLoginClick}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold transition-all"
              >
                <User className="w-4 h-4" />
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;