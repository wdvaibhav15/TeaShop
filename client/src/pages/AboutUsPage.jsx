import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Award, Compass, Heart, Globe, CheckCircle } from "lucide-react";
import { TEAM_MEMBERS } from "../data/mockData";

const AboutUsPage = () => {
  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Hero / Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold tracking-wide">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>Founded in 2018 &bull; Heritage Tea Quarter</span>
          </div>

          <h1 className="font-serif-tea text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
            Reviving Ancient Tea Traditions for the Modern Mind.
          </h1>

          <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg leading-relaxed">
            Camellia Leaf began with a solitary journey through the misty mountains of Uji and the cloud-capped slopes of Darjeeling. We saw that industrialization had stripped tea of its soul, blending inferior dust into paper bags.
          </p>

          <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
            We pledged to do the opposite: honor the botanical integrity of <em>Camellia sinensis</em>. We bypass corporate middlemen, buying entire single-estate seasonal flushes directly from family farmers who respect organic, biodynamic mountain soil.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-stone-200 dark:border-stone-800">
            <div>
              <div className="font-serif-tea text-3xl font-bold text-emerald-800 dark:text-emerald-400">
                100%
              </div>
              <div className="text-xs text-stone-500">Direct Farm Trade</div>
            </div>
            <div>
              <div className="font-serif-tea text-3xl font-bold text-emerald-800 dark:text-emerald-400">
                24+
              </div>
              <div className="text-xs text-stone-500">Single-Estate Gardens</div>
            </div>
            <div>
              <div className="font-serif-tea text-3xl font-bold text-emerald-800 dark:text-emerald-400">
                0g
              </div>
              <div className="text-xs text-stone-500">Artificial Additives</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-stone-800">
            <img
              src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1000&q=80"
              alt="Tea Plantation Misty Ridges"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-md text-xs">
              <span className="font-bold text-emerald-800 dark:text-emerald-400 block">
                Nantou County, High Altitude
              </span>
              <span className="text-stone-600 dark:text-stone-300">
                Where our roasted oolongs are sun-wilted and hand-rolled over 18 hours.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-stone-100/70 dark:bg-stone-900/50 rounded-3xl p-8 sm:p-12 border border-stone-200/80 dark:border-stone-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-800 text-amber-100 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif-tea text-2xl font-bold text-stone-900 dark:text-stone-100">
              Our Guiding Mission
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              To provide uncompromised, laboratory-tested loose-leaf teas with complete origin transparency, while paying our partner tea masters significantly above market rates so their generational craft continues to flourish.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-700 text-amber-100 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-serif-tea text-2xl font-bold text-stone-900 dark:text-stone-100">
              Our Vision for Tomorrow
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              A world where the daily ritual of steeping tea is an antidote to digital fatigue—restoring mindfulness, promoting physiological balance, and nurturing deep ecological connection between drinker and mountain terroir.
            </p>
          </div>
        </div>
      </div>

      {/* Tea Sourcing Information */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
            Transparent Origins
          </span>
          <h2 className="font-serif-tea text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight mt-1">
            How We Source Every Leaf
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm mt-2">
            No auction brokers. No synthetic flavorings. Just relationships forged on mountain paths.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-3">
            <div className="text-emerald-700 dark:text-emerald-400 font-bold text-sm">01 / Soil & Microclimate</div>
            <h4 className="font-serif-tea text-lg font-bold text-stone-900 dark:text-stone-100">
              High-Elevation Terraces
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Teas grown above 1,200 meters endure dense mountain fog and dramatic temperature swings, concentrating amino acids, natural sugars, and reducing bitterness.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-3">
            <div className="text-emerald-700 dark:text-emerald-400 font-bold text-sm">02 / First Flush Plucking</div>
            <h4 className="font-serif-tea text-lg font-bold text-stone-900 dark:text-stone-100">
              Two Leaves and a Bud
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Harvested during early dawn hours before morning dew evaporates, carefully hand-selected to ensure unbroken tender young shoots rich in L-theanine.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-3">
            <div className="text-emerald-700 dark:text-emerald-400 font-bold text-sm">03 / Nitrogen Preservation</div>
            <h4 className="font-serif-tea text-lg font-bold text-stone-900 dark:text-stone-100">
              Aroma Locked at Garden
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Within 48 hours of final firing or stone-grinding, our teas are flushed with food-grade inert nitrogen in airtight aluminum tins to stop stale oxidation.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
            The Connoisseurs
          </span>
          <h2 className="font-serif-tea text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight mt-1">
            Meet the Tea Artisans
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm mt-2">
            The sensory specialists who travel, cup, curate, and preserve our harvests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, i) => (
            <div
              key={i}
              className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200/80 dark:border-stone-800 shadow-sm"
            >
              <div className="aspect-[4/3] overflow-hidden bg-stone-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-2">
                <h4 className="font-serif-tea text-lg font-bold text-stone-900 dark:text-stone-100">
                  {member.name}
                </h4>
                <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  {member.title}
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed pt-1">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA banner */}
      <div className="text-center bg-emerald-900 text-amber-50 rounded-3xl p-10 space-y-4">
        <h3 className="font-serif-tea text-2xl sm:text-3xl font-bold">
          Ready to Experience Single-Estate Purity?
        </h3>
        <p className="text-stone-300 text-sm max-w-md mx-auto">
          Discover teas that will reshape your perception of flavor, aroma, and peaceful clarity.
        </p>
        <Link
          to="/shop"
          className="inline-block px-8 py-3.5 bg-amber-200 text-emerald-950 font-bold text-sm rounded-2xl hover:bg-amber-100 transition-colors shadow-lg"
        >
          Explore the Tea Catalog
        </Link>
      </div>
    </div>
  );
}

export default AboutUsPage;
