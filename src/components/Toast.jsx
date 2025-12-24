import React from "react";
import { CheckCircle, X, AlertCircle, Info } from "lucide-react";

export default function Toast({ message, type = 'success', onClose }) {
  const configs = {
    success: {
      icon: <CheckCircle size={20} />,
      bgClass: 'bg-green-500',
      textClass: 'text-white',
      borderClass: 'border-green-600'
    },
    error: {
      icon: <AlertCircle size={20} />,
      bgClass: 'bg-red-500',
      textClass: 'text-white',
      borderClass: 'border-red-600'
    },
    info: {
      icon: <Info size={20} />,
      bgClass: 'bg-blue-500',
      textClass: 'text-white',
      borderClass: 'border-blue-600'
    }
  };

  const config = configs[type] || configs.success;

  return (
    <div 
      className={`fixed bottom-6 right-6 ${config.bgClass} ${config.textClass} px-6 py-4 rounded-xl shadow-2xl border-l-4 ${config.borderClass} animate-slideIn transition-all max-w-md z-50 flex items-center gap-3`}
      role="alert"
    >
      <div className="flex-shrink-0">
        {config.icon}
      </div>
      <span className="font-semibold flex-1">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:opacity-70 transition"
          aria-label="Cerrar notificación"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}