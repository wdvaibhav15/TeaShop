import React from 'react';
import { Coffee, ArrowRight, ShieldCheck, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminWelcome = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0A120E] text-[#F3EFE6] flex flex-col justify-between p-6 relative overflow-hidden font-sans">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1E3E30]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#C88A4B]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header / Brand Badge */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#172D23] border border-[#264436] flex items-center justify-center text-[#E5D7B7] shadow-lg">
            <Coffee className="w-5 h-5 text-[#C88A4B]" />
          </div>
          <span className="font-serif font-bold text-xl tracking-wide text-[#FDFBF7]">
            Camellia Leaf
          </span>
        </div>

        <span className="text-xs font-mono tracking-widest text-[#A1B8AD] uppercase bg-[#172D23]/60 px-3 py-1.5 rounded-full border border-[#264436]">
          Admin Portal
        </span>
      </header>

      {/* Main Center Content Showcase */}
      <main className="w-full max-w-2xl mx-auto text-center z-10 my-auto py-12">
        {/* Subtle Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#172D23] border border-[#264436] text-[#C88A4B] text-xs font-medium mb-6 shadow-inner">
          <ShieldCheck className="w-4 h-4" />
          <span>Authorized Staff Access Only</span>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-white mb-4 leading-tight">
          Welcome to <br />
          <span className="text-[#E5D7B7]">Camellia Leaf Management</span>
        </h1>

        <p className="text-base sm:text-lg text-[#A1B8AD] max-w-lg mx-auto leading-relaxed mb-10">
          Streamline daily store operations, menu curation, inventory tracking, and sales insights from one secure hub.
        </p>

        {/* Action Buttons: Login & Registration */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">

          <button
            type="button"
            onClick={() => navigate("/registration")}
            className="w-full sm:w-1/2 py-3.5 px-6 rounded-xl bg-[#172D23] hover:bg-[#234938] text-white font-semibold text-sm border border-[#264436] hover:border-[#3A6B53] transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-[#A1B8AD]" />
            <span>Register Store</span>
          </button>

          
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full sm:w-1/2 py-3.5 px-6 rounded-xl bg-[#C88A4B] hover:bg-[#B77B3F] text-[#14261E] font-semibold text-sm transition-all shadow-lg hover:shadow-[#C88A4B]/20 active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Admin Login</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

        </div>
      </main>

      {/* Simple Footer */}
      <footer className="w-full max-w-5xl mx-auto text-center text-xs text-[#638071] z-10 pt-6 border-t border-[#264436]/40">
        <p>© {new Date().getFullYear()} Camellia Leaf Artisanal Cafe System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AdminWelcome;