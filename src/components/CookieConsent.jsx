import React, { useEffect, useState } from 'react';

export default function CookieConsent(){
  const [open,setOpen] = useState(false);
  const [preferences,setPreferences] = useState({ necessary:true, analytics:false, marketing:false });
  const [expanded,setExpanded] = useState(false);

  useEffect(()=>{
    const stored = localStorage.getItem('cookie_preferences');
    if(stored){
      try { setPreferences(JSON.parse(stored)); } catch(_){}
    } else {
      setOpen(true);
    }
  },[]);

  if(!open) return null;

  const save = (prefs) => {
    localStorage.setItem('cookie_preferences', JSON.stringify(prefs));
    setPreferences(prefs);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-md bg-white shadow-xl border border-gray-200 rounded-xl p-5 text-sm font-medium">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="text-gray-800 font-semibold mb-2">Cookies en VALTREX</p>
          <p className="text-gray-600 leading-relaxed">Usamos cookies necesarias para la funcionalidad básica. Puedes habilitar analíticas y marketing opcionalmente.</p>
        </div>
      </div>
      <button onClick={()=>setExpanded(!expanded)} className="mt-3 text-xs text-gray-500 underline">{expanded? 'Ocultar detalles' : 'Ver detalles y categorías'}</button>
      {expanded && (
        <div className="mt-4 space-y-3">
          <label className="flex items-start gap-3">
            <input type="checkbox" checked disabled className="mt-1" />
            <div>
              <span className="font-semibold">Necesarias</span>
              <p className="text-xs text-gray-500">Autenticación, carrito y seguridad. Siempre activas.</p>
            </div>
          </label>
          <label className="flex items-start gap-3">
            <input type="checkbox" checked={preferences.analytics} onChange={e=>setPreferences(p=>({...p,analytics:e.target.checked}))} className="mt-1" />
            <div>
              <span className="font-semibold">Analíticas</span>
              <p className="text-xs text-gray-500">Rendimiento y uso anónimo para mejorar experiencia.</p>
            </div>
          </label>
          <label className="flex items-start gap-3">
            <input type="checkbox" checked={preferences.marketing} onChange={e=>setPreferences(p=>({...p,marketing:e.target.checked}))} className="mt-1" />
            <div>
              <span className="font-semibold">Marketing</span>
              <p className="text-xs text-gray-500">Promociones y recomendaciones personalizadas.</p>
            </div>
          </label>
        </div>
      )}
      <div className="flex flex-wrap gap-3 justify-end mt-5">
        <button onClick={()=>save({necessary:true, analytics:false, marketing:false})} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">Solo necesarias</button>
        <button onClick={()=>save({necessary:true, analytics:true, marketing:false})} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">Permitir analíticas</button>
        <button onClick={()=>save({necessary:true, analytics:true, marketing:true})} className="px-4 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-800">Aceptar todas</button>
      </div>
      <div className="mt-3 text-xs text-gray-500 flex justify-between">
        <a href="/privacidad" className="underline">Política de privacidad</a>
        <button onClick={()=>{setOpen(false);}} className="underline">Cerrar</button>
      </div>
    </div>
  );
}
