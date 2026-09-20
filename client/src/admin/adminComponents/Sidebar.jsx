import React from 'react';
import {
  LayoutDashboard,
  Coffee,
  ShoppingBag,
  PackageCheck,
  BarChart3,
  Settings,
  Volume2,
  VolumeX,
  Plus
} from 'lucide-react';

const Sidebar = ({
  activeTab = 'overview',
  setActiveTab = () => {},
  pendingOrdersCount = 0,
  soundEnabled = true,
  setSoundEnabled = () => {},
  storeOpen = true,
  setStoreOpen = () => {},
  onQuickAddCoffee = () => {},
  lowStockCount = 0
}) => {
  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'orders',
      label: 'Order Station',
      icon: ShoppingBag,
      badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} New` : null,
      badgeColor: 'bg-[#C88A4B] text-white animate-pulse'
    },
    {
      id: 'coffees',
      label: 'Coffee & Menu',
      icon: Coffee,
      badge: null
    },
    {
      id: 'inventory',
      label: 'Inventory & Beans',
      icon: PackageCheck,
      badge: lowStockCount > 0 ? `${lowStockCount} Low` : null,
      badgeColor: 'bg-[#9E6230]/20 text-[#e09b53]'
    },
    {
      id: 'analytics',
      label: 'Sales & Trends',
      icon: BarChart3,
      badge: null
    },
    {
      id: 'settings',
      label: 'Cafe Settings',
      icon: Settings,
      badge: null
    }
  ];

  return (
  <aside className="w-full h-screen sticky top-0 bg-[#172D23] text-[#F3EFE6] flex flex-col justify-between shrink-0 border-r border-[#264436] shadow-xl z-50 select-none overflow-hidden">
    {/* Top Group: Brand + Actions + Navigation */}
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

      {/* Store Live Status Pill */}
      <div className="px-5 py-3 bg-[#12241C] border-b border-[#264436] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${storeOpen ? 'bg-emerald-400 ring-4 ring-emerald-950/60' : 'bg-rose-400 ring-4 ring-rose-950/60'}`}></span>
          <div>
            <p className="text-xs font-medium text-[#E0EBE4] leading-tight">
              {storeOpen ? 'Cafe Open • Taking Orders' : 'Store Paused / Offline'}
            </p>
            <p className="text-[10px] text-[#7E968B]">108 Botanical Way • Bar 1</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setStoreOpen(!storeOpen)}
          className="text-[11px] font-medium px-2 py-1 rounded bg-[#213F31] hover:bg-[#2C5241] text-[#DCE7E1] transition-colors"
          title="Toggle store active status"
        >
          {storeOpen ? 'Pause' : 'Open'}
        </button>
      </div>

      {/* Quick Add Action Button */}
      <div className="p-4 shrink-0">
        <button
          type="button"
          onClick={onQuickAddCoffee}
          className="w-full py-2.5 px-4 bg-[#C88A4B] hover:bg-[#B77B3F] text-[#14261E] font-semibold text-sm rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4 min-w-[16px] min-h-[16px] stroke-[2.5]" />
          <span>Add New Coffee</span>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="px-3 pb-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#264A39] text-[#FFF] shadow-sm border border-[#3A6B53]'
                  : 'text-[#B8CBC2] hover:bg-[#1C372B] hover:text-[#E8F0EC]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 min-w-[16px] min-h-[16px] ${isActive ? 'text-[#E5D7B7]' : 'text-[#87A495]'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>

    {/* Footer Controls & User Profile */}
    <div className="p-4 border-t border-[#264436]/80 bg-[#12241C]/60 space-y-3 shrink-0">
      {/* Sound Toggle */}
      <div className="flex items-center justify-between text-xs text-[#9BB1A5] px-1">
        <span className="flex items-center gap-1.5">
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 min-w-[14px] text-emerald-400" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 min-w-[14px] text-amber-400" />
          )}
          Order Audio Bell
        </span>
        <button
          type="button"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
            soundEnabled ? 'bg-[#224636] text-emerald-300' : 'bg-[#2A2A2A] text-stone-400'
          }`}
        >
          {soundEnabled ? 'Active' : 'Muted'}
        </button>
      </div>

      {/* Barista Lead Avatar */}
      <div className="pt-2 border-t border-[#223E31] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#C88A4B]/20 border border-[#C88A4B]/40 flex items-center justify-center text-xs font-serif font-bold text-[#E5D7B7] shrink-0">
            CL
          </div>
          <div>
            <p className="text-xs font-medium text-[#EDE8DD] leading-tight">Head Barista & Admin</p>
            <p className="text-[10px] text-[#7F9A8D]">Camellia Roasters</p>
          </div>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/60 shrink-0">
          Shift Active
        </span>
      </div>
    </div>
  </aside>
);
};

export default Sidebar;