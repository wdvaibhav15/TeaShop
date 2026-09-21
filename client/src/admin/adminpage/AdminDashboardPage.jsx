import React, { useState } from 'react';
import Sidebar from '../adminComponents/Sidebar';
import AdminNavbar from '../adminComponents/AdminNavbar';
import AddCoffee from '../adminComponents/AddCoffee'; // Adjust path if needed

const AdminDashboardPage = () => {
  
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex w-full min-h-screen bg-[#0A120E] text-white overflow-hidden">
      {/* Left Side: Sidebar */}
      <div className="w-1/5 shrink-0 border-r border-[#264436]">
        
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Right Side */}
      <div className="w-4/5 flex-1 p-6 overflow-y-auto">
        <AdminNavbar />
        <div className="mt-6">
          {activeTab === 'add-coffee' && (
            <AddCoffee onClose={() => setActiveTab('overview')} />
          )}

          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-bold">Overview Dashboard</h2>
              {/* Overview content goes here */}
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-bold">Order Station</h2>
              {/* Orders content goes here */}
            </div>
          )}

          {activeTab === 'coffees' && (
            <div>
              <h2 className="text-xl font-bold">Coffee & Menu</h2>
              {/* Menu content goes here */}
            </div>
          )}

          {activeTab === 'inventory' && (
            <div>
              <h2 className="text-xl font-bold">Inventory & Beans</h2>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-xl font-bold">Sales & Trends</h2>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-bold">Cafe Settings</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;