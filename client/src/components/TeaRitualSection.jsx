import React from "react";
import { Leaf, Flame, Timer, CupSoda } from "lucide-react";

const TeaRitualSection = () => {
  const steps = [
    {
      icon: Leaf,
      title: "Choose",
      desc: "Select a tea suited to your mood and moment.",
    },
    {
      icon: Flame,
      title: "Prepare",
      desc: "Heat fresh water to the ideal temperature.",
    },
    {
      icon: Timer,
      title: "Steep",
      desc: "Allow the leaves to fully reveal their character.",
    },
    {
      icon: CupSoda,
      title: "Savor",
      desc: "Enjoy a balanced and mindful tea experience.",
    },
  ];

  return (
    <section className="py-8 max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <span className="text-emerald-500 uppercase tracking-[0.3em] text-xs font-semibold">
          Tea Ritual
        </span>

        <h2 className="mt-4 text-4xl md:text-5xl font-serif-tea font-bold">
          Every Cup Tells A Story
        </h2>

        <p className="mt-4 text-stone-500 max-w-2xl mx-auto">
          Discover the simple ritual that transforms exceptional
          leaves into unforgettable moments.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={step.title}
              className="relative text-center group"
            >
              <div className="mx-auto w-20 h-20 rounded-full bg-emerald-50 dark:bg-stone-800 flex items-center justify-center border border-emerald-200 dark:border-stone-700 group-hover:scale-110 transition-all duration-300">
                <Icon className="w-9 h-9 text-emerald-600" />
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                {step.title}
              </h3>

              <p className="mt-3 text-sm text-stone-500">
                {step.desc}
              </p>

              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-full h-px bg-stone-300 dark:bg-stone-700" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TeaRitualSection;