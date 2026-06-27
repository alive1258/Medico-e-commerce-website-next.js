"use client";

import { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { sidebarToggle } from "@/src/redux/features/sidebarSlice";

export const MEDICO_MEDICINE_CATEGORIES = [
  { id: "home", nameEn: "Home" },
  { id: "medicine", nameEn: "Medicine" },
  { id: "healthcare", nameEn: "Healthcare" },
  { id: "beauty", nameEn: "Beauty" },
  { id: "sexual-wellness", nameEn: "Sexual Wellness" },
  { id: "baby-mom-care", nameEn: "Baby & Mom Care" },
  { id: "herbal", nameEn: "Herbal" },
  { id: "home-care", nameEn: "Home Care" },
  { id: "supplement", nameEn: "Supplement" },
  { id: "food-nutrition", nameEn: "Food and Nutrition" },
  { id: "pet-care", nameEn: "Pet Care" },
  { id: "veterinary", nameEn: "Veterinary" },
  { id: "homeopathy", nameEn: "Homeopathy" },
  { id: "browse-health-concern", nameEn: "Browse by Health Concern" },
  { id: "vital-organs", nameEn: "Vital Organs" },
  { id: "life-style-package", nameEn: "Life Style Package" },
  { id: "checkups-women", nameEn: "Checkups for Women" },
  { id: "checkups-men", nameEn: "Checkups for Men" },
];

export default function Navbar() {
  const dispatch = useDispatch();

  const isCartOpen = useSelector((state: any) => state.adminTree.sidebarStatus);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);

  const cartCount = 1;
  const wishlistCount = 0;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [pathname]);

  return (
    <>
      {/* ==================== header ==================== */}
      <header className="w-full bg-white text-slate-800 border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="container h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-1.5 text-2xl font-black tracking-tight text-slate-900 rounded p-1"
          >
            <span className="text-emerald-600 flex items-center">
              M
              <Plus
                size={20}
                className="stroke-4 text-red-500 -mx-0.5 animate-pulse"
              />
              dico
            </span>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:ml-9 md:flex flex-1 max-w-xl relative">
            <input
              type="text"
              placeholder="Search medicine or health products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-4 pr-10 py-2 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 transition-all"
            />
            <button className="absolute right-3 top-2.5 text-slate-400 hover:text-emerald-600">
              <Search size={18} />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link
              href="/shops"
              className="hidden lg:block text-sm font-semibold text-slate-600 hover:text-emerald-600"
            >
              Shops
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 rounded-xl text-slate-600 hover:text-red-500 hover:bg-slate-100"
            >
              <Heart size={22} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Navbar Cart Icon */}
            <button
              onClick={() => dispatch(sidebarToggle())}
              className="relative p-2 rounded-xl text-slate-600 hover:text-emerald-600 hover:bg-slate-100 transition-all"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Login */}
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 text-sm font-bold text-slate-700 border border-slate-200"
            >
              <User size={16} />
              <span className="hidden sm:inline">Login</span>
            </Link>

            {/* Hamburger Menu (Mobile only) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 md:hidden rounded-xl hover:bg-slate-100 text-slate-600 transition-all"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* ====================  (Scroller) ==================== */}
        <div className="w-full bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 relative flex items-center group">
            <button
              onClick={() => scroll("left")}
              className="absolute cursor-pointer left-2 z-10 p-1 bg-white hover:bg-slate-100 hover:text-emerald-600 text-slate-500 rounded-full shadow-md border border-slate-200 transition-all active:scale-95 hidden md:block"
            >
              <ChevronLeft size={18} />
            </button>

            <div
              ref={scrollRef}
              className="w-full flex items-center overflow-x-auto no-scrollbar scroll-smooth gap-1 h-11 px-8"
            >
              {MEDICO_MEDICINE_CATEGORIES.map((cat) => {
                const targetPath =
                  cat.id === "home" ? "/" : `/category/${cat.id}`;
                const isActive = pathname === targetPath;

                return (
                  <Link
                    key={cat.id}
                    href={targetPath}
                    ref={isActive ? activeRef : null}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all
                      ${
                        isActive
                          ? "text-emerald-600 bg-emerald-50 shadow-sm border border-emerald-100/80"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                      }`}
                  >
                    {cat.nameEn}
                  </Link>
                );
              })}
            </div>

            <button
              onClick={() => scroll("right")}
              className="absolute cursor-pointer right-2 z-10 p-1 bg-white hover:bg-slate-100 hover:text-emerald-600 text-slate-500 rounded-full shadow-md border border-slate-200 transition-all active:scale-95 hidden md:block"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* ==================== FLOATING SIDE CART BUTTON (Desktop Only) ==================== */}

      <button
        onClick={() => dispatch(sidebarToggle())}
        className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-emerald-600 text-white flex-col items-center justify-center gap-1 p-3 rounded-l-2xl shadow-2xl hover:bg-emerald-700 transition-all group border border-emerald-500 border-r-0"
      >
        <div className="relative">
          <ShoppingBag
            size={22}
            className="group-hover:scale-110 transition-transform"
          />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-bounce">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[11px] font-black uppercase tracking-wider writing-mode-vertical mt-1">
          Cart
        </span>
      </button>

      {/* ==================== MOBILE MENU SIDE DRAWER (বাম থেকে ডানে) ==================== */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute inset-y-0 left-0 w-4/5 max-w-xs bg-white border-r border-slate-200 flex flex-col p-6 transition-transform duration-100 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-xl font-black text-slate-900">
              Medico Menu
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-all"
            >
              <X size={20} />
            </button>
          </div>

          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search medicine..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-sm text-slate-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              size={16}
              className="absolute right-3 top-3.5 text-slate-400"
            />
          </div>

          <nav className="flex flex-col gap-1.5 overflow-y-auto pr-1 no-scrollbar">
            <Link
              href="/shops"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 bg-slate-50 hover:bg-slate-100"
            >
              Shops
            </Link>
            <div className="h-px bg-slate-200 my-2" />
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider px-4 mb-1">
              Product Categories
            </p>
            {MEDICO_MEDICINE_CATEGORIES.map((cat) => {
              const targetPath =
                cat.id === "home" ? "/" : `/category/${cat.id}`;
              return (
                <Link
                  key={cat.id}
                  href={targetPath}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                >
                  {cat.nameEn}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ==================== SHOPPING CART SIDE DRAWER (ডান থেকে বামে) ==================== */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-100 ${
          isCartOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => dispatch(sidebarToggle())}
        />

        <div
          className={`absolute inset-y-0 right-0 w-full max-w-md bg-white border-l border-slate-200 flex flex-col p-6 shadow-2xl transition-transform duration-100 ease-in-out ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <span className="text-xl font-black text-slate-900 flex items-center gap-2">
              <ShoppingBag className="text-emerald-600" /> আমার কার্ট (
              {cartCount})
            </span>
            <button
              onClick={() => dispatch(sidebarToggle())}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-all"
            >
              <X size={22} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
            {cartCount > 0 ? (
              <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-xs font-bold text-slate-400 border border-slate-200">
                  Med
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">
                    Napa Extend 665mg
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    পরিমাণ: 1 × $1.20
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500 text-center py-8">
                আপনার কার্টটি খালি আছে।
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500 font-semibold">
                সর্বমোট মূল্য:
              </span>
              <span className="text-xl font-black text-slate-900">$1.20</span>
            </div>
            <Link
              href="/checkout"
              onClick={() => dispatch(sidebarToggle())}
              className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-md"
            >
              অর্ডার সম্পন্ন করুন
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
