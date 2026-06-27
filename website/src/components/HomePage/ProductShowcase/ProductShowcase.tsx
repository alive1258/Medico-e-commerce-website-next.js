"use client";

import React, { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Check,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import ProductCard from "./ProductCard";
import { Product, PRODUCTS_DATA } from "@/src/utils/data/products";

// ৩.১ ক্যাটাগরি ও প্রোডাক্ট ডাটাবেস প্রস্তুত করা
// types/product.ts

export default function ProductShowcase() {
  // --- কাস্টম ক্যারোসেল স্ক্রলিং স্টেট ও রেডি-মেড রিলিজ ---
  const categoriesList = [
    "Best Selling Products",
    "Newly Launched Items",
    "Breathe & Relieve",
    "Protect Your Health🩺",
    "Boost & Balance 💊",
    "OTC Medicine",
    "Supplement Festival",
    "All-in-One Care Deals",
  ];

  // প্রতিটি ক্যারোসেলের জন্য আলাদা রেফ ডিক্লেয়ার করা
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // কার্ট এবং টোস্ট নোটিফিকেশন স্টেট
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);

  // ডিসপ্লে টোস্ট নোটিফিকেশন
  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // স্ক্রলিং হ্যান্ডলার (Smoothly scroll left and right)
  const handleScroll = (categoryName: string, direction: "left" | "right") => {
    const container = scrollRefs.current[categoryName];
    if (container) {
      const scrollAmount = 300; // ক্যারোসেলের স্ক্রলিং স্পিড
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // কার্টে আইটেম যুক্ত করার ইন্টারঅ্যাকশন
  const addToCart = (
    product: Product,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    setCartCount((prev) => prev + 1);
    triggerToast(`Added ${product.name} to Cart successfully! 🛒`);
  };

  return (
    <section className="bg-slate-50 min-h-screen py-10 font-sans">
      <div className="container">
        {/* মেডিকো প্রমোশনাল টপ বার (গ্লোবাল কার্ট রিয়েল-টাইম ট্র্যাকার) */}
        <div className="bg-emerald-600 text-white rounded-2xl p-4 sm:p-6 mb-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500 rounded-xl">
              <Sparkles className="text-amber-300 animate-pulse" size={24} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                Medico Seasonal Wellness Festival
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 font-semibold mt-0.5">
                Sourcing 100% genuine products directly to your doorstep.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-emerald-700/60 px-4 py-2.5 rounded-xl border border-emerald-500/30">
            <ShoppingCart size={18} className="text-emerald-300" />
            <span className="text-xs uppercase tracking-wider font-black">
              Your Cart Count:
            </span>
            <span className="bg-red-500 text-white font-extrabold text-sm px-2.5 py-0.5 rounded-full animate-bounce">
              {cartCount}
            </span>
          </div>
        </div>

        {/* ৩.২ ডাইনামিক ক্যারোসেল লুপ (ক্যাটাগরি ভিত্তিক রেন্ডারিং) */}
        <div className="space-y-12">
          {categoriesList.map((category) => {
            const filteredProducts = PRODUCTS_DATA.filter(
              (p) => p.category === category,
            );

            return (
              <div
                key={category}
                className="md:bg-white p-0.5 md:p-5 md:rounded-2xl md:shadow-sm md:border md:border-slate-100 relative group"
              >
                {/* ক্যাটাগরি হেডার - বামে নাম এবং ডানে ক্যারোসেল নেভিগেশন বাটন */}
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-50">
                  <div className="space-y-1">
                    <h3 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-2">
                      {category}
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      Genuine Wellness Essentials
                    </p>
                  </div>

                  {/* নেভিগেশন কন্ট্রোল্স */}
                  <div className="md:flex items-center gap-3">
                    <Link
                      href={`/category/${category.replace(/\s+/g, "-").toLowerCase()}`}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-emerald-500/20 px-2 py-1 rounded"
                    >
                      See All
                    </Link>

                    <div className="md:flex hidden items-center gap-1.5">
                      <button
                        onClick={() => handleScroll(category, "left")}
                        className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-emerald-600 hover:border-emerald-300 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                        aria-label={`Scroll Left in ${category}`}
                      >
                        <ChevronLeft size={18} className="stroke-[2.5]" />
                      </button>

                      <button
                        onClick={() => handleScroll(category, "right")}
                        className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-emerald-600 hover:border-emerald-300 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                        aria-label={`Scroll Right in ${category}`}
                      >
                        <ChevronRight size={18} className="stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* ৩.৩ ক্যারোসেল প্রোডাক্ট ট্র্যাকার */}
                <div
                  ref={(el) => {
                    scrollRefs.current[category] = el;
                  }}
                  className="flex items-stretch gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-4"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      addToCart={addToCart}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ৩.৪ ইন্টারঅ্যাক্টিভ টোস্ট নোটিফিকেশন */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 animate-slide-up">
          <div className="p-1 bg-emerald-500 rounded-lg text-white">
            <Check size={14} className="stroke-3" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}
    </section>
  );
}
