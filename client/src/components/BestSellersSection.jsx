import React from "react";
import { Link } from "react-router-dom";
import { Flame, Star, ShoppingBag, Thermometer, Clock } from "lucide-react";


const BestSellersSection =() => {
  

  

  return (
    <section className="py-16 bg-stone-100/70 dark:bg-stone-900/40 border-y border-stone-200/80 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Customer Reverence</span>
          </div>
          <h2 className="font-serif-tea text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
            Our Most Celebrated Teas
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm mt-2">
            The daily rituals of tea lovers worldwide, recognized for extraordinary liquor clarity, layered aromatic notes, and smooth finish.
          </p>
        </div>

        {/* 3-Column Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          bextseller
        </div>
      </div>
    </section>
  );
}

export default BestSellersSection;
