// components/product/ProductDetails.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Share2,
  ShoppingBag,
  Truck,
  Shield,
  RefreshCw,
  Check,
} from "lucide-react";

import { QuantitySelector } from "./QuantitySelector";
import { RatingStars } from "./RatingStars";
import { Product } from "@/src/utils/data/products";

interface ProductDetailsProps {
  product: Product;
  onAddToCart?: (product: Product, quantity: number) => void;
  onBuyNow?: (product: Product, quantity: number) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  onAddToCart,
  onBuyNow,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "description" | "specifications" | "benefits"
  >("description");

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
    } else {
      console.log(`Added ${quantity} of ${product.name} to cart`);
    }
  };

  const handleBuyNow = () => {
    if (onBuyNow) {
      onBuyNow(product, quantity);
    } else {
      console.log(`Buying ${quantity} of ${product.name}`);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description || "Check out this product!",
        url: window.location.href,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Product Name & Brand */}
      <div className="space-y-2">
        <Link
          href={`/category/${product.category
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")}`}
          className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          {product.category}
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {product.name}
        </h1>
        <p className="text-sm font-semibold text-slate-600">
          By {product.brand}
        </p>
      </div>

      {/* Rating */}
      {product.rating !== undefined && (
        <RatingStars
          rating={product.rating}
          reviewsCount={product.reviewsCount || 0}
        />
      )}

      {/* Price */}
      <div className="flex items-end gap-3">
        <span className="text-3xl font-extrabold text-emerald-600">
          ৳{product.currentPrice.toFixed(2)}
        </span>
        {product.originalPrice > product.currentPrice && (
          <>
            <span className="text-lg text-slate-400 line-through">
              ৳{product.originalPrice.toFixed(2)}
            </span>
            <span className="bg-red-500 text-white text-xs font-extrabold px-2 py-1 rounded-lg">
              Save{" "}
              {Math.round(
                ((product.originalPrice - product.currentPrice) /
                  product.originalPrice) *
                  100,
              )}
              %
            </span>
          </>
        )}
      </div>

      {/* Delivery Info */}
      <div className="flex items-center gap-4 text-sm text-slate-600 bg-slate-50 px-4 py-3 rounded-xl">
        <Truck size={18} className="text-emerald-600 shrink-0" />
        <span className="font-medium">
          Delivery: {product.deliveryTime || "12-24 HOURS"}
        </span>
        <span className="w-px h-4 bg-slate-300" />
        <span className="font-medium">Free Shipping</span>
      </div>

      {/* Quantity & Actions */}
      <div className="flex flex-wrap gap-3">
        <QuantitySelector
          quantity={quantity}
          onIncrease={() => setQuantity((q) => q + 1)}
          onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
        />

        <button
          onClick={handleAddToCart}
          disabled={product.inStock === false}
          className="flex-1 min-w-35 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white font-bold rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center gap-2"
        >
          <ShoppingBag size={18} />
          Add to Cart
        </button>

        <button
          onClick={handleBuyNow}
          disabled={product.inStock === false}
          className="flex-1 min-w-35 px-6 py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center gap-2"
        >
          Buy Now
        </button>

        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
          aria-label="Add to wishlist"
        >
          <Heart
            size={20}
            className={
              isWishlisted ? "fill-red-500 text-red-500" : "text-slate-600"
            }
          />
        </button>

        <button
          onClick={handleShare}
          className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
          aria-label="Share product"
        >
          <Share2 size={20} className="text-slate-600" />
        </button>
      </div>

      {/* Stock Status */}
      {product.inStock !== false && (
        <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold">
          <Check size={16} />
          In Stock - Ready to Ship
        </div>
      )}

      {/* Tabs */}
      <div className="border-t border-slate-200 pt-6">
        <div className="flex gap-4 border-b border-slate-200 mb-4 overflow-x-auto">
          {[
            { id: "description", label: "Description" },
            { id: "specifications", label: "Specifications" },
            { id: "benefits", label: "Benefits" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="prose prose-sm max-w-none text-slate-600">
          {activeTab === "description" && (
            <div className="space-y-3">
              <p>{product.description || "No description available."}</p>
              {product.usage && (
                <div>
                  <h4 className="font-bold text-slate-800">How to Use:</h4>
                  <p>{product.usage}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "specifications" && product.specifications && (
            <dl className="grid grid-cols-2 gap-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-start gap-2 py-2 border-b border-slate-100"
                >
                  <dt className="font-bold text-slate-800 flex-1">{key}:</dt>
                  <dd className="text-slate-600 flex-1">{value}</dd>
                </div>
              ))}
            </dl>
          )}

          {activeTab === "benefits" && product.benefits && (
            <ul className="space-y-2">
              {product.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check
                    size={16}
                    className="text-emerald-500 shrink-0 mt-0.5"
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Shield size={16} className="text-emerald-500" />
          <span>Genuine Products</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Truck size={16} className="text-emerald-500" />
          <span>Free Delivery</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <RefreshCw size={16} className="text-emerald-500" />
          <span>Easy Returns</span>
        </div>
      </div>
    </div>
  );
};
