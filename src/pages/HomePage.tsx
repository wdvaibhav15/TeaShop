import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Zap,
  Star,
  Flame,
  Clock,
  TrendingUp,
  Shield,
  Rotate3D,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Watch,
  Footprints,
  Laptop,
  Eye,
  CheckCircle,
  Truck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, BRANDS, TESTIMONIALS } from '../constants/data';
import { Product3DCard } from '../components/3d/Product3DCard';
import { Model3DViewer } from '../components/3d/Model3DViewer';
import { Product } from '../types';

interface HomePageProps {
  setActivePage: (page: string) => void;
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (categoryName: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActivePage,
  onSelectProduct,
  onSelectCategory
}) => {
  const { products, formatPrice, addToCart } = useApp();

  // Flash Sale Timer Countdown (Hours, Mins, Secs)
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Hero Carousel slides
  const heroProducts = products.filter(p => p.isFeatured).slice(0, 3);
  const [heroIndex, setHeroIndex] = useState(0);

  const activeHeroProduct = heroProducts[heroIndex] || products[0];

  const featuredList = products.filter(p => p.isFeatured);
  const bestSellers = products.filter(p => p.isBestSeller);
  const trendingList = products.filter(p => p.isTrending);
  const newArrivals = products.filter(p => p.isNewArrival);
  const flashSaleList = products.filter(p => p.isFlashSale);

  return (
    <div className="space-y-16 pb-16">
      {/* HERO BANNER SECTION (Interactive 3D Stage) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950/20 via-slate-900/10 to-transparent dark:from-indigo-950/40 dark:via-slate-950 dark:to-slate-950 pt-8 pb-12 sm:pb-16 border-b border-slate-200/50 dark:border-slate-800/80">
        {/* Ambient background glow orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-indigo-500" />
                Next-Gen Spatial E-Commerce
              </div>

              <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                Immerse In <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-400 to-cyan-400">
                  Spatial 3D Gear
                </span>
              </h1>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                Explore acoustic audio drivers, titanium micro-chronographs, and carbon fiber sneakers in interactive 360° 3D before you buy. Powered by precision engineering.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setActivePage('shop')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
                >
                  Explore 3D Store Catalog
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onSelectProduct(activeHeroProduct)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-indigo-500 text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Rotate3D className="w-4 h-4 text-indigo-500" />
                  Inspect Featured Model
                </button>
              </div>

              {/* Quick stats / Social proof */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-slate-800/80 text-left">
                <div>
                  <p className="font-display font-black text-xl sm:text-2xl text-slate-900 dark:text-white">
                    4.9 / 5
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Over 12,000+ Verified Reviews
                  </p>
                </div>
                <div>
                  <p className="font-display font-black text-xl sm:text-2xl text-slate-900 dark:text-white">
                    360° 3D
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Interactive Real-Time Canvas
                  </p>
                </div>
                <div>
                  <p className="font-display font-black text-xl sm:text-2xl text-slate-900 dark:text-white">
                    2-Day
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Free Worldwide Express Delivery
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Right 3D Showcase & Carousel Slider */}
            <div className="lg:col-span-6 flex flex-col items-center z-10">
              <div className="w-full max-w-lg bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-2xl relative">
                {/* 3D Model Canvas View */}
                <Model3DViewer
                  modelType={activeHeroProduct.model3DType || 'headphone'}
                  productName={activeHeroProduct.name}
                  accentColor="#6366f1"
                />

                {/* Hero Product Quick Specs & CTA */}
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">
                      {activeHeroProduct.brand}
                    </span>
                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-white truncate max-w-[220px]">
                      {activeHeroProduct.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-display font-black text-lg text-slate-900 dark:text-white">
                        {formatPrice(activeHeroProduct.price)}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        {formatPrice(activeHeroProduct.originalPrice)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => addToCart(activeHeroProduct, 1)}
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-transform active:scale-95"
                    >
                      Add To Cart
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectProduct(activeHeroProduct)}
                      className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                      title="Inspect Product"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Hero Slide Switcher Dots */}
                <div className="flex items-center justify-center gap-2 mt-3 pt-2">
                  {heroProducts.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setHeroIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        heroIndex === idx
                          ? 'w-8 bg-indigo-600'
                          : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Curated Collections
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
              Shop by Category
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setActivePage('shop')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline mt-2 sm:mt-0 flex items-center gap-1"
          >
            Explore All Categories <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map(cat => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className="group relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer p-3 flex flex-col justify-between"
            >
              <div className="relative w-full pt-[85%] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <span className="absolute bottom-2 left-2 text-[11px] font-bold text-white px-2 py-0.5 rounded-md bg-slate-900/60 backdrop-blur-md">
                  {cat.itemCount} items
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FLASH SALE COUNTDOWN SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-rose-900/90 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white border border-rose-500/20 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-rose-500/20 blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Flame className="w-3.5 h-3.5 fill-current animate-bounce" />
                Limited Time Flash Deals
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                Up to 40% Off Spatial Series
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md">
                Strict allocation pricing ends when countdown reaches zero or stock exhausts.
              </p>
            </div>

            {/* Countdown Box */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
                <span className="font-mono font-black text-xl text-white">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Hours</span>
              </div>
              <span className="font-black text-xl text-rose-400">:</span>
              <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
                <span className="font-mono font-black text-xl text-white">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Mins</span>
              </div>
              <span className="font-black text-xl text-rose-400">:</span>
              <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
                <span className="font-mono font-black text-xl text-rose-400 animate-pulse">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Secs</span>
              </div>
            </div>
          </div>

          {/* Flash Sale Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8 relative z-10">
            {flashSaleList.map(prod => (
              <Product3DCard
                key={prod.id}
                product={prod}
                onNavigateToDetail={onSelectProduct}
                featuredMode
              />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED 3D PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Flagship Lineup
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
              Featured 3D Masterpieces
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setActivePage('shop')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            View All ({products.length}) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredList.map(prod => (
            <Product3DCard
              key={prod.id}
              product={prod}
              onNavigateToDetail={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* BEST SELLERS & TRENDING TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Trending & Best Sellers
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Customer favorites ranked by community reviews and telemetry metrics.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActivePage('shop')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            See More <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map(prod => (
            <Product3DCard
              key={prod.id}
              product={prod}
              onNavigateToDetail={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* BRAND SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-100 dark:bg-slate-900/60 p-8 border border-slate-200/80 dark:border-slate-800 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Engineered in Collaboration With
          </span>
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mt-1 mb-6">
            Industry Pioneer Brands
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {BRANDS.map(b => (
              <div
                key={b}
                className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-display font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-300 shadow-xs hover:border-indigo-500 hover:text-indigo-600 transition-colors select-none"
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Real Feedback
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
            Loved by 12,000+ Creators Worldwide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(t => (
            <div
              key={t.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
                />
                <div>
                  <h4 className="font-display font-semibold text-xs text-slate-900 dark:text-white">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
