import React, { useState } from "react";
import {
  Coffee,
  ShoppingBag,
  Users,
  IndianRupee,
  TrendingUp,
  Star,
} from "lucide-react";
import useAllOrders from "../hooks/useAllOrders";
import AllOrders from "./AllOrders.jsx";
import useMenuItems from "../hooks/useMenuItems.js";
import useSubscribers from "../hooks/useSubscribers.js";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Products",
      value: 48,
      icon: Coffee,
      color: "bg-emerald-600",
    },
    {
      title: "Total Orders",
      value: 1248,
      icon: ShoppingBag,
      color: "bg-blue-600",
    },
    {
      title: "Subscribers",
      value: 892,
      icon: Users,
      color: "bg-purple-600",
    },
    {
      title: "Revenue",
      value: "₹1,24,500",
      icon: IndianRupee,
      color: "bg-amber-600",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD101",
      customer: "Rahul Sharma",
      amount: "₹499",
      status: "Delivered",
    },
    {
      id: "#ORD102",
      customer: "Priya Patel",
      amount: "₹299",
      status: "Processing",
    },
    {
      id: "#ORD103",
      customer: "Arjun Singh",
      amount: "₹799",
      status: "Delivered",
    },
    {
      id: "#ORD104",
      customer: "Neha Verma",
      amount: "₹199",
      status: "Pending",
    },
  ];

  const topProducts = [
    {
      name: "Himalayan Emerald",
      sales: 245,
    },
    {
      name: "Matcha Supreme",
      sales: 182,
    },
    {
      name: "Darjeeling Gold",
      sales: 167,
    },
    {
      name: "Herbal Bliss",
      sales: 143,
    },
  ];

  const { orders, totalRevenue } = useAllOrders();
  const totalOrders = orders?.length || 0;
  const revanue = totalRevenue.length;

  const { items } = useMenuItems();
  const totalMenuItems = items.length;

  const { subscribers } = useSubscribers();
  const subscribersCount = subscribers.length;

  const [showAllOrders, setShowAllOrders] = useState(false);

  if (showAllOrders) {
    return <AllOrders />;
  }

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>

        <p className="text-stone-400 mt-1">Welcome back, Administrator 👋</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Total Products */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-stone-400 text-sm">Total Products</p>
              <h2 className="text-3xl font-bold text-white mt-2">
                {totalMenuItems}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center">
              <Coffee size={22} className="text-white" />
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-stone-400 text-sm">Total Orders</p>
              <h2 className="text-3xl font-bold text-white mt-2">
                {totalOrders}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
              <ShoppingBag size={22} className="text-white" />
            </div>
          </div>
        </div>

        {/* Subscribers */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-stone-400 text-sm">Subscribers</p>
              <h2 className="text-3xl font-bold text-white mt-2">
                {subscribersCount}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center">
              <Users size={22} className="text-white" />
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-stone-400 text-sm">Revenue</p>
              <h2 className="text-3xl font-bold text-white mt-2">
                {totalRevenue.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 2,
                })}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-600 flex items-center justify-center">
              <IndianRupee size={22} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Orders */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Recent Orders
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-stone-700 text-stone-400 text-sm">
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Coffee Name</th>
                  <th className="py-3 px-4 text-right">Price</th>
                  <th className="py-3 px-4 text-center w-36">Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.slice(0, 6).map((order) => (
                  <tr key={order._id} className="border-b border-stone-800">
                    <td className="py-4 px-4 text-white">{order.quantity}</td>

                    <td className="py-4 px-4 text-stone-300">
                      {order.coffeeName}
                    </td>

                    <td className="py-4 px-4 text-right text-emerald-400 font-semibold">
                      ₹{order.amount}
                    </td>

                    <td className="px-8 py-4">
                      <span
                        className={`px-5 py-1 rounded-full text-xs ${
                          order.paymentStatus === "PAID"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowAllOrders(true)}
                className="text-white hover:text-emerald-400 font-medium transition-colors cursor-pointer bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full"
              >
                View All →
              </button>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Best Sellers
          </h2>

          <div className="space-y-5">
            {topProducts.map((product, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-stone-200">{product.name}</span>

                  <span className="text-emerald-400">
                    {product.sales} sales
                  </span>
                </div>

                <div className="w-full h-2 bg-stone-800 rounded-full">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{
                      width: `${(product.sales / 250) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-emerald-400" />

            <h2 className="text-white text-lg font-semibold">Monthly Growth</h2>
          </div>

          <h3 className="text-4xl font-bold text-emerald-400 mt-4">+18%</h3>

          <p className="text-stone-400 mt-2">
            Subscriber growth compared to last month.
          </p>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <Star className="text-amber-400" />

            <h2 className="text-white text-lg font-semibold">
              Customer Rating
            </h2>
          </div>

          <h3 className="text-4xl font-bold text-amber-400 mt-4">4.9</h3>

          <p className="text-stone-400 mt-2">
            Based on customer feedback and reviews.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
