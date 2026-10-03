import React from "react";
import { Eye } from "lucide-react";

const orders = [
  {
    id: "ORD12345",
    customer: "Vaibhav Patel",
    email: "vaibhav@gmail.com",
    items: 3,
    total: 697,
    status: "Delivered",
    date: "02 Oct 2026",
  },
  {
    id: "ORD12346",
    customer: "Rahul Sharma",
    email: "rahul@gmail.com",
    items: 2,
    total: 499,
    status: "Delivered",
    date: "01 Oct 2026",
  },
  {
    id: "ORD12347",
    customer: "Priya Singh",
    email: "priya@gmail.com",
    items: 5,
    total: 1299,
    status: "Delivered",
    date: "30 Sep 2026",
  },
];

const AllOrders = () => {
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold">Order Station</h1>
      <p className="text-gray-400 mb-6">
        Manage all customer orders
      </p>

      <div className="bg-[#071814] border border-emerald-900 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-emerald-900">
            <tr>
              <th className="px-6 py-4 text-left">Order ID</th>
              <th className="px-6 py-4 text-left">Customer</th>
              <th className="px-6 py-4 text-left">Items</th>
              <th className="px-6 py-4 text-left">Total</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-emerald-950 hover:bg-emerald-950/40 transition"
              >
                <td className="px-6 py-4 font-medium">
                  #{order.id}
                </td>

                <td className="px-6 py-4">
                  <div>
                    <p>{order.customer}</p>
                    <p className="text-xs text-gray-400">
                      {order.email}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4">
                  {order.items} Items
                </td>

                <td className="px-6 py-4 font-semibold text-amber-400">
                  ${order.total}
                </td>

                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">
                    {order.status}
                  </span>
                </td>

                <td className="px-6 py-4">{order.date}</td>

                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <button className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
                      <Eye size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            No Orders Found
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;