// app/page.tsx
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

async function fetchCategories(baseUrl: string) {
  const res = await fetch(`${baseUrl}/product-categories`, {
    next: { revalidate: 100 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const result: ICategoriesApiResponse = await res.json();
  return result.data || [];
}

async function fetchProducts(baseUrl: string) {
  const res = await fetch(`${baseUrl}/products?limit=200`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const result: IProductsApiResponse = await res.json();
  return result?.data || [];
}

const Page = async () => {
  let categories: IProductCategory[] = [];
  let products: any[] = [];

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    console.error("NEXT_PUBLIC_API_URL is not defined");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">API URL not configured</p>
      </div>
    );
  }

  try {
    categories = await fetchCategories(baseUrl);
  } catch (error) {
    console.error(" Failed to fetch product categories:", error);
    categories = [];
  }

  try {
    products = await fetchProducts(baseUrl);
  } catch (error) {
    console.error(" Failed to fetch products:", error);
    products = [];
  }

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
