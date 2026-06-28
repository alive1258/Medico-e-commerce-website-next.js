// app/product/[slug]/page.tsx
"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Product, PackSize } from "@/src/types/product";
import { PRODUCTS } from "@/src/utils/data/products";
import {
  ImageGallery,
  ProductDetails,
  RelatedProducts,
} from "@/src/components/product";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Find product by slug
  const product = useMemo(() => {
    return PRODUCTS.find((p) => p.slug === slug);
  }, [slug]);

  // Find related products
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return PRODUCTS.filter(
      (p) => p.category === product.category && p.id !== product.id,
    ).slice(0, 4);
  }, [product]);

  // Handle Buy Now (ProductDetails handles Add to Cart internally)
  const handleBuyNow = (
    product: Product,
    packSize: PackSize,
    quantity: number,
  ) => {
    // ProductDetails already adds to cart, we just need to redirect
    console.log(`Buying ${quantity} of ${product.name} (${packSize.label})`);
  };

  // If product not found
  if (!product) {
    return (
      <div className="container py-20 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-slate-500 mb-6">
            The product you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all"
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
      <div className="container py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 overflow-x-auto">
          <Link href="/" className="hover:text-emerald-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/category/${product.category
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")}`}
            className="hover:text-emerald-600 transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
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
        <RelatedProducts
          products={relatedProducts}
          currentProductId={product.id}
        />
      </div>
    </div>
  );
}
