// import React, { useState } from 'react';

// import {
//   LayoutDashboard,
//   Coffee,
//   ShoppingBag,
//   PackageCheck,
//   BarChart3,
//   Settings,
//   Plus
// } from 'lucide-react';
// import MenuCard from './MenuCard';
// import { useNavigate } from 'react-router-dom';

// const Sidebar = ({ activeTab, setActiveTab }) => {

  

//   const navigate = useNavigate();
//   return (
//     <aside className="fixed left-0 top-[88px] h-screen w-64 bg-[#172D23] text-[#F3EFE6] flex flex-col justify-between shrink-0 border-r border-[#264436] shadow-xl z-50 select-none overflow-hidden">
//       <div className="flex-1 flex flex-col overflow-y-auto">
//         {/* Brand Header */}
//         <div className="p-5 border-b border-[#264436]/80 flex items-center justify-between shrink-0">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-[#234938] border border-[#3A6B53] flex items-center justify-center text-[#E5D7B7] shadow-inner shrink-0">
//               <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
//                 <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
//               </svg>
//             </div>
//             <div>
//               <h1 className="font-serif font-semibold text-lg tracking-wide text-[#FDFBF7] flex items-center gap-1.5 leading-tight">
//                 Camellia Leaf
//               </h1>
//               <p className="text-[10px] text-[#A1B8AD] font-mono tracking-wider uppercase">
//                 Artisanal Cafe Admin
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Quick Add Action Button */}
//         <div className="p-4 shrink-0">
//           <button
//             type="button"
//             onClick={() => setActiveTab('add-coffee')}
//             className={`w-full py-2.5 px-4 text-[#14261E] font-semibold text-sm rounded-lg flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] ${
//               activeTab === 'add-coffee'
//                 ? 'bg-[#E59E5B]'
//                 : 'bg-[#C88A4B] hover:bg-[#B77B3F]'
//             }`}
//           >
//             <Plus className="w-4 h-4 min-w-[16px] min-h-[16px] stroke-[2.5]" />
//             <span>Add New Coffee</span>
//           </button>
//         </div>

//         {/* Navigation Menu */}
//         <nav className="px-3 pb-3 space-y-1">
//           {/* // overview */}
//           <button
//             type="button"
//             onClick={() => setActiveTab('overview')}
//             className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
//               activeTab === 'overview' ? 'bg-[#234938] text-white' : 'hover:bg-[#1C382C]'
//             }`}
//           >
//             <div className="flex items-center gap-3">
//               <LayoutDashboard className="w-4 h-4" />
//               <span>Overview</span>
//             </div>
//           </button>

//           {/* //order station */}
//           <button
//             type="button"
//             onClick={() => setActiveTab('orders')}
//             className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
//               activeTab === 'orders' ? 'bg-[#234938] text-white' : 'hover:bg-[#1C382C]'
//             }`}
//           >
//             <div className="flex items-center gap-3">
//               <ShoppingBag className="w-4 h-4" />
//               <span>Order Station</span>
//             </div>
//           </button>

//           {/* //coffees & menu */}
//           <button
//             type="button"
//             onClick={() => setActiveTab('coffees')}
//             className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
//               activeTab === 'coffees' ? 'bg-[#234938] text-white' : 'hover:bg-[#1C382C]'
//             }`}
//           >
//             <div className="flex items-center gap-3">
//               <Coffee className="w-4 h-4" />
//               <span>Coffee & Menu</span>
              
//             </div>
//           </button>

//           {/* // sales & trends */}
//           <button
//             type="button"
//             onClick={() => setActiveTab('analytics')}
//             className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
//               activeTab === 'analytics' ? 'bg-[#234938] text-white' : 'hover:bg-[#1C382C]'
//             }`}
//           >
//             <div className="flex items-center gap-3">
//               <BarChart3 className="w-4 h-4" />
//               <span>Customers / Subscribers</span>
//             </div>
//           </button>

//           {/* //inventory & beans */}
//           <button
//             type="button"
//             onClick={() => setActiveTab('UserFeedback')}
//             className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
//               activeTab === 'UserFeedback' ? 'bg-[#234938] text-white' : 'hover:bg-[#1C382C]'
//             }`}
//           >
//             <div className="flex items-center gap-3">
//               <PackageCheck className="w-4 h-4" />
//               <span>UserFeedBack</span>
//             </div>
//           </button>

//             {/* // cafe setting */}
//           <button
//             type="button"
//             onClick={() => setActiveTab('settings')}
//             className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
//               activeTab === 'settings' ? 'bg-[#234938] text-white' : 'hover:bg-[#1C382C]'
//             }`}
//           >
//             <div 
//             onClick={() => navigate('/cafe-settings')}
//             className="flex items-center gap-3">
//               <Settings className="w-4 h-4" />
//               <span>Cafe Settings</span>
//             </div>
//           </button>
//         </nav>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

import React from "react";
import {
  LayoutDashboard,
  Coffee,
  ShoppingBag,
  PackageCheck,
  BarChart3,
  Settings,
  Plus,
  X,
  Leaf,
} from "lucide-react";

const Sidebar = ({
  activeTab,
  setActiveTab,
  mobileOpen,
  setMobileOpen,
}) => {
  const navItems = [
    { id: "overview", label: "Overview", Icon: LayoutDashboard },
    { id: "orders", label: "Order Station", Icon: ShoppingBag },
    { id: "coffees", label: "Coffee & Menu", Icon: Coffee },
    { id: "analytics", label: "Customers / Subscribers", Icon: BarChart3 },
    { id: "UserFeedback", label: "UserFeedBack", Icon: PackageCheck },
    { id: "settings", label: "Cafe Settings", Icon: Settings },
  ];

  const selectTab = (tab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          
          fixed left-0 z-[60]
          flex h-dvh w-[min(280px,85vw)] flex-col
          border-r border-[#264436] bg-[#172D23]
          text-[#F3EFE6] shadow-xl
          transition-transform duration-300 ease-in-out
          md:w-64 md:translate-x-0
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Brand */}
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-[#264436] p-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#3A6B53] bg-[#234938] text-[#E5D7B7]">
              <Leaf size={23} />
            </div>

            <div className="min-w-0">
              <h1 className="truncate font-serif text-lg font-semibold">
                Camellia Leaf
              </h1>
              <p className="text-[9px] uppercase tracking-wider text-[#A1B8AD]">
                Artisanal Cafe Admin
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 hover:bg-[#234938] md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="p-3 sm:p-4">
            <button
              type="button"
              onClick={() => selectTab("add-coffee")}
              className={`
                flex w-full items-center justify-center gap-2
                rounded-lg px-3 py-3 text-sm font-semibold
                text-[#14261E] transition active:scale-[0.98]
                ${
                  activeTab === "add-coffee"
                    ? "bg-[#E59E5B]"
                    : "bg-[#C88A4B] hover:bg-[#B77B3F]"
                }
              `}
            >
              <Plus size={17} />
              <span>Add New Coffee</span>
            </button>
          </div>

          <nav aria-label="Admin navigation" className="space-y-1 px-3 pb-4">
            {navItems.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => selectTab(id)}
                aria-current={activeTab === id ? "page" : undefined}
                className={`
                  flex w-full items-center gap-3 rounded-lg
                  px-3 py-3 text-left text-sm font-medium
                  transition-colors
                  ${
                    activeTab === id
                      ? "bg-[#234938] text-white"
                      : "text-[#F3EFE6] hover:bg-[#1C382C]"
                  }
                `}
              >
                <Icon size={17} className="shrink-0" />
                <span className="min-w-0 break-words">{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-[#264436] px-3 py-3">
          <p className="text-center text-[10px] text-[#A1B8AD]">
            CAMELLIA LEAF · ADMIN PANEL
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
