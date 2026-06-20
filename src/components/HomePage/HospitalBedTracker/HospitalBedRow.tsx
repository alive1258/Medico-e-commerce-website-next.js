"use client";

import React from "react";
import { Phone, Clock, Building2 } from "lucide-react";

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

interface HospitalBedRowProps {
  data: BedMetricsData;
}

export default function HospitalBedRow({ data }: HospitalBedRowProps) {
  const isAvailable = data.availableCount > 0;

  return (
    <li className="block">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:items-center px-5 py-5 md:px-6 md:py-4 transition-colors hover:bg-slate-50/60">
        {/* Core Profile Descriptors */}
        <div className="col-span-1 md:col-span-4 flex flex-col gap-1">
          <h4 className="text-base font-bold text-slate-900 leading-tight">
            {data.hospitalName}
          </h4>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1">
              <Building2 size={12} />
              {data.district}
            </span>
            <span className="inline-block w-1 h-1 bg-slate-300 rounded-full" />
            <span className="px-1.5 py-0.5 bg-slate-100 rounded-sm text-[10px] font-bold uppercase tracking-wide">
              {data.hospitalType}
            </span>
          </div>
        </div>

        {/* Dynamic Class Indicators */}
        <div className="col-span-1 md:col-span-2">
          <span className="inline-flex items-center text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md md:rounded-lg">
            {data.bedType}
          </span>
        </div>

        {/* Numerical Availability Status Elements */}
        <div className="col-span-1 md:col-span-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-2.5 h-2.5 rounded-full ring-4 shrink-0 ${
                isAvailable
                  ? "bg-emerald-500 ring-emerald-100"
                  : "bg-rose-500 ring-rose-100"
              }`}
            />
            <span
              className={`text-sm font-bold ${isAvailable ? "text-emerald-700" : "text-rose-600"}`}
            >
              {isAvailable
                ? `${data.availableCount} Available`
                : "Full Capacity"}
            </span>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            ({data.totalCount} Total allocations)
          </span>
        </div>

        {/* Live verification Timestamps */}
        <div className="col-span-1 md:col-span-1.5 flex items-center gap-1 text-xs text-slate-500 font-medium md:font-semibold">
          <Clock size={12} className="text-slate-400 md:hidden" />
          <span>{data.lastUpdated}</span>
        </div>

        {/* Immediate Route Action Trigger Buttons */}
        <div className="col-span-1 md:col-span-1.5 md:text-right pt-2 md:pt-0">
          <a
            href={`tel:${data.contactNumber}`}
            className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-800 shadow-xs hover:shadow-xs focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 transition-all duration-150"
            aria-label={`Call ${data.hospitalName} at emergency number ${data.contactNumber}`}
          >
            <Phone size={12} />
            <span>Contact</span>
          </a>
        </div>
      </div>
    </li>
  );
}
