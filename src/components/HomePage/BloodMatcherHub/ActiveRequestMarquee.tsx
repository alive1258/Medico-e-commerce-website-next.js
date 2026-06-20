"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { TickerRequest } from "./EmergencyBloodMatcher";

interface ActiveRequestMarqueeProps {
  items: TickerRequest[];
}

export default function ActiveRequestMarquee({
  items,
}: ActiveRequestMarqueeProps) {
  return (
    <div className="flex w-full overflow-hidden select-none mask-linear-gradient">
      <div className="flex gap-8 whitespace-nowrap animate-marquee-slide min-w-full">
        {items.map((req, index) => (
          <div
            key={`${req.id}-${index}`}
            className="inline-flex items-center gap-3 bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 shadow-xs shrink-0"
          >
            <span className="text-red-600 text-sm font-black tracking-tight">
              {req.bloodGroup}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-slate-800 font-extrabold">
              {req.unitsNeeded} Bag{req.unitsNeeded > 1 ? "s" : ""}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="flex items-center gap-1 text-slate-500 font-medium">
              <MapPin size={12} className="text-slate-400" />
              {req.hospital} ({req.location})
            </span>
            <span className="px-1.5 py-0.5 rounded-sm text-[9px] font-black uppercase tracking-wider bg-red-50 text-red-700 border border-red-100">
              {req.urgency}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
