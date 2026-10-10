import React from "react";
import { Eye } from "lucide-react";
import useAllOrders from "../hooks/useAllOrders";

const AllOrders = () => {
  const result = useAllOrders();

  const allOrders = Array.isArray(result)
    ? result
    : Array.isArray(result?.orders)
      ? result.orders
      : [];

  // Show only orders whose coffee still exists
  const orders = allOrders.filter((order) => {
    // Support a populated coffeeId reference
    if (Object.prototype.hasOwnProperty.call(order, "coffeeId")) {
      return order.coffeeId !== null;
    }

    // Also support a populated coffee reference
    if (Object.prototype.hasOwnProperty.call(order, "coffee")) {
      return order.coffee !== null;
    }

    // Keep orders until the backend provides a coffee reference
    return true;
  });

  return (
    <div className="p-6 text-white">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Order Station
          </h1>
          <p className="text-gray-400">
            Manage all customer orders
          </p>
        </div>
      </div>

      <div className="bg-[#071814] border border-emerald-900 rounded-2xl overflow-x-auto shadow-lg">
        <table className="w-full min-w-[900px]">
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
            {orders.map((order, index) => {
              const coffee =
                order.coffeeId && typeof order.coffeeId === "object"
                  ? order.coffeeId
                  : order.coffee && typeof order.coffee === "object"
                    ? order.coffee
                    : null;

              const coffeeName =
                coffee?.coffeeTitle ||
                coffee?.title ||
                coffee?.name ||
                order.coffeeName ||
                "Coffee";

              return (
                <tr
                  key={order._id || index}
                  className="border-b border-emerald-950 hover:bg-emerald-950/40 transition"
                >
                  <td className="px-6 py-4 font-medium">
                    {coffeeName}
                  </td>

                  <td className="px-6 py-4">
                    {order.quantity}
                  </td>

                  <td className="px-6 py-4 font-semibold text-amber-400">
                    ₹{Number(order.amount || 0).toFixed(2)}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        order.paymentStatus === "PAID"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {order.paymentStatus || "PENDING"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {order.date ||
                      (order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "N/A")}
                  </td>

                  <td className="px-6 py-4">
                    {order.time ||
                      (order.createdAt
                        ? new Date(order.createdAt).toLocaleTimeString()
                        : "N/A")}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <button
                        type="button"
                        aria-label="View order"
                        onClick={() => {
                          console.log("Selected order:", order);
                        }}
                        className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;