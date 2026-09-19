import React from "react";
import { Link } from "react-router-dom";
import { Compass, Home, ShoppingBag } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="py-24 max-w-md mx-auto px-4 text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto">
        <Compass className="w-10 h-10 text-emerald-700 dark:text-emerald-400 animate-spin-slow" />
      </div>

      <div className="space-y-2">
        <span className="font-serif-tea text-5xl font-bold text-stone-900 dark:text-stone-100 block">
          404
        </span>
        <h1 className="font-serif-tea text-2xl font-bold text-stone-900 dark:text-stone-100">
          This Mountain Path Has Ended
        </h1>
        <p className="text-xs text-stone-500">
          The page or tea cultivar you are looking for has either retired with the season or was moved.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold hover:bg-stone-50 transition-colors"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Browse Teas</span>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage
