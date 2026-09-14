import React from 'react';
import { CreditCard, Shield, Wifi } from 'lucide-react';

interface Interactive3DBankCardProps {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  isFlipped: boolean;
  cardBrand?: 'visa' | 'mastercard' | 'amex' | 'generic';
}

export const Interactive3DBankCard: React.FC<Interactive3DBankCardProps> = ({
  cardNumber,
  cardHolder,
  expiryDate,
  cvv,
  isFlipped,
  cardBrand = 'visa'
}) => {
  const formattedNumber = cardNumber
    ? cardNumber.padEnd(16, '•').replace(/(.{4})/g, '$1 ').trim()
    : '•••• •••• •••• ••••';

  return (
    <div className="w-full max-w-[380px] h-[215px] mx-auto perspective-1000 select-none">
      <div
        className={`relative w-full h-full rounded-2xl p-6 shadow-2xl transition-transform duration-700 preserve-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* CARD FRONT */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between text-white backface-hidden overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-slate-700/60 shadow-xl"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Holographic background wave */}
          <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-cyan-500/15 blur-xl pointer-events-none" />

          {/* Top Row: Chip, Contactless, Brand */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* EMV Chip */}
              <div className="w-11 h-8 rounded-md bg-gradient-to-tr from-amber-300 via-amber-200 to-yellow-400 border border-amber-400/50 shadow-xs flex flex-col justify-around p-1">
                <div className="w-full h-px bg-amber-500/60" />
                <div className="w-full h-px bg-amber-500/60" />
              </div>
              <Wifi className="w-5 h-5 text-slate-300 rotate-90" />
            </div>

            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-400" />
              <span className="font-display font-bold tracking-wider text-sm text-indigo-200">
                {cardBrand.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Card Number */}
          <div className="relative z-10 my-auto">
            <p className="font-mono text-lg sm:text-xl tracking-[0.2em] font-semibold text-slate-100 drop-shadow-sm">
              {formattedNumber}
            </p>
          </div>

          {/* Bottom Row: Name & Expiry */}
          <div className="relative z-10 flex justify-between items-end text-xs">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Cardholder Name</p>
              <p className="font-semibold tracking-wide text-slate-100 uppercase truncate max-w-[190px]">
                {cardHolder || 'FULL NAME'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Expires</p>
              <p className="font-mono font-semibold text-slate-100">
                {expiryDate || 'MM/YY'}
              </p>
            </div>
          </div>
        </div>

        {/* CARD BACK (CVV strip) */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl flex flex-col justify-between py-6 text-white backface-hidden overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 border border-slate-700/60 shadow-xl"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden'
          }}
        >
          {/* Black Magnetic Strip */}
          <div className="w-full h-11 bg-slate-950 mt-1 shadow-inner" />

          {/* CVV Signature Bar */}
          <div className="px-6 my-auto">
            <div className="flex justify-between items-center text-[10px] text-slate-400 uppercase tracking-wider mb-1">
              <span>Authorized Signature</span>
              <span>CVV / CVC</span>
            </div>
            <div className="flex items-center">
              <div className="flex-1 h-9 bg-slate-200 rounded-l flex items-center px-3 text-slate-600 font-mono text-xs italic">
                Verified Customer Signature
              </div>
              <div className="w-16 h-9 bg-white rounded-r flex items-center justify-center font-mono font-bold text-slate-900 text-sm tracking-widest border-l border-slate-300">
                {cvv || '•••'}
              </div>
            </div>
          </div>

          {/* Security details & Stripe Ready text */}
          <div className="px-6 flex items-center justify-between text-[9px] text-slate-400">
            <span>PCI-DSS 256-Bit Encrypted</span>
            <span className="text-indigo-400 font-semibold">Stripe Secure Core</span>
          </div>
        </div>
      </div>
    </div>
  );
};
