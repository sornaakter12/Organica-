import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 rounded-2xl bg-white shadow-xl border border-[#7EA778]/30 text-[#203D26] animate-in fade-in slide-in-from-bottom-3 duration-200"
          role="alert"
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#315F39]" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-[#3D7347]" />}
            {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-600" />}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-[#203D26] leading-tight">{toast.title}</h4>
            {toast.description && (
              <p className="text-xs text-[#203D26]/80 mt-0.5 leading-snug">{toast.description}</p>
            )}
          </div>

          <button
            onClick={() => dismissToast(toast.id)}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mr-1 -mt-1 rounded-lg"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
