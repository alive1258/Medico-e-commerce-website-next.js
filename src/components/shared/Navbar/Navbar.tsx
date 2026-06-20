"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Search, Heart, ShoppingBag, User, Menu, X, Plus } from "lucide-react";
import Link from "next/link";

// সাব-ক্যাটাগরি ডেটা (একদম আপনার রিকোয়েস্ট অনুযায়ী)
export const MEDICO_CATEGORIES = [
  { name: "Medicines", href: "/category/medicines", isHighlight: true },
  { name: "Honey", href: "/category/honey" },
  { name: "Nuts & Seeds", href: "/category/nuts-seeds" },
  { name: "Healthy Snacks", href: "/category/healthy-snacks" },
  { name: "Spices & Masala", href: "/category/spices-masala" },
  { name: "Oil & Ghee", href: "/category/oil-ghee" },
  { name: "Dry Fruits", href: "/category/dry-fruits" },
  { name: "Organic", href: "/category/organic" },
  { name: "Combo Packs", href: "/category/combo-packs" },
  { name: "Natural Foods", href: "/category/natural-foods" },
  { name: "Gifts", href: "/category/gifts" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  // ডেমো স্টেট (রিয়েল অ্যাপে গ্লোবাল স্টেট/কনটেক্সট থেকে আসবে)
  const cartCount = 1;
  const wishlistCount = 0;

  return (
    <>
      <header className="w-full bg-foreground text-white border-b border-slate-800 sticky top-0 z-50 shadow-md">
        {/* মেইন টপ হেডার (Logo, Search, Actions) */}
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* ১. লোগো এরিয়া */}
          <Link
            href="/"
            className="flex items-center gap-1.5 text-2xl font-black tracking-tight text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded p-1"
            aria-label="Medico Home"
          >
            <span className="text-emerald-500 flex items-center">
              M
              <Plus
                size={20}
                className="stroke-4 text-red-500 -mx-0.5 animate-pulse"
              />
              dico
            </span>
          </Link>

          {/* ২. বড় সার্চ বার (ডেস্কটপ এবং ট্যাবলেট) */}
          <div className="hidden md:flex flex-1 max-w-xl relative">
            <input
              type="text"
              placeholder="ওষুধ বা হেলদি ফুড সার্চ করুন (e.g., Napa, Organic Honey)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-4 pr-10 py-2 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            />
            <button
              className="absolute right-3 top-2.5 text-slate-400 hover:text-emerald-500 transition-colors"
              aria-label="Search Submit"
            >
              <Search size={18} />
            </button>
          </div>

          {/* ৩. অ্যাকশন বাটনস (Wishlist, Cart, Login) */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* দোকান/Shops লিংক (ডেস্কটপ) */}
            <Link
              href="/shops"
              className="hidden lg:block text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Shops
            </Link>

            {/* উইশলিস্ট */}
            <Link
              href="/wishlist"
              className="relative p-2 rounded-xl text-slate-300 hover:text-red-400 hover:bg-slate-800/50 transition-all"
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <Heart size={22} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* কার্ট */}
            <Link
              href="/cart"
              className="relative p-2 rounded-xl text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50 transition-all"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* লগইন বাটন */}
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-semibold transition-all border border-slate-700/60"
            >
              <User size={16} />
              <span className="hidden sm:inline">Login</span>
            </Link>

            {/* মোবাইল মেনু ট্রিগার */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 md:hidden rounded-xl hover:bg-slate-800 text-slate-300 transition-all"
              aria-label="Open Navigation Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* ৪. বটম অল ক্যাটাগরি নেভিগেশন রো (Horizontal Scroll on Mobile) */}
        <div className="w-full bg-secoundary border-t border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4 flex items-center overflow-x-auto no-scrollbar scroll-smooth gap-1 h-11">
            {MEDICO_CATEGORIES.map((cat) => {
              const isActive = pathname === cat.href;
              return (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all
                    ${
                      cat.isHighlight
                        ? "bg-emerald-600 text-white hover:bg-emerald-500"
                        : isActive
                          ? "text-emerald-400 bg-slate-800"
                          : "text-slate-300 hover:text-white hover:bg-slate-800/40"
                    }
                  `}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* ৫. মোবাইল রেসপনসিভ ড্রয়ার (Mobile Sidebar Menu) */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={`absolute inset-y-0 right-0 w-4/5 max-w-xs bg-foreground border-l border-slate-800 flex flex-col p-6 transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-xl font-black text-white">Medico Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* মোবাইল সার্চবার */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="ওষুধ খুঁজুন..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-4 pr-10 py-2.5 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              size={16}
              className="absolute right-3 top-3.5 text-slate-500"
            />
          </div>

          {/* মোবাইল ক্যাটাগরি ও লিংক লিস্ট */}
          <nav className="flex flex-col gap-1.5 overflow-y-auto pr-1">
            <Link
              href="/shops"
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 bg-slate-900/40"
            >
              Shops
            </Link>
            <div className="h-px bg-slate-800 my-2" />
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider px-4 mb-1">
              Product Categories
            </p>
            {MEDICO_CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
