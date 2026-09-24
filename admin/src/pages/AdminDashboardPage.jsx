import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import AddCoffee from "../components/AddCoffee";
import MenuCard from "../components/MenuCard";

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-[#0A120E] text-white pl-64">
      {/* Fixed Left Sidebar (z-50 overlays Navbar) */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Page Content */}
      <main className="p-6">
        {activeTab === "add-coffee" && (
          <AddCoffee onClose={() => setActiveTab("overview")} />
        )}

        {activeTab === "overview" && (
          <div>
            <h2 className="text-xl font-bold">Overview Dashboard</h2>
            {/* Overview content */}
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <h2 className="text-xl font-bold">Order Station</h2>
          </div>
        )}

        {activeTab === "coffees" && (
          <div>
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-white mb-2">
                Coffee & Menu
              </h1>
              <p className="text-gray-400 text-base max-auto leading-relaxed">
                Explore our carefully curated selection of handcrafted brews,
                artisanal roasts, and signature blends. Every cup is freshly
                prepared with premium beans to bring you rich flavors and the
                perfect start to your day.
              </p>
            </div>

            <MenuCard />
          </div>
        )}

        {activeTab === "inventory" && (
          <div>
            <h2 className="text-xl font-bold">Inventory & Beans</h2>
          </div>
        )}

        {activeTab === "analytics" && (
          <div>
            <h2 className="text-xl font-bold">Sales & Trends</h2>
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h2 className="text-xl font-bold">Cafe Settings</h2>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboardPage;
