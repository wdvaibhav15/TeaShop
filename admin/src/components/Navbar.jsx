
import React, { useState, useRef } from "react";
import {
  Sparkles,
  Bell,
  ChevronDown,
  ShieldCheck,
  LogOut,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice";

const Navbar = ({ activePage = "Overview" }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state) => state.user?.currentUser
  );

  

  const handleLogout = () => {
    setIsProfileOpen(false);

    dispatch(logoutUser());

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-[#FBF9F4]/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-[#E8E2D5] dark:border-stone-800 px-6 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs text-[#8C8270] dark:text-stone-400 font-medium">
            <span>Camellia Leaf Roastery</span>
            <span>/</span>
            <span className="text-[#1B3B2B] dark:text-emerald-400 font-semibold bg-[#EFE9DD]/60 dark:bg-stone-800 px-2 py-0.5 rounded-md text-[11px] tracking-wide uppercase">
              {activePage}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#1C160C] dark:text-stone-100">
              Cafe Operations
            </h1>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Telemetry
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">

          <button
            type="button"
            className="px-3 py-2 rounded-xl bg-[#EFE9DD] hover:bg-[#E5DDD0] text-[#4A3E2C] dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-200 text-xs font-semibold flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>+ Test Order</span>
          </button>

          <button
            type="button"
            className="relative p-2 rounded-xl bg-white dark:bg-stone-950 border border-[#E0D8C8] dark:border-stone-800"
          >
            <Bell className="w-4 h-4" />

            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C47D3B] text-white text-[9px] font-bold flex items-center justify-center">
              2
            </span>
          </button>

          <div
            className="relative"
            ref={dropdownRef}
          >
            <button
              type="button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-xl bg-white dark:bg-stone-950 border border-[#E0D8C8] dark:border-stone-800"
            >
              <div className="w-8 h-8 rounded-lg bg-[#1B3B2B] text-white font-bold flex items-center justify-center">
                {currentUser?.name?.charAt(0)?.toUpperCase() || "A"}
              </div>

              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-semibold text-[#1C160C] dark:text-stone-200 flex items-center gap-1">
                  Administrator

                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                </span>

                <span className="text-[10px] text-[#8C8270] dark:text-stone-400">
                  {currentUser?.email || "No Email"}
                </span>
              </div>

              <ChevronDown
                className={`w-3.5 h-3.5 hidden lg:block transition-transform ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-stone-900 border border-[#E0D8C8] dark:border-stone-800 rounded-2xl shadow-xl z-50 overflow-hidden">

                <div className="p-3 bg-[#FBF9F4] dark:bg-stone-950/50 border-b border-[#E8E2D5] dark:border-stone-800">
                  <p className="text-xs font-semibold text-[#1C160C] dark:text-stone-200 truncate">
                    Administrator
                  </p>

                  <p className="text-[11px] text-[#8C8270] dark:text-stone-400 truncate mt-0.5">
                    {currentUser?.email || "No Email"}
                  </p>
                </div>

                <div className="p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate("/admin/profile");
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2 hover:bg-[#F5F0E6] hover:text-gray-800"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span >Profile Settings</span>
                  </button>
                </div>

                <div className="p-1 border-t border-[#E8E2D5] dark:border-stone-800">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
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