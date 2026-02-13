import HeroSection from "@/components/HeroSection";
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
      <FeaturedCars />
      <BrandsSection />
      <WhyChooseUs />
      <Services />
      <Testimonials />
      <CTASection />
    </>
  );
}
