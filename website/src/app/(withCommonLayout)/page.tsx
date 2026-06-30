import CategorySection from "@/src/components/HomePage/CategorySection/CategorySection";
import HomepageHero from "@/src/components/HomePage/HeroAndServices/HeroAndServices";
import HeroSection from "@/src/components/HomePage/HeroSection/HeroSection";
import ProductShowcase from "@/src/components/HomePage/ProductShowcase/ProductShowcase";
import { IProductCategory } from "@/src/types/productCategoriesType";

interface IApiResponse {
  apiVersion: string;
  success: boolean;
  message: string;
  status: number;
  data: IProductCategory[];
}

const Page = async () => {
  let categories: IProductCategory[] = [];

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${baseUrl}/product-categories`, {
      next: { revalidate: 100 },
    });

    if (res.ok) {
      const result: IApiResponse = await res.json();
      categories = result?.data || [];
    }
  } catch (error) {
    console.error("Failed to fetch product categories:", error);
  }

  return (
    <>
      <HeroSection />
      <CategorySection categories={categories} />
      <HomepageHero />
      <ProductShowcase />
    </>
  );
};

export default Page;
