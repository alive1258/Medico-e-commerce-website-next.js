/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Star, Plus, Check, Minus } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PackSize, Product } from "@/src/types/product";
import { ADD_TO_CART, REMOVE_FROM_CART } from "@/src/redux/features/cartSlice";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state?.cart?.cartItems || []);

  const [selectedPack, setSelectedPack] = useState<PackSize>(
    product.packSizes?.find((p) => p.id === product.defaultPackSizeId) ||
      product.packSizes?.[0] || {
        id: "default",
        label: "1 Unit",
        quantity: 1,
        price: product.currentPrice,
        originalPrice: product.originalPrice,
        discount: product.discount,
        inStock: true,
      },
  );
  const [isAdded, setIsAdded] = useState(false);

  // Check if this specific pack size is already in cart
  const getCartItemQuantity = () => {
    const existingItem = cartItems.find(
      (item: any) =>
        item.id === product.id && item.packSizeId === selectedPack.id,
    );
    return existingItem ? existingItem.quantity : 0;
  };

  const cartQuantity = getCartItemQuantity();
  const isInCart = cartQuantity > 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const cartItem = {
      id: product.id,
      productId: product.id,
      name: `${product.name} (${selectedPack.label})`,
      price: selectedPack.price,
      quantity: 1,
      packSizeId: selectedPack.id,
      packSizeLabel: selectedPack.label,
      image: product.imageUrl,
      maxQuantity: 99,
      discount: selectedPack.discount || product.discount,
      originalPrice: selectedPack.originalPrice || product.originalPrice,
    };

    dispatch(ADD_TO_CART(cartItem));

    // Show success toast
    toast.success(`✅ ${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    // Show success feedback
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(REMOVE_FROM_CART({ id: product.id, packSizeId: selectedPack.id }));

    // Show removal toast
    toast.info(`🛒 Removed 1 ${product.name} from cart`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  const handlePackChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pack = product.packSizes?.find((p) => p.id === e.target.value);
    if (pack) {
      setSelectedPack(pack);
    }
  };

  return (
    <div className="shrink-0 w-47.5 sm:w-55 bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group/card relative">
      {/* Discount Badge */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
        <span className="bg-red-500 text-white font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
          {selectedPack.discount || product.discount}% OFF
        </span>
        {isInCart && (
          <span className="bg-emerald-500 text-white font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
            {cartQuantity} in Cart
          </span>
        )}
      </div>

      {/* Product Image */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-square w-full bg-slate-50 overflow-hidden block"
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          className="object-cover transition-transform duration-500 will-change-transform group-hover/card:scale-105"
          loading="lazy"
          fill
          sizes="(max-width: 640px) 190px, 220px"
          style={{ objectFit: "cover" }}
        />
      </Link>

      {/* Product Info */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <Link href={`/product/${product.slug}`}>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight line-clamp-2 min-h-9 hover:text-emerald-600 transition-colors">
              {product.name}
            </h4>
          </Link>
        </div>

        {/* Rating Stars */}
        {product.rating !== undefined && (
          <div className="flex items-center gap-1 py-1">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={10}
                  fill={
                    i < Math.floor(product.rating || 0)
                      ? "currentColor"
                      : "none"
                  }
                  className={
                    i < Math.floor(product.rating || 0)
                      ? "stroke-none"
                      : "stroke-1"
                  }
                />
              ))}
            </div>
            <span className="text-[9px] text-slate-400 font-bold">
              ({product.reviewsCount || 0})
            </span>
          </div>
        )}

        {/* Pack Size Selector */}
        {product.packSizes && product.packSizes.length > 1 && (
          <div className="">
            <select
              value={selectedPack.id}
              onChange={handlePackChange}
              className="w-full text-[10px] font-semibold border border-slate-200 rounded-lg px-2 py-1.5 bg-slate-50 focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              {product.packSizes.map((pack) => {
                const inCart = cartItems.some(
                  (item: any) =>
                    item.id === product.id && item.packSizeId === pack.id,
                );
                return (
                  <option key={pack.id} value={pack.id}>
                    {pack.label} - ৳{pack.price.toFixed(2)}
                    {inCart ? " ✓" : ""}
                  </option>
                );
              })}
            </select>
          </div>
        )}

        {/* Pricing and Add/Remove Button */}
        <div className="pt-3 border-t border-slate-50 flex items-center justify-between gap-1 mt-2">
          <Link
            href={`/product/${product.slug}`}
            className="flex flex-col hover:opacity-80 transition-opacity"
          >
            <span className="text-[10px] text-slate-400 line-through">
              ৳{" "}
              {selectedPack.originalPrice?.toFixed(2) ||
                product.originalPrice.toFixed(2)}
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-emerald-600">
              ৳ {selectedPack.price.toFixed(2)}
            </span>
          </Link>

          {isInCart ? (
            // Show quantity controls if item is in cart
            <div className="flex items-center gap-1 bg-emerald-50 rounded-xl border border-emerald-200 px-1.5 py-0.5">
              <button
                onClick={handleRemoveFromCart}
                className="p-1 rounded-lg hover:bg-emerald-100 transition-colors text-emerald-600"
                aria-label="Remove one"
              >
                <Minus size={14} className="stroke-3" />
              </button>
              <span className="text-xs font-bold text-emerald-700 min-w-4.5 text-center">
                {cartQuantity}
              </span>
              <button
                onClick={handleAddToCart}
                className="p-1 rounded-lg hover:bg-emerald-100 transition-colors text-emerald-600"
                aria-label="Add one more"
              >
                <Plus size={14} className="stroke-3" />
              </button>
            </div>
          ) : (
            // Show ADD button if not in cart
            <button
              onClick={handleAddToCart}
              className={`font-black text-xs px-2.5 py-1.5 rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-1 uppercase tracking-wider hover:shadow-md ${
                isAdded
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-500 hover:bg-emerald-600 text-white"
              }`}
            >
              {isAdded ? (
                <>
                  <Check size={12} className="stroke-3" />
                  ADDED
                </>
              ) : (
                <>
                  <Plus size={12} className="stroke-3" />
                  ADD
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
