/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { sidebarToggle } from "@/src/redux/features/sidebarSlice";
import CartSidebar from "./CartSidebar";
import { useGetAllProductCategoriesQuery } from "@/src/redux/api/productCategoriesApi";
import { slugify } from "@/src/utils/slugify";
import {
  authApi,
  useGetMyProfileQuery,
  useSignOutMutation,
} from "@/src/redux/api/authApi";
import { logout, storeUser } from "@/src/redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { ApiError } from "@/src/types/authType";

interface RootState {
  auth: {
    user: {
      email: string;
      role: string;
    } | null;
  };
}

export default function Navbar() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state?.cart?.cartItems || []);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const router = useRouter();

  const { user: userData } = useSelector((state: RootState) => state.auth);
  const { data: myInfo } = useGetMyProfileQuery();
  const [signOut, { isLoading: isLoggingOut }] = useSignOutMutation();

  const { data: catData } = useGetAllProductCategoriesQuery(undefined);
  const filteredData = catData?.data || [];
  console.log(filteredData, "filteredData");

  // Calculate unique product count
  const uniqueProductCount = cartItems.length;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);

  const wishlistCount = 0;

  const user = myInfo?.data?.user;
  const isLoggedIn = !!(userData || user);

  // Sync user to redux
  useEffect(() => {
    if (user && !userData) {
      dispatch(storeUser({ email: user.email, role: user.role }));
    }
  }, [user, userData, dispatch]);

  const handleLogout = async () => {
    try {
      const response = await signOut().unwrap();
      if (response) {
        dispatch(logout());
        dispatch(authApi.util.resetApiState());
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        document.cookie =
          "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        toast.success("Successfully logged out!");
        setShowLogoutModal(false);
        router.push("/");
      }
    } catch (err: unknown) {
      const error = err as ApiError;
      dispatch(logout());
      dispatch(authApi.util.resetApiState());
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      document.cookie =
        "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      toast.error(error?.data?.message || "Sign out failed", { theme: "dark" });
      setShowLogoutModal(false);
      router.push("/");
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* ==================== HEADER ==================== */}
      <header className="w-full bg-white text-slate-800 border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="container h-16 flex items-center justify-between gap-4 ">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xl sm:text-2xl font-black tracking-tight text-slate-900 rounded p-1 shrink-0"
          >
            <span className="text-emerald-600 flex items-center">
              M
              <Plus
                size={18}
                className="stroke-4 text-red-500 -mx-0.5 animate-pulse"
              />
              dico
            </span>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xl relative mx-4">
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
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 rounded-xl text-slate-600 hover:text-red-500 hover:bg-slate-100 transition-all"
            >
              <Heart size={20} className="sm:w-5.5 sm:h-5.5" />
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
              <ShoppingBag size={20} className="sm:w-5.5 sm:h-5.5" />
              {uniqueProductCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {uniqueProductCount}
                </span>
              )}
            </button>

            {/* ✅ Login / Dashboard + Logout (Desktop) */}
            <div className="hidden lg:flex items-center gap-3">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/account"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold transition-all"
                  >
                    <LayoutDashboard size={16} />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-all"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 text-sm font-bold text-slate-700 border border-slate-200 hover:bg-slate-200 transition-all"
                >
                  <User size={16} />
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* ✅ Mobile: Login/User Icon */}
            <div className="lg:hidden">
              {isLoggedIn ? (
                <Link
                  href="/account"
                  className="p-2 rounded-xl text-slate-600 hover:text-emerald-600 hover:bg-slate-100 transition-all"
                >
                  <User size={20} />
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="p-2 rounded-xl text-slate-600 hover:text-emerald-600 hover:bg-slate-100 transition-all"
                >
                  <User size={20} />
                </Link>
              )}
            </div>

            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 lg:hidden rounded-xl hover:bg-slate-100 text-slate-600 transition-all"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* ==================== CATEGORY SCROLLER ==================== */}
        <div className="w-full bg-slate-50 border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-4 relative flex items-center group">
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
              {filteredData?.map((cat: any) => {
                const slug = slugify(cat?.name);
                const targetPath = slug === "home" ? "/" : `/category/${slug}`;
                const isActive = pathname === targetPath;

                return (
                  <Link
                    key={cat.id}
                    href={targetPath}
                    ref={isActive ? activeRef : null}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all
                        ${
                          isActive
                            ? "text-emerald-600 "
                            : "text-slate-600 hover:text-emerald-600"
                        }`}
                  >
                    {cat?.name}
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

      {/* ==================== FLOATING SIDE CART BUTTON ==================== */}
      <button
        onClick={() => dispatch(sidebarToggle())}
        className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-emerald-600 text-white flex-col items-center justify-center gap-1 p-3 rounded-l-2xl shadow-2xl hover:bg-emerald-700 transition-all group border border-emerald-500 border-r-0"
      >
        <div className="relative">
          <ShoppingBag
            size={22}
            className="group-hover:scale-110 transition-transform"
          />
          {uniqueProductCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-bounce">
              {uniqueProductCount}
            </span>
          )}
        </div>
        <span className="text-[11px] font-black uppercase tracking-wider writing-mode-vertical mt-1">
          Cart
        </span>
      </button>

      {/* ==================== MOBILE MENU SIDE DRAWER ==================== */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
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
          className={`absolute inset-y-0 left-0 w-4/5 max-w-xs bg-white border-r border-slate-200 flex flex-col p-6 transition-transform duration-300 ease-in-out ${
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

          {/* ✅ Mobile User Info */}
          {isLoggedIn && user && (
            <div className="mb-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <p className="text-sm font-bold text-slate-800">{user.name}</p>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
          )}

          <div className="relative mb-4">
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

          <nav className="flex flex-col gap-1.5 overflow-y-auto pr-1 no-scrollbar flex-1">
            {/* ✅ Dashboard Link (Mobile) */}
            {isLoggedIn && (
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-all"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
            )}

            <Link
              href="/shops"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100 transition-all"
            >
              Shops
            </Link>
            <div className="h-px bg-slate-200 my-2" />
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider px-4 mb-1">
              Product Categories
            </p>
            {filteredData?.map((cat: any) => {
              const slug = slugify(cat?.name);
              const targetPath = slug === "home" ? "/" : `/category/${slug}`;
              return (
                <Link
                  key={cat.id}
                  href={targetPath}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                >
                  {cat?.name}
                </Link>
              );
            })}

            {/* ✅ Logout Button (Mobile) */}
            {isLoggedIn && (
              <>
                <div className="h-px bg-slate-200 my-2" />
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setShowLogoutModal(true);
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* ==================== CART SIDEBAR ==================== */}
      <CartSidebar />

      {/* --- LOGOUT MODAL --- */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            onClick={() => !isLoggingOut && setShowLogoutModal(false)}
          />
          <div className="relative bg-[#0F0A21] border border-[#252528] p-6 lg:p-8 rounded-2xl max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-white mb-2">Sign Out?</h3>
            <p className="text-gray-400 mb-8 text-sm">
              Are you sure you want to end your session?
            </p>
            <div className="flex gap-3">
              <button
                disabled={isLoggingOut}
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-3 rounded-xl border border-[#252528] text-gray-300 hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={isLoggingOut}
                onClick={handleLogout}
                className="flex-1 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors disabled:opacity-50"
              >
                {isLoggingOut ? "Ending..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
