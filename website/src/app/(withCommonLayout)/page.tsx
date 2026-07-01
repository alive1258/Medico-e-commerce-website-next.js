/* eslint-disable @typescript-eslint/no-explicit-any */
import CategorySection from "@/src/components/HomePage/CategorySection/CategorySection";
import HomepageHero from "@/src/components/HomePage/HeroAndServices/HeroAndServices";
import HeroSection from "@/src/components/HomePage/HeroSection/HeroSection";
import ProductShowcase from "@/src/components/HomePage/ProductShowcase/ProductShowcase";
import { IProductCategory } from "@/src/types/productCategoriesType";

interface ICategoriesApiResponse {
  apiVersion: string;
  success: boolean;
  message: string;
  status: number;
  data: IProductCategory[];
}

interface IProductsApiResponse {
  apiVersion: string;
  success: boolean;
  message: string;
  status: number;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  data: any[];
}

const Page = async () => {
  let categories: IProductCategory[] = [];
  let products: any[] = [];

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // 1. Fetch Categories
  try {
    const res = await fetch(`${baseUrl}/product-categories`, {
      next: { revalidate: 100 },
    });

    if (res.ok) {
      const result: ICategoriesApiResponse = await res.json();
      categories = result?.data || [];
    }
  } catch (error) {
    console.error("Failed to fetch product categories:", error);
  }

  try {
    const res = await fetch(`${baseUrl}/products?limit=200`, {
      cache: "no-store",
    });

    if (res.ok) {
      const result: IProductsApiResponse = await res.json();
      products = result?.data || [];
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  console.log(`Total products fetched: ${products.length}`);

  return (
    <>
      <HeroSection />
      <CategorySection categories={categories} />
      <HomepageHero />
      <ProductShowcase products={products} />
    </>
  );
};

export default Page;
