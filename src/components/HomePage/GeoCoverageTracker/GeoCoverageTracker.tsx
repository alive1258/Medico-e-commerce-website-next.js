"use client";

import React, { useState, useMemo } from "react";
import {
  Map,
  Building2,
  Users,
  UserCheck,
  ChevronRight,
  Check,
} from "lucide-react";

interface DivisionMetrics {
  name: string;
  districtsCount: number;
  hospitals: number;
  donors: number;
  doctors: number;
}

const DIVISION_DATABASE: DivisionMetrics[] = [
  {
    name: "Dhaka",
    districtsCount: 13,
    hospitals: 142,
    donors: 24500,
    doctors: 1200,
  },
  {
    name: "Chittagong",
    districtsCount: 11,
    hospitals: 98,
    donors: 18200,
    doctors: 850,
  },
  {
    name: "Rajshahi",
    districtsCount: 8,
    hospitals: 76,
    donors: 14100,
    doctors: 620,
  },
  {
    name: "Khulna",
    districtsCount: 10,
    hospitals: 64,
    donors: 11900,
    doctors: 480,
  },
  {
    name: "Barisal",
    districtsCount: 6,
    hospitals: 38,
    donors: 7300,
    doctors: 290,
  },
  {
    name: "Sylhet",
    districtsCount: 4,
    hospitals: 45,
    donors: 9100,
    doctors: 340,
  },
  {
    name: "Rangpur",
    districtsCount: 8,
    hospitals: 52,
    donors: 10500,
    doctors: 410,
  },
  {
    name: "Mymensingh",
    districtsCount: 4,
    hospitals: 34,
    donors: 6800,
    doctors: 260,
  },
];

export default function GeoCoverageTracker() {
  const [selectedDivision, setSelectedDivision] = useState<string>("Dhaka");

  // Instantly computes cumulative network matrix totals
  const totalMetrics = useMemo(() => {
    return DIVISION_DATABASE.reduce(
      (acc, curr) => {
        acc.hospitals += curr.hospitals;
        acc.donors += curr.donors;
        acc.doctors += curr.doctors;
        return acc;
      },
      { hospitals: 0, donors: 0, doctors: 0 },
    );
  }, []);

  const activeDivisionData = useMemo(() => {
    return (
      DIVISION_DATABASE.find((d) => d.name === selectedDivision) ||
      DIVISION_DATABASE[0]
    );
  }, [selectedDivision]);

  const handleDivisionClick = (name: string) => {
    setSelectedDivision(name);
    // Engineering Hook: Connect this function to your global context/state management
    // e.g., globalFilterContext.setDivision(name);
  };

  return (
    <section
      className="w-full bg-white text-slate-900 py-20 border-b border-slate-100 relative"
      aria-labelledby="geo-tracker-heading"
    >
      <div className="container">
        {/* Core Layout Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 text-slate-700 rounded-full text-xs font-bold uppercase tracking-wider">
            <Map size={12} className="text-slate-500" />
            <span>Geographic Distribution</span>
          </div>
          <h2
            id="geo-tracker-heading"
            className="text-3xl font-black tracking-tight sm:text-4xl text-slate-900"
          >
            64 Districts Live Coverage Matrix
          </h2>
          <p className="text-base sm:text-lg text-slate-500 font-medium leading-relaxed">
            Track and filter live data distribution networks across all 8
            administrative divisions of Bangladesh.
          </p>
        </div>

        {/* Dynamic Interactive Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Block: Interactive 8-Division Grid Selector (7 Columns) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DIVISION_DATABASE.map((div) => {
              const isSelected = selectedDivision === div.name;
              return (
                <button
                  key={div.name}
                  type="button"
                  onClick={() => handleDivisionClick(div.name)}
                  className={`p-5 rounded-2xl border text-left transition-all duration-200 outline-hidden cursor-pointer relative group ${
                    isSelected
                      ? "bg-slate-900 border-slate-900 text-white shadow-md translate-x-1"
                      : "bg-slate-50/60 border-slate-200/80 text-slate-800 hover:bg-white hover:border-slate-300 hover:shadow-xs"
                  }`}
                  aria-label={`Select and view metrics matrix for ${div.name} Division`}
                  aria-pressed={isSelected}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3
                        className={`text-lg font-black tracking-tight ${isSelected ? "text-white" : "text-slate-900"}`}
                      >
                        {div.name} Division
                      </h3>
                      <p
                        className={`text-xs font-semibold mt-1 ${isSelected ? "text-slate-300" : "text-slate-400"}`}
                      >
                        {div.districtsCount} Districts Registered
                      </p>
                    </div>

                    <div
                      className={`p-1.5 rounded-lg transition-colors ${
                        isSelected
                          ? "bg-white/10 text-white"
                          : "bg-white border border-slate-200 text-slate-400 group-hover:text-slate-900"
                      }`}
                    >
                      {isSelected ? (
                        <Check size={14} />
                      ) : (
                        <ChevronRight size={14} />
                      )}
                    </div>
                  </div>

                  {/* Compact metric markers */}
                  <div className="flex items-center gap-4 mt-5 text-[11px] font-bold tracking-wide uppercase">
                    <span className="flex items-center gap-1.5">
                      <Building2
                        size={12}
                        className={
                          isSelected ? "text-slate-300" : "text-slate-400"
                        }
                      />
                      {div.hospitals} Facilities
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users
                        size={12}
                        className={
                          isSelected ? "text-slate-300" : "text-slate-400"
                        }
                      />
                      {div.donors.toLocaleString()} Donors
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Block: Selected Focus Data Visualizer Card (5 Columns) */}
          <div className="lg:col-span-5 bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 md:p-8 space-y-6 lg:sticky lg:top-6">
            <div>
              <span className="text-[10px] font-black tracking-widest uppercase text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-sm">
                Active Focal Point
              </span>
              <h4 className="text-2xl font-black tracking-tight text-slate-900 mt-2">
                {activeDivisionData.name} Overview
              </h4>
              <p className="text-xs font-medium text-slate-500 mt-1">
                Currently displaying network totals for this geographical
                region.
              </p>
            </div>

            {/* Micro Counter Stack */}
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Building2 size={18} />
                  </div>
                  <span className="text-sm font-bold text-slate-600">
                    Total Hospitals
                  </span>
                </div>
                <span className="text-xl font-black text-slate-900">
                  {activeDivisionData.hospitals}
                </span>
              </div>

              <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                    <Users size={18} />
                  </div>
                  <span className="text-sm font-bold text-slate-600">
                    Active Blood Donors
                  </span>
                </div>
                <span className="text-xl font-black text-slate-900">
                  {activeDivisionData.donors.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <UserCheck size={18} />
                  </div>
                  <span className="text-sm font-bold text-slate-600">
                    Verified Specialists
                  </span>
                </div>
                <span className="text-xl font-black text-slate-900">
                  {activeDivisionData.doctors}
                </span>
              </div>
            </div>

            {/* Total National Platform Counter Footer */}
            <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>National Footprint</span>
              <span className="text-slate-700">
                {totalMetrics.donors.toLocaleString()}+ Total Donors
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
