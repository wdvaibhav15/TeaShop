import React, { useState } from 'react';
import {
  LayoutDashboard,
  Coffee,
  ShoppingBag,
  PackageCheck,
  BarChart3,
  Settings,
  Plus
} from 'lucide-react';
import MenuCard from './MenuCard';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="fixed left-0 top-[88px] h-screen w-64 bg-[#172D23] text-[#F3EFE6] flex flex-col justify-between shrink-0 border-r border-[#264436] shadow-xl z-50 select-none overflow-hidden">
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Brand Header */}
        <div className="p-5 border-b border-[#264436]/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#234938] border border-[#3A6B53] flex items-center justify-center text-[#E5D7B7] shadow-inner shrink-0">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
              </svg>
            </div>
            <div>
              <h1 className="font-serif font-semibold text-lg tracking-wide text-[#FDFBF7] flex items-center gap-1.5 leading-tight">
                Camellia Leaf
              </h1>
              <p className="text-[10px] text-[#A1B8AD] font-mono tracking-wider uppercase">
                Artisanal Cafe Admin
              </p>
            </div>
          </div>
        </div>

        {/* Quick Add Action Button */}
        <div className="p-4 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('add-coffee')}
            className={`w-full py-2.5 px-4 text-[#14261E] font-semibold text-sm rounded-lg flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] ${
              activeTab === 'add-coffee'
                ? 'bg-[#E59E5B]'
                : 'bg-[#C88A4B] hover:bg-[#B77B3F]'
            }`}
          >
            <Plus className="w-4 h-4 min-w-[16px] min-h-[16px] stroke-[2.5]" />
            <span>Add New Coffee</span>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="px-3 pb-3 space-y-1">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'overview' ? 'bg-[#234938] text-white' : 'hover:bg-[#1C382C]'
            }`}
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'orders' ? 'bg-[#234938] text-white' : 'hover:bg-[#1C382C]'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-4 h-4" />
              <span>Order Station</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('coffees')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'coffees' ? 'bg-[#234938] text-white' : 'hover:bg-[#1C382C]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Coffee className="w-4 h-4" />
              <span>Coffee & Menu</span>
              
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'inventory' ? 'bg-[#234938] text-white' : 'hover:bg-[#1C382C]'
            }`}
          >
            <div className="flex items-center gap-3">
              <PackageCheck className="w-4 h-4" />
              <span>Inventory & Beans</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'analytics' ? 'bg-[#234938] text-white' : 'hover:bg-[#1C382C]'
            }`}
          >
            <div className="flex items-center gap-3">
              <BarChart3 className="w-4 h-4" />
              <span>Sales & Trends</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'settings' ? 'bg-[#234938] text-white' : 'hover:bg-[#1C382C]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Settings className="w-4 h-4" />
              <span>Cafe Settings</span>
            </div>
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;