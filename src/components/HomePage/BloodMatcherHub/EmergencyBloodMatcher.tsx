"use client";

import React from "react";
import { Plus, UserPlus, Flame, CheckCircle, Shield } from "lucide-react";
import ActiveRequestMarquee from "./ActiveRequestMarquee";

export interface TickerRequest {
  id: string;
  bloodGroup: string;
  location: string;
  hospital: string;
  urgency: "Immediate" | "Critical";
  unitsNeeded: number;
}

const SAMPLE_LIVE_REQUESTS: TickerRequest[] = [
  {
    id: "tr-1",
    bloodGroup: "O- Negative",
    location: "Sirajganj",
    hospital: "Avicenna Hospital",
    urgency: "Immediate",
    unitsNeeded: 2,
  },
  {
    id: "tr-2",
    bloodGroup: "A- Negative",
    location: "Dhaka",
    hospital: "Square Hospital",
    urgency: "Immediate",
    unitsNeeded: 1,
  },
  {
    id: "tr-3",
    bloodGroup: "B- Negative",
    location: "Bogura",
    hospital: "SZMC Hospital",
    urgency: "Critical",
    unitsNeeded: 3,
  },
  {
    id: "tr-4",
    bloodGroup: "AB- Negative",
    location: "Chittagong",
    hospital: "CMCH",
    urgency: "Immediate",
    unitsNeeded: 1,
  },
  {
    id: "tr-5",
    bloodGroup: "O+ Positive",
    location: "Dhaka",
    hospital: "DMCH",
    urgency: "Critical",
    unitsNeeded: 4,
  },
];

export default function EmergencyBloodMatcher() {
  return (
    <section
      className="w-full bg-white text-slate-900 py-16 border-y border-slate-200 overflow-hidden relative"
      aria-labelledby="emergency-blood-heading"
    >
      {/* 1. Infinite Horizontal Scrolling Broadcast Ticker (Light Variant) */}
      <div className="w-full border-b border-slate-200 bg-slate-50 py-4 mb-12">
        <div className="container flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-2 shrink-0 bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg text-red-700 text-xs font-black uppercase tracking-widest">
            <Flame size={14} className="animate-pulse text-red-600" />
            <span>Live Broadcast Feed</span>
          </div>
          <div className="w-full overflow-hidden relative">
            <ActiveRequestMarquee
              items={[...SAMPLE_LIVE_REQUESTS, ...SAMPLE_LIVE_REQUESTS]}
            />
          </div>
        </div>
      </div>

      {/* 2. Conversion Call To Action Panel Grid */}
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Descriptive Content Layout */}
          <div className="lg:col-span-6 space-y-6">
            <h2
              id="emergency-blood-heading"
              className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl text-slate-900"
            >
              Match Rare Blood Groups Within Your Local Sub-Radius
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
              An automated, decentralized routing pipeline instantly mapping
              emergency requests directly onto verified, location-indexed donor
              pools across all 64 districts.
            </p>

            {/* Verification Checklist */}
            <ul className="space-y-3 p-0 m-0 list-none">
              <li className="flex items-center gap-3 text-sm text-slate-700 font-semibold">
                <CheckCircle size={16} className="text-emerald-600 shrink-0" />
                <span>Encrypted profile security masking donor identities</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-700 font-semibold">
                <CheckCircle size={16} className="text-emerald-600 shrink-0" />
                <span>
                  Geographical coordinate routing maps matching within miles
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-700 font-semibold">
                <CheckCircle size={16} className="text-emerald-600 shrink-0" />
                <span>Automated SMS broadcasting setup integration</span>
              </li>
            </ul>
          </div>

          {/* Action Split-Cards Layout */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {/* Column Card A: Request Intake Pipeline */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col justify-between items-start transition-all hover:border-red-300 hover:shadow-md group">
              <div className="mb-6">
                <div className="p-3 bg-red-100/80 border border-red-200 text-red-600 rounded-xl w-fit group-hover:scale-105 transition-transform duration-200">
                  <Plus size={24} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mt-4">
                  Need Emergency Blood?
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mt-2">
                  Launch a high-priority digital request alert. Broadcasts
                  instantly to verified matches in your chosen district.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  alert("Initiating emergency validation form routing...")
                }
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xs focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white outline-hidden cursor-pointer"
                aria-label="Launch form to request emergency blood"
              >
                Create Request Form
              </button>
            </div>

            {/* Column Card B: Roster Profile Onboarding */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col justify-between items-start transition-all hover:border-slate-300 hover:shadow-md group">
              <div className="mb-6">
                <div className="p-3 bg-slate-200/80 border border-slate-300/60 text-slate-700 rounded-xl w-fit group-hover:scale-105 transition-transform duration-200">
                  <UserPlus size={24} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mt-4">
                  Register as a Donor
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mt-2">
                  Securely join our decentralized 64-district matrix database.
                  Receive alert notifications only when critical needs hit your
                  radius.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  alert("Redirecting to profile configuration routing...")
                }
                className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xs focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:ring-offset-white outline-hidden cursor-pointer"
                aria-label="Onboard your identity profile into the active donor database"
              >
                Become a Donor
              </button>
            </div>
          </div>
        </div>

        {/* Operational Security Footer */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-slate-400" />
            <span>
              End-to-End Encryption • Secured Patient-Donor Confidentiality
              Protection
            </span>
          </div>
          <div>64 Districts Real-Time Core Stream</div>
        </div>
      </div>
    </section>
  );
}
