import React from "react";
import { ArrowRight, Star, Clock, Thermometer } from "lucide-react";
import bestSeller from "../../media/20.jpg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BestSellersSection = () => {
  const navigate = useNavigate();
  const handleExploreCollection = () => {
    toast.success("Explore Here !");
    navigate("/menu");
  };

  return (
    <section className="py-8 bg-stone-100/70 dark:bg-stone-900/40 border-y border-stone-200/80 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 text-xs uppercase tracking-wider font-semibold">
            Customer Reverence
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl font-serif-tea font-bold text-stone-900 dark:text-stone-100">
            Our Most Celebrated
          </h2>
        </div>

        {/* Featured Tea */}
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8  items-center">
          {/* Image */}
          <div className="group">
            <div 
            onClick={handleExploreCollection}
            className="relative overflow-hidden rounded-3xl">
              <img
                
                src={bestSeller}
                alt="Tea"
                className="w-full h-[340px] object-cover cursor-pointer transition-transform duration-500 group-hover:animate-[bubble3D_0.5s_infinite_ease-in-out]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

              <div className="absolute bottom-5 left-5 text-white">
                <p className="text-xs uppercase tracking-widest">
                  Signature Collection
                </p>

                <h3 className="text-3xl font-serif-tea font-bold">
                  Himalayan Emerald
                </h3>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Rating */}
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-amber-400 text-amber-400"
                />
              ))}

              <span className="text-stone-400 ml-2">
                4.7 / 5 Customer Rating
              </span>
            </div>

            {/* Heading */}
            <div>
              <span className="text-emerald-400 uppercase tracking-[0.25em] text-xs">
                Himalayan Signature
              </span>

              <h3 className="mt-2 text-xl lg:text-2xl font-serif-tea font-bold leading-tight text-white">
                Crafted Among The
                <span className="block text-amber-400">
                  Himalayan Highlands
                </span>
              </h3>
            </div>

            {/* Description */}
            <p className="text-stone-400 leading-relaxed text-sm">
              A refined Himalayan coffee with delicate floral notes, vibrant
              freshness, and a smooth lingering finish.
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 hover:border-emerald-500 transition-all">
                <Clock className="w-5 h-5 text-amber-400 mb-2" />
                <p className="text-xs text-stone-500">Brewing Time</p>
                <p className="font-semibold text-white">3-4 Min</p>
              </div>

              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 hover:border-emerald-500 transition-all">
                <Thermometer className="w-5 h-5 text-amber-400 mb-2" />
                <p className="text-xs text-stone-500">Temperature</p>
                <p className="font-semibold text-white">80°C</p>
              </div>

              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 hover:border-emerald-500 transition-all">
                <Star className="w-5 h-5 text-amber-400 mb-2" />
                <p className="text-xs text-stone-500">Origin</p>
                <p className="font-semibold text-white">Darjeeling</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={handleExploreCollection}
                className="group px-7 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-full text-white font-medium transition-all flex items-center gap-2 cursor-pointer"
              >
                Explore Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <span className="text-2xl font-bold text-amber-400">₹199</span>

              <span className="text-stone-500 line-through">₹249</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;
