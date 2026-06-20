"use client";

import React, { useState, useMemo } from "react";
import { SlidersHorizontal, RefreshCw, Search } from "lucide-react";
import HospitalBedRow from "./HospitalBedRow";

export interface BedMetricsData {
  id: string;
  hospitalName: string;
  district: string;
  hospitalType: "Government" | "Private";
  bedType: "ICU" | "CCU" | "General Emergency";
  availableCount: number;
  totalCount: number;
  contactNumber: string;
  lastUpdated: string;
}

// Simulated live metrics context matching local production structural layouts
const INITIAL_BED_DATA: BedMetricsData[] = [
  {
    id: "hosp-1",
    hospitalName: "Dhaka Medical College Hospital",
    district: "Dhaka",
    hospitalType: "Government",
    bedType: "ICU",
    availableCount: 2,
    totalCount: 24,
    contactNumber: "+8801700000000",
    lastUpdated: "2 mins ago",
  },
  {
    id: "hosp-2",
    hospitalName: "Evercare Hospital Dhaka",
    district: "Dhaka",
    hospitalType: "Private",
    bedType: "ICU",
    availableCount: 0,
    totalCount: 15,
    contactNumber: "+8801711111222",
    lastUpdated: "Just now",
  },
  {
    id: "hosp-3",
    hospitalName: "Chittagong Medical College Hospital",
    district: "Chittagong",
    hospitalType: "Government",
    bedType: "General Emergency",
    availableCount: 14,
    totalCount: 50,
    contactNumber: "+8801811111111",
    lastUpdated: "5 mins ago",
  },
  {
    id: "hosp-4",
    hospitalName: "Square Hospital",
    district: "Dhaka",
    hospitalType: "Private",
    bedType: "CCU",
    availableCount: 4,
    totalCount: 10,
    contactNumber: "+8801999999999",
    lastUpdated: "12 mins ago",
  },
];

export default function HospitalBedTracker() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Memoized client computations prevent layout shifts or flashing during query changes
  const filteredMetrics = useMemo(() => {
    return INITIAL_BED_DATA.filter((item) => {
      const matchesDistrict =
        selectedDistrict === "All" || item.district === selectedDistrict;
      const matchesType =
        selectedType === "All" || item.hospitalType === selectedType;
      const matchesSearch = item.hospitalName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesDistrict && matchesType && matchesSearch;
    });
  }, [selectedDistrict, selectedType, searchQuery]);

  return (
    <section
      className="w-full my-24 bg-white"
      aria-labelledby="tracker-heading"
    >
      <div className="container">
        {/* Module Header Elements */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2
              id="tracker-heading"
              className="text-2xl font-bold text-slate-900 tracking-tight"
            >
              Live Critical Bed & ICU Matrix
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Real-time regional capacity indicators across centralized district
              healthcare networks.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 w-fit">
            <RefreshCw size={13} className="animate-spin text-blue-600" />
            <span>Auto-refreshing live dashboard data stream</span>
          </div>
        </div>

        {/* Dynamic Multi-Parameter Filter Control Bar */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mb-6 flex flex-col lg:flex-row items-center gap-4">
          <div className="w-full lg:w-1/3 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by hospital name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div className="w-full lg:w-2/3 flex flex-col sm:flex-row items-center gap-3 justify-end">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <SlidersHorizontal
                size={16}
                className="text-slate-400 shrink-0"
              />
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full sm:w-44 p-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 font-medium"
              >
                <option value="All">All Districts</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
              </select>
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full sm:w-44 p-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 font-medium"
            >
              <option value="All">All Facility Types</option>
              <option value="Government">Government</option>
              <option value="Private">Private</option>
            </select>
          </div>
        </div>

        {/* Main Operational Spreadsheet Component Layout */}
        <div className="w-full border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-white">
          {/* Static Spreadsheet Headers (Hidden completely on smaller viewports) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3.5 bg-slate-100 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-600">
            <div className="col-span-4">Hospital Name</div>
            <div className="col-span-2">Bed Class</div>
            <div className="col-span-3">Availability Status</div>
            <div className="col-span-1.5">Last Verified</div>
            <div className="col-span-1.5 text-right">Action</div>
          </div>

          {/* List Content Area */}
          <ul className="divide-y divide-slate-100 list-none p-0 m-0">
            {filteredMetrics?.length > 0 ? (
              filteredMetrics?.map((entry) => (
                <HospitalBedRow key={entry.id} data={entry} />
              ))
            ) : (
              <li className="p-8 text-center text-sm text-slate-400 font-medium">
                No real-time matching records match your filtering parameters.
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
