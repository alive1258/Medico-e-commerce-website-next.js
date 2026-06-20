"use client";

import { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Activity,
  Baby,
  Sparkles,
  Heart,
  Stethoscope,
  ShieldAlert,
  Pill,
  Leaf,
} from "lucide-react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
  href: string;
}

export default function CategorySection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories: Category[] = [
    {
      id: "medicine",
      name: "Medicine",
      icon: <Pill className="w-6 h-6" />,
      bgColor: "bg-emerald-50 hover:bg-emerald-100/80 border-emerald-100",
      iconColor: "text-emerald-600 bg-emerald-100",
      href: "/category/medicine",
    },
    {
      id: "healthcare",
      name: "Healthcare",
      icon: <Activity className="w-6 h-6" />,
      bgColor: "bg-blue-50 hover:bg-blue-100/80 border-blue-100",
      iconColor: "text-blue-600 bg-blue-100",
      href: "/category/healthcare",
    },
    {
      id: "beauty",
      name: "Beauty",
      icon: <Heart className="w-6 h-6" />,
      bgColor: "bg-purple-50 hover:bg-purple-100/80 border-purple-100",
      iconColor: "text-purple-600 bg-purple-100",
      href: "/category/beauty",
    },
    {
      id: "sexual-wellness",
      name: "Sexual Wellness",
      icon: <ShieldAlert className="w-6 h-6" />,
      bgColor: "bg-orange-50 hover:bg-orange-100/80 border-orange-100",
      iconColor: "text-orange-600 bg-orange-100",
      href: "/category/sexual-wellness",
    },
    {
      id: "baby-mom-care",
      name: "Baby & Mom Care",
      icon: <Baby className="w-6 h-6" />,
      bgColor: "bg-pink-50 hover:bg-pink-100/80 border-pink-100",
      iconColor: "text-pink-600 bg-pink-100",
      href: "/category/baby-mom-care",
    },
    {
      id: "supplement",
      name: "Supplement",
      icon: <Sparkles className="w-6 h-6" />,
      bgColor: "bg-amber-50 hover:bg-amber-100/80 border-amber-100",
      iconColor: "text-amber-600 bg-amber-100",
      href: "/category/supplement",
    },
    {
      id: "home-care",
      name: "Home Care",
      icon: <Stethoscope className="w-6 h-6" />,
      bgColor: "bg-teal-50 hover:bg-teal-100/80 border-teal-100",
      iconColor: "text-teal-600 bg-teal-100",
      href: "/category/home-care",
    },
    {
      id: "herbal",
      name: "Herbal",
      icon: <Leaf className="w-6 h-6" />,
      bgColor: "bg-green-50 hover:bg-green-100/80 border-green-100",
      iconColor: "text-green-600 bg-green-100",
      href: "/category/herbal",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Perfect incremental width for clean sliding transition
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="container py-8 ">
      {}
      <div className="flex items-center justify-between  ">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Shop by Category
          </h2>
        </div>

        {/* Action Buttons Top Right (Fully Interactive) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 md:p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-emerald-600 hover:border-emerald-200 hover:shadow-md active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            aria-label="Scroll left categories"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 md:p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-emerald-600 hover:border-emerald-200 hover:shadow-md active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            aria-label="Scroll right categories"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {}
      <div
        ref={scrollRef}
        className="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth py-4"
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className={`shrink-0 w-42.5 sm:w-47.5 border rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${category.bgColor}`}
          >
            {/* Round Icon Wrapper */}
            <div
              className={`p-3.5 rounded-2xl mb-4 flex items-center justify-center transition-transform duration-300 transform group-hover:scale-110 ${category.iconColor}`}
            >
              {category.icon}
            </div>

            {/* Multilingual Labels */}
            <div className="space-y-1 w-full">
              <h3 className="text-sm font-extrabold text-slate-800 tracking-tight truncate">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
