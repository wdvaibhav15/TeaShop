// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import AddCoffee from "../components/AddCoffee";
// import MenuCard from "../components/MenuCard";
// import FeedbackTable from "../components/FeedBackTable";
// import AllOrders from "../components/AllOrders";
// import Subscribers from "../components/Subscribers";
// import Dashboard from "../components/Dashboard";

// const AdminDashboardPage = () => {
//   const [activeTab, setActiveTab] = useState("overview");

//   return (
//     <div className="min-h-screen bg-[#0A120E] text-white pl-64">
//       {/* Fixed Left Sidebar (z-50 overlays Navbar) */}
//       <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

//       {/* Main Page Content */}
//       <main className="p-6">
//         {activeTab === "add-coffee" && (
//           <AddCoffee onClose={() => setActiveTab("overview")} />
//         )}

//         {activeTab === "overview" && (
//           <div>
//             <Dashboard />
//             {/* Overview content */}
//           </div>
//         )}

//         {activeTab === "orders" && (
//           <div>
            
//             <AllOrders onClose={() => setActiveTab("overview")} />
//           </div>
//         )}

//         {activeTab === "coffees" && (
//           <div>
//             <div className="mb-8 text-center">
//               <h1 className="text-3xl font-bold text-white mb-2">
//                 Coffee & Menu
//               </h1>
//               <p className="text-gray-400 text-base max-auto leading-relaxed">
//                 Explore our carefully curated selection of handcrafted brews,
//                 artisanal roasts, and signature blends. Every cup is freshly
//                 prepared with premium beans to bring you rich flavors and the
//                 perfect start to your day.
//               </p>
//             </div>

//             <MenuCard />
//           </div>
//         )}

//         {activeTab === "UserFeedback" && (
//           <div>
            
//               <FeedbackTable />
            
//           </div>
//         )}

//         {activeTab === "analytics" && (
//           <div>
//             <h2 className="text-xl font-bold">Customers Analytics</h2>
//             <Subscribers />
//           </div>
//         )}

//         {activeTab === "settings" && (
//           <div>
//             <h2 className="text-xl font-bold">Cafe Settings</h2>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AdminDashboardPage;

import React, { useState } from "react";
import { Menu, X } from "lucide-react";

import Sidebar from "../components/Sidebar";
import AddCoffee from "../components/AddCoffee";
import MenuCard from "../components/MenuCard";
import FeedbackTable from "../components/FeedBackTable";
import AllOrders from "../components/AllOrders";
import Subscribers from "../components/Subscribers";
import Dashboard from "../components/Dashboard";

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  return (
    <div className="flex min-h-screen w-full min-w-0 overflow-x-clip bg-[#0A120E] text-white">

      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col md:ml-64">

        {/* Mobile Header */}
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-3 border-b border-[#264436] bg-[#0A120E] px-4 md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#31523F] text-white hover:bg-[#234938]"
          >
            {mobileOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>

          <div className="min-w-0">
            <h1 className="truncate font-serif text-lg font-semibold">
              Camellia Leaf
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-emerald-400">
              Admin Panel
            </p>
          </div>
        </header>

        {/* Page Content */}
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
                <h2 className="mb-4 text-xl font-bold sm:text-2xl">
                  Cafe Settings
                </h2>
              </section>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
