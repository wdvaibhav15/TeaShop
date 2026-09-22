import React, { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, Plus, Bell, ChevronDown, ShieldCheck, LogOut, User, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AddCoffee from './AddCoffee';

const Navbar = ({ activePage = 'Overview' }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('false');


  // Logout handler function
  const handleLogout = () => {
    setIsProfileOpen(false);
    // Clear user tokens/session data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect user to the login screen
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-[#FBF9F4]/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-[#E8E2D5] dark:border-stone-800 px-6 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left Side: Breadcrumb & Titles */}
        <div className="space-y-1">
          {/* Breadcrumb Pill */}
          <div className="inline-flex items-center gap-2 text-xs text-[#8C8270] dark:text-stone-400 font-medium">
            <span className="hover:text-[#1B3B2B] dark:hover:text-stone-200 cursor-pointer transition-colors">
              Camellia Leaf Roastery
            </span>
            <span className="text-stone-300 dark:text-stone-600">/</span>
            <span className="text-[#1B3B2B] dark:text-emerald-400 font-semibold bg-[#EFE9DD]/60 dark:bg-stone-800 px-2 py-0.5 rounded-md text-[11px] tracking-wide uppercase">
              {activePage}
            </span>
          </div>

          {/* Main Title & Live Badge */}
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

        {/* Right Side: Search, Controls, Notifications & Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap md:flex-nowrap">
          
          {/* Enhanced Search Bar */}
          <div className="relative flex-1 sm:w-64 lg:w-72">
            <input
              type="text"
              placeholder="Search coffee, SKU, order..."
              className="w-full bg-white dark:bg-stone-950 border border-[#E0D8C8] dark:border-stone-800 rounded-xl pl-9 pr-8 py-2 text-xs text-[#2C2416] dark:text-stone-200 placeholder-[#A09582] dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#1B3B2B] dark:focus:ring-emerald-600 shadow-xs transition-all"
            />
            <Search className="w-4 h-4 text-[#A09582] dark:text-stone-500 absolute left-3 top-2.5" />
            <kbd className="hidden lg:inline-flex absolute right-2.5 top-2.5 text-[9px] font-mono text-[#A09582] bg-[#F5F0E6] dark:bg-stone-800 px-1.5 py-0.5 rounded border border-[#E0D8C8] dark:border-stone-700">
              ⌘K
            </kbd>
          </div>

          {/* Secondary Action: + Test Order */}
          <button
            type="button"
            className="px-3 py-2 rounded-xl bg-[#EFE9DD] hover:bg-[#E5DDD0] text-[#4A3E2C] dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-all border border-[#E0D8C8] dark:border-stone-700 shadow-xs active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B8860B] dark:text-amber-400" />
            <span className="hidden sm:inline">+ Test Order</span>
          </button>


          {/* Notification Bell */}
          <button
            type="button"
            className="relative p-2 rounded-xl bg-white dark:bg-stone-950 border border-[#E0D8C8] dark:border-stone-800 text-[#4A3E2C] dark:text-stone-300 hover:bg-[#F5F0E6] dark:hover:bg-stone-900 transition-all shadow-xs active:scale-95 cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C47D3B] text-white text-[9px] font-bold flex items-center justify-center border-2 border-[#FBF9F4] dark:border-stone-900">
              2
            </span>
          </button>

          <div className="h-6 w-[1px] bg-[#E0D8C8] dark:bg-stone-800 mx-0.5 hidden sm:block" />

          {/* Profile Dropdown Container */}
          <div className="relative" ref={dropdownRef}>
            <button 
              type="button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-xl bg-white dark:bg-stone-950 border border-[#E0D8C8] dark:border-stone-800 hover:border-[#1B3B2B]/40 dark:hover:border-stone-700 transition-all shadow-xs cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-[#1B3B2B] text-[#F3EFE6] font-serif font-bold text-xs flex items-center justify-center shadow-xs">
                
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-semibold text-[#1C160C] dark:text-stone-200 leading-none flex items-center gap-1">
                  adminUser.name
                  <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                </span>
                <span className="text-[10px] text-[#8C8270] dark:text-stone-400 leading-tight mt-0.5">
                  adminUser.role
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-[#8C8270] dark:text-stone-500 hidden lg:block transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-stone-900 border border-[#E0D8C8] dark:border-stone-800 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                {/* Header User Info */}
                <div className="p-3 bg-[#FBF9F4] dark:bg-stone-950/50 border-b border-[#E8E2D5] dark:border-stone-800">
                  <p className="text-xs font-semibold text-[#1C160C] dark:text-stone-200 truncate">
                    adminUser.name
                  </p>
                  <p className="text-[11px] text-[#8C8270] dark:text-stone-400 truncate mt-0.5">
                    adminUser.email
                  </p>
                </div>

                {/* Additional Menu Items */}
                <div className="p-1 space-y-0.5">
                  <button
                    type="button"
                    onClick={() => { setIsProfileOpen(false); navigate('/admin/profile'); }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#2C2416] dark:text-stone-200 hover:bg-[#F5F0E6] dark:hover:bg-stone-800 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-[#8C8270] dark:text-stone-400" />
                    <span>Profile Settings</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setIsProfileOpen(false); navigate('/admin/settings'); }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#2C2416] dark:text-stone-200 hover:bg-[#F5F0E6] dark:hover:bg-stone-800 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5 text-[#8C8270] dark:text-stone-400" />
                    <span>Store Configuration</span>
                  </button>
                </div>

                {/* Red Logout Action */}
                <div className="p-1 border-t border-[#E8E2D5] dark:border-stone-800">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
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