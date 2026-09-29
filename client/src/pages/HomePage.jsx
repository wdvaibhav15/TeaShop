import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturedProductsSection from "../components/FeaturedProductsSection";
import BestSellersSection from "../components/BestSellersSection";
import SpecialOffersSection from "../components/SpecialOffersSection";
import TestimonialsSection from "../components/TestimonialsSection";
import NewsletterSection from "../components/NewsletterSection";
import MostLiked from "../components/MostLiked";

const HomePage = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      <FeaturedProductsSection />
      <BestSellersSection />
      <MostLiked />
      <SpecialOffersSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
}

export default HomePage;