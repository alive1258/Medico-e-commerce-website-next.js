/* eslint-disable @typescript-eslint/no-explicit-any */
// components/product/RelatedProducts.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Plus, Check, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Product, PackSize } from "@/src/types/product";
import { ADD_TO_CART, REMOVE_FROM_CART } from "@/src/redux/features/cartSlice";

interface RelatedProductsProps {
  products: Product[];
  currentProductId: string;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  products,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state?.cart?.cartItems || []);
  const [addedStates, setAddedStates] = useState<{ [key: string]: boolean }>(
    {},
  );
  // Store selected pack for each product
  const [selectedPacks, setSelectedPacks] = useState<{ [key: string]: string }>(
    {},
  );

  if (products.length === 0) return null;

  // Get selected pack for a product
  const getSelectedPack = (product: Product): PackSize => {
    const selectedId = selectedPacks[product.id];
    const pack = product.packSizes?.find((p) => p.id === selectedId);
    return (
      pack ||
      product.packSizes?.find((p) => p.id === product.defaultPackSizeId) ||
      product.packSizes?.[0] || {
        id: "default",
        label: "1 Unit",
        quantity: 1,
        price: product.currentPrice,
        originalPrice: product.originalPrice,
        discount: product.discount,
        inStock: true,
      }
    );
  };

  // Check if a specific pack size is in cart
  const getCartItemQuantity = (productId: string, packSizeId: string) => {
    const existingItem = cartItems.find(
      (item: any) => item.id === productId && item.packSizeId === packSizeId,
    );
    return existingItem ? existingItem.quantity : 0;
  };

  const handleAddToCart = (
    e: React.MouseEvent,
    product: Product,
    packSize: PackSize,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.inStock === false) {
      toast.error("This product is currently out of stock!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    const cartItem = {
      id: product.id,
      productId: product.id,
      name: `${product.name} (${packSize.label})`,
      price: packSize.price,
      quantity: 1,
      packSizeId: packSize.id,
      packSizeLabel: packSize.label,
      image: product.imageUrl,
      maxQuantity: 99,
      discount: packSize.discount || product.discount,
      originalPrice: packSize.originalPrice || product.originalPrice,
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
      theme: "light",
    });

    // Set added state for animation
    setAddedStates((prev) => ({
      ...prev,
      [`${product.id}-${packSize.id}`]: true,
    }));
    setTimeout(() => {
      setAddedStates((prev) => ({
        ...prev,
        [`${product.id}-${packSize.id}`]: false,
      }));
    }, 2000);
  };

  const handleRemoveFromCart = (
    e: React.MouseEvent,
    productId: string,
    packSizeId: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(REMOVE_FROM_CART({ id: productId, packSizeId }));

    toast.info(`🛒 Removed from cart`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  const handlePackChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    productId: string,
  ) => {
    setSelectedPacks((prev) => ({
      ...prev,
      [productId]: e.target.value,
    }));
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
        You May Also Like
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => {
          const selectedPack = getSelectedPack(product);
          const cartQuantity = getCartItemQuantity(product.id, selectedPack.id);
          const isInCart = cartQuantity > 0;
          const isAdded =
            addedStates[`${product.id}-${selectedPack.id}`] || false;

          return (
            <div
              key={product.id}
              className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <Link href={`/product/${product.slug}`} className="block">
                <div className="relative aspect-square bg-slate-50">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  {product.discount > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                      {product.discount}% OFF
                    </span>
                  )}
                  {isInCart && (
                    <span className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                      {cartQuantity} in Cart
                    </span>
                  )}
                </div>
              </Link>

              <div className="p-3 flex-1 flex flex-col">
                <Link href={`/product/${product.slug}`} className="flex-1">
                  <h4 className="text-lg font-bold text-slate-800 line-clamp-2 min-h-8 hover:text-emerald-600 transition-colors">
                    {product.name}
                  </h4>
                </Link>

                <div className="flex items-center justify-between mt-1">
                  <Link href={`/product/${product.slug}`}>
                    <div>
                      {selectedPack.originalPrice &&
                        selectedPack.originalPrice > selectedPack.price && (
                          <span className="text-[10px] text-slate-400 line-through block">
                            ৳{selectedPack.originalPrice.toFixed(2)}
                          </span>
                        )}
                      <span className="text-sm font-extrabold text-emerald-600">
                        ৳{selectedPack.price.toFixed(2)}
                      </span>
                    </div>
                  </Link>

                  {product.rating && (
                    <div className="flex items-center gap-1">
                      <Star
                        size={12}
                        className="fill-amber-400 text-amber-400 stroke-none"
                      />
                      <span className="text-xs font-bold text-slate-600">
                        {product.rating}
                      </span>
                    </div>
                  )}
                </div>

                {/* Pack Size Selector */}
                {product.packSizes && product.packSizes.length > 1 && (
                  <div className="mt-1">
                    <select
                      value={selectedPack.id}
                      onChange={(e) => handlePackChange(e, product.id)}
                      className="w-full text-[12px] font-semibold border border-slate-200 rounded-lg px-2 py-1.5 bg-slate-50 focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {product.packSizes.map((pack) => {
                        const inCart = cartItems.some(
                          (item: any) =>
                            item.id === product.id &&
                            item.packSizeId === pack.id,
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

                {/* Add to Cart Button */}
                <div className="mt-2 pt-2 border-t border-slate-100">
                  {isInCart ? (
                    <div className="flex items-center justify-between gap-1 bg-emerald-50 rounded-lg border border-emerald-200 px-1.5 py-0.5">
                      <button
                        onClick={(e) =>
                          handleRemoveFromCart(e, product.id, selectedPack.id)
                        }
                        className="p-1 rounded hover:bg-emerald-100 transition-colors text-emerald-600"
                        aria-label="Remove one"
                      >
                        <Minus size={14} className="stroke-3" />
                      </button>
                      <span className="text-xs font-bold text-emerald-700 min-w-4.5 text-center">
                        {cartQuantity}
                      </span>
                      <button
                        onClick={(e) =>
                          handleAddToCart(e, product, selectedPack)
                        }
                        className="p-1 rounded hover:bg-emerald-100 transition-colors text-emerald-600"
                        aria-label="Add one more"
                      >
                        <Plus size={14} className="stroke-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => handleAddToCart(e, product, selectedPack)}
                      disabled={product.inStock === false}
                      className={`w-full font-black text-base px-2 py-1.5 rounded-lg transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1 uppercase tracking-wider hover:shadow-md ${
                        isAdded
                          ? "bg-emerald-600 text-white"
                          : "bg-emerald-500 hover:bg-emerald-600 text-white"
                      } disabled:bg-slate-300 disabled:cursor-not-allowed`}
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
        })}
      </div>
    </div>
  );
};
