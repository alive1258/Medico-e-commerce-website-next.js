// components/ProductCard.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Plus } from "lucide-react";
import { Product } from "@/src/utils/data/products";

interface ProductCardProps {
  product: Product;
  addToCart: (
    product: Product,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;
}

const CategoryProductCard: React.FC<ProductCardProps> = ({
  product,
  addToCart,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ডিসকাউন্ট ব্যাজ */}
      <div className="absolute top-2.5 left-2.5 z-10">
        <span className="bg-red-500 text-white font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
          {product.discount}% OFF
        </span>
      </div>

      {/* প্রোডাক্ট ইমেজ */}
      <div className="relative aspect-square w-full bg-slate-50 overflow-hidden">
        <div className="w-full h-full overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 will-change-transform ${
              isHovered ? "scale-105" : "scale-100"
            }`}
            loading="lazy"
            height={300}
            width={400}
          />
        </div>
      </div>

      {/* প্রোডাক্ট ইনফরমেশন */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide truncate">
            {product.brand}
          </p>
          <h4 className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight line-clamp-2 min-h-9">
            {product.name}
          </h4>
          <p className="text-[10px] font-semibold text-slate-500">
            {product.strength || "Standard Dosage"}
          </p>
        </div>

        {/* রেটিং স্টার */}
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

        {/* দাম এবং অ্যাড বাটন */}
        <div className="pt-3 border-t border-slate-50 flex items-center justify-between gap-1 mt-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 line-through">
              ৳ {product.originalPrice.toFixed(2)}
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-emerald-600">
              ৳ {product.currentPrice.toFixed(2)}
            </span>
          </div>

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
export default CategoryProductCard;
