import React, { useState } from 'react';
import {
  Box,
  Mail,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  CreditCard,
  Send,
  Heart,
  ExternalLink,
  Lock,
  Database
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface FooterProps {
  setActivePage: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  const { showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Invalid Email', 'Please provide a valid email address.', 'warning');
      return;
    }
    showToast('Subscribed! 🎉', 'You have unlocked 10% off your first order.', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      {/* Brand Value Pillars / Assurance Bar */}
      <div className="border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-display font-semibold text-xs text-white">Free Worldwide Express</p>
              <p className="text-[11px] text-slate-400">On all orders over $99</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-display font-semibold text-xs text-white">2-Year Official Warranty</p>
              <p className="text-[11px] text-slate-400">Full parts & kinetic coverage</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="font-display font-semibold text-xs text-white">30-Day Hassle-Free Returns</p>
              <p className="text-[11px] text-slate-400">Instant label generation</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="font-display font-semibold text-xs text-white">Stripe 256-bit Security</p>
              <p className="text-[11px] text-slate-400">PCI-DSS Level 1 Compliant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Box className="w-5 h-5" />
              </div>
              <span className="font-display font-black text-xl text-white tracking-tight">
                VORTEX<span className="text-indigo-400">3D</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Next-generation spatial electronics, acoustic spatial soundscapes, and carbon-propulsion footwear engineered for pioneers. Visualized with interactive real-time 3D models.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2 max-w-sm">
              <p className="font-display font-semibold text-xs text-white mb-2">
                Join our Inner Circle — Get 10% Off
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3 h-3" />
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-white mb-4">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage('shop')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Spatial Audio & Studio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage('shop')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Smart Chronographs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage('shop')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Carbon Sneaker Lab
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage('shop')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Spatial Workstations
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage('shop')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  AR Holographic Optics
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-white mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage('orders')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Track Live Orders
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage('support')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Help Center & FAQs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage('support')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Returns & Refunds
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage('addresses')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Shipping Address Book
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage('support')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Developer / Architecture Docs */}
          <div>
            <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-white mb-4">
              Architecture & API
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage('backend-architecture')}
                  className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-medium"
                >
                  <Database className="w-3.5 h-3.5" />
                  Backend Structure & Schemas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage('admin')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Admin Portal UI
                </button>
              </li>
              <li>
                <span className="text-slate-500">Node.js + Express API Specs</span>
              </li>
              <li>
                <span className="text-slate-500">MongoDB Mongoose Models</span>
              </li>
              <li>
                <span className="text-slate-500">Stripe Webhooks & Secrets</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Payment Badges & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Vortex3D Studio Inc. All rights reserved. Built with React & 3D WebGL.</p>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold text-slate-400">Accepted Gateways:</span>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-300">
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">STRIPE</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">VISA</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">MASTERCARD</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">UPI</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">APPLE PAY</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
