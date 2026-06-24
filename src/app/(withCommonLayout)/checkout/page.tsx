// app/checkout/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Truck,
  RefreshCw,
  Lock,
  CreditCard,
  Building2,
  MapPin,
  User,
  Mail,
  Phone,
  MessageSquare,
  Percent,
  CheckCircle,
} from "lucide-react";

// Types
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  discount?: number;
}

interface CheckoutFormData {
  fullName: string;
  mobileNumber: string;
  emailAddress: string;
  fullAddress: string;
  optionalNote: string;
  deliveryMethod: "inside-dhaka" | "outside-dhaka";
  paymentMethod: "cod" | "online";
}

// Components
const DeliveryMethodCard: React.FC<{
  method: "inside-dhaka" | "outside-dhaka";
  selected: boolean;
  onSelect: () => void;
  label: string;
  price: number;
  description: string;
}> = ({ selected, onSelect, label, price, description }) => (
  <button
    onClick={onSelect}
    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
      selected
        ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200"
        : "border-slate-200 hover:border-slate-300 bg-white"
    }`}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            selected ? "border-emerald-500 bg-emerald-500" : "border-slate-300"
          }`}
        >
          {selected && <CheckCircle size={12} className="text-white" />}
        </div>
        <div>
          <p className="font-bold text-slate-800">{label}</p>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      </div>
      <p className="font-bold text-emerald-600">৳{price}</p>
    </div>
  </button>
);

const PaymentMethodCard: React.FC<{
  method: "cod" | "online";
  selected: boolean;
  onSelect: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
  subDescription?: string;
}> = ({ selected, onSelect, icon, title, description, subDescription }) => (
  <button
    onClick={onSelect}
    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
      selected
        ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200"
        : "border-slate-200 hover:border-slate-300 bg-white"
    }`}
  >
    <div className="flex items-start gap-3">
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 shrink-0 ${
          selected ? "border-emerald-500 bg-emerald-500" : "border-slate-300"
        }`}
      >
        {selected && <CheckCircle size={12} className="text-white" />}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          {icon}
          <p className="font-bold text-slate-800">{title}</p>
        </div>
        <p className="text-xs text-slate-500 mt-1">{description}</p>
        {subDescription && (
          <p className="text-xs font-medium text-emerald-600 mt-1">
            {subDescription}
          </p>
        )}
      </div>
    </div>
  </button>
);

// Main Checkout Page
export default function CheckoutPage() {
  // State
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: "",
    mobileNumber: "",
    emailAddress: "",
    fullAddress: "",
    optionalNote: "",
    deliveryMethod: "inside-dhaka",
    paymentMethod: "cod",
  });

  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [isOrderPlacing, setIsOrderPlacing] = useState(false);

  // Mock cart data
  const cartItems: CartItem[] = [
    {
      id: "1",
      name: "Cold Pressed Mustard Oil 500ml",
      price: 350,
      quantity: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=200&auto=format&fit=crop",
      discount: 50,
    },
  ];

  // Calculate order summary
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalDiscount = cartItems.reduce(
    (sum, item) => sum + (item.discount || 0) * item.quantity,
    0,
  );
  const deliveryFee = formData.deliveryMethod === "inside-dhaka" ? 60 : 120;
  const totalPayable = subtotal - totalDiscount + deliveryFee;

  // Handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      setIsCouponApplied(true);
      // Apply coupon logic here
    }
  };

  const handlePlaceOrder = async () => {
    setIsOrderPlacing(true);
    // Validate form
    if (!formData.fullName || !formData.mobileNumber || !formData.fullAddress) {
      alert("Please fill in all required fields");
      setIsOrderPlacing(false);
      return;
    }

    // Submit order logic here
    console.log("Order placed:", { formData, cartItems, totalPayable });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsOrderPlacing(false);
    alert("Order placed successfully!");
  };

  return (
    <div className="bg-slate-50 min-h-screen py-6">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/cart"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ChevronLeft size={20} />
            <span className="font-semibold">Back to Cart</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900">Checkout</h1>
          <div className="w-24" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-lg font-extrabold text-slate-900 mb-4">
                Personal Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      placeholder="01712345678"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="email"
                      name="emailAddress"
                      value={formData.emailAddress}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Full Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-3 top-3 text-slate-400"
                    />
                    <textarea
                      name="fullAddress"
                      value={formData.fullAddress}
                      onChange={handleInputChange}
                      placeholder="House #123, Road #45, Block C, Bashundhara R/A, Dhaka"
                      rows={3}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all resize-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Optional Note
                  </label>
                  <div className="relative">
                    <MessageSquare
                      size={18}
                      className="absolute left-3 top-3 text-slate-400"
                    />
                    <textarea
                      name="optionalNote"
                      value={formData.optionalNote}
                      onChange={handleInputChange}
                      placeholder="Any special instructions for delivery..."
                      rows={2}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-lg font-extrabold text-slate-900 mb-4">
                Delivery Method
              </h2>
              <div className="space-y-3">
                <DeliveryMethodCard
                  method="inside-dhaka"
                  selected={formData.deliveryMethod === "inside-dhaka"}
                  onSelect={() =>
                    setFormData((prev) => ({
                      ...prev,
                      deliveryMethod: "inside-dhaka",
                    }))
                  }
                  label="Inside Dhaka"
                  price={60}
                  description="First delivery"
                />
                <DeliveryMethodCard
                  method="outside-dhaka"
                  selected={formData.deliveryMethod === "outside-dhaka"}
                  onSelect={() =>
                    setFormData((prev) => ({
                      ...prev,
                      deliveryMethod: "outside-dhaka",
                    }))
                  }
                  label="Outside Dhaka"
                  price={120}
                  description="First delivery"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-lg font-extrabold text-slate-900 mb-4">
                Payment Method
              </h2>
              <div className="space-y-3">
                <PaymentMethodCard
                  method="cod"
                  selected={formData.paymentMethod === "cod"}
                  onSelect={() =>
                    setFormData((prev) => ({ ...prev, paymentMethod: "cod" }))
                  }
                  icon={<Building2 size={18} className="text-emerald-600" />}
                  title="Cash on Delivery"
                  description="পণ্য পেয়ে ক্যাশ দিন — Pay when you receive"
                />
                <PaymentMethodCard
                  method="online"
                  selected={formData.paymentMethod === "online"}
                  onSelect={() =>
                    setFormData((prev) => ({
                      ...prev,
                      paymentMethod: "online",
                    }))
                  }
                  icon={<CreditCard size={18} className="text-emerald-600" />}
                  title="Online Payment"
                  description="SSL Commerz — Card, bKash, Nagad, Rocket ও অন্যান্য"
                  subDescription="SSLCommerz"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-6">
              <h2 className="text-lg font-extrabold text-slate-900 mb-4">
                Order Summary ({cartItems.length} items)
              </h2>

              {/* Cart Items */}
              <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 pb-3 border-b border-slate-100"
                  >
                    <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-slate-50">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-800 truncate">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-bold text-emerald-600">
                        ৳{item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 py-4 border-b border-slate-200">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-semibold text-slate-800">
                    ৳{subtotal.toFixed(2)}
                  </span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Discount</span>
                    <span className="font-semibold text-green-600">
                      −৳{totalDiscount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Delivery</span>
                  <span className="font-semibold text-slate-800">
                    ৳{deliveryFee.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-extrabold text-slate-900">
                    Total Payable
                  </span>
                  <span className="text-2xl font-extrabold text-emerald-600">
                    ৳{totalPayable.toFixed(2)}
                  </span>
                </div>
                {totalDiscount > 0 && (
                  <p className="text-sm font-bold text-green-600 mt-1">
                    Saving ৳{totalDiscount.toFixed(2)} on this order!
                  </p>
                )}
              </div>

              {/* Coupon Code */}
              <div className="mt-4 p-3 bg-slate-50 rounded-xl">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Percent
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon Code"
                      disabled={isCouponApplied}
                      className="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 disabled:opacity-50 transition-all"
                    />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    disabled={isCouponApplied || !couponCode.trim()}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white font-bold text-sm rounded-lg transition-all whitespace-nowrap"
                  >
                    {isCouponApplied ? "Applied" : "Apply"}
                  </button>
                </div>
                {isCouponApplied && (
                  <p className="text-xs text-green-600 mt-2">
                    ✓ Coupon applied successfully!
                  </p>
                )}
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={isOrderPlacing}
                className="w-full mt-4 py-3.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white font-extrabold rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                {isOrderPlacing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Processing...
                  </>
                ) : (
                  `Place Order ${formData.paymentMethod === "cod" ? "(COD)" : ""}`
                )}
              </button>

              <p className="text-[10px] text-slate-400 text-center mt-3">
                By placing order you agree to our Terms & Conditions
              </p>

              {/* Trust Badges */}
              <div className="mt-4 flex justify-center gap-6">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                  <Lock size={14} className="text-emerald-500" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                  <Truck size={14} className="text-emerald-500" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                  <RefreshCw size={14} className="text-emerald-500" />
                  <span>Easy Return</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
