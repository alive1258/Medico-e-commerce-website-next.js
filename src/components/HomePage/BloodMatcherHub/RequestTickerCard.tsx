"use client";

import React from "react";
import { Clock, MapPin } from "lucide-react";
import { BloodUrgentRequest } from "./BloodMatcherHub";

interface RequestTickerCardProps {
  request: BloodUrgentRequest;
}

export default function RequestTickerCard({ request }: RequestTickerCardProps) {
  const isImmediate = request.urgency === "Immediate";

  return (
    <li className="w-full bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl transition-all hover:bg-slate-900 hover:border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base font-black text-white tracking-tight">
            {request.bloodGroup}
          </span>
          <span
            className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-sm ${
              isImmediate
                ? "bg-red-950 border border-red-800 text-red-400"
                : "bg-amber-950 border border-amber-800 text-amber-400"
            }`}
          >
            {request.urgency}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-0.5">
          <MapPin size={12} className="text-slate-500 shrink-0" />
          <span className="truncate max-w-50 sm:max-w-xs">
            {request.hospital} •{" "}
            <strong className="text-slate-300 font-semibold">
              {request.location}
            </strong>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold tracking-wider uppercase sm:text-right shrink-0">
        <Clock size={11} className="text-slate-600" />
        <span>{request.postedAt}</span>
      </div>
    </li>
  );
}
