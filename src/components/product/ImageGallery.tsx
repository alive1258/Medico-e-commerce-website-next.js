// components/product/ImageGallery.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/src/utils/data/products";

interface ImageGalleryProps {
  product: Product;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = product.images
    ? [product.imageUrl, ...product.images]
    : [product.imageUrl];

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="relative aspect-square w-full bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
        <Image
          src={images[selectedImage]}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        {product.discount > 0 && (
          <span className="absolute top-4 left-4 bg-red-500 text-white font-extrabold text-sm px-3 py-1 rounded-lg shadow-lg">
            {product.discount}% OFF
          </span>
        )}
        {product.inStock === false && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white font-extrabold text-lg px-6 py-3 rounded-xl">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? "border-emerald-500 ring-2 ring-emerald-200"
                  : "border-slate-200 hover:border-slate-400"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={img}
                alt={`${product.name} - Image ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
