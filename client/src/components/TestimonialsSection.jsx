import React from "react";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "../data/mockData";

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-stone-50/70 dark:bg-stone-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
            Tea Enthusiasts & Sommeliers
          </span>
          <h2 className="font-serif-tea text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight mt-1">
            Words From Our Steeping Community
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm mt-2">
            Discerning tea drinkers, sensory researchers, and ritualists who appreciate the purity of unblended single-harvest leaves.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative"
            >
              <Quote className="w-8 h-8 text-emerald-800/15 dark:text-emerald-400/20 absolute top-6 right-6" />

              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-stone-200 dark:border-stone-700"
                />
                <div>
                  <h4 className="font-serif-tea text-sm font-bold text-stone-900 dark:text-stone-100">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">{t.role}</p>
                  <p className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
                    Favorite: {t.favorite}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
