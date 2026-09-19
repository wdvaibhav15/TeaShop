import React, { useState } from "react";
import { Mail, CheckCircle, Sparkles } from "lucide-react";


const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address.", "error");
      return;
    }
    setSubscribed(true);
    showToast("Welcome to the Tea Society! Use code 'WELCOME15' for 15% off.");
  };

  return (
    <section className="py-16 md:py-20 bg-stone-900 text-stone-100 border-t border-stone-800 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-semibold uppercase tracking-wider border border-emerald-800/80 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>The Camellia Society</span>
        </div>

        <h2 className="font-serif-tea text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
          Join Our Quiet Steeping Circle
        </h2>

        <p className="text-stone-400 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
          Receive seasonal harvest notes, private micro-lot releases, and an immediate 15% off voucher code for your first artisanal tin.
        </p>

        {subscribed ? (
          <div className="bg-emerald-900/60 border border-emerald-700/80 rounded-2xl p-6 max-w-md mx-auto flex items-center justify-center gap-3">
            <CheckCircle className="w-6 h-6 text-amber-300 flex-shrink-0" />
            <div className="text-left">
              <div className="text-sm font-bold text-white">Thank you for subscribing!</div>
              <div className="text-xs text-stone-300">
                Your 15% voucher code is:{" "}
                <span className="font-mono font-bold text-amber-300">WELCOME15</span>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-stone-400 absolute left-4 top-3.5" />
              <input
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-stone-800 border border-stone-700 text-white placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-700 hover:bg-emerald-600 active:scale-95 text-white text-sm font-semibold rounded-2xl shadow-lg transition-all"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-[11px] text-stone-500 mt-4">
          We respect your peace. Only occasional letters when rare tea seasons break. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

export default NewsletterSection;
