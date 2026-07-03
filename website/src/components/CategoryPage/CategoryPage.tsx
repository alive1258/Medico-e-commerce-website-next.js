/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-render */
"use client";

import { useState, useMemo, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Filter, X, ChevronLeft } from "lucide-react";

import CategoryProductCard from "@/src/components/HomePage/ProductShowcase/CategoryProductCard";
import { useGetAllProductCategoriesQuery } from "@/src/redux/api/productCategoriesApi";
import { useAddToCartMutation } from "@/src/redux/api/cartApi";
import { useGetProductsByCategoryIdQuery } from "@/src/redux/api/productsApi";
import { Product } from "@/src/types/product";
import { toast } from "react-toastify";
import { slugify } from "@/src/utils/slugify";
import { DiscountFilter, PriceFilter } from "../filters";
import CategoryFilter from "../filters/CategoryFilter";
import LoadingSkeleton from "./LoadingSkeleton";

interface CategoryPageProps {
  slug: string;
}

interface FilterState {
  price: string | null;
  discount: string | null;
  categories: string[];
  sortBy: string;
}

export default function CategoryPage({ slug: propsSlug }: CategoryPageProps) {
  const params = useParams();
  const router = useRouter();

  const slug = propsSlug || (params?.slug as string) || "";

  const [filters, setFilters] = useState<FilterState>({
    price: null,
    discount: null,
    categories: [],
    sortBy: "default",
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [categoryFound, setCategoryFound] = useState<boolean | null>(null);

  // 1. Extract isLoading from categories query
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetAllProductCategoriesQuery(undefined);

  const category = useMemo(() => {
    if (!categoriesData?.data) {
      return null;
    }

    if (!slug || slug.trim() === "") {
      setCategoryFound(false);
      return null;
    }

    const targetSlug = slug.toLowerCase().trim();

    const directMatch = categoriesData.data.find(
      (cat: any) => cat.slug?.toLowerCase() === targetSlug,
    );

    if (directMatch) {
      setCategoryFound(true);
      return directMatch;
    }

    const slugMatch = categoriesData.data.find(
      (cat: any) => slugify(cat.name).toLowerCase() === targetSlug,
    );

    if (slugMatch) {
      setCategoryFound(true);
      return slugMatch;
    }

    const nameMatch = categoriesData.data.find(
      (cat: any) => cat.name?.toLowerCase() === targetSlug.replace(/-/g, " "),
    );

    if (nameMatch) {
      setCategoryFound(true);
      return nameMatch;
    }
    setCategoryFound(false);
    return null;
  }, [slug, categoriesData]);

  const categoryName = useMemo(() => {
    if (category) {
      return category.name;
    }
    if (slug) {
      return slug.replace(/-/g, " ");
    }
    return "Category";
  }, [category, slug]);

  const categoryId = categoryFound ? category?.id : null;

  // 2. Extract isLoading/isFetching from products query
  const {
    data: productsData,
    isError,
    isLoading: isProductsLoading,
    isFetching: isProductsFetching,
    refetch,
  } = useGetProductsByCategoryIdQuery(
    { categoryId: categoryId!, limit: 200 },
    { skip: !categoryId || !categoryFound },
  );

  const productsByCategory = useMemo<Product[]>(() => {
    if (!categoryFound || !productsData) {
      return [];
    }

    const rawApiData = productsData as any;

    if (rawApiData.data && Array.isArray(rawApiData.data.data)) {
      return rawApiData.data.data;
    }

    if (Array.isArray(rawApiData.data)) {
      return rawApiData.data;
    }

    if (Array.isArray(rawApiData)) {
      return rawApiData;
    }

    return [];
  }, [productsData, categoryFound]);

  const [addToCart] = useAddToCartMutation();

  const handleAddToCart = useCallback(
    async (product: Product, event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      try {
        const variantId = product.variants?.[0]?.id || product.id;
        await addToCart({
          product_id: product.id,
          quantity: 1,
          pack_size_id: variantId,
        }).unwrap();
        toast.success(`${product.name} added to cart!`, {
          position: "bottom-right",
          autoClose: 2000,
        });
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to add to cart", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    },
    [addToCart],
  );

  const getProductPrice = useCallback((product: Product): number => {
    if (product.variants && product.variants.length > 0) {
      return product.variants[0].price;
    }
    return product.price_range?.min || 0;
  }, []);

  const getProductDiscount = useCallback((product: Product): number => {
    if (product.variants && product.variants.length > 0) {
      const variant = product.variants[0];
      if (variant.discount_price) {
        return Math.round(
          ((variant.price - variant.discount_price) / variant.price) * 100,
        );
      }
    }
    return product.discount_range?.min || 0;
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = productsByCategory;

    if (filters.price) {
      filtered = filtered.filter((p: Product) => {
        const price = getProductPrice(p);
        switch (filters.price) {
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

    if (filters.discount) {
      const minDiscount = parseInt(filters.discount, 10);
      filtered = filtered.filter(
        (p: Product) => getProductDiscount(p) >= minDiscount,
      );
    }

    if (filters.categories.length > 0) {
      filtered = filtered.filter((p: Product) => {
        const productCategorySlug = p.category?.slug || "";
        return filters.categories.includes(productCategorySlug);
      });
    }

    switch (filters.sortBy) {
      case "price-low":
        filtered = [...filtered].sort(
          (a, b) => getProductPrice(a) - getProductPrice(b),
        );
        break;
      case "price-high":
        filtered = [...filtered].sort(
          (a, b) => getProductPrice(b) - getProductPrice(a),
        );
        break;
      case "discount":
        filtered = [...filtered].sort(
          (a, b) => getProductDiscount(b) - getProductDiscount(a),
        );
        break;
      case "popular":
        filtered = [...filtered].sort(
          (a, b) =>
            ((b as any).reviewsCount || 0) - ((a as any).reviewsCount || 0),
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [productsByCategory, filters, getProductPrice, getProductDiscount]);

  const clearAllFilters = useCallback(() => {
    setFilters({
      price: null,
      discount: null,
      categories: [],
      sortBy: "default",
    });
  }, []);

  const toggleCategory = useCallback((categorySlug: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(categorySlug)
        ? prev.categories.filter((c) => c !== categorySlug)
        : [...prev.categories, categorySlug],
    }));
  }, []);

  const updateFilter = useCallback((key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.price) count++;
    if (filters.discount) count++;
    if (filters.categories.length > 0) count++;
    return count;
  }, [filters]);

  // ✅ 3. Check for Loading state first before Category Validation Checks
  if (isCategoriesLoading || (categoryFound && isProductsLoading)) {
    return <LoadingSkeleton />;
  }

  if (categoryFound === false) {
    return (
      <div className="bg-slate-50 min-h-screen">
        <div className="container  py-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 mb-6 transition-colors group"
          >
            <ChevronLeft
              size={20}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            <span className="font-semibold">Back</span>
          </button>

          <div className="text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-6">🔍</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Category Not Found
            </h2>
            <p className="text-slate-500 mb-6">
              The category &ldquo;{slug?.replace(/-/g, " ") || ""}&rdquo; does
              not exist.
            </p>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 text-left mb-6">
              <h3 className="text-sm font-bold text-slate-700 mb-3">
                Available Categories:
              </h3>
              <div className="flex flex-wrap gap-2">
                {categoriesData?.data?.map((cat: any) => (
                  <button
                    key={cat.id}
                    onClick={() =>
                      router.push(`/category/${cat.slug || slugify(cat.name)}`)
                    }
                    className="px-3 py-1.5 bg-emerald-50 text-emerald-600 text-sm font-semibold rounded-lg hover:bg-emerald-100 transition-colors"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => router.push("/")}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-sm hover:shadow-md"
            >
              Browse All Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container  py-12 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-slate-500 mb-6">
            We couldn&apos;t load the products. Please try again.
          </p>
          <button
            onClick={() => refetch()}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-sm hover:shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (categoryFound === null || !category) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container  py-6">
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 mb-4 transition-colors group"
          >
            <ChevronLeft
              size={20}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            <span className="font-semibold">Back</span>
          </button>

          <div className="mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
                  {categoryName}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden flex items-center justify-between mb-4">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 rounded-xl text-sm font-bold text-slate-700 transition-all border border-slate-200 shadow-sm"
          >
            <Filter size={16} />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-emerald-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter("sortBy", e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
          >
            <option value="default">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="discount">Discount</option>
            <option value="popular">Popular</option>
          </select>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sticky top-24 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
                  Filters
                </h2>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    Clear All ({activeFilterCount})
                  </button>
                )}
              </div>

              <PriceFilter
                selectedRange={filters.price}
                onSelect={(value) => updateFilter("price", value)}
              />

              <DiscountFilter
                selectedDiscount={filters.discount}
                onSelect={(value) => updateFilter("discount", value)}
              />

              <CategoryFilter
                selectedCategories={filters.categories}
                onToggle={toggleCategory}
              />
            </div>
          </aside>

          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setIsMobileFilterOpen(false)}
              />
              <div className="absolute inset-y-0 left-0 w-4/5 max-w-xs bg-white shadow-xl overflow-y-auto p-5 animate-in slide-in-from-left duration-300">
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
                  selectedRange={filters.price}
                  onSelect={(value) => updateFilter("price", value)}
                />

                <DiscountFilter
                  selectedDiscount={filters.discount}
                  onSelect={(value) => updateFilter("discount", value)}
                />

                <CategoryFilter
                  selectedCategories={filters.categories}
                  onToggle={toggleCategory}
                />

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      clearAllFilters();
                      setIsMobileFilterOpen(false);
                    }}
                    className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-bold text-slate-700 transition-all"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="flex-1 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}

          <main className="flex-1">
            <div className="hidden lg:flex items-center justify-between mb-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-bold text-slate-700">
                  {filteredProducts.length}
                </span>{" "}
                products
              </p>
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilter("sortBy", e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="default">Sort by: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Discount</option>
                <option value="popular">Popular</option>
              </select>
            </div>

            {/* ✅ 4. Show product-grid loaders only if background-fetching items */}
            {isProductsFetching && filteredProducts.length === 0 ? (
              <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-slate-200 h-64 animate-pulse"
                  />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product: Product) => (
                  <CategoryProductCard
                    key={product.id}
                    product={product}
                    addToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-lg font-semibold text-slate-600">
                  No products found
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  Try adjusting your filters
                </p>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="mt-4 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-sm hover:shadow-md"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
