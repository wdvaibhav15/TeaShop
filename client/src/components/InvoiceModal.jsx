import React from "react";
import { X, Printer, Download, CheckCircle2 } from "lucide-react";

const InvoiceModal = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-2xl w-full border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              Tax Invoice
            </span>
            <span className="text-xs text-stone-400">&bull; {order.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-500"
              aria-label="Close invoice"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div className="p-8 space-y-6 text-stone-800 dark:text-stone-200" id="printable-invoice">
          {/* Company & Invoice meta */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-emerald-800 text-amber-100 flex items-center justify-center font-serif font-bold text-sm">
                  葉
                </div>
                <span className="font-serif-tea text-xl font-bold text-stone-900 dark:text-stone-100">
                  Camellia Leaf Tea Co.
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                742 Botanical Way, Portland, OR 97201
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                care@camelliateashop.com &bull; +1 (800) 492-8321
              </p>
            </div>

            <div className="sm:text-right text-xs space-y-1">
              <div className="text-base font-bold text-stone-900 dark:text-stone-100">
                INVOICE #{order.id}
              </div>
              <div>Date Issued: {order.date}</div>
              <div>
                Payment:{" "}
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  {order.paymentMethod}
                </span>
              </div>
              <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {order.paymentStatus}
              </div>
            </div>
          </div>

          {/* Customer & Shipping */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-stone-50 dark:bg-stone-800/40 p-4 rounded-2xl">
            <div>
              <span className="font-bold text-stone-400 uppercase tracking-wider block mb-1">
                Billed To:
              </span>
              <div className="font-semibold text-stone-900 dark:text-stone-100">
                {order.customerName}
              </div>
              <div className="text-stone-600 dark:text-stone-400">{order.email}</div>
            </div>

            <div>
              <span className="font-bold text-stone-400 uppercase tracking-wider block mb-1">
                Shipped To:
              </span>
              <div className="text-stone-700 dark:text-stone-300">
                {order.shippingAddress?.street}, {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.state} {order.shippingAddress?.zip}
              </div>
              <div className="text-stone-500 dark:text-stone-400">
                Carrier: {order.carrier} &bull; Tracking: {order.trackingNumber}
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-700 text-stone-500 uppercase font-semibold">
                  <th className="py-2.5">Item</th>
                  <th className="py-2.5 text-center">Qty</th>
                  <th className="py-2.5 text-right">Unit Price</th>
                  <th className="py-2.5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3 font-medium text-stone-900 dark:text-stone-100">
                      {item.name}
                    </td>
                    <td className="py-3 text-center">{item.quantity}</td>
                    <td className="py-3 text-right">${item.price.toFixed(2)}</td>
                    <td className="py-3 text-right font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Calculation */}
          <div className="border-t border-stone-200 dark:border-stone-800 pt-4 flex justify-end">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Subtotal:</span>
                <span>${order.subtotal?.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Coupon Discount:</span>
                  <span>-${order.discount?.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Shipping:</span>
                <span>
                  {order.shippingFee === 0 ? "FREE" : `$${order.shippingFee?.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-stone-600 dark:text-stone-400">
                <span>Estimated Tax (8%):</span>
                <span>${order.tax?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 dark:text-stone-100 pt-2 border-t border-stone-200 dark:border-stone-700">
                <span>Total Paid:</span>
                <span className="text-emerald-800 dark:text-emerald-400">
                  ${order.total?.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="text-center text-[11px] text-stone-400 pt-4 border-t border-stone-100 dark:border-stone-800">
            Thank you for supporting ethical, sustainable single-estate tea cultivation. May your cup be tranquil.
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceModal;
