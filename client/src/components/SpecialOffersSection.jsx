import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tag, Copy, Check, Gift, Timer, Sparkles } from "lucide-react";


const SpecialOffersSection =() => {
  
  const [copiedCode, setCopiedCode] = useState(null);

  // Simple countdown timer for Autumn Tea Sale
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Coupon "${code}" copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 text-amber-50 p-8 sm:p-12 shadow-2xl border border-emerald-800/40">
        {/* Background botanical subtle circles */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text and Timer */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-amber-300 text-xs font-bold uppercase tracking-wider border border-emerald-700">
              <Gift className="w-3.5 h-3.5" />
              <span>Autumn Tea Solstice Event</span>
            </div>

            <h2 className="font-serif-tea text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Enjoy 15% to 20% Off <br />
              <span className="text-amber-300">Single-Estate Reserves</span>
            </h2>

            <p className="text-stone-300 text-sm max-w-lg leading-relaxed">
              Celebrate the changing season with our hand-curated orthodox selections. Use exclusive promo codes at checkout for instant discounts and complimentary shipping.
            </p>

            {/* Countdown Blocks */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-stone-400 mr-2">
                <Timer className="w-4 h-4 text-amber-400" />
                <span>Offer ends in:</span>
              </div>
              <div className="flex items-center gap-2 text-center">
                <div className="bg-emerald-900/90 border border-emerald-700/60 rounded-xl px-3 py-2 min-w-[52px]">
                  <span className="text-lg font-bold text-white block">{timeLeft.days}</span>
                  <span className="text-[10px] text-emerald-300 uppercase font-semibold">Days</span>
                </div>
                <span className="text-emerald-500 font-bold">:</span>
                <div className="bg-emerald-900/90 border border-emerald-700/60 rounded-xl px-3 py-2 min-w-[52px]">
                  <span className="text-lg font-bold text-white block">{timeLeft.hours}</span>
                  <span className="text-[10px] text-emerald-300 uppercase font-semibold">Hours</span>
                </div>
                <span className="text-emerald-500 font-bold">:</span>
                <div className="bg-emerald-900/90 border border-emerald-700/60 rounded-xl px-3 py-2 min-w-[52px]">
                  <span className="text-lg font-bold text-white block">{timeLeft.minutes}</span>
                  <span className="text-[10px] text-emerald-300 uppercase font-semibold">Mins</span>
                </div>
                <span className="text-emerald-500 font-bold">:</span>
                <div className="bg-emerald-900/90 border border-emerald-700/60 rounded-xl px-3 py-2 min-w-[52px]">
                  <span className="text-lg font-bold text-white block">{timeLeft.seconds}</span>
                  <span className="text-[10px] text-emerald-300 uppercase font-semibold">Secs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Coupon Cards */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-stone-400 font-bold">
              Available Store Vouchers
            </h4>

            coupens

            <div className="text-right pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 underline"
              >
                Apply code in Cart &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpecialOffersSection;