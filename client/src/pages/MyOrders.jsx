import React from "react";
import { Eye, FileText, RotateCcw } from "lucide-react";
import { useSelector } from "react-redux";

const MyOrders = () => {
  const userState = useSelector((state) => state.user);
  const paymentState = useSelector((state) => state.payment);

  console.log("User State:", userState);
  console.log("Payment State:", paymentState);

  const user =
    userState?.currentUser ||
    userState?.user ||
    null;

  const payData = paymentState?.payData || [];

  const localOrders = JSON.parse(
    localStorage.getItem("persistedOrders") || "[]"
  );

  const reduxOrders = Array.isArray(payData)
    ? payData
    : payData
    ? [payData]
    : [];

  const ordersMap = new Map();

  [...reduxOrders, ...localOrders].forEach((order) => {
    if (!order) return;

    const id =
      order._id ||
      order.id ||
      order.razorpayOrderId;

    if (id) {
      ordersMap.set(id, order);
    }
  });

  const combinedOrders = Array.from(ordersMap.values());

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-serif font-bold mb-8">
          My Orders
        </h1>

        {user && (
          <p className="text-gray-400 mb-8">
            Logged in as{" "}
            <span className="text-emerald-400">
              {user.email ||
                user.name ||
                user.username}
            </span>
          </p>
        )}

        {combinedOrders.length > 0 ? (
          <div className="space-y-6">
            {combinedOrders.map((order, idx) => (
              <div
                key={
                  order._id ||
                  order.id ||
                  idx
                }
                className="border border-gray-700 rounded-2xl p-6 bg-[#080808]"
              >
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">
                      Order #
                      {order.id ||
                        order._id ||
                        order.razorpayOrderId}
                    </h2>

                    <p className="text-gray-400 mt-1">
                      Ordered:{" "}
                      {order.date ||
                        order.createdAt ||
                        "N/A"}
                    </p>

                    <p className="text-green-400 mt-1">
                      {order.deliveredOn ||
                        order.status ||
                        "Processing"}
                    </p>
                  </div>

                  <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-400">
                    {order.status || "Confirmed"} ✓
                  </span>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 my-5"></div>

                {/* Items */}
                <div className="space-y-3">
                  {order.items &&
                  order.items.length > 0 ? (
                    order.items.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="flex justify-between"
                        >
                          <p>
                            {item.name ||
                              item.title ||
                              "Coffee Item"}{" "}
                            ×{" "}
                            {item.quantity ||
                              1}
                          </p>

                          <p>
                            $
                            {item.price ||
                              item.amount ||
                              0}
                          </p>
                        </div>
                      )
                    )
                  ) : (
                    <div className="flex justify-between">
                      <p>
                        {order.title ||
                          "Order Item"}{" "}
                        ×{" "}
                        {order.quantity ||
                          1}
                      </p>

                      <p>
                        $
                        {order.total ||
                          order.amount ||
                          0}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-700 mt-5 pt-5 flex justify-between items-center">
                  <h3 className="text-2xl font-bold">
                    $
                    {order.total ||
                      order.amount ||
                      0}
                  </h3>

                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800">
                      <Eye size={18} />
                      View
                    </button>

                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800">
                      <FileText size={18} />
                      Invoice
                    </button>

                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 rounded-lg hover:bg-emerald-700">
                      <RotateCcw size={18} />
                      Buy Again
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-3xl font-semibold mb-3">
              No Orders Found
            </h2>

            <p className="text-gray-400">
              You haven't placed any orders yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;