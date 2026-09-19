import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, Shield, Sparkles, Heart } from "lucide-react";


export default function Footer() {

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-800 text-amber-100 flex items-center justify-center font-serif text-xl font-bold shadow-md">
                葉
              </div>
              <div>
                <span className="font-serif-tea text-2xl font-bold tracking-tight text-stone-100 block leading-none">
                  Camellia Leaf
                </span>
                <span className="text-[11px] tracking-widest text-emerald-400 font-semibold uppercase">
                  Artisanal Tea Co.
                </span>
              </div>
            </Link>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              We travel directly to single-estate family gardens in Japan, China, Taiwan, and India to curate pure orthodox loose-leaf harvests and stone-ground ceremonial matcha.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-stone-800 text-emerald-400 border border-stone-700">
                <Shield className="w-3 h-3" /> 100% Direct-Trade
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-stone-800 text-emerald-400 border border-stone-700">
                <Sparkles className="w-3 h-3" /> Nitrogen Sealed
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif-tea text-sm font-semibold text-stone-100 tracking-wider uppercase">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link to="/shop" className="hover:text-emerald-400 transition-colors">
                  All Loose Leaf Teas
                </Link>
              </li>
              <li>
                <Link to="/shop?category=matcha" className="hover:text-emerald-400 transition-colors">
                  Ceremonial Matcha
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                  Our Origin Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors">
                  Teahouse & Tasting Bar
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-emerald-400 transition-colors">
                  Customer Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-amber-400 transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-serif-tea text-sm font-semibold text-stone-100 tracking-wider uppercase">
              Collections
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              categories
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-serif-tea text-sm font-semibold text-stone-100 tracking-wider uppercase">
              Tea Sanctuary
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>address</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <a className="hover:text-emerald-300">
                  setting email contact
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>settings.contactPhone</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Tue - Sun: 8:00 AM - 6:00 PM PST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & payment trust */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} storename. All rights reserved. Single-estate harvests.
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Stripe Encrypted</span>
            <span>&bull;</span>
            <span>Cash On Delivery</span>
            <span>&bull;</span>
            <span className="flex items-center gap-1 text-emerald-400">
              Steeped with <Heart className="w-3 h-3 fill-current text-rose-500" /> & Reverence
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
