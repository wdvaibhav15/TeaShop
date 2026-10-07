import React from "react";
import HeroSection from "../components/HeroSection";
import BestSellersSection from "../components/BestSellersSection";
import SpecialOffersSection from "../components/SpecialOffersSection";
import TestimonialsSection from "../components/TestimonialsSection";
import NewsletterSection from "../components/NewsletterSection";
import MostLiked from "../components/MostLiked";
import TeaRitualSection from "../components/TeaRitualSection";

const HomePage = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      <BestSellersSection />
      <MostLiked />
      <TeaRitualSection />
      <SpecialOffersSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
}

export default HomePage;