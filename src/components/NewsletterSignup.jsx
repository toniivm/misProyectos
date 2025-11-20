import React, { useState } from 'react';

export default function NewsletterSignup(){
  const [email,setEmail] = useState('');
  const [done,setDone] = useState(false);
  const valid = /.+@.+\..+/.test(email);
  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      {!done ? (
        <form onSubmit={(e)=>{e.preventDefault(); if(valid){
          const list = JSON.parse(localStorage.getItem('newsletter_list')||'[]');
          if(!list.includes(email)) list.push(email);
          localStorage.setItem('newsletter_list', JSON.stringify(list));
          setDone(true);
        }}}
          className="flex gap-2">
          <input
            type="email"
            placeholder="Tu email"
            value={email}
            onChange={e=>setEmail(e.target.value.slice(0,120))}
            className="flex-1 px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-white text-sm"
            required
          />
          <button disabled={!valid} className="bg-white disabled:opacity-40 text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition text-sm">
            Suscribir
          </button>
        </form>
      ) : (
        <div className="text-sm bg-green-600/10 text-green-500 px-4 py-2 rounded">¡Suscripción registrada!</div>
      )}
      <p className="text-xs text-gray-400">Usamos tu email solo para enviar ofertas. Puedes darte de baja desde cualquier correo.</p>
    </div>
  );
}
