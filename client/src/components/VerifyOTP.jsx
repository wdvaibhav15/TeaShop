import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ShieldCheck, KeyRound, ArrowRight, ArrowLeft } from "lucide-react";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp) {
      return toast.error("Please enter OTP");
    }

    try {
      setLoading(true);

      const response = await axios.post(
         `${import.meta.env.VITE_CLIENT_API_URL}/api/auth/verify-otp`,
        {
          email,
          otp,
        }
      );

      if (response.data.success) {
        toast.success("OTP Verified Successfully");

        navigate("/new-password", {
          state: { email },
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 max-w-md mx-auto px-4 sm:px-6">
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 border border-stone-200 dark:border-stone-800 shadow-xl space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-7 h-7 text-emerald-700 dark:text-emerald-400" />
          </div>

          <h1 className="font-serif-tea text-3xl font-bold text-stone-900 dark:text-stone-100">
            Verify OTP
          </h1>

          <p className="text-xs text-stone-500">
            We've sent a 6-digit verification code to
          </p>

          <p className="text-sm font-semibold text-emerald-700 break-all">
            {email}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleVerify} className="space-y-5">
          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-2">
              Enter OTP *
            </label>

            <div className="relative">
              <KeyRound className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />

              <input
                type="text"
                maxLength={6}
                required
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, ""))
                }
                placeholder="Enter 6 digit OTP"
                className="w-full pl-10 pr-3 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Verifying..." : "Verify OTP"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer */}
        <div className="text-center pt-2">
          <Link
            to="/forgot-password"
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-emerald-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;