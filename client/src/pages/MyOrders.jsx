// import React from "react";
// import { Eye, FileText, RotateCcw } from "lucide-react";
// import { useSelector } from "react-redux";

// const MyOrders = () => {
//   const userState = useSelector((state) => state.user);
//   const paymentState = useSelector((state) => state.payment);

//   console.log("User State:", userState);
//   console.log("Payment State:", paymentState);

//   const user =
//     userState?.currentUser ||
//     userState?.user ||
//     null;

//   const payData = paymentState?.payData || [];

//   const localOrders = JSON.parse(
//     localStorage.getItem("persistedOrders") || "[]"
//   );

//   const reduxOrders = Array.isArray(payData)
//     ? payData
//     : payData
//     ? [payData]
//     : [];

//   const ordersMap = new Map();

//   [...reduxOrders, ...localOrders].forEach((order) => {
//     if (!order) return;

//     const id =
//       order._id ||
//       order.id ||
//       order.razorpayOrderId;

//     if (id) {
//       ordersMap.set(id, order);
//     }
//   });

//   const combinedOrders = Array.from(ordersMap.values());

//   return (
//     <div className="min-h-screen bg-black text-white px-6 py-10">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-5xl font-serif font-bold mb-8">
//           My Orders
//         </h1>

//         {user && (
//           <p className="text-gray-400 mb-8">
//             Logged in as{" "}
//             <span className="text-emerald-400">
//               {user.email ||
//                 user.name ||
//                 user.username}
//             </span>
//           </p>
//         )}

//         {combinedOrders.length > 0 ? (
//           <div className="space-y-6">
//             {combinedOrders.map((order, idx) => (
//               <div
//                 key={
//                   order._id ||
//                   order.id ||
//                   idx
//                 }
//                 className="border border-gray-700 rounded-2xl p-6 bg-[#080808]"
//               >
//                 {/* Header */}
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h2 className="text-xl font-semibold">
//                       Order #
//                       {order.id ||
//                         order._id ||
//                         order.razorpayOrderId}
//                     </h2>

//                     <p className="text-gray-400 mt-1">
//                       Ordered:{" "}
//                       {order.date ||
//                         order.createdAt ||
//                         "N/A"}
//                     </p>

//                     <p className="text-green-400 mt-1">
//                       {order.deliveredOn ||
//                         order.status ||
//                         "Processing"}
//                     </p>
//                   </div>

//                   <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-400">
//                     {order.status || "Confirmed"} ✓
//                   </span>
//                 </div>

//                 {/* Divider */}
//                 <div className="border-t border-gray-700 my-5"></div>

//                 {/* Items */}
//                 <div className="space-y-3">
//                   {order.items &&
//                   order.items.length > 0 ? (
//                     order.items.map(
//                       (item, index) => (
//                         <div
//                           key={index}
//                           className="flex justify-between"
//                         >
//                           <p>
//                             {item.name ||
//                               item.title ||
//                               "Coffee Item"}{" "}
//                             ×{" "}
//                             {item.quantity ||
//                               1}
//                           </p>

//                           <p>
//                             ₹
//                             {item.price ||
//                               item.amount ||
//                               0}
//                           </p>
//                         </div>
//                       )
//                     )
//                   ) : (
//                     <div className="flex justify-between">
//                       <p>
//                         {order.title ||
//                           "Order Item"}{" "}
//                         ×{" "}
//                         {order.quantity ||
//                           1}
//                       </p>

//                       <p>
//                         ₹
//                         {order.total ||
//                           order.amount ||
//                           0}
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 {/* Footer */}
//                 <div className="border-t border-gray-700 mt-5 pt-5 flex justify-between items-center">
//                   <h3 className="text-2xl font-bold">
//                     ₹
//                     {order.total ||
//                       order.amount ||
//                       0}
//                   </h3>

//                   <div className="flex gap-3">
//                     <button className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800">
//                       <Eye size={18} />
//                       View
//                     </button>

//                     <button className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800">
//                       <FileText size={18} />
//                       Invoice
//                     </button>

//                     <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 rounded-lg hover:bg-emerald-700">
//                       <RotateCcw size={18} />
//                       Buy Again
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20">
//             <h2 className="text-3xl font-semibold mb-3">
//               No Orders Found
//             </h2>

//             <p className="text-gray-400">
//               You haven't placed any orders yet.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyOrders;

import React, { useMemo } from "react";
import { Eye, FileText, RotateCcw } from "lucide-react";
import { useSelector } from "react-redux";

const MyOrders = () => {
  const userState = useSelector((state) => state.user);
  const paymentState = useSelector((state) => state.payment);

  // Support the user object formats used by your application.
  const user =
    userState?.user?.user ||
    userState?.user ||
    userState?.currentUser ||
    null;

  const userId = user?._id || user?.id;

  const payData = paymentState?.payData || [];

  // Read locally persisted orders safely.
  const localOrders = useMemo(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("persistedOrders") || "[]"
      );

      return Array.isArray(saved) ? saved : [];
    } catch (error) {
      console.error("Could not read persisted orders:", error);
      return [];
    }
  }, []);

  // Convert payment state into an array.
  const reduxOrders = Array.isArray(payData)
    ? payData
    : payData
      ? [payData]
      : [];

  // Extract the owner ID from supported order formats.
  const getOrderUserId = (order) => {
    const owner =
      order?.userId ??
      order?.user ??
      order?.customerId ??
      order?.customer;

    if (owner && typeof owner === "object") {
      return owner._id || owner.id || null;
    }

    return owner || null;
  };

  // Only show orders explicitly associated with this logged-in user.
  const userOrders = useMemo(() => {
    if (!userId) return [];

    const allOrders = [...reduxOrders, ...localOrders];
    const ordersMap = new Map();

    allOrders.forEach((order) => {
      if (!order || typeof order !== "object") return;

      const ownerId = getOrderUserId(order);

      // Never show an order if its owner cannot be verified.
      if (!ownerId || String(ownerId) !== String(userId)) {
        return;
      }

      const orderId =
        order._id ||
        order.id ||
        order.razorpayOrderId;

      if (orderId) {
        // Merge duplicate records belonging to the same user.
        ordersMap.set(String(orderId), {
          ...ordersMap.get(String(orderId)),
          ...order,
        });
      } else {
        // Keep owner-verified records even if they have no order ID.
        ordersMap.set(
          `temporary-${ordersMap.size}`,
          order
        );
      }
    });

    return Array.from(ordersMap.values()).sort(
      (a, b) =>
        new Date(b.createdAt || b.date || 0).getTime() -
        new Date(a.createdAt || a.date || 0).getTime()
    );
  }, [userId, payData, localOrders]);

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
        order.amount ??
        order.totalAmount ??
        0
    );

  if (!userId) {
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
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4">
          My Orders
        </h1>

        <p className="text-gray-400 mb-8">
          Orders for{" "}
          <span className="text-emerald-400">
            {user.email || user.name || user.username || "your account"}
          </span>
        </p>

        {userOrders.length > 0 ? (
          <div className="space-y-6">
            {userOrders.map((order, idx) => {
              const orderId =
                order._id ||
                order.id ||
                order.razorpayOrderId ||
                idx;

              const items = Array.isArray(order.items)
                ? order.items
                : [];

              const status = order.status || "Processing";

              return (
                <div
                  key={orderId}
                  className="border border-gray-700 rounded-2xl p-6 bg-[#080808]"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold break-all">
                        Order #{orderId}
                      </h2>

                      <p className="text-gray-400 mt-2">
                        Ordered:{" "}
                        {formatDate(order.createdAt || order.date)}
                      </p>

                      <p className="text-emerald-400 mt-2">
                        {order.deliveredOn
                          ? `Delivered on ${formatDate(order.deliveredOn)}`
                          : status}
                      </p>
                    </div>

                    <span className="self-start px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400">
                      {status}
                    </span>
                  </div>

                  <div className="border-t border-gray-700 my-5" />

                  <div className="space-y-3">
                    {items.length > 0 ? (
                      items.map((item, index) => (
                        <div
                          key={item._id || item.coffeeId || index}
                          className="flex justify-between gap-4"
                        >
                          <p>
                            {item.name ||
                              item.title ||
                              item.coffeeTitle ||
                              "Coffee Item"}{" "}
                            × {item.quantity || 1}
                          </p>

                          <p className="shrink-0">
                            ₹
                            {Number(
                              item.price ?? item.amount ?? 0
                            ).toFixed(2)}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="flex justify-between gap-4">
                        <p>
                          {order.title || "Order Item"} ×{" "}
                          {order.quantity || 1}
                        </p>
                        <p>
                          ₹{getOrderTotal(order).toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-700 mt-5 pt-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <h3 className="text-2xl font-bold">
                      ₹{getOrderTotal(order).toFixed(2)}
                    </h3>

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          window.alert(
                            `Order ID: ${orderId}\nStatus: ${status}`
                          )
                        }
                        className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800"
                      >
                        <Eye size={18} />
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          window.print()
                        }
                        className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800"
                      >
                        <FileText size={18} />
                        Invoice
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          window.location.assign("/menu")
                        }
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
          <div className="text-center py-20">
            <h2 className="text-3xl font-semibold mb-3">
              No Orders Found
            </h2>

            <p className="text-gray-400">
              You haven't placed any orders yet, or your saved
              orders don't contain a matching user ID.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
