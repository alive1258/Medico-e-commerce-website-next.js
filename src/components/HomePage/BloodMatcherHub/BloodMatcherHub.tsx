"use client";

import React from "react";
import { Heart, PlusCircle, Users, Droplets } from "lucide-react";
import RequestTickerCard from "./RequestTickerCard";

export interface BloodUrgentRequest {
  id: string;
  bloodGroup: string;
  location: string;
  hospital: string;
  urgency: "Immediate" | "Within 24 Hours";
  postedAt: string;
}

// Simulated real-time streaming notifications data array
const RECENT_REQUESTS: BloodUrgentRequest[] = [
  {
    id: "req-1",
    bloodGroup: "O- Negative (Rare)",
    location: "Mirpur, Dhaka",
    hospital: "Heart Foundation",
    urgency: "Immediate",
    postedAt: "4 mins ago",
  },
  {
    id: "req-2",
    bloodGroup: "A+ Positive",
    location: "Dhanmondi, Dhaka",
    hospital: "Anwer Khan Modern",
    urgency: "Within 24 Hours",
    postedAt: "12 mins ago",
  },
  {
    id: "req-3",
    bloodGroup: "B- Negative (Rare)",
    location: "Chittagong",
    hospital: "CMCH",
    urgency: "Immediate",
    postedAt: "18 mins ago",
  },
];

export default function BloodMatcherHub() {
  return (
    <section
      className="w-full py-16 bg-white border-b border-slate-200"
      aria-labelledby="blood-matcher-heading"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Core Heading Descriptions & Action Pathways (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-100 text-red-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                <Droplets size={14} className="animate-pulse" />
                <span>Emergency Broadcast Network</span>
              </div>
              <h2
                id="blood-matcher-heading"
                className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
              >
                Match Rare Blood Groups Instantly Within Your Area
              </h2>
              <p className="mt-4 text-base text-slate-600 font-medium leading-relaxed max-w-2xl">
                Connecting critical emergency plasma and whole blood seekers
                with real-time active, verified local community donors within a
                localized sub-radius calculation boundary.
              </p>
            </div>

            {/* Split CTA Cards designed for clear conversion mapping */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {/* Channel A: Request Blood Form Pipeline */}
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between items-start transition-all hover:border-red-200 hover:shadow-xs">
                <div className="mb-4">
                  <div className="p-2.5 bg-red-100 text-red-700 rounded-lg w-fit mb-3">
                    <PlusCircle size={20} aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Request Blood
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                    Broadcast an immediate localized request message out across
                    verified rare-group registries.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    alert(
                      "Redirecting to verification & deployment form parameters...",
                    )
                  }
                  className="w-full py-2.5 px-4 text-xs font-bold text-center bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-2 outline-hidden cursor-pointer"
                  aria-label="Launch application form to request an emergency blood supply allocation"
                >
                  Create Emergency Request
                </button>
              </div>

              {/* Channel B: Onboard New Donor Profile */}
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between items-start transition-all hover:border-slate-300 hover:shadow-xs">
                <div className="mb-4">
                  <div className="p-2.5 bg-slate-200 text-slate-700 rounded-lg w-fit mb-3">
                    <Users size={20} aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Register as Donor
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                    Join the 64-district active notification cloud to save lives
                    safely inside your immediate radius.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    alert(
                      "Opening secure identity profiling & medical clearance setup...",
                    )
                  }
                  className="w-full py-2.5 px-4 text-xs font-bold text-center bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 outline-hidden cursor-pointer"
                  aria-label="Onboard into verified regional digital donor database roster"
                >
                  Become a Registered Donor
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Ticker Container Panel (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col bg-slate-950 rounded-2xl p-6 border border-slate-900 shadow-xl relative overflow-hidden text-white justify-between">
            <div className="z-10 w-full">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  <h3 className="text-sm font-bold tracking-wider uppercase text-slate-300">
                    Live Urgent Requirements Ticker
                  </h3>
                </div>
                <span className="text-[10px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-sm font-semibold tracking-wide text-slate-400 uppercase">
                  Updated Live
                </span>
              </div>

              {/* Responsive layout stacking cards inside semantic list boundaries */}
              <ul className="flex flex-col gap-3 list-none p-0 m-0">
                {RECENT_REQUESTS?.map((request) => (
                  <RequestTickerCard key={request.id} request={request} />
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-900 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest z-10">
              <span>Verified District Feeds</span>
              <Heart size={14} className="text-red-500 animate-pulse" />
            </div>

            {/* Subdued design accent grid element rendering beneath content panels */}
            <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-red-950/20 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
