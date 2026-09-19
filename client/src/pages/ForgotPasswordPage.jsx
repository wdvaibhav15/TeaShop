import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react'; // Or use standard SVGs

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`${import.meta.env.VITE_CLIENT_API_URL}/api/auth/forgot-password`, { email });
      if (data.success) {
        // Redirect to OTP verification page, passing the email state
        navigate('/verify-otp', { state: { email } });
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center p-4">
      {/* Main Container Card */}
      <div className="w-full max-w-[440px] bg-white rounded-[24px] p-10 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-[#eeeeee] text-center">
        
        {/* Cream Key Icon Badge */}
        <div className="w-14 h-14 bg-[#fef3c7] rounded-2xl inline-flex items-center justify-center mb-5 mx-auto">
          <span className="text-2xl">🔑</span>
        </div>

        {/* Heading matching the serif style */}
        <h2 className="font-serif text-[#111111] text-2xl uppercase tracking-wide mb-2 font-normal">
          Reset Your Password
        </h2>
        
        <p className="text-[#666666] text-sm leading-relaxed mb-7">
          Enter your registered email to receive a secure recovery verification.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="text-left">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-2">
            Email Address *
          </label>
          
          <div className="relative mb-6">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Mail size={18} />
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. customer@teashop.com"
              className="w-full pl-11 pr-4 py-3 bg-[#fafafa] border border-[#e5e7eb] rounded-xl text-sm text-[#111111] placeholder-gray-400 focus:outline-none focus:border-[#064e3b] focus:bg-white transition-all"
            />
          </div>

          {/* Deep Forest Green Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#064e3b] hover:bg-[#043829] text-white font-medium py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer disabled:opacity-70"
          >
            <span>{loading ? 'Sending...' : 'Send Reset Instructions'}</span>
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        {/* Back to Sign In Link */}
        <div className="mt-8 pt-6 border-t border-[#f0f0f0]">
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 text-xs font-medium text-[#666666] hover:text-[#111111] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Sign In</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;