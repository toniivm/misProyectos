'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { useLocale } from 'next-intl'

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false)
  const locale = useLocale()
  const isEs = locale === 'es'

  const phone = '34600000000' // CAMBIAR por tu número real
  const messages = {
    preguntas: isEs 
      ? 'Hola, tengo una pregunta sobre los productos Noctip'
      : 'Hi, I have a question about Noctip products',
    pedido: isEs
      ? 'Hola, quiero información sobre mi pedido'
      : 'Hi, I want info about my order',
    ayuda: isEs
      ? 'Hola, ¿me podéis ayudar a elegir un producto?'
      : 'Hi, can you help me choose a product?',
  }

  const openWhatsApp = (message: string) => {
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <>
      {/* Chat bubble */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-24 right-4 z-40 w-72 rounded-3xl border border-white/[0.1] bg-[#0d1219]/95 p-4 shadow-[0_16px_48px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:bottom-6 sm:right-6"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-lg">
              <MessageCircle size={20} className="text-white" />
            </div>
            <div>
              <div className="text-[14px] font-bold text-white">
                {isEs ? '¿Necesitas ayuda?' : 'Need help?'}
              </div>
              <div className="text-[11px] text-[#6b7785]">
                {isEs ? 'Respondemos en < 5 min' : 'We reply in < 5 min'}
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto text-[#6b7785] hover:text-white">×</button>
          </div>

          <div className="space-y-2">
            {[
              { label: isEs ? '🤔 Tengo una duda' : '🤔 I have a question', msg: messages.preguntas },
              { label: isEs ? '📦 Información de mi pedido' : '📦 Order information', msg: messages.pedido },
              { label: isEs ? '🛒 Ayuda para elegir' : '🛒 Help choosing', msg: messages.ayuda },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => openWhatsApp(item.msg)}
                className="flex w-full items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-[13px] text-[#c8d0da] transition hover:border-[#25D366]/30 hover:bg-[#25D366]/5 hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </div>

          <p className="mt-3 text-center text-[10px] text-[#4a5568]">
            {isEs ? 'WhatsApp · Lun-Vie 9:00-18:00' : 'WhatsApp · Mon-Fri 9:00-18:00'}
          </p>
        </motion.div>
      )}

      {/* Floating button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-shadow hover:shadow-[0_8px_30px_rgba(37,211,102,0.5)] sm:bottom-6 sm:right-6"
        aria-label="Contactar por WhatsApp"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <MessageCircle size={24} />
        </motion.div>
      </motion.button>
    </>
  )
}
