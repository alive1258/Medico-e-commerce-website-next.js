"use client";

import React, { useState } from "react";
import { Search, MapPin, ShieldAlert, Heart, UserCheck } from "lucide-react";

type SearchTab = "doctors" | "blood";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<SearchTab>("doctors");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      `Searching for ${activeTab} in ${selectedDistrict} with query: ${searchQuery}`,
    );
  };

  return (
    <section className="relative w-full py-16 lg:py-24 bg-white overflow-hidden">
      {/* Background Graphic Elements - Simplified to reduce composite layer rendering stress */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40 z-0">
        <div className="absolute top-12 left-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-50 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center px-4 z-10">
        {/* Live Emergency Ticker Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider mb-6">
          <ShieldAlert size={14} aria-hidden="true" />
          <span>24/7 Centralized Live Network</span>
        </div>

        {/* Main Value Proposition - SEO Optimized with h1 */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15] mb-6">
          Your Unified Healthcare &amp; Emergency Gateway Across{" "}
          <span className="text-red-600">64 Districts</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto mb-10 font-medium">
          Instantly locate verified medical specialists, track real-time
          hospital bed availability, or connect with life-saving blood donors in
          your area.
        </p>

        {/* 🛠️ WIDGET: INTERACTIVE SEARCH INTERFACE */}
        <div className="w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-3 sm:p-4 text-left">
          {/* Tab Selection Switches - Enhanced Accessibility via ARIA Roles */}
          <div
            className="flex gap-2 mb-4 border-b border-slate-100 pb-3"
            role="tablist"
            aria-label="Search categories"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "doctors"}
              aria-controls="search-form-panel"
              id="tab-doctors"
              onClick={() => setActiveTab("doctors")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                activeTab === "doctors"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <UserCheck size={16} aria-hidden="true" />
              <span>Find Doctors</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "blood"}
              aria-controls="search-form-panel"
              id="tab-blood"
              onClick={() => setActiveTab("blood")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                activeTab === "blood"
                  ? "bg-red-700 text-white shadow-xs"
                  : "text-slate-600 hover:text-red-700 hover:bg-red-50"
              }`}
            >
              <Heart size={16} aria-hidden="true" />
              <span>Emergency Blood</span>
            </button>
          </div>

          {/* Form Processing Core */}
          <form
            id="search-form-panel"
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-3"
          >
            {/* Input Element 1: District Selection Mapping */}
            <div className="flex-1 min-w-50 relative">
              <label htmlFor="district-select" className="sr-only">
                Select District
              </label>
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500">
                <MapPin size={18} aria-hidden="true" />
              </div>
              <select
                id="district-select"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-600 appearance-none cursor-pointer"
              >
                <option value="">Select District...</option>
                <option value="dhaka">Dhaka </option>
                <option value="bogura">Bogura </option>
                <option value="chittagong">Chittagong </option>
                <option value="sylhet">Sylhet </option>
              </select>
              {/* Custom SVG chevron indicator to replace default browser design securely without breaking layouts */}
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Input Element 2: Query Context String */}
            <div className="flex-[1.5] relative">
              <label htmlFor="search-query" className="sr-only">
                Search specialized medical needs
              </label>
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500">
                <Search size={18} aria-hidden="true" />
              </div>
              <input
                id="search-query"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  activeTab === "doctors"
                    ? "Search Cardiologist, Neurologist, Gynecologist..."
                    : "Search Blood Group (e.g., O+, A-, B+)..."
                }
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full md:w-auto px-6 py-3 font-bold text-sm text-white rounded-xl cursor-pointer transition-all active:scale-[0.98] ${
                activeTab === "blood"
                  ? "bg-red-700 hover:bg-red-800"
                  : "bg-slate-900 hover:bg-slate-800"
              }`}
            >
              Search Matrix
            </button>
          </form>
        </div>

        {/* Popular Quick Links Shortcuts */}
        <div className="mt-6 flex flex-wrap justify-center items-center gap-3 text-xs sm:text-sm text-slate-600">
          <span className="font-bold text-slate-800">Urgent Metrics:</span>
          <a
            href="/hospitals"
            className="px-3 py-1.5 bg-slate-100 text-slate-800 font-semibold rounded-md hover:bg-blue-50 hover:text-blue-700 transition-colors"
          >
            ICU Availability Matrix
          </a>
          <a
            href="/blood-network"
            className="px-3 py-1.5 bg-slate-100 text-slate-800 font-semibold rounded-md hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            Plasma Matching Hub
          </a>
        </div>
      </div>
    </section>
  );
}
