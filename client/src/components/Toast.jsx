import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function Toast({ toasts = [], removeToast }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => {
        const isError = toast.type === "error";
        const isInfo = toast.type === "info";
        const Icon = isError ? AlertCircle : isInfo ? Info : CheckCircle2;

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl shadow-xl border text-sm font-medium transition-all transform animate-in slide-in-from-bottom duration-200 ${
              isError
                ? "bg-red-50 dark:bg-red-950/80 border-red-200 dark:border-red-900 text-red-900 dark:text-red-200"
                : isInfo
                ? "bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200"
                : "bg-emerald-50 dark:bg-emerald-950/90 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast && removeToast(toast.id)}
              className="p-1 hover:opacity-75 rounded transition-opacity"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}