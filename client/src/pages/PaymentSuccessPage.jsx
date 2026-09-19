import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, Package, ArrowRight, Printer, Home, FileText } from "lucide-react";
import confetti from "canvas-confetti";

import InvoiceModal from "../components/InvoiceModal";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  
  const [showInvoice, setShowInvoice] = useState(false);

  const order = orders.find((o) => o.id === orderId) || orders[0];

  useEffect(() => {
    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#3b6947", "#c59b27", "#8ba888", "#2c4c38"],
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  return (
    <div className="py-16 max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-8">
      <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center mx-auto shadow-inner">
        <CheckCircle2 className="w-10 h-10 text-emerald-700 dark:text-emerald-400" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
          Payment Successful & Confirmed
        </span>
        <h1 className="font-serif-tea text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          Thank You For Steeping With Us
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-sm max-w-lg mx-auto">
          We have received your harvest order. Our tea sommeliers are preparing and nitrogen-sealing your tins with utmost care.
        </p>
      </div>

      {order && (
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-stone-800 shadow-sm text-left space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800 gap-2">
            <div>
              <div className="text-xs text-stone-400">Order Reference</div>
              <div className="text-lg font-bold text-stone-900 dark:text-stone-100">
                {order.id}
              </div>
            </div>
            <div className="sm:text-right">
              <div className="text-xs text-stone-400">Estimated Dispatch</div>
              <div className="text-sm font-semibold text-emerald-800 dark:text-emerald-400">
                Within 24 Hours &bull; {order.carrier}
              </div>
            </div>
          </div>

          {/* Items Preview */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Ordered Teas ({order.items.length})
            </h4>
            <div className="divide-y divide-stone-100 dark:divide-stone-800">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div>
                      <span className="font-semibold text-stone-900 dark:text-stone-100 block">
                        {item.name}
                      </span>
                      <span className="text-stone-400">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
            <span className="text-stone-500">
              Total Charged ({order.paymentMethod}):
            </span>
            <span className="text-base font-bold text-emerald-800 dark:text-emerald-400">
              ${order.total?.toFixed(2)}
            </span>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setShowInvoice(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>View / Print Invoice</span>
            </button>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-sm"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Track Live in Dashboard</span>
            </Link>
          </div>
        </div>
      )}

      <div className="pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-emerald-800"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>

      {showInvoice && (
        <InvoiceModal order={order} onClose={() => setShowInvoice(false)} />
      )}
    </div>
  );
}

export default PaymentSuccessPage;
