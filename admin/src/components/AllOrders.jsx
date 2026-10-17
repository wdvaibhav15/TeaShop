
import React, { useState } from "react";
import { Eye, Package, Search } from "lucide-react";
import useAllOrders from "../hooks/useAllOrders";

const AllOrders = () => {
  const result = useAllOrders();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const allOrders = Array.isArray(result)
    ? result
    : Array.isArray(result?.orders)
      ? result.orders
      : [];

  // Keep orders whose coffee still exists when a populated
  // coffee reference is provided by the backend.
  const orders = allOrders.filter((order) => {
    if (Object.prototype.hasOwnProperty.call(order, "coffeeId")) {
      return order.coffeeId !== null;
    }

    if (Object.prototype.hasOwnProperty.call(order, "coffee")) {
      return order.coffee !== null;
    }

    return true;
  });

  const getCoffee = (order) => {
    if (
      order.coffeeId &&
      typeof order.coffeeId === "object"
    ) {
      return order.coffeeId;
    }

    if (
      order.coffee &&
      typeof order.coffee === "object"
    ) {
      return order.coffee;
    }

    return null;
  };

  const getCoffeeName = (order) => {
    const coffee = getCoffee(order);

    return (
      coffee?.coffeeTitle ||
      coffee?.title ||
      coffee?.name ||
      order.coffeeName ||
      "Coffee"
    );
  };

  const getDate = (order) => {
    if (order.date) return order.date;

    return order.createdAt
      ? new Date(order.createdAt).toLocaleDateString()
      : "N/A";
  };

  const getTime = (order) => {
    if (order.time) return order.time;

    return order.createdAt
      ? new Date(order.createdAt).toLocaleTimeString()
      : "N/A";
  };

  const filteredOrders = orders.filter((order) => {
    const term = searchTerm.toLowerCase();

    return (
      getCoffeeName(order).toLowerCase().includes(term) ||
      (order.paymentStatus || "PENDING")
        .toLowerCase()
        .includes(term) ||
      String(order._id || "").toLowerCase().includes(term)
    );
  });

  const statusClass = (status) =>
    status === "PAID"
      ? "bg-green-500/20 text-green-400"
      : "bg-red-500/20 text-red-400";

  return (
    <div className="w-full min-w-0 p-3 text-white sm:p-5 lg:p-6">

      {/* Heading */}
      <div className="mb-5 flex flex-col gap-4 sm:mb-7 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl lg:text-4xl">
            Order Station
          </h1>

          <p className="text-sm text-gray-400 sm:text-base">
            Manage all customer orders
          </p>
        </div>

        <div className="flex items-center gap-2 self-start rounded-xl border border-emerald-900 bg-[#071814] px-4 py-3 sm:self-auto">
          <Package className="h-5 w-5 text-emerald-400" />

          <div>
            <p className="text-xs text-gray-400">Total Orders</p>
            <p className="font-bold">{orders.length}</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-5 w-full sm:mb-6 sm:max-w-md">
        <div className="flex items-center gap-3 rounded-xl border border-emerald-900 bg-[#071814] px-4 py-3 focus-within:border-emerald-500">
          <Search className="h-5 w-5 shrink-0 text-gray-400" />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search coffee, status, or order ID..."
            aria-label="Search orders"
            className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Orders table: tablet and desktop */}
      <div className="hidden overflow-hidden rounded-2xl border border-emerald-900 bg-[#071814] shadow-lg md:block">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead className="bg-emerald-900">
              <tr>
                <th className="px-4 py-4 text-sm font-semibold lg:px-6">
                  Coffee
                </th>
                <th className="px-4 py-4 text-sm font-semibold">
                  Quantity
                </th>
                <th className="px-4 py-4 text-sm font-semibold">
                  Amount
                </th>
                <th className="px-4 py-4 text-sm font-semibold">
                  Status
                </th>
                <th className="px-4 py-4 text-sm font-semibold">
                  Date
                </th>
                <th className="px-4 py-4 text-sm font-semibold">
                  Time
                </th>
                <th className="px-4 py-4 text-center text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order, index) => {
                const status = order.paymentStatus || "PENDING";

                return (
                  <tr
                    key={order._id || index}
                    className="border-b border-emerald-950 transition hover:bg-emerald-950/40"
                  >
                    <td className="max-w-[220px] break-words px-4 py-4 font-medium lg:px-6">
                      {getCoffeeName(order)}
                    </td>

                    <td className="px-4 py-4">
                      {order.quantity ?? 1}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 font-semibold text-amber-400">
                      ₹{Number(order.amount || 0).toFixed(2)}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs ${statusClass(status)}`}
                      >
                        {status}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">
                      {getDate(order)}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">
                      {getTime(order)}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex justify-center">
                        <button
                          type="button"
                          aria-label="View order"
                          onClick={() => setSelectedOrder(order)}
                          className="rounded-lg bg-blue-500/20 p-2 text-blue-400 transition hover:bg-blue-500/30"
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
        </div>

        {filteredOrders.length === 0 && (
          <p className="py-10 text-center text-gray-400">
            No orders found.
          </p>
        )}
      </div>

      {/* Mobile order cards */}
      <div className="space-y-3 md:hidden">
        {filteredOrders.map((order, index) => {
          const status = order.paymentStatus || "PENDING";

          return (
            <article
              key={order._id || index}
              className="min-w-0 rounded-xl border border-emerald-900 bg-[#071814] p-4 shadow-md"
            >
              <div className="flex min-w-0 items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="break-words font-semibold text-white">
                    {getCoffeeName(order)}
                  </p>

                  <p className="mt-1 break-all text-xs text-gray-500">
                    Order ID: {order._id || "N/A"}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusClass(status)}`}
                >
                  {status}
                </span>
              </div>

              <div className="my-4 grid grid-cols-2 gap-4 border-y border-emerald-950 py-3">
                <div>
                  <p className="text-xs text-gray-400">Quantity</p>
                  <p className="mt-1 text-sm font-medium">
                    {order.quantity ?? 1}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Amount</p>
                  <p className="mt-1 break-words text-sm font-semibold text-amber-400">
                    ₹{Number(order.amount || 0).toFixed(2)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Date</p>
                  <p className="mt-1 break-words text-sm">
                    {getDate(order)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Time</p>
                  <p className="mt-1 break-words text-sm">
                    {getTime(order)}
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(order)}
                  className="flex items-center gap-2 rounded-lg bg-blue-500/20 px-3 py-2 text-sm text-blue-400 transition hover:bg-blue-500/30"
                >
                  <Eye size={16} />
                  View Order
                </button>
              </div>
            </article>
          );
        })}

        {filteredOrders.length === 0 && (
          <div className="rounded-xl border border-emerald-900 bg-[#071814] py-10 text-center text-sm text-gray-400">
            No orders found.
          </div>
        )}
      </div>

      {/* View Order Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-modal-title"
            className="my-auto w-full max-w-md rounded-2xl border border-emerald-900 bg-[#10251B] p-5 shadow-2xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2
                id="order-modal-title"
                className="text-xl font-bold"
              >
                Order Details
              </h2>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg px-3 py-2 text-gray-300 hover:bg-white/10"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-400">Order ID</p>
                <p className="mt-1 break-all">
                  {selectedOrder._id || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-gray-400">Coffee</p>
                <p className="mt-1 break-words">
                  {getCoffeeName(selectedOrder)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400">Quantity</p>
                  <p className="mt-1">
                    {selectedOrder.quantity ?? 1}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">Amount</p>
                  <p className="mt-1 font-semibold text-amber-400">
                    ₹{Number(selectedOrder.amount || 0).toFixed(2)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-gray-400">Payment Status</p>
                <span
                  className={`mt-2 inline-block rounded-full px-3 py-1 text-xs ${statusClass(selectedOrder.paymentStatus || "PENDING")}`}
                >
                  {selectedOrder.paymentStatus || "PENDING"}
                </span>
              </div>

              <div>
                <p className="text-gray-400">Date & Time</p>
                <p className="mt-1 break-words">
                  {getDate(selectedOrder)} · {getTime(selectedOrder)}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedOrder(null)}
              className="mt-6 w-full rounded-xl bg-emerald-700 px-4 py-3 font-semibold transition hover:bg-emerald-600"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
