import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, RotateCcw, MessageSquare, ArrowLeft } from "lucide-react";

const PaymentFailurePage = () => {
  return (
    <div className="py-20 max-w-xl mx-auto px-4 text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 flex items-center justify-center mx-auto shadow-inner">
        <AlertTriangle className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-rose-700 dark:text-rose-400">
          Payment Unsuccessful
        </span>
        <h1 className="font-serif-tea text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          Transaction Could Not Be Completed
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
          The payment gateway reported a decline or connectivity timeout. No charges have been deducted from your account, and your tea tins remain safely in your cart.
        </p>
      </div>

      <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-2xl p-4 text-xs text-rose-900 dark:text-rose-200 text-left space-y-1">
        <div className="font-bold">Possible resolutions:</div>
        <ul className="list-disc list-inside space-y-1 text-[11px] opacity-90">
          <li>Check your card CVV, expiry date, or billing zip code.</li>
          <li>Ensure your card allows international or specialty merchant charges.</li>
          <li>Alternatively, choose "Cash on Delivery" at checkout.</li>
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link
          to="/checkout"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-2xl shadow-md transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retry Checkout</span>
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold rounded-2xl hover:bg-stone-50 transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Contact Tea Concierge</span>
        </Link>
      </div>
    </div>
  );
}

export default PaymentFailurePage