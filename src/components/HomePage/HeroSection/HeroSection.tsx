"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Slide {
  id: number;
  titleEn: string;
  titleBn: string;
  subtitleEn: string;
  subtitleBn: string;
  discountBadge: string;
  bgGradient: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  accentIcon: React.ReactNode;
}

export default function HeroSection() {
  const slides: Slide[] = [
    {
      id: 1,
      titleEn: "Grand Monsoon Health Sale!",
      titleBn: "মনসুন স্পেশাল স্বাস্থ্য অফার!",
      subtitleEn:
        "Get flat 15% off on chronic medicines & daily healthcare essentials.",
      subtitleBn:
        "নিয়মিত ওষুধ এবং দৈনন্দিন প্রয়োজনীয় স্বাস্থ্যসেবা পণ্যে ফ্ল্যাট ১৫% ছাড়।",
      discountBadge: "Up to 50% Off",
      bgGradient: "from-emerald-600 to-teal-800",
      ctaText: "Shop Medicines",
      ctaLink: "/category/medicine",
      imageUrl:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop",
      accentIcon: (
        <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-emerald-300" />
      ),
    },
    {
      id: 2,
      titleEn: "Instant Prescription Upload Offer",
      titleBn: "প্রেসক্রিপশন আপলোড করলেই নিশ্চিত ছাড়!",
      subtitleEn:
        "Upload valid prescription and get extra 10% cashback + free delivery.",
      subtitleBn:
        "প্রেসক্রিপশন আপলোড করুন এবং অতিরিক্ত ১০% ক্যাশব্যাক ও ফ্রি ডেলিভারি পান।",
      discountBadge: "Extra 10% Cash",
      bgGradient: "from-blue-600 to-indigo-800",
      ctaText: "Upload Now",
      ctaLink: "/prescription",
      imageUrl:
        "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=800&auto=format&fit=crop",
      accentIcon: (
        <Clock className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-300" />
      ),
    },
    {
      id: 3,
      titleEn: "Vitamins & Supplements Booster",
      titleBn: "ভিটামিন ও সাপ্লিমেন্ট বুস্টার!",
      subtitleEn:
        "Boost your immunity naturally. Buy 2 and get 1 absolutely free.",
      subtitleBn:
        "প্রাকৃতিক উপায়ে রোগ প্রতিরোধ ক্ষমতা বাড়ান। ২ টি কিনলে ১ টি ফ্রি!",
      discountBadge: "Buy 2 Get 1 Free",
      bgGradient: "from-amber-500 to-orange-700",
      ctaText: "View Supplements",
      ctaLink: "/category/supplement",
      imageUrl:
        "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop",
      accentIcon: (
        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-amber-300" />
      ),
    },
    {
      id: 4,
      titleEn: "Nurturing Baby & Mom Care",
      titleBn: "মা ও শিশুর যত্ন নিন নিরাপদে",
      subtitleEn:
        "Dermatologically tested premium baby formulas and skin protection creams.",
      subtitleBn:
        "বিশেষজ্ঞদের দ্বারা পরীক্ষিত প্রিমিয়াম বেবি ফর্মুলা এবং স্কিন প্রটেকশন ক্রিম।",
      discountBadge: "Flat 20% Off",
      bgGradient: "from-pink-600 to-purple-800",
      ctaText: "Shop Baby Care",
      ctaLink: "/category/baby-mom-care",
      imageUrl:
        "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=800&auto=format&fit=crop",
      accentIcon: (
        <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-pink-300" />
      ),
    },
  ];

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const diffX = touchStartX.current - touchEndX.current;
    const diffY = (touchStartY || 0) - (touchEndX.current || 0);
    const swipeThreshold = 40;

    if (
      Math.abs(diffX) > Math.abs(diffY || 0) &&
      Math.abs(diffX) > swipeThreshold
    ) {
      if (diffX > swipeThreshold) {
        nextSlide();
      } else if (diffX < -swipeThreshold) {
        prevSlide();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
    setTouchStartY(null);
    setIsPaused(false);
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 3000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, nextSlide]);

  return (
    <section
      className="container py-4 md:py-8 overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Promotional Offers Carousel"
    >
      <div
        className="
      relative
      overflow-hidden
      rounded-lg
      sm:rounded-2xl
      md:rounded-3xl
      shadow-xl
      bg-slate-900
      w-full
      h-62.5
      sm:h-80
      md:h-112.5
    "
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides Track */}
        <div
          className="relative flex w-full h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`min-w-full h-full relative overflow-hidden bg-linear-to-r ${slide.bgGradient}`}
              aria-hidden={current !== index}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slides.length}: ${slide.titleEn}`}
            >
              <div className="absolute inset-0 bg-black/25 z-0" />

              <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent z-1 md:hidden" />
              <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-transparent z-1 hidden md:block" />

              {/* Content */}
              <div className="relative z-10 w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center px-4 sm:px-6 md:px-10 lg:px-12 py-4">
                {/* Text */}
                <div className="flex flex-col justify-center items-start text-white space-y-2 md:space-y-4 max-w-lg">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider border border-white/20">
                    {slide.accentIcon}
                    {slide.discountBadge}
                  </span>

                  <div>
                    <h2 className="text-sm sm:text-lg md:text-3xl lg:text-4xl font-extrabold leading-tight">
                      {slide.titleEn}
                    </h2>

                    <p className="text-xs sm:text-sm md:text-lg font-semibold opacity-95 mt-1">
                      {slide.titleBn}
                    </p>
                  </div>

                  <div className="hidden sm:block opacity-90">
                    <p className="text-xs md:text-base">{slide.subtitleEn}</p>

                    <p className="text-xs md:text-sm mt-1">
                      {slide.subtitleBn}
                    </p>
                  </div>

                  <Link
                    href={slide.ctaLink}
                    className="
                  inline-flex
                  items-center
                  gap-2
                  bg-white
                  hover:bg-slate-100
                  text-slate-900
                  font-bold
                  px-4
                  md:px-6
                  py-2
                  md:py-3
                  rounded-xl
                  transition-all
                "
                  >
                    {slide.ctaText}
                    <ArrowRight className="w-4 h-4 text-emerald-600" />
                  </Link>
                </div>

                {/* Desktop Image */}
                <div className="hidden md:flex items-center justify-center h-full">
                  <div className="w-[80%] h-80 rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
                    <Image
                      src={slide.imageUrl}
                      alt={slide.titleEn}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover"
                      priority={index === 0}
                    />
                  </div>
                </div>

                {/* Mobile Decoration */}
                <div className="absolute right-0 bottom-0 w-1/4 h-1/3 md:hidden opacity-10 pointer-events-none">
                  <Image
                    height={200}
                    width={200}
                    src={slide.imageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Previous */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center justify-center p-2 rounded-full bg-black/40 text-white"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next */}
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center justify-center p-2 rounded-full bg-black/40 text-white"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all ${
                current === index ? "w-6 bg-white" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
