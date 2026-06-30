import CategorySection from "@/src/components/HomePage/CategorySection/CategorySection";
import HomepageHero from "@/src/components/HomePage/HeroAndServices/HeroAndServices";
import HeroSection from "@/src/components/HomePage/HeroSection/HeroSection";
import ProductShowcase from "@/src/components/HomePage/ProductShowcase/ProductShowcase";

const page = () => {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <HomepageHero />
      <ProductShowcase />
    </>
  );
};

export default page;
