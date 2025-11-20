import React, { useEffect, useState } from 'react';

export default function CookieConsent(){
  const [open,setOpen] = useState(false);
  useEffect(()=>{
    const choice = localStorage.getItem('cookie_consent');
    if(!choice) setOpen(true);
  },[]);
  if(!open) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm bg-white shadow-lg border border-gray-200 rounded-lg p-4 space-y-3 text-sm">
      <p className="text-gray-700">Usamos cookies esenciales para funcionamiento básico. Aún no usamos analíticas. ¿Aceptas para futuras mejoras?</p>
      <div className="flex gap-2 justify-end">
        <button onClick={()=>{localStorage.setItem('cookie_consent','declined'); setOpen(false);}} className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded">Rechazar</button>
        <button onClick={()=>{localStorage.setItem('cookie_consent','accepted'); setOpen(false);}} className="px-3 py-2 bg-black text-white rounded font-semibold">Aceptar</button>
      </div>
      <a href="/privacidad" className="text-xs underline text-gray-500">Leer política</a>
    </div>
  );
}
