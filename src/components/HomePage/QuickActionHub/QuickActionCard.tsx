"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, LucideIcon } from "lucide-react";

export interface ActionCardData {
  title: string;
  description: string;
  metric: string;
  href: string;
  icon: LucideIcon;
  accentColor: "blue" | "emerald" | "red" | "amber";
}

interface QuickActionCardProps {
  card: ActionCardData;
}

export default function QuickActionCard({ card }: QuickActionCardProps) {
  const Icon = card.icon;

  // Safe color mappings to avoid dynamic string compilation issues in production build
  const themeMap = {
    blue: {
      icon: "text-blue-700 bg-blue-100",
      badge: "bg-blue-100 text-blue-800 border-blue-200",
      focusRing: "focus:ring-blue-600",
    },
    emerald: {
      icon: "text-emerald-700 bg-emerald-100",
      badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
      focusRing: "focus:ring-emerald-600",
    },
    red: {
      icon: "text-red-700 bg-red-100",
      badge: "bg-red-100 text-red-800 border-red-200",
      focusRing: "focus:ring-red-600",
    },
    amber: {
      icon: "text-amber-800 bg-amber-100",
      badge: "bg-amber-100 text-amber-900 border-amber-200",
      focusRing: "focus:ring-amber-600",
    },
  }[card.accentColor];

  return (
    <li className="flex">
      <Link
        href={card.href}
        className={`group relative flex flex-col justify-between w-full p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 focus:outline-hidden focus:ring-2 ${themeMap.focusRing} focus:ring-offset-2`}
        aria-label={`Access ${card.title} — Current scale: ${card.metric}`}
      >
        <div>
          {/* Top Row: Icon Box & Live Utility Count Badge */}
          <div className="flex items-center justify-between gap-4 mb-5">
            <div
              className={`p-3 rounded-xl transition-transform group-hover:scale-105 duration-200 ${themeMap.icon}`}
            >
              <Icon size={22} aria-hidden="true" />
            </div>
            <span
              className={`px-2.5 py-1 text-xs font-bold rounded-full border tracking-wide uppercase ${themeMap.badge}`}
            >
              {card.metric}
            </span>
          </div>

          {/* Core Descriptors */}
          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-800 transition-colors">
            {card.title}
          </h3>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            {card.description}
          </p>
        </div>

        {/* Card Action Footnotes */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold tracking-wider text-slate-800 uppercase">
          <span>Explore Network</span>
          <ArrowUpRight
            size={16}
            className="text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
            aria-hidden="true"
          />
        </div>
      </Link>
    </li>
  );
}
