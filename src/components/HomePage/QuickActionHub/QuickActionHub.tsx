"use client";

import React from "react";
// 1. Core icon assets imported directly to satisfy the data schema mapping below
import { UserCheck, Activity, Heart, PhoneCall } from "lucide-react";
import QuickActionCard, { ActionCardData } from "./QuickActionCard";

interface QuickActionHubProps {
  actions?: ActionCardData[]; // Made optional so the component runs smoothly with or without external parameters passed down
}

// Internal static fallbacks matching your dynamic interface structures exactly
const defaultCardsData: ActionCardData[] = [
  {
    title: "Doctor Directory",
    description:
      "Locate and clear bookings with verified medical specialists and general practitioners instantly.",
    metric: "14,200+ Verified",
    href: "/doctors",
    icon: UserCheck,
    accentColor: "blue",
  },
  {
    title: "Hospital Seat Tracker",
    description:
      "Monitor real-time general bed, ICU, CCU, and emergency unit availability per district.",
    metric: "89% Active Monitoring",
    href: "/hospitals",
    icon: Activity,
    accentColor: "emerald",
  },
  {
    title: "Blood Donor Network",
    description:
      "Connect directly with active emergency plasma and blood donors within your immediate area.",
    metric: "52,400+ Registered",
    href: "/blood-network",
    icon: Heart,
    accentColor: "red",
  },
  {
    title: "Emergency Ambulance",
    description:
      "Deploy and secure prompt ICU, basic life support, or standard emergency transit instantly.",
    metric: "450+ Dispatched Live",
    href: "/ambulances",
    icon: PhoneCall,
    accentColor: "amber",
  },
];

export default function QuickActionHub({ actions }: QuickActionHubProps) {
  // Uses injected actions array if passed down by parent; otherwise defaults gracefully to internal local configurations
  const displayActions =
    actions && actions.length > 0 ? actions : defaultCardsData;

  return (
    <section
      className="w-full mt-24 bg-slate-50 border-y border-gray-100"
      aria-labelledby="quick-actions-heading"
    >
      {/* Custom class mapped to your Tailwind v4 base configurations */}
      <div className="container py-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2
            id="quick-actions-heading"
            className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
          >
            Immediate Healthcare Solutions
          </h2>
          <p className="mt-4 text-lg text-slate-600 font-medium">
            Select an operational pathway below to access real-time metrics,
            emergency assistance channels, and verified digital routing
            databases.
          </p>
        </div>

        {/* The 4-Card Responsive Grid calling the sub-component safely */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 list-none p-0 m-0">
          {displayActions.map((card) => (
            <QuickActionCard key={card.title} card={card} />
          ))}
        </ul>
      </div>
    </section>
  );
}
