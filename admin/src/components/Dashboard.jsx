import React from "react";
import {
  Coffee,
  ShoppingBag,
  Users,
  IndianRupee,
  TrendingUp,
  Star,
} from "lucide-react";

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

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Dashboard Overview
        </h1>

        <p className="text-stone-400 mt-1">
          Welcome back, Administrator 👋
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-stone-900 border border-stone-800 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-stone-400 text-sm">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold text-white mt-2">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}
                >
                  <Icon size={22} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Orders */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Recent Orders
          </h2>

          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border-b border-stone-800 pb-3"
              >
                <div>
                  <h3 className="text-white font-medium">
                    {order.id}
                  </h3>

                  <p className="text-stone-400 text-sm">
                    {order.customer}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-emerald-400 font-semibold">
                    {order.amount}
                  </p>

                  <p className="text-xs text-stone-400">
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
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
                  <span className="text-stone-200">
                    {product.name}
                  </span>

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

            <h2 className="text-white text-lg font-semibold">
              Monthly Growth
            </h2>
          </div>

          <h3 className="text-4xl font-bold text-emerald-400 mt-4">
            +18%
          </h3>

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

          <h3 className="text-4xl font-bold text-amber-400 mt-4">
            4.9
          </h3>

          <p className="text-stone-400 mt-2">
            Based on customer feedback and reviews.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;