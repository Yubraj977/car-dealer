import HeroSection from "@/components/HeroSection";
import CarFinderCTA from "@/components/CarFinderCTA";
import BrandsSection from "@/components/BrandsSection";
import FeaturedCars from "@/components/FeaturedCars";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CarFinderCTA />
      <BrandsSection />
      <FeaturedCars />
      <WhyChooseUs />
      <Services />
      <Testimonials />
      <CTASection />
    </>
  );
}
