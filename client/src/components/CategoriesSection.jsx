import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function CategoriesSection() {
  

  return (
    <section className="py-16 md:py-20 bg-stone-50/50 dark:bg-stone-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
              Terroir & Cultivars
            </span>
            <h2 className="font-serif-tea text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight mt-1">
              Explore by Tea Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-300 transition-colors"
          >
            <span>View Complete Tea Catalog</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            "matcha",
            "green-tea",
            "oolong-tea",
            "herbal",
            "black-tea",
            "white-tea",
            "chamomile",
            "ginger",
            "cinnamon",
            "cardamom",
            "kashmiri-saffron",
            "jasmine",
          ].map((category) => (
            <Link
              key={category}
              to={`/shop?category=${category}`}
              className="flex flex-col items-center gap-2 text-stone-700 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-50 transition-colors"
            >
              <img
                src={`/images/categories/${category}.webp`}
                alt={category}
                className="w-16 h-16 rounded-full object-cover"
              />
              <span className="text-sm font-semibold">{category}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
