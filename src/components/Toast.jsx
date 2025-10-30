import React from "react";

export default function Toast({ message }) {
  return (
    <div 
      className="fixed bottom-6 right-6 bg-black text-white px-6 py-3 rounded-xl shadow-2xl border-l-4 border-green-400 animate-slideIn transition"
      role="alert"
    >
      <span className="font-semibold">{message}</span>
    </div>
  );
}