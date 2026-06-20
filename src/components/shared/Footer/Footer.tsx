"use client";

import Link from "next/link";
import { Activity, Heart, Phone, Mail, MapPin } from "lucide-react";

export default function HealthFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full bg-[#111827] text-slate-300 border-t border-slate-800"
      aria-label="Platform Footer"
    >
      {/* PRIMARY LINK SECTIONS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* BRANDING COLUMN */}
        <div className="space-y-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-black tracking-tight text-white rounded focus:outline-hidden focus:ring-2 focus:ring-red-500 p-1 w-fit"
            aria-label="BD Central Health Home"
          >
            <div className="p-1.5 rounded-lg bg-red-600 text-white">
              <Activity size={18} aria-hidden="true" />
            </div>
            <span>
              BD<span className="text-red-500">Central</span>Health
            </span>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed">
            Connecting medical specialists, tracking real-time hospital bed
            availability, and mapping verified blood donors across all 64
            districts under one centralized gateway.
          </p>
          <div className="pt-2">
            <a
              href="tel:999"
              className="inline-flex items-center gap-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 font-bold px-4 py-2 rounded-lg text-xs uppercase border border-red-500/20 transition-all focus:outline-hidden focus:ring-2 focus:ring-red-500"
            >
              <Heart size={14} className="animate-pulse" aria-hidden="true" />
              <span>Emergency Helpline: 999</span>
            </a>
          </div>
        </div>

        {/* CORE SERVICES COLUMN */}
        <div>
          <p className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-red-500 pl-2">
            Core Services
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/doctors"
                className="text-slate-400 hover:text-white transition-colors focus:outline-hidden focus:underline"
              >
                Doctor Directory
              </Link>
            </li>
            <li>
              <Link
                href="/hospitals"
                className="text-slate-400 hover:text-white transition-colors focus:outline-hidden focus:underline"
              >
                Hospital Seat Tracker
              </Link>
            </li>
            <li>
              <Link
                href="/blood-network"
                className="text-slate-400 hover:text-white transition-colors focus:outline-hidden focus:underline"
              >
                Blood Donor Network
              </Link>
            </li>
            <li>
              <Link
                href="/ambulances"
                className="text-slate-400 hover:text-white transition-colors focus:outline-hidden focus:underline"
              >
                Emergency Ambulance
              </Link>
            </li>
          </ul>
        </div>

        {/* REGIONAL HUBS COLUMN */}
        <div>
          <p className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-red-500 pl-2">
            Regional Networks
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/districts/dhaka"
                className="text-slate-400 hover:text-white transition-colors focus:outline-hidden focus:underline"
              >
                Dhaka Division
              </Link>
            </li>
            <li>
              <Link
                href="/districts/chittagong"
                className="text-slate-400 hover:text-white transition-colors focus:outline-hidden focus:underline"
              >
                Chittagong Division
              </Link>
            </li>
            <li>
              <Link
                href="/districts/sylhet"
                className="text-slate-400 hover:text-white transition-colors focus:outline-hidden focus:underline"
              >
                Sylhet Division
              </Link>
            </li>
            <li>
              <Link
                href="/districts/bogura"
                className="text-slate-400 hover:text-white transition-colors focus:outline-hidden focus:underline"
              >
                Bogura Hub
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT & SUPPORT COLUMN */}
        <div className="space-y-3">
          <p className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-red-500 pl-2">
            Support &amp; Contact
          </p>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li className="flex items-start gap-2.5">
              <MapPin
                size={16}
                className="text-red-500 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span>Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail
                size={16}
                className="text-red-500 shrink-0"
                aria-hidden="true"
              />
              <a
                href="mailto:support@bdcentralhealth.com"
                className="hover:text-white focus:outline-hidden focus:underline"
              >
                support@bdcentralhealth.com
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone
                size={16}
                className="text-red-500 shrink-0"
                aria-hidden="true"
              />
              <a
                href="tel:+880123456789"
                className="hover:text-white focus:outline-hidden focus:underline"
              >
                +880 1234-567890
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* COMPLIANCE & LEGAL BOTTOM BAR */}
      <div className="border-t border-slate-800/80 bg-[#0b0f19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {currentYear} BD Central Health Network. All rights reserved.
          </p>

          {/* SOCIAL LINKS AREA */}
          <div className="flex items-center gap-4">
            {/* GitHub Link */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener"
              className="text-slate-400 hover:text-white transition-colors p-1 rounded focus:outline-hidden focus:ring-2 focus:ring-red-500"
              aria-label="Visit our GitHub repository"
            >
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.008.069-.008 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            {/* LinkedIn Link */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener"
              className="text-slate-400 hover:text-white transition-colors p-1 rounded focus:outline-hidden focus:ring-2 focus:ring-red-500"
              aria-label="Visit our LinkedIn profile"
            >
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
