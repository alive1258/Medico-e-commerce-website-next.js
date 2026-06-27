// components/ProductCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Plus } from "lucide-react";
import { Product } from "@/src/utils/data/products";

interface ProductCardProps {
  product: Product;
  addToCart: (
    product: Product,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  return (
    <div className="shrink-0 w-47.5 sm:w-55 bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group/card relative">
      {/* ডিসকাউন্ট ব্যাজ */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
        <span className="bg-red-500 text-white font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
          {product.discount}% OFF
        </span>
      </div>

      {/* প্রোডাক্ট ইমেজ - Clickable with Link */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-square w-full bg-slate-50 overflow-hidden block"
      >
        <Image
          src={product.imageUrl}
          alt={`${product.name} Medico Genuine Specimen`}
          className="object-cover transition-transform duration-500 will-change-transform group-hover/card:scale-105"
          loading="lazy"
          fill
          sizes="(max-width: 640px) 190px, 220px"
          style={{ objectFit: "cover" }}
        />
      </Link>

      {/* প্রোডাক্ট ইনফরমেশন */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide truncate">
            {product.brand || "Medico Pharma"}
          </p>
          {/* Product Name - Clickable */}
          <Link href={`/product/${product.slug}`}>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight line-clamp-2 min-h-9 hover:text-emerald-600 transition-colors">
              {product.name}
            </h4>
          </Link>
          <p className="text-[10px] font-semibold text-slate-500">
            {product.strength || "Standard Dosage"}
          </p>
        </div>

        {/* রেটিং স্টারস */}
        {product.rating !== undefined && (
          <div className="flex items-center gap-1 py-1">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={10}
                  fill={
                    i < Math.floor(product.rating || 0)
                      ? "currentColor"
                      : "none"
                  }
                  className={
                    i < Math.floor(product.rating || 0)
                      ? "stroke-none"
                      : "stroke-1"
                  }
                />
              ))}
            </div>
            <span className="text-[9px] text-slate-400 font-bold">
              ({product.reviewsCount || 0})
            </span>
          </div>
        )}

        {/* প্রাইসিং এবং অ্যাড বাটন */}
        <div className="pt-3 border-t border-slate-50 flex items-center justify-between gap-1 mt-3">
          <Link
            href={`/product/${product.slug}`}
            className="flex flex-col hover:opacity-80 transition-opacity"
          >
            <span className="text-[10px] text-slate-400 line-through">
              ৳ {product.originalPrice.toFixed(2)}
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-emerald-600">
              ৳ {product.currentPrice.toFixed(2)}
            </span>
          </Link>

          <button
            onClick={(e) => addToCart(product, e)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs px-2.5 py-1.5 rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-1 uppercase tracking-wider hover:shadow-md"
          >
            <Plus size={12} className="stroke-3" />
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
