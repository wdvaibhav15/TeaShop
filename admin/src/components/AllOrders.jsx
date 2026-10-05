
import React from "react";
import { Eye } from "lucide-react";
import useAllOrders from "../hooks/useAllOrders";

const AllOrders = () => {
  const orders = useAllOrders();

  return (
    <div className="p-6 text-white">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-4xl font-bold mb-2">Order Station</h1>

        <p className="text-gray-400 mb-2"> Manage all customer orders </p></div>

      <div className="bg-[#071814] border border-emerald-900 rounded-2xl overflow-hidden shadow-lg">
        <table className="w-full">
          <thead className="bg-emerald-900">
            <tr>
              <th className="px-6 py-4 text-left">Coffee</th>
              <th className="px-6 py-4 text-left">Quantity</th>
              <th className="px-6 py-4 text-left">Amount</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Time</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order, index) => (
              <tr
                key={index}
                className="border-b border-emerald-950 hover:bg-emerald-950/40 transition"
              >
                <td className="px-6 py-4 font-medium">
                  {order.coffeeName}
                </td>

                <td className="px-6 py-4">
                  {order.quantity}
                </td>

                <td className="px-6 py-4 font-semibold text-amber-400">
                  ₹{order.amount}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      order.paymentStatus === "PAID"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {order.date}
                </td>

                <td className="px-6 py-4">
                  {order.time}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <button className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition">
                      <Eye size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders?.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            No Orders Found
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;