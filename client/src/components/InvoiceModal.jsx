
import React from "react";
import { X, Printer, CheckCircle2 } from "lucide-react";
import { useSelector } from "react-redux";

const InvoiceModal = ({ order, onClose }) => {
  if (!order) return null;
  const userState = useSelector((state) => state.user);

   // Your userSlice stores the logged-in user here.
  const loggedInUser =
    userState?.user?.user ||
    userState?.user ||
    null;

  if (!order) return null;

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

  const orderId =
    order._id || order.id || order.razorpayOrderId || "N/A";

  const items = Array.isArray(order.items)
    ? order.items
    : Array.isArray(order._items)
      ? order._items
      : [
          {
            name:
              order.coffeeId?.coffeeTitle ||
              order.coffeeId?.title ||
              order.title ||
              order.coffeeTitle ||
              order.name ||
              "Coffee Item",
            quantity: order.quantity || 1,
            price:
              order.price ??
              (Number(order.amount ?? order.total ?? 0) /
                (order.quantity || 1)),
          },
        ];

  const getItemName = (item) =>
    item.name ||
    item.title ||
    item.coffeeTitle ||
    item.coffeeId?.coffeeTitle ||
    item.coffeeId?.title ||
    "Coffee Item";

  const getQuantity = (item) => Number(item.quantity || 1);

  const getPrice = (item) =>
    Number(item.price ?? item.unitPrice ?? 0);

  const subtotal = items.reduce(
    (sum, item) => sum + getPrice(item) * getQuantity(item),
    0
  );

  const discount = Number(order.discount || 0);
  const shippingFee = Number(order.shippingFee || 0);
  const tax = Number(order.tax || 0);

  const total = Number(
    order.total ??
      order.totalAmount ??
      order.amount ??
      subtotal - discount + shippingFee + tax
  );

  const paymentStatus =
    order.paymentStatus || order.status || "Paid";

  const paymentMethod =
    order.paymentMethod || "Online Payment";

  const customerName =
  order.customerName ||
  order.userId?.name ||
  order.user?.name ||
  loggedInUser?.name ||
  loggedInUser?.username ||
  loggedInUser?.fullName ||
  "Customer";

const email =
  order.email ||
  order.userId?.email ||
  order.user?.email ||
  loggedInUser?.email ||
  "N/A";

  const shippingAddress =
    typeof order.shippingAddress === "string"
      ? order.shippingAddress
      : [
          order.shippingAddress?.street,
          order.shippingAddress?.city,
          order.shippingAddress?.state,
          order.shippingAddress?.zip,
        ]
          .filter(Boolean)
          .join(", ");

  


const handlePrint = () => {
  const invoiceElement = document.getElementById("printable-invoice");

  if (!invoiceElement) {
    window.alert("Invoice content not found.");
    return;
  }

  // Clone only the selected invoice
  const printContainer = document.createElement("div");
  printContainer.id = "invoice-print-container";

  const invoiceClone = invoiceElement.cloneNode(true);
  invoiceClone.removeAttribute("id");

  printContainer.appendChild(invoiceClone);

  const style = document.createElement("style");
  style.id = "invoice-print-style";

  style.textContent = `
    @media screen {
      #invoice-print-container,
      #invoice-print-style {
        display: none !important;
      }
    }

    @media print {
      html,
      body {
        background: #ffffff !important;
        background-color: #ffffff !important;
        color: #292524 !important;
        margin: 0 !important;
        padding: 0 !important;
        min-height: 0 !important;
        height: auto !important;
        overflow: visible !important;
      }

      body > * {
        display: none !important;
      }

      body > #invoice-print-container {
        display: block !important;
        position: static !important;
        width: 100% !important;
        height: auto !important;
        min-height: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
        overflow: visible !important;
        background: #ffffff !important;
        color: #292524 !important;
        box-sizing: border-box !important;
      }

      #invoice-print-container,
      #invoice-print-container * {
        visibility: visible !important;
        box-shadow: none !important;
        text-shadow: none !important;
      }

      #invoice-print-container {
        background: #ffffff !important;
        color: #292524 !important;
      }

      #invoice-print-container .no-print {
        display: none !important;
      }

      #invoice-print-container .bg-stone-50,
      #invoice-print-container .bg-stone-800\\/50 {
        background-color: #f5f5f4 !important;
      }

      #invoice-print-container .bg-emerald-800 {
        background-color: #065f46 !important;
      }

      #invoice-print-container table {
        width: 100% !important;
        border-collapse: collapse !important;
      }

      #invoice-print-container tr {
        page-break-inside: avoid !important;
      }

      @page {
        size: A4;
        margin: 12mm;
      }
    }
  `;

  // Force a clean white invoice background
  invoiceClone.style.background = "#ffffff";
  invoiceClone.style.backgroundColor = "#ffffff";
  invoiceClone.style.color = "#292524";
  invoiceClone.style.boxShadow = "none";
  invoiceClone.style.minHeight = "0";
  invoiceClone.style.height = "auto";

  document.head.appendChild(style);
  document.body.appendChild(printContainer);

  const cleanup = () => {
    printContainer.remove();
    style.remove();
    window.removeEventListener("afterprint", cleanup);
  };

  window.addEventListener("afterprint", cleanup);

  // Open the browser's native print preview
  window.print();

  // Fallback cleanup
  setTimeout(cleanup, 60000);
};




  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-stone-900 rounded-2xl max-w-3xl w-full border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Modal header */}
        <div className="no-print flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <span className="text-sm font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Tax Invoice
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
            >
              <Printer size={17} />
              Print / Save PDF
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close invoice"
              className="p-2 rounded-lg bg-red-600 hover:bg-red-400 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Only this selected invoice is printed */}
        <div
          id="printable-invoice"
          className="p-6 sm:p-8 space-y-6 text-stone-800 dark:text-stone-200"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 border-b border-stone-200 dark:border-stone-700 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-9 h-9 rounded-lg bg-emerald-800 text-amber-100 flex items-center justify-center font-bold">
                  CL
                </div>

                <span className="text-xl font-bold">
                  Camellia Leaf Tea Co.
                </span>
              </div>

              <p className="text-sm text-stone-500">
                Artisanal Tea & Coffee
              </p>
            </div>

            <div className="text-sm space-y-1 sm:text-right">
              <p className="font-bold text-base">
                INVOICE #{orderId}
              </p>
              <p>Order Date: {formatDate(order.createdAt || order.date)}</p>
              <p>Payment: {paymentMethod}</p>

              <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                <CheckCircle2 size={15} />
                {paymentStatus}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 p-4 text-sm">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                Billed To
              </p>
              <p className="font-semibold">{customerName}</p>
              <p className="break-all">{email}</p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                Shipping Address
              </p>
              <p>{shippingAddress || "N/A"}</p>
              {order.trackingNumber && (
                <p className="mt-1">
                  Tracking: {order.trackingNumber}
                </p>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-stone-300 dark:border-stone-700 text-stone-500">
                  <th className="py-3 pr-2">Item</th>
                  <th className="py-3 px-2 text-center">Qty</th>
                  <th className="py-3 px-2 text-right">Unit Price</th>
                  <th className="py-3 pl-2 text-right">Amount</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item, index) => (
                  <tr
                    key={item._id || item.coffeeId?._id || index}
                    className="border-b border-stone-100 dark:border-stone-800"
                  >
                    <td className="py-3 pr-2">
                      {getItemName(item)}
                    </td>
                    <td className="py-3 px-2 text-center">
                      {getQuantity(item)}
                    </td>
                    <td className="py-3 px-2 text-right whitespace-nowrap">
                      ₹{getPrice(item).toFixed(2)}
                    </td>
                    <td className="py-3 pl-2 text-right whitespace-nowrap">
                      ₹
                      {(
                        getPrice(item) * getQuantity(item)
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end border-t border-stone-200 dark:border-stone-700 pt-4">
            <div className="w-full max-w-xs space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-stone-500">Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between gap-4 text-emerald-600">
                  <span>Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between gap-4">
                <span className="text-stone-500">Shipping</span>
                <span>
                  {shippingFee === 0
                    ? "FREE"
                    : `₹${shippingFee.toFixed(2)}`}
                </span>
              </div>

              {tax > 0 && (
                <div className="flex justify-between gap-4">
                  <span className="text-stone-500">Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between gap-4 border-t border-stone-200 dark:border-stone-700 pt-3 text-base font-bold">
                <span>Total Paid</span>
                <span className="text-emerald-700 dark:text-emerald-400">
                  ₹{total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-stone-500 border-t border-stone-200 dark:border-stone-800 pt-4">
            Thank you for shopping with Camellia Leaf!
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
