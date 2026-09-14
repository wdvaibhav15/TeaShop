import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map(toast => {
        const getIcon = () => {
          switch (toast.type) {
            case 'success':
              return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
            case 'error':
              return <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />;
            case 'warning':
              return <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
            default:
              return <Info className="w-5 h-5 text-indigo-500 shrink-0" />;
          }
        };

        const getBorderColor = () => {
          switch (toast.type) {
            case 'success':
              return 'border-emerald-500/30';
            case 'error':
              return 'border-rose-500/30';
            case 'warning':
              return 'border-amber-500/30';
            default:
              return 'border-indigo-500/30';
          }
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border ${getBorderColor()} shadow-2xl transition-all duration-300 transform translate-y-0`}
          >
            {getIcon()}
            <div className="flex-1 text-left">
              <h5 className="font-display font-semibold text-xs text-slate-900 dark:text-white">
                {toast.title}
              </h5>
              {toast.message && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
