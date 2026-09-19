import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";

const NewPass = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(
                `${import.meta.env.VITE_CLIENT_API_URL}/api/auth/reset-password`,
                {
                    email,
                    password,
                    confirmPassword
                }
            );

            if (response.data.success) {
                toast.success("Password Updated Successfully");
                navigate("/password-reset-success");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[70vh] bg-[#f7f7f7] flex items-center justify-center px-4 py-12">
            {/* Main Styled Card */}
            <div className="w-full max-w-[440px] bg-white rounded-[24px] p-10 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-[#eeeeee] text-center">
                
                {/* Soft Cream Shield/Lock Icon Badge */}
                <div className="w-14 h-14 bg-[#fef3c7] rounded-2xl inline-flex items-center justify-center mb-5 mx-auto text-[#92400e]">
                    <ShieldCheck size={28} />
                </div>

                {/* Serif Heading */}
                <h2 className="font-serif text-[#111111] text-2xl uppercase tracking-wide mb-2 font-normal">
                    Create New Password
                </h2>
                
                <p className="text-[#666666] text-sm leading-relaxed mb-7">
                    Your new password must be secure and different from previously used passwords.
                </p>

                {/* Form Inputs */}
                <form onSubmit={handleSubmit} className="text-left space-y-5">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-2">
                            New Password *
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                <Lock size={18} />
                            </span>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-[#fafafa] border border-[#e5e7eb] rounded-xl text-sm text-[#111111] placeholder-gray-400 focus:outline-none focus:border-[#064e3b] focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-2">
                            Confirm Password *
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                <Lock size={18} />
                            </span>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-[#fafafa] border border-[#e5e7eb] rounded-xl text-sm text-[#111111] placeholder-gray-400 focus:outline-none focus:border-[#064e3b] focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    {/* Deep Forest Green Action Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#064e3b] hover:bg-[#043829] text-white font-medium py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer disabled:opacity-70 mt-2"
                    >
                        <span>{loading ? "Updating..." : "Update Password"}</span>
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </form>

            </div>
        </div>
    );
};

export default NewPass;