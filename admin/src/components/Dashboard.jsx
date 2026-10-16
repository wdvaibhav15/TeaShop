// import React, { useState } from "react";
// import {
//   Coffee,
//   ShoppingBag,
//   Users,
//   IndianRupee,
//   TrendingUp,
//   Star,
// } from "lucide-react";
// import useAllOrders from "../hooks/useAllOrders";
// import AllOrders from "./AllOrders.jsx";
// import useMenuItems from "../hooks/useMenuItems.js";
// import useSubscribers from "../hooks/useSubscribers.js";

// const Dashboard = () => {
//   const stats = [
//     {
//       title: "Total Products",
//       value: 48,
//       icon: Coffee,
//       color: "bg-emerald-600",
//     },
//     {
//       title: "Total Orders",
//       value: 1248,
//       icon: ShoppingBag,
//       color: "bg-blue-600",
//     },
//     {
//       title: "Subscribers",
//       value: 892,
//       icon: Users,
//       color: "bg-purple-600",
//     },
//     {
//       title: "Revenue",
//       value: "₹1,24,500",
//       icon: IndianRupee,
//       color: "bg-amber-600",
//     },
//   ];

//   const recentOrders = [
//     {
//       id: "#ORD101",
//       customer: "Rahul Sharma",
//       amount: "₹499",
//       status: "Delivered",
//     },
//     {
//       id: "#ORD102",
//       customer: "Priya Patel",
//       amount: "₹299",
//       status: "Processing",
//     },
//     {
//       id: "#ORD103",
//       customer: "Arjun Singh",
//       amount: "₹799",
//       status: "Delivered",
//     },
//     {
//       id: "#ORD104",
//       customer: "Neha Verma",
//       amount: "₹199",
//       status: "Pending",
//     },
//   ];

//   const topProducts = [
//     {
//       name: "Himalayan Emerald",
//       sales: 245,
//     },
//     {
//       name: "Matcha Supreme",
//       sales: 182,
//     },
//     {
//       name: "Darjeeling Gold",
//       sales: 167,
//     },
//     {
//       name: "Herbal Bliss",
//       sales: 143,
//     },
//   ];

//   const { orders, totalRevenue } = useAllOrders();
//   const totalOrders = orders?.length || 0;
//   const revanue = totalRevenue.length;

//   const { items } = useMenuItems();
//   const totalMenuItems = items.length;

//   const { subscribers } = useSubscribers();
//   const subscribersCount = subscribers.length;

//   const [showAllOrders, setShowAllOrders] = useState(false);

  

// // Hide orders whose coffee item has been deleted
// const visibleOrders = (orders || []).filter((order) => {
//   // Works when the backend populates coffeeId
//   if (order.coffeeId === null) return false;

//   // Also works when the backend returns a separate coffee field
//   if (order.coffee === null) return false;

//   return true;
// });

//   if (showAllOrders) {
//     return <AllOrders />;
//   }

//   return (
//     <div className="space-y-8">
//       {/* Heading */}
//       <div>
//         <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>

//         <p className="text-stone-400 mt-1">Welcome back, Administrator 👋</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
//         {/* Total Products */}
//         <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-stone-400 text-sm">Total Products</p>
//               <h2 className="text-3xl font-bold text-white mt-2">
//                 {totalMenuItems}
//               </h2>
//             </div>
//             <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center">
//               <Coffee size={22} className="text-white" />
//             </div>
//           </div>
//         </div>

//         {/* Total Orders */}
//         <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-stone-400 text-sm">Total Orders</p>
//               <h2 className="text-3xl font-bold text-white mt-2">
//                 {totalOrders}
//               </h2>
//             </div>
//             <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
//               <ShoppingBag size={22} className="text-white" />
//             </div>
//           </div>
//         </div>

//         {/* Subscribers */}
//         <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-stone-400 text-sm">Subscribers</p>
//               <h2 className="text-3xl font-bold text-white mt-2">
//                 {subscribersCount}
//               </h2>
//             </div>
//             <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center">
//               <Users size={22} className="text-white" />
//             </div>
//           </div>
//         </div>

//         {/* Revenue */}
//         <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-stone-400 text-sm">Revenue</p>
//               <h2 className="text-3xl font-bold text-white mt-2">
//                 {totalRevenue.toLocaleString("en-IN", {
//                   style: "currency",
//                   currency: "INR",
//                   maximumFractionDigits: 2,
//                 })}
//               </h2>
//             </div>
//             <div className="w-12 h-12 rounded-xl bg-amber-600 flex items-center justify-center">
//               <IndianRupee size={22} className="text-white" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Middle Section */}
//       <div className="grid lg:grid-cols-2 gap-6">
//         {/* Orders */}
//         <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
//           <h2 className="text-xl font-semibold text-white mb-4">
//             Recent Orders
//           </h2>

//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="border-b border-stone-700 text-stone-400 text-sm">
//                   <th className="py-3 px-4">Quantity</th>
//                   <th className="py-3 px-4">Coffee Name</th>
//                   <th className="py-3 px-4 text-right">Price</th>
//                   <th className="py-3 px-4 text-center w-36">Status</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {visibleOrders.slice(0, 6).map((order) => (
//                   <tr key={order._id} className="border-b border-stone-800">
//                     <td className="py-4 px-4 text-white">{order.quantity}</td>

//                     <td className="py-4 px-4 text-stone-300">
//                       {order.coffeeName}
//                     </td>

//                     <td className="py-4 px-4 text-right text-emerald-400 font-semibold">
//                       ₹{order.amount}
//                     </td>

//                     <td className="px-8 py-4">
//                       <span
//                         className={`px-5 py-1 rounded-full text-xs ${
//                           order.paymentStatus === "PAID"
//                             ? "bg-green-500/20 text-green-400"
//                             : "bg-red-500/20 text-red-400"
//                         }`}
//                       >
//                         {order.paymentStatus}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <div className="flex justify-end pt-2">
//               <button
//                 onClick={() => setShowAllOrders(true)}
//                 className="text-white hover:text-emerald-400 font-medium transition-colors cursor-pointer bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full"
//               >
//                 View All →
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Top Products */}
//         <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
//           <h2 className="text-xl font-semibold text-white mb-4">
//             Best Sellers
//           </h2>

//           <div className="space-y-5">
//             {topProducts.map((product, index) => (
//               <div key={index}>
//                 <div className="flex justify-between mb-2">
//                   <span className="text-stone-200">{product.name}</span>

//                   <span className="text-emerald-400">
//                     {product.sales} sales
//                   </span>
//                 </div>

//                 <div className="w-full h-2 bg-stone-800 rounded-full">
//                   <div
//                     className="h-2 rounded-full bg-emerald-500"
//                     style={{
//                       width: `${(product.sales / 250) * 100}%`,
//                     }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Bottom Cards */}
//       <div className="grid md:grid-cols-2 gap-6">
//         <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
//           <div className="flex items-center gap-3">
//             <TrendingUp className="text-emerald-400" />

//             <h2 className="text-white text-lg font-semibold">Monthly Growth</h2>
//           </div>

//           <h3 className="text-4xl font-bold text-emerald-400 mt-4">+18%</h3>

//           <p className="text-stone-400 mt-2">
//             Subscriber growth compared to last month.
//           </p>
//         </div>

//         <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
//           <div className="flex items-center gap-3">
//             <Star className="text-amber-400" />

//             <h2 className="text-white text-lg font-semibold">
//               Customer Rating
//             </h2>
//           </div>

//           <h3 className="text-4xl font-bold text-amber-400 mt-4">4.9</h3>

//           <p className="text-stone-400 mt-2">
//             Based on customer feedback and reviews.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useState } from "react";
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
  const { orders = [], totalRevenue = 0 } = useAllOrders();
  const { items = [] } = useMenuItems();
  const { subscribers = [] } = useSubscribers();

  const [showAllOrders, setShowAllOrders] = useState(false);

  const totalOrders = orders.length;
  const totalMenuItems = items.length;
  const subscribersCount = subscribers.length;

  // Exclude orders whose coffee item has been deleted.
  const visibleOrders = orders.filter((order) => {
    if (order.coffeeId === null || order.coffee === null) {
      return false;
    }
    return true;
  });

  const topProducts = [
    { name: "Himalayan Emerald", sales: 245 },
    { name: "Matcha Supreme", sales: 182 },
    { name: "Darjeeling Gold", sales: 167 },
    { name: "Herbal Bliss", sales: 143 },
  ];

  const stats = [
    {
      title: "Total Products",
      value: totalMenuItems,
      Icon: Coffee,
      color: "bg-emerald-600",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      Icon: ShoppingBag,
      color: "bg-blue-600",
    },
    {
      title: "Subscribers",
      value: subscribersCount,
      Icon: Users,
      color: "bg-purple-600",
    },
    {
      title: "Revenue",
      value: Number(totalRevenue || 0).toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      Icon: IndianRupee,
      color: "bg-amber-600",
    },
  ];

  if (showAllOrders) {
    return <AllOrders />;
  }

  return (
    <main className="w-full min-w-0 max-w-full space-y-6 sm:space-y-8 overflow-x-hidden">
      {/* Dashboard heading */}
      <header className="min-w-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
          Dashboard Overview
        </h1>

        <p className="text-stone-400 mt-2 text-sm sm:text-base">
          Welcome back, Administrator 👋
        </p>
      </header>

      {/* Stats: 1 column on mobile, 2 on tablet, 4 on desktop */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {stats.map(({ title, value, Icon, color }) => (
          <article
            key={title}
            className="min-w-0 w-full rounded-2xl border border-stone-800 bg-stone-900 p-5 sm:p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm text-stone-400">{title}</p>

                <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white break-words">
                  {value}
                </h2>
              </div>

              <div
                className={`h-11 w-11 sm:h-14 sm:w-14 shrink-0 rounded-xl ${color} flex items-center justify-center`}
              >
                <Icon size={22} className="text-white" />
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Recent Orders and Best Sellers */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6 min-w-0">
        {/* Recent Orders */}
        <article className="min-w-0 w-full rounded-2xl border border-stone-800 bg-stone-900 p-4 sm:p-6">
          <h2 className="mb-4 text-lg sm:text-xl font-semibold text-white">
            Recent Orders
          </h2>

          {/* Only the table scrolls on narrow screens */}
          <div className="w-full min-w-0 overflow-x-auto">
            <table className="w-full min-w-[540px] text-left">
              <thead>
                <tr className="border-b border-stone-700 text-sm text-stone-400">
                  <th className="px-3 py-3">Quantity</th>
                  <th className="px-3 py-3">Coffee Name</th>
                  <th className="px-3 py-3 text-right">Price</th>
                  <th className="px-3 py-3 text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {visibleOrders.slice(0, 6).map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-stone-800 last:border-0"
                  >
                    <td className="px-3 py-4 text-white">
                      {order.quantity}
                    </td>

                    <td className="px-3 py-4 text-stone-300">
                      {order.coffeeName || "Coffee"}
                    </td>

                    <td className="px-3 py-4 text-right font-semibold text-emerald-400">
                      ₹{Number(order.amount || 0).toLocaleString("en-IN")}
                    </td>

                    <td className="px-3 py-4 text-center">
                      <span
                        className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs ${
                          order.paymentStatus === "PAID"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {order.paymentStatus || "PENDING"}
                      </span>
                    </td>
                  </tr>
                ))}

                {visibleOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-8 text-center text-sm text-stone-400"
                    >
                      No recent orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={() => setShowAllOrders(true)}
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20 hover:text-emerald-400"
            >
              View All →
            </button>
          </div>
        </article>

        {/* Best Sellers */}
        <article className="min-w-0 w-full rounded-2xl border border-stone-800 bg-stone-900 p-4 sm:p-6">
          <h2 className="mb-5 text-lg sm:text-xl font-semibold text-white">
            Best Sellers
          </h2>

          <div className="space-y-5">
            {topProducts.map((product) => (
              <div key={product.name} className="min-w-0">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <span className="min-w-0 text-sm sm:text-base text-stone-200">
                    {product.name}
                  </span>

                  <span className="shrink-0 text-sm sm:text-base text-emerald-400">
                    {product.sales} sales
                  </span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-stone-800">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{
                      width: `${(product.sales / 250) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* Bottom Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 min-w-0">
        <article className="min-w-0 rounded-2xl border border-stone-800 bg-stone-900 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="shrink-0 text-emerald-400" />
            <h2 className="text-lg font-semibold text-white">
              Monthly Growth
            </h2>
          </div>

          <h3 className="mt-4 text-3xl sm:text-4xl font-bold text-emerald-400">
            +18%
          </h3>

          <p className="mt-2 text-sm sm:text-base text-stone-400">
            Subscriber growth compared to last month.
          </p>
        </article>

        <article className="min-w-0 rounded-2xl border border-stone-800 bg-stone-900 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <Star className="shrink-0 text-amber-400" />
            <h2 className="text-lg font-semibold text-white">
              Customer Rating
            </h2>
          </div>

          <h3 className="mt-4 text-3xl sm:text-4xl font-bold text-amber-400">
            4.9
          </h3>

          <p className="mt-2 text-sm sm:text-base text-stone-400">
            Based on customer feedback and reviews.
          </p>
        </article>
      </section>
    </main>
  );
};

export default Dashboard;
