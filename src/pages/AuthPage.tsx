import React, { useState } from 'react';
import {
  Lock,
  Mail,
  User as UserIcon,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Box,
  KeyRound,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AuthPageProps {
  onSuccess: () => void;
  defaultMode?: 'login' | 'register' | 'forgot';
}

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccess, defaultMode = 'login' }) => {
  const { login, signup, showToast } = useApp();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(defaultMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('alex.rivera@vortex3d.io');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'forgot') {
      if (!email || !email.includes('@')) {
        showToast('Invalid Email', 'Please enter a valid email address.', 'warning');
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setForgotSent(true);
        showToast('Reset Link Dispatched', 'Check your inbox for password reset instructions.', 'success');
      }, 800);
      return;
    }

    if (mode === 'register' && !name.trim()) {
      showToast('Name Required', 'Please enter your full name.', 'warning');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (mode === 'login') {
        login(email, password);
      } else {
        signup(name, email, password);
      }
      onSuccess();
    }, 600);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login(`${provider.toLowerCase()}user@vortex3d.io`, 'pass123');
      showToast('Social Auth Connected', `Authenticated via ${provider}.`, 'success');
      onSuccess();
    }, 500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Brand Icon Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/25">
            <Box className="w-6 h-6" />
          </div>
          <h1 className="font-display font-black text-2xl text-slate-900 dark:text-white">
            {mode === 'login' && 'Sign In to Vortex3D'}
            {mode === 'register' && 'Create Your Account'}
            {mode === 'forgot' && 'Reset Password'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {mode === 'login' && 'Access your orders, saved 3D presets, and wishlist'}
            {mode === 'register' && 'Join 12,000+ creators and unlock exclusive member perks'}
            {mode === 'forgot' && 'Enter your email to receive recovery instructions'}
          </p>
        </div>

        {/* Quick Role Tester Pills */}
        <div className="mb-6 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-between text-xs">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 pl-1">
            Demo Credentials:
          </span>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => {
                setEmail('alex.rivera@vortex3d.io');
                setName('Alex Rivera');
              }}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium text-[11px] hover:text-indigo-600"
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail('admin@vortex3d.io');
                setName('System Director');
              }}
              className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-semibold text-[11px]"
            >
              Admin Demo
            </button>
          </div>
        </div>

        {/* Forgot Password Success State */}
        {mode === 'forgot' && forgotSent ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              We've dispatched a secure recovery link to <strong>{email}</strong>.
            </p>
            <button
              type="button"
              onClick={() => {
                setForgotSent(false);
                setMode('login');
              }}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          /* Main Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="alex@vortex3d.io"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-9 pr-10 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-indigo-600"
                  />
                  <span>Keep me signed in</span>
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'login' && 'Sign In'}
                  {mode === 'register' && 'Create Free Account'}
                  {mode === 'forgot' && 'Dispatch Reset Link'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Social Authentication */}
        {mode !== 'forgot' && (
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center space-y-3">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              Or Authenticate With
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Google
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('Apple')}
                className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Apple
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('GitHub')}
                className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                GitHub
              </button>
            </div>
          </div>
        )}

        {/* Toggle between Login and Register */}
        <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          {mode === 'login' && (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Sign Up
              </button>
            </p>
          )}
          {mode === 'register' && (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
          {mode === 'forgot' && (
            <p>
              Remember your password?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Back to Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
