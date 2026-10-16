
import React, { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AddCoffee from "../components/AddCoffee";
import MenuCard from "../components/MenuCard";
import FeedbackTable from "../components/FeedBackTable";
import AllOrders from "../components/AllOrders";
import Subscribers from "../components/Subscribers";
import Dashboard from "../components/Dashboard";
import CafeSetting from "./CafeSetting";

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col bg-[#0A120E] text-white overflow-x-clip">

      {/* 1. Navbar is now at the very top, spanning full width */}
      <Navbar
        activePage={activeTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* 2. Container holding the Sidebar and Main Content side-by-side underneath */}
      <div className="flex flex-1 min-h-0 relative">

        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* Main Content Area (pushes right on desktop to clear the fixed sidebar) */}
        <div className="flex min-h-0 flex-1 flex-col md:ml-64">
          <main className="w-full min-w-0 flex-1 p-3 sm:p-5 lg:p-8">
            <div className="mx-auto w-full min-w-0 max-w-[1600px]">

              {activeTab === "overview" && <Dashboard />}

              {activeTab === "add-coffee" && (
                <AddCoffee
                  onClose={() => handleTabChange("overview")}
                />
              )}

              {activeTab === "orders" && (
                <AllOrders
                  onClose={() => handleTabChange("overview")}
                />
              )}

              {activeTab === "coffees" && (
                <section className="w-full min-w-0">
                  <div className="mx-auto mb-6 max-w-3xl text-center">
                    <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
                      Coffee & Menu
                    </h2>
                    <p className="text-sm leading-relaxed text-gray-400 sm:text-base">
                      Explore our handcrafted brews, artisanal roasts,
                      and signature blends, prepared with premium beans.
                    </p>
                  </div>
                  <MenuCard />
                </section>
              )}

              {activeTab === "UserFeedback" && (
                <section className="w-full min-w-0 overflow-x-auto">
                  <FeedbackTable />
                </section>
              )}

              {activeTab === "analytics" && (
                <section className="w-full min-w-0">
                  <h2 className="mb-4 text-xl font-bold sm:text-2xl">
                    Customers Analytics
                  </h2>
                  <Subscribers />
                </section>
              )}

              {activeTab === "settings" && (
                <section className="w-full min-w-0">
                  <CafeSetting />
                </section>
              )}

            </div>
          </main>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboardPage;