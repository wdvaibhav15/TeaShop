

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
