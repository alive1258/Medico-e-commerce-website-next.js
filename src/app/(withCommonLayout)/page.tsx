import CategorySection from "@/src/components/HomePage/CategorySection/CategorySection";
import HeroSection from "@/src/components/HomePage/HeroSection/HeroSection";
import ProductShowcase from "@/src/components/HomePage/ProductShowcase/ProductShowcase";

const page = () => {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <ProductShowcase />
    </>
  );
};

export default page;
