// components/product/RelatedProducts.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Product } from "@/src/utils/data/products";

interface RelatedProductsProps {
  products: Product[];
  currentProductId: string;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  products,
  currentProductId,
}) => {
  if (products.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
        You May Also Like
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="relative aspect-square bg-slate-50">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              {product.discount > 0 && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                  {product.discount}% OFF
                </span>
              )}
            </div>
            <div className="p-3">
              <p className="text-[10px] text-slate-400 font-bold uppercase truncate">
                {product.brand}
              </p>
              <h4 className="text-xs font-bold text-slate-800 line-clamp-2 min-h-8">
                {product.name}
              </h4>
              <div className="flex items-center justify-between mt-2">
                <div>
                  {product.originalPrice > product.currentPrice && (
                    <span className="text-[10px] text-slate-400 line-through block">
                      ৳{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-sm font-extrabold text-emerald-600">
                    ৳{product.currentPrice.toFixed(2)}
                  </span>
                </div>
                {product.rating && (
                  <div className="flex items-center gap-1">
                    <Star
                      size={12}
                      className="fill-amber-400 text-amber-400 stroke-none"
                    />
                    <span className="text-xs font-bold text-slate-600">
                      {product.rating}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
