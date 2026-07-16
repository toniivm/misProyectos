export default function PaymentLogos({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 sm:gap-3 flex-wrap ${className}`}>
      {/* Visa */}
      <div className="flex items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 transition-colors hover:bg-white/[0.06]">
        <svg className="h-5 sm:h-6 w-auto" viewBox="0 0 48 32" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="32" rx="4" fill="#1A1F71"/>
          <text x="24" y="20" textAnchor="middle" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="14">VISA</text>
        </svg>
      </div>

      {/* Mastercard */}
      <div className="flex items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 transition-colors hover:bg-white/[0.06]">
        <svg className="h-5 sm:h-6 w-auto" viewBox="0 0 48 32" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="32" rx="4" fill="#2D2D2D"/>
          <circle cx="19" cy="16" r="8" fill="#EB001B"/>
          <circle cx="29" cy="16" r="8" fill="#F79E1B"/>
          <path d="M24 10.5c1.8 1.2 3 3.3 3 5.5s-1.2 4.3-3 5.5c-1.8-1.2-3-3.3-3-5.5s1.2-4.3 3-5.5z" fill="#FF5F00"/>
        </svg>
      </div>

      {/* PayPal */}
      <div className="flex items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 transition-colors hover:bg-white/[0.06]">
        <svg className="h-5 sm:h-6 w-auto" viewBox="0 0 48 32" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="32" rx="4" fill="#003087"/>
          <text x="24" y="20" textAnchor="middle" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="10">PayPal</text>
        </svg>
      </div>

      {/* American Express */}
      <div className="flex items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 transition-colors hover:bg-white/[0.06]">
        <svg className="h-5 sm:h-6 w-auto" viewBox="0 0 48 32" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="32" rx="4" fill="#006FCF"/>
          <text x="24" y="20" textAnchor="middle" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="8">AMEX</text>
        </svg>
      </div>

      {/* Apple Pay */}
      <div className="flex items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 transition-colors hover:bg-white/[0.06]">
        <svg className="h-5 sm:h-6 w-auto" viewBox="0 0 48 32" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="32" rx="4" fill="#000000"/>
          <text x="24" y="20" textAnchor="middle" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="9"> Pay</text>
        </svg>
      </div>

      {/* Google Pay */}
      <div className="flex items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 transition-colors hover:bg-white/[0.06]">
        <svg className="h-5 sm:h-6 w-auto" viewBox="0 0 48 32" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="32" rx="4" fill="#FFFFFF"/>
          <text x="24" y="20" textAnchor="middle" fill="#5F6368" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="9">G Pay</text>
        </svg>
      </div>
    </div>
  )
}
