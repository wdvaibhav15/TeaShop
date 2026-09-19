import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

import ProductCard from "./ProductCard";

const FeaturedProductsSection = () => {
  
  const [activeFilter, setActiveFilter] = useState("all");

  const filterTabs = [
    { id: "all", label: "Curator's Choice" },
    { id: "matcha", label: "Matcha" },
    { id: "green-tea", label: "Green Teas" },
    { id: "oolong-tea", label: "Oolongs" },
    { id: "herbal", label: "Herbal Tisanes" },
  ];

  

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Spring & Autumn Selections</span>
          </div>
          <h2 className="font-serif-tea text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight mt-1">
            Featured Artisanal Harvests
          </h2>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === tab.id
                  ? "bg-emerald-800 text-white shadow-sm"
                  : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        featureproducts
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-emerald-700 text-stone-800 dark:text-stone-200 text-sm font-semibold shadow-sm hover:shadow transition-all"
        >
          <span>Discover All product length Small-Batch Teas</span>
          <ArrowRight className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
        </Link>
      </div>
    </section>
  );
}


export default FeaturedProductsSection;