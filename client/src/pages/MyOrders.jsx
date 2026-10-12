
import React, { useEffect, useState } from "react";
import { Eye, FileText, RotateCcw } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import InvoiceModal from "../components/InvoiceModal";
import { useNavigate } from "react-router-dom";


const MyOrders = () => {
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  const user =
    userState?.user?.user ||
    userState?.user ||
    userState?.currentUser ||
    null;

  const userId = user?._id || user?.id;
  const token = localStorage.getItem("token");

  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMyOrders = async () => {
      if (!token || !userId) {
        setUserOrders([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const baseUrl =
          import.meta.env.VITE_CLIENT_API_URL ||
          "http://localhost:3000";

        const response = await axios.get(
          `${baseUrl}/api/orders/user-orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        if (!isMounted) return;

        if (response.data?.success) {
          setUserOrders(response.data.orders || []);
        } else {
          setUserOrders([]);
          setError("Could not fetch your orders.");
        }
      } catch (err) {
        if (!isMounted) return;

        console.error(
          "Fetch orders error:",
          err.response?.data || err.message
        );

        setError(
          err.response?.data?.message ||
            "Unable to load your orders. Please try again."
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMyOrders();

    return () => {
      isMounted = false;
    };
  }, [token, userId]);

  const formatDate = (date) => {
    if (!date) return "N/A";

    const parsedDate = new Date(date);

    return Number.isNaN(parsedDate.getTime())
      ? String(date)
      : parsedDate.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
  };

  const getOrderTotal = (order) =>
    Number(
      order.total ??
        order.totalAmount ??
        order.amount ??
        0
    );

  const getOrderId = (order, index) =>
    order._id ||
    order.id ||
    order.razorpayOrderId ||
    `order-${index}`;

  const getOrderStatus = (order) =>
    order.paymentStatus ||
    order.status ||
    order.orderStatus ||
    "Processing";

  const getOrderItems = (order) =>
    Array.isArray(order.items)
      ? order.items
      : Array.isArray(order._items)
        ? order._items
        : [];

  const getCoffeeName = (order) =>
    order.coffeeId?.coffeeTitle ||
    order.coffeeId?.title ||
    order.title ||
    order.coffeeTitle ||
    order.name ||
    "Coffee Item";

  const getItemName = (item) =>
    item.name ||
    item.title ||
    item.coffeeTitle ||
    item.coffeeId?.coffeeTitle ||
    item.coffeeId?.title ||
    "Coffee Item";

  const getItemPrice = (item) =>
    Number(item.price ?? item.amount ?? 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-emerald-400 text-lg">
          Loading your orders...
        </p>
      </div>
    );
  }

  if (!userId || !token) {
    return (
      <div className="min-h-screen bg-black text-white px-6 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">
          Please log in
        </h1>

        <p className="text-gray-400">
          Log in to view your personal order history.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 py-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-2">
          My Orders
        </h1>

        <p className="text-gray-400 mb-4">
          Orders for{" "}
          <span className="text-emerald-400">
            {user.email || user.name || user.username || "Your account"}
          </span>
        </p>

        <h3 className="mb-4">
          Total orders: {userOrders.length}
        </h3>

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
            {error}
          </div>
        )}

        {!error && userOrders.length > 0 ? (
          <div className="space-y-6">
            {userOrders.map((order, index) => {
              const orderId = getOrderId(order, index);
              const items = getOrderItems(order);
              const status = getOrderStatus(order);

              return (
                <div
                  key={orderId}
                  className="border border-gray-700 rounded-2xl p-5 sm:p-6 bg-[#080808]"
                >
                  {/* Order header */}
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold break-all">
                        Order #{orderId}
                      </h2>

                      <p className="text-gray-400 mt-2">
                        Ordered:{" "}
                        {formatDate(order.createdAt || order.date)}
                      </p>

                      {order.deliveredOn && (
                        <p className="text-emerald-400 mt-2">
                          Delivered on{" "}
                          {formatDate(order.deliveredOn)}
                        </p>
                      )}
                    </div>

                    <span className="self-start px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400">
                      {status}
                    </span>
                  </div>

                  <div className="border-t border-gray-700 my-5" />

                  {/* Order items */}
                  <div className="space-y-3">
                    {items.length > 0 ? (
                      items.map((item, itemIndex) => (
                        <div
                          key={
                            item._id ||
                            item.coffeeId?._id ||
                            itemIndex
                          }
                          className="flex justify-between gap-4"
                        >
                          <p>
                            {getItemName(item)} ×{" "}
                            {item.quantity || 1}
                          </p>

                          <p className="shrink-0">
                            ₹
                            {(
                              getItemPrice(item) *
                              Number(item.quantity || 1)
                            ).toFixed(2)}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="flex justify-between gap-4">
                        <p>
                          {getCoffeeName(order)} ×{" "}
                          {order.quantity || 1}
                        </p>

                        <p className="shrink-0">
                          ₹{getOrderTotal(order).toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Order total and actions */}
                  <div className="border-t border-gray-700 mt-5 pt-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <h3 className="text-2xl font-bold">
                      ₹{getOrderTotal(order).toFixed(2)}
                    </h3>

                    <div className="flex flex-wrap gap-3">
                      <button
  type="button"
  onClick={() =>
    navigate("/review", {
      state: { order },
    })
  }
  className="flex items-center gap-2 px-4 py-2 border border-emerald-500/40 text-emerald-400 rounded-lg hover:bg-emerald-500/10 transition-colors"
>
  <Eye size={18} />
  Write Review
</button>

                      {/* Open invoice for this order only */}
                      <button
                        type="button"
                        onClick={() => setSelectedInvoice(order)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800"
                      >
                        <FileText size={18} />
                        Invoice
                      </button>

                      <button
                        type="button"
                        onClick={() => navigate("/menu")}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 rounded-lg hover:bg-emerald-700"
                      >
                        <RotateCcw size={18} />
                        Buy Again
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          !error && (
            <div className="text-center py-20">
              <h2 className="text-3xl font-semibold mb-3">
                No Orders Found
              </h2>

              <p className="text-gray-400">
                You haven't placed any orders yet.
              </p>
            </div>
          )
        )}

        {/* Render one modal using the selected order */}
        {selectedInvoice && (
          <InvoiceModal
            order={selectedInvoice}
            onClose={() => setSelectedInvoice(null)}
          />
        )}
      </div>
    </div>
  );
};

export default MyOrders;
