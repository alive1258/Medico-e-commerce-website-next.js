// app/category/[slug]/page.tsx
"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { Filter, X } from "lucide-react";

import {
  CategoryFilter,
  DiscountFilter,
  PriceFilter,
} from "@/src/components/filters";

import CategoryProductCard from "@/src/components/HomePage/ProductShowcase/CategoryProductCard";
import { PRODUCTS_DATA } from "@/src/utils/data/products";
import { Product } from "@/src/types/product";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedDiscount, setSelectedDiscount] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>("default");

  // Add to Cart function
  const addToCart = (
    product: Product,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    // Your cart logic here
    console.log("Added to cart:", product);
    // Example: dispatch to cart store or update state
    // dispatch(addToCartAction(product));
  };

  // Get category name from slug
  const categoryName = useMemo(() => {
    const categoryMap: Record<string, string> = {
      medicine: "OTC Medicine",
      healthcare: "Healthcare",
      beauty: "Beauty",
      "sexual-wellness": "Sexual Wellness",
      "baby-mom-care": "Baby & Mom Care",
      herbal: "Herbal",
      "home-care": "Home Care",
      supplement: "Supplement Festival",
      "food-nutrition": "Food and Nutrition",
      "pet-care": "Pet Care",
      veterinary: "Veterinary",
      homeopathy: "Homeopathy",
    };
    return categoryMap[slug] || slug;
  }, [slug]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let products = PRODUCTS_DATA;

    products = products.filter((p) => p.category === categoryName);

    if (selectedPrice) {
      products = products.filter((p) => {
        const price = p.currentPrice;
        switch (selectedPrice) {
          case "under-500":
            return price < 500;
          case "500-1000":
            return price >= 500 && price <= 1000;
          case "1000-2000":
            return price >= 1000 && price <= 2000;
          case "over-2000":
            return price > 2000;
          default:
            return true;
        }
      });
    }

    if (selectedDiscount) {
      const minDiscount = parseInt(selectedDiscount);
      products = products.filter((p) => p.discount >= minDiscount);
    }

    if (selectedCategories.length > 0) {
      products = products.filter((p) =>
        selectedCategories.some(
          (cat) =>
            p.category?.toLowerCase().includes(cat.toLowerCase()) ?? false,
        ),
      );
    }

    switch (sortBy) {
      case "price-low":
        products = [...products].sort(
          (a, b) => a.currentPrice - b.currentPrice,
        );
        break;
      case "price-high":
        products = [...products].sort(
          (a, b) => b.currentPrice - a.currentPrice,
        );
        break;
      case "discount":
        products = [...products].sort((a, b) => b.discount - a.discount);
        break;
      case "popular":
        products = [...products].sort(
          (a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0),
        );
        break;
      default:
        break;
    }

    return products;
  }, [
    categoryName,
    selectedPrice,
    selectedDiscount,
    selectedCategories,
    sortBy,
  ]);

  const clearAllFilters = () => {
    setSelectedPrice(null);
    setSelectedDiscount(null);
    setSelectedCategories([]);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  return (
    <div className="container  py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {categoryName}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {filteredProducts.length} products found
        </p>
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden flex items-center justify-between mb-4">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-bold text-slate-700 transition-all"
        >
          <Filter size={16} />
          Filters
          {(selectedPrice ||
            selectedDiscount ||
            selectedCategories.length > 0) && (
            <span className="bg-emerald-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
              {(selectedPrice ? 1 : 0) +
                (selectedDiscount ? 1 : 0) +
                selectedCategories.length}
            </span>
          )}
        </button>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 bg-slate-100 border-0 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
        >
          <option value="default">Sort by</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="discount">Discount</option>
          <option value="popular">Popular</option>
        </select>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters - Desktop */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
                Filters
              </h2>
              {(selectedPrice ||
                selectedDiscount ||
                selectedCategories.length > 0) && (
                <button
                  onClick={clearAllFilters}
                  className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            <PriceFilter
              selectedRange={selectedPrice}
              onSelect={setSelectedPrice}
            />

            <DiscountFilter
              selectedDiscount={selectedDiscount}
              onSelect={setSelectedDiscount}
            />

            <CategoryFilter
              selectedCategories={selectedCategories}
              onToggle={toggleCategory}
            />
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 w-4/5 max-w-xs bg-white shadow-xl overflow-y-auto p-5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-extrabold text-slate-900">
                  Filters
                </h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <PriceFilter
                selectedRange={selectedPrice}
                onSelect={setSelectedPrice}
              />

              <DiscountFilter
                selectedDiscount={selectedDiscount}
                onSelect={setSelectedDiscount}
              />

              <CategoryFilter
                selectedCategories={selectedCategories}
                onToggle={toggleCategory}
              />

              <button
                onClick={() => {
                  clearAllFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="w-full mt-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-bold text-slate-700 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort - Desktop */}
          <div className="hidden lg:flex items-center justify-between mb-4">
            <p className="text-sm text-slate-500">
              Showing {filteredProducts.length} products
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="default">Sort by: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Discount</option>
              <option value="popular">Popular</option>
            </select>
          </div>

          {/* Products Grid - Fixed: Passing addToCart prop */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <CategoryProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg font-semibold text-slate-600">
                No products found
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Try adjusting your filters
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-4 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
