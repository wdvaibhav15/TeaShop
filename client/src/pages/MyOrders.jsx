import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_CLIENT_API_URL ||
  "http://localhost:3000";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/payment/my-orders`,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-xl p-5 shadow"
          >
            <div className="flex justify-between">
              <h2 className="font-semibold text-lg">
                {order.coffeeId?.title}
              </h2>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.paymentStatus === "PAID"
                    ? "bg-green-100 text-green-700"
                    : order.paymentStatus === "FAILED"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.paymentStatus}
              </span>
            </div>

            <div className="mt-3 text-sm space-y-1">
              <p>
                <strong>Order ID:</strong>{" "}
                {order.razorpayOrderId}
              </p>

              <p>
                <strong>Payment ID:</strong>{" "}
                {order.razorpayPaymentId || "N/A"}
              </p>

              <p>
                <strong>Quantity:</strong>{" "}
                {order.quantity}
              </p>

              <p>
                <strong>Amount:</strong> ₹
                {order.amount}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(
                  order.createdAt
                ).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;