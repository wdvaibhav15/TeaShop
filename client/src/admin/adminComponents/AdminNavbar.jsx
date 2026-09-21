import React from 'react';
import { Search, Sparkles, Plus, Bell } from 'lucide-react';

const AdminNavbar = ({ 
  activePage = 'Overview', 
  notificationsCount = 2, 
  onTestOrder, 
  onAddCoffee 
}) => {
  return (
    <header className="w-full bg-[#FBF9F4] dark:bg-stone-900 border-b border-[#E8E2D5] dark:border-stone-800 px-6 py-4 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left Side: Breadcrumb & Titles */}
        <div className="space-y-0.5">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-[#8C8270] dark:text-stone-400 font-medium">
            <span>Camellia Leaf Roastery</span>
            <span>/</span>
            <span className="text-[#2C2416] dark:text-stone-200 font-semibold">{activePage}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl font-serif font-bold tracking-tight text-[#1C160C] dark:text-stone-100">
            Cafe Operations Dashboard
          </h1>

          {/* Subtitle */}
          <p className="text-xs text-[#7A7060] dark:text-stone-400">
            Live status, queue throughput, and sales telemetry
          </p>
        </div>

        {/* Right Side: Search, Controls & Notifications */}
        <div className="flex items-center gap-3">
          
          {/* Search Bar */}
          <div className="relative w-64 lg:w-72">
            <input
              type="text"
              placeholder="Search coffees, orders, SKU, origin..."
              className="w-full bg-white dark:bg-stone-950 border border-[#E0D8C8] dark:border-stone-800 rounded-xl pl-9 pr-3 py-2 text-xs text-[#2C2416] dark:text-stone-200 placeholder-[#A09582] dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#1B3B2B] shadow-sm transition-all"
            />
            <Search className="w-4 h-4 text-[#A09582] dark:text-stone-500 absolute left-3 top-2.5" />
          </div>

          {/* + Test Order Button */}
          <button
            type="button"
            onClick={onTestOrder}
            className="px-3.5 py-2 rounded-xl bg-[#EFE9DD] hover:bg-[#E5DDD0] text-[#4A3E2C] dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-[#E0D8C8] dark:border-stone-700 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>+ Test Order</span>
          </button>

          {/* + Add Coffee Primary Button */}
          <button
            type="button"
            onClick={onAddCoffee}
            className="px-4 py-2 rounded-xl bg-[#1B3B2B] hover:bg-[#142D21] text-[#F3EFE6] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add Coffee</span>
          </button>

          {/* Notification Bell Button */}
          <button
            type="button"
            className="relative p-2 rounded-xl bg-white dark:bg-stone-950 border border-[#E0D8C8] dark:border-stone-800 text-[#4A3E2C] dark:text-stone-300 hover:bg-[#F5F0E6] dark:hover:bg-stone-900 transition-colors shadow-sm"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {notificationsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#C47D3B] text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#FBF9F4] dark:border-stone-900 shadow-xs">
                {notificationsCount}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  );
};

export default AdminNavbar;