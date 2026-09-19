import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, ShieldCheck, Truck, Droplets } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#f4f0e6] dark:bg-[#151d17] border-b border-stone-200/80 dark:border-stone-800 transition-colors">
      {/* Decorative subtle botanical background glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-100/50 dark:bg-emerald-950/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-100/60 dark:bg-amber-950/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/10 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-300 text-xs font-semibold tracking-wide border border-emerald-800/20">
              <Leaf className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Spring First Flush 2025 Reserve Just Landed</span>
            </div>

            <h1 className="font-serif-tea text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-[1.15]">
              Pure Mountain Leaves. <br />
              <span className="text-emerald-800 dark:text-emerald-400 italic">
                Steeped with Reverence.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Direct-trade single estate loose leaf teas, shade-grown ceremonial matcha, and artisanal herbal infusions sourced directly from multi-generational family growers across Uji, Fujian, and Darjeeling.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-amber-50 text-sm font-semibold rounded-2xl shadow-lg shadow-emerald-900/20 hover:shadow-xl transition-all"
              >
                <span>Explore Curated Shop</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 text-sm font-semibold rounded-2xl shadow-sm transition-colors"
              >
                Our Tea Philosophy
              </Link>
            </div>

            {/* Trust pillars */}
            <div className="pt-8 border-t border-stone-200/80 dark:border-stone-800 grid grid-cols-3 gap-4 text-left">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-200">100% Direct Trade</h4>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">Paid 3x fair-trade wages</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Droplets className="w-5 h-5 text-emerald-700 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-200">Nitrogen Sealed</h4>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">Peak aroma locked at harvest</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Truck className="w-5 h-5 text-emerald-700 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-200">Free Ship $50+</h4>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">Carbon neutral dispatch</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Feature */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-stone-800 aspect-[4/5] bg-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=85"
                  alt="Ceremonial Matcha Preparation"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Floating caption card */}
                <div className="absolute bottom-5 inset-x-5 p-4 rounded-2xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border border-white/40 dark:border-stone-700 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        Featured Harvest
                      </span>
                      <h3 className="font-serif-tea text-sm font-semibold text-stone-900 dark:text-stone-100">
                        Uji First Flush Ceremonial Matcha
                      </h3>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400">
                        Stone-ground shade-grown tencha &bull; Kyoto, Japan
                      </p>
                    </div>
                    <Link
                      to="/product/tea-01"
                      className="px-3 py-1.5 bg-emerald-800 text-white rounded-xl text-xs font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                      Taste
                    </Link>
                  </div>
                </div>
              </div>

              {/* Decorative floating badge */}
              <div className="absolute -top-4 -left-4 p-3 bg-amber-50 dark:bg-stone-800 border border-amber-200 dark:border-stone-700 rounded-2xl shadow-xl hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center font-serif text-lg font-bold">
                  98
                </div>
                <div className="text-left pr-2">
                  <div className="text-xs font-bold text-stone-900 dark:text-stone-100">Cupping Score</div>
                  <div className="text-[10px] text-stone-500 dark:text-stone-400">Certified Sommelier rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
