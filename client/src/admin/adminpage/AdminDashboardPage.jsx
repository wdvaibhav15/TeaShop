
import React from 'react'
import Sidebar from '../adminComponents/Sidebar'

const AdminDashboardPage = () => {
  return (
    <>
      <div className="flex w-full min-h-screen bg-[#0A120E] text-white overflow-hidden">
      {/* Left Side: 25% Width (1/4) */}
      <div className="w-1/5 h-140 shrink-0 bottom-2 border-r border-[#264436]">
        <Sidebar />
      </div>

      {/* Right Side: 75% Width (3/4) */}
      <div className="w-4/5 flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold font-serif mb-4">Main Content Title</h1>
        <p className="text-stone-300">Your page content goes here...</p>
      </div>
    </div>
    </>
  )
}

export default AdminDashboardPage
