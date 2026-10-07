import React, { useState, useRef } from "react";
import {
  Bell,
  ChevronDown,
  ShieldCheck,
  LogOut,
  User,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import axios from "axios";
import { useEffect } from "react";

const Navbar = ({ activePage = "Overview" }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const dropdownRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
const [isNotificationOpen, setIsNotificationOpen] = useState(false);
const [loadingNotifications, setLoadingNotifications] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user?.currentUser);

  const fetchNotifications = async () => {
  try {
    setLoadingNotifications(true);

    const response = await axios.get(
      `${import.meta.env.VITE_CLIENT_API_URL}/api/notifications`
    );

    if (response.data.success) {
      setNotifications(response.data.notifications || []);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoadingNotifications(false);
  }
};

useEffect(() => {
  fetchNotifications();

  const interval = setInterval(() => {
    fetchNotifications();
  }, 10000);

  return () => clearInterval(interval);
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
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);

  const handleLogout = () => {
    setIsProfileOpen(false);

    dispatch(logoutUser());

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FBF9F4]/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LEFT SECTION */}
        {/* LEFT */}
        <div className="flex items-center gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-700 flex items-center justify-center shadow-md">
              <span className="text-xl text-white">🍵</span>
            </div>

            <div>
              <h1 className="font-serif text-xl font-bold text-white leading-none">
                Camellia Leaf
              </h1>

              <p className="text-[10px] tracking-[0.2em] uppercase text-emerald-400 font-semibold mt-1">
                Admin Panel
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block h-10 w-px bg-stone-700" />

          {/* Page */}
          <div className="hidden lg:flex flex-col">
            <span className="text-xs text-stone-500">
              Dashboard / {activePage}
            </span>

            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />

              <span className="text-sm font-medium text-emerald-400">Live</span>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3">
          {/* Test Order */}
          <button
            type="button"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#EFE9DD] hover:bg-[#E5DDD0] dark:bg-stone-800 dark:hover:bg-stone-700 text-sm font-semibold transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Test Order
          </button>

          {/* Notification */}
          <div className="relative">
  <button
    type="button"
    onClick={() =>
      setIsNotificationOpen(!isNotificationOpen)
    }
    className="relative p-2.5 rounded-xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800"
  >
    <Bell className="w-5 h-5" />

    {notifications.length > 0 && (
      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
        {notifications.length}
      </span>
    )}
  </button>

  {isNotificationOpen && (
    <div className="absolute right-0 mt-3 w-[380px] rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden z-50">

      <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
        <h3 className="font-semibold text-lg">
          Notifications
        </h3>

        <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
          {notifications.length} New
        </span>
      </div>

      <div className="max-h-[450px] overflow-y-auto">

        {loadingNotifications ? (
          <div className="p-8 text-center">
            Loading...
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-10 text-center">
            <div className="text-5xl mb-2">🔔</div>

            <h3 className="font-semibold">
              No Notifications
            </h3>

            <p className="text-xs text-stone-500 mt-2">
              Orders, Subscribers and Feedback
              will appear here.
            </p>
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              className="p-4 border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3">

                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${
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

                <div className="flex-1">
                  <div className="flex justify-between items-center">

                    <h4 className="font-semibold text-sm">
                      {item.title}
                    </h4>

                    <span className="text-[10px] text-stone-500">
                      {new Date(
                        item.createdAt
                      ).toLocaleTimeString()}
                    </span>
                  </div>

                  <p className="text-xs text-stone-500 mt-1">
                    {item.message}
                  </p>
                </div>

              </div>
            </div>
          ))
        )}

      </div>

      <div className="p-3 border-t border-stone-200 dark:border-stone-800 text-center">
        <button className="text-sm font-medium text-emerald-600 hover:text-emerald-500">
          View All Notifications
        </button>
      </div>

    </div>
  )}
</div>

          {/* Profile */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 px-2 py-1.5 rounded-2xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-900 text-white font-bold flex items-center justify-center">
                {currentUser?.name?.charAt(0)?.toUpperCase() || "A"}
              </div>

              <div className="hidden md:flex flex-col text-left">
                <span className="text-sm font-semibold text-[#1C160C] dark:text-white flex items-center gap-1">
                  Administrator
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                </span>

                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {currentUser?.email || "No Email"}
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
                <div className="p-4 bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800">
                  <p className="font-semibold text-stone-800 dark:text-white">
                    Administrator
                  </p>

                  <p className="text-xs text-stone-500 mt-1 truncate">
                    {currentUser?.email}
                  </p>
                </div>

                <div className="p-2">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate("/admin/profile");
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm hover:bg-stone-100 dark:hover:bg-stone-800 transition-all"
                  >
                    <User className="w-4 h-4" />
                    Profile Settings
                  </button>
                </div>

                <div className="p-2 border-t border-stone-200 dark:border-stone-800">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
