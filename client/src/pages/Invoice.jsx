import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Coffee } from "lucide-react";

const Invoice = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Order details passed from My Orders page
  const order = state?.order;

  if (!order) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">
          Invoice Not Found
        </h1>
        <button
          onClick={() => navigate("/my-orders")}
          className="px-5 py-2 rounded-lg bg-emerald-600"
        >
          Back to My Orders
        </button>
      </div>
    );
  }

  const orderId = order._id || order.id;
  const orderDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  const amount = Number(order.amount ?? order.totalAmount ?? 0);
  const quantity = Number(order.quantity ?? 1);
  const unitPrice = quantity > 0 ? amount / quantity : amount;

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 sm:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Top actions */}
        <div className="flex items-center justify-between mb-8 print:hidden">
          <button
            onClick={() => navigate("/my-orders")}
            className="flex items-center gap-2 text-gray-300 hover:text-emerald-400"
          >
            <ArrowLeft size={18} />
            Back to My Orders
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 hover:bg-emerald-500"
          >
            <Download size={18} />
            Print / Save PDF
          </button>
        </div>

        {/* Invoice */}
        <div
          id="invoice"
          className="rounded-2xl border border-gray-700 bg-zinc-950 p-6 sm:p-10 print:border-0 print:bg-white print:text-black"
        >
          {/* Invoice header */}
          <div className="flex flex-col gap-6 border-b border-gray-700 pb-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Coffee size={32} className="text-emerald-500" />
                <div>
                  <h1 className="text-3xl font-bold">
                    Camellia Leaf
                  </h1>
                  <p className="text-sm text-gray-400 print:text-gray-600">
                    Artisanal Tea Co.
                  </p>
                </div>
              </div>

              <p className="text-gray-400 print:text-gray-600">
                Order Invoice
              </p>
            </div>

            <div className="sm:text-right">
              <h2 className="text-3xl font-bold text-emerald-400 print:text-black">
                INVOICE
              </h2>
              <p className="mt-2 text-gray-300 print:text-gray-700">
                Invoice #: {orderId}
              </p>
              <p className="text-gray-400 print:text-gray-600">
                Date: {orderDate}
              </p>
              <span className="mt-3 inline-block rounded-full bg-emerald-950 px-4 py-1 text-sm font-semibold text-emerald-400 print:bg-white print:text-black">
                {(order.status || "PAID").toUpperCase()}
              </span>
            </div>
          </div>

          {/* Customer information */}
          <div className="grid grid-cols-1 gap-6 py-8 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400 print:text-gray-600">
                Billed To
              </h3>
              <p className="font-medium">
                {order.user?.name || order.customerName || "Customer"}
              </p>
              <p className="text-gray-400 print:text-gray-600">
                {order.user?.email || order.email || ""}
              </p>
            </div>

            <div className="sm:text-right">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400 print:text-gray-600">
                Payment Information
              </h3>
              <p>
                Payment Status:{" "}
                <span className="text-emerald-400 print:text-black">
                  {(order.status || "PAID").toUpperCase()}
                </span>
              </p>
              <p className="text-gray-400 print:text-gray-600">
                Payment ID: {order.razorpayPaymentId || "N/A"}
              </p>
            </div>
          </div>

          {/* Product details */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-y border-gray-700 text-sm text-gray-400 print:text-gray-600">
                  <th className="py-4 pr-3">Product</th>
                  <th className="py-4 px-3 text-center">Qty</th>
                  <th className="py-4 px-3 text-right">Price</th>
                  <th className="py-4 pl-3 text-right">Total</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="py-6 pr-3">
                    <p className="font-semibold">
                      {order.coffee?.title ||
                        order.coffee?.name ||
                        order.product?.title ||
                        order.product?.name ||
                        order.coffeeTitle ||
                        order.productName ||
                        "Coffee Item"}
                    </p>
                    <p className="mt-1 text-sm text-gray-400 print:text-gray-600">
                      Order #{String(orderId).slice(-8)}
                    </p>
                  </td>

                  <td className="px-3 py-6 text-center">
                    {quantity}
                  </td>

                  <td className="px-3 py-6 text-right">
                    ₹{unitPrice.toFixed(2)}
                  </td>

                  <td className="py-6 pl-3 text-right font-medium">
                    ₹{amount.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="ml-auto mt-8 max-w-sm">
            <div className="flex justify-between border-b border-gray-700 py-3">
              <span className="text-gray-400 print:text-gray-600">
                Subtotal
              </span>
              <span>₹{amount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between border-b border-gray-700 py-3">
              <span className="text-gray-400 print:text-gray-600">
                Shipping
              </span>
              <span>₹0.00</span>
            </div>

            <div className="flex justify-between py-4 text-xl font-bold">
              <span>Grand Total</span>
              <span>₹{amount.toFixed(2)}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 border-t border-gray-700 pt-6 text-center">
            <h3 className="text-lg font-semibold">
              Thank you for shopping with Camellia Leaf!
            </h3>
            <p className="mt-2 text-sm text-gray-400 print:text-gray-600">
              We appreciate your order. Enjoy your brew!
            </p>
          </div>
        </div>
      </div>

      {/* Print styling */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 15mm;
          }

          body {
            background: white !important;
            color: black !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          #invoice {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Invoice;
