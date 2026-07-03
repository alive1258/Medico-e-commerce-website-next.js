/* eslint-disable @typescript-eslint/no-explicit-any */
// app/product/[slug]/page.tsx
"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";

import { Product, PackSize } from "@/src/types/product";
import {
  ImageGallery,
  ProductDetails,
  RelatedProducts,
} from "@/src/components/product";
import { useGetAllProductsQuery } from "@/src/redux/api/productsApi";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  // ✅ Fetch all products
  const {
    data: productsData,
    isLoading,
    isError,
  } = useGetAllProductsQuery({ limit: 200 });

  // ✅ Find product by slug from all products
  const product = useMemo(() => {
    if (!productsData?.data) return null;
    const allProducts = productsData.data as any[];
    const found = allProducts.find((p) => p.slug === slug);

    if (!found) return null;

    // ✅ Transform the product to match Product type
    const transformedProduct: Product = {
      id: found.id,
      name: found.name,
      slug: found.slug,
      thumbnail: found.thumbnail,
      manufacturer: found.manufacturer,
      is_prescription_required: found.is_prescription_required,
      is_active: found.is_active,
      category: found.category || undefined,
      brand: found.brand || undefined,
      variants: found.variants || [],
      price_range: found.price_range || { min: 0, max: 0 },
      discount_range: found.discount_range || { min: 0, max: 0 },
      created_at: found.created_at,
      updated_at: found.updated_at,
    };

    return transformedProduct;
  }, [productsData, slug]);

  // ✅ Get all products for related items
  const allProducts = useMemo(() => {
    if (!productsData?.data) return [];
    return productsData.data as any[];
  }, [productsData]);

  // ✅ Find related products (same category, different product)
  const relatedProducts = useMemo(() => {
    if (!product || !allProducts.length) return [];

    const related = allProducts
      .filter(
        (p) =>
          p.category?.name === product.category?.name &&
          p.id !== product.id &&
          p.is_active === true,
      )
      .slice(0, 4)
      .map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        thumbnail: p.thumbnail,
        manufacturer: p.manufacturer,
        is_prescription_required: p.is_prescription_required,
        is_active: p.is_active,
        category: p.category,
        brand: p.brand,
        variants: p.variants || [],
        price_range: p.price_range || { min: 0, max: 0 },
        discount_range: p.discount_range || { min: 0, max: 0 },
        created_at: p.created_at,
        updated_at: p.updated_at,
      }));

    return related;
  }, [product, allProducts]);

  // Handle Buy Now
  const handleBuyNow = (
    product: Product,
    packSize: PackSize,
    quantity: number,
  ) => {
    console.log(`Buying ${quantity} of ${product.name} (${packSize.label})`);
    // Redirect to checkout or show modal
  };

  // ✅ Loading state
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="text-center">
          <Loader2
            size={48}
            className="animate-spin text-emerald-500 mx-auto"
          />
          <p className="text-slate-500 mt-4 font-medium animate-pulse">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  // ✅ Error state
  if (isError || !product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-slate-500 mb-6">
            The product you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-sm hover:shadow-md"
          >
            <ChevronLeft size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 overflow-x-auto">
          <Link href="/" className="hover:text-emerald-600 transition-colors">
            Home
          </Link>
          <span className="text-slate-300">/</span>
          {product.category && (
            <>
              <Link
                href={`/category/${product.category.slug || product.category.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="hover:text-emerald-600 transition-colors"
              >
                {product.category.name}
              </Link>
              <span className="text-slate-300">/</span>
            </>
          )}
          <span className="text-slate-800 font-semibold truncate">
            {product.name}
          </span>
        </nav>

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <ImageGallery product={product} />

          {/* Product Details */}
          <ProductDetails product={product} onBuyNow={handleBuyNow} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RelatedProducts
            products={relatedProducts}
            currentProductId={product.id}
          />
        )}
      </div>
    </div>
  );
}
