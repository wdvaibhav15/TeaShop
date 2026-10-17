
import React from "react";
import {
  Coffee,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminWelcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A120E] text-[#F3EFE6] flex flex-col justify-between p-6 relative overflow-hidden font-sans">

      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1E3E30]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#C88A4B]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Custom Coffee Animation */}
      <style>{`
        @keyframes cupFloat {
          0%, 100% {
            transform: translateY(0) rotate(-2deg);
          }
          50% {
            transform: translateY(-14px) rotate(2deg);
          }
        }

        @keyframes steamRise {
          0% {
            opacity: 0;
            transform: translateY(12px) scaleY(0.7);
          }
          35% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translateY(-30px) scaleY(1.2);
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.35;
            transform: scale(0.9);
          }
          50% {
            opacity: 0.75;
            transform: scale(1.1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .coffee-cup-animation,
          .coffee-steam,
          .coffee-glow {
            animation: none !important;
          }
        }
      `}</style>

      {/* Header */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 shrink-0 rounded-xl bg-[#172D23] border border-[#264436] flex items-center justify-center shadow-lg">
            <Coffee className="w-5 h-5 text-[#C88A4B]" />
          </div>

          <span className="font-serif font-bold text-lg sm:text-xl tracking-wide text-[#FDFBF7]">
            Camellia Leaf
          </span>
        </div>

        <div>
          <span 
          
          className="text-[10px] sm:text-xs font-mono tracking-widest text-[#A1B8AD] uppercase bg-[#172D23]/60 px-3 py-1.5 rounded-full border border-[#264436] whitespace-nowrap">
          Admin Portal
        </span>

        <button 
        onClick={() => window.location.href = 'http://localhost:5174/'}
        className="cursor-pointer ml-3 text-[10px] text-semibold sm:text-xs font-mono tracking-widest text-[#A1B8AD] uppercase bg-[#172D23]/60 hover:bg-[#B77B3F] hover:text-[#14261E] px-3 py-1.5 rounded-full border border-[#264436] whitespace-nowrap">
          User Panel
        </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-2xl mx-auto text-center z-10 my-auto py-10 sm:py-0">

        {/* Animated Coffee Cup */}
        <div className="relative mx-auto mb-8 w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center">

          {/* Background Glow */}
          <div className="coffee-glow absolute inset-5 rounded-full bg-[#C88A4B]/20 blur-2xl"
            style={{
              animation: "glowPulse 3s ease-in-out infinite",
            }}
          />

          {/* Decorative Ring */}
          <div className="absolute inset-3 rounded-full border border-[#C88A4B]/20" />

          <div className="absolute inset-7 rounded-full border border-[#264436]/80" />

          {/* Steam */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 flex gap-3">
            {[0, 1, 2].map((steam) => (
              <span
                key={steam}
                className="coffee-steam block w-1.5 h-9 rounded-full bg-gradient-to-t from-[#C88A4B]/70 to-[#E5D7B7]/10"
                style={{
                  animation: `steamRise 2s ease-in-out ${steam * 0.45}s infinite`,
                  filter: "blur(1px)",
                }}
              />
            ))}
          </div>

          {/* Large Animated Cup */}
          <div
            className="coffee-cup-animation relative flex items-center justify-center"
            style={{
              animation: "cupFloat 3.5s ease-in-out infinite",
            }}
          >
            {/* Cup Body */}
            <div className="relative w-28 h-24 sm:w-36 sm:h-28 rounded-b-[2.5rem] rounded-t-lg bg-gradient-to-br from-[#F3E4C8] via-[#E5D7B7] to-[#C88A4B] shadow-[0_18px_35px_rgba(0,0,0,0.4)] border border-[#FDFBF7]/30">

              {/* Coffee Surface */}
              <div className="absolute -top-2 left-0 right-0 h-5 rounded-[50%] bg-[#2A1710] border-[4px] border-[#C88A4B] shadow-inner" />

              {/* Coffee Art */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[#E5D7B7] text-xl">
                ♥
              </div>

              {/* Cup Shine */}
              <div className="absolute left-3 top-5 bottom-5 w-2 rounded-full bg-white/30 blur-[1px]" />

              {/* Cup Handle */}
              <div className="absolute -right-7 top-5 w-10 h-12 rounded-r-2xl border-[7px] border-[#C88A4B] border-l-0" />

              {/* Brand Mark */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <Coffee className="w-7 h-7 text-[#284634]" strokeWidth={1.8} />
              </div>
            </div>
          </div>

          {/* Floating Coffee Beans */}
          <span className="absolute top-6 left-5 text-2xl text-[#C88A4B] opacity-80 rotate-[-35deg]">
            ☕
          </span>

          <span className="absolute bottom-10 right-3 text-xl text-[#E5D7B7] opacity-70 rotate-12">
            ✦
          </span>

          <span className="absolute bottom-5 left-8 text-lg text-[#C88A4B] opacity-70">
            ✦
          </span>
        </div>

        {/* Access Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#172D23] border border-[#264436] text-[#C88A4B] text-xs font-medium mb-3 shadow-inner">
          <ShieldCheck className="w-4 h-2" />
          <span>Authorized Staff Access Only</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-white mb-4 leading-tight">
          Welcome to
          <br />
          <span className="text-[#E5D7B7]">
            Camellia Leaf Management
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-[#A1B8AD] max-w-lg mx-auto leading-relaxed mb-4">
          Streamline daily store operations, menu curation,
          inventory tracking, and sales insights from one
          secure hub.
        </p>

        {/* Login Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full py-3.5 px-6 mb-4 rounded-xl bg-[#C88A4B] hover:bg-[#B77B3F] text-[#14261E] font-semibold text-sm transition-all shadow-lg hover:shadow-[#C88A4B]/20 active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Admin Login</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto text-center text-xs text-[#638071] z-10 pt-6 border-t border-[#264436]/40">
        <p>
          © {new Date().getFullYear()} Camellia Leaf Artisanal Cafe System.
          All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default AdminWelcome;
