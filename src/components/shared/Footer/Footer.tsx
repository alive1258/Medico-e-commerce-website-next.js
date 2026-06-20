"use client";

import Link from "next/link";
import {
  Plus,
  Heart,
  Phone,
  Mail,
  MapPin,
  Truck,
  ShieldCheck,
  RotateCcw,
  Clock,
} from "lucide-react";

export default function MedicoFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full bg-foreground text-slate-300 border-t border-slate-700/50 font-sans"
      aria-label="Medico Platform Footer"
    >
      {/* ১. ট্রাস্ট ও ভ্যালু প্রোপোজিশন সেকশন (Value Propositions) */}
      <div className="border-b border-slate-700/50 bg-secoundary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Super Fast Delivery */}
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-700/30 hover:bg-slate-700/50 transition-colors duration-200">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
              <Truck size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                Super Fast Delivery
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Lakhs of medicines delivered safely
              </p>
            </div>
          </div>

          {/* 100% Genuine Medicine */}
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-700/30 hover:bg-slate-700/50 transition-colors duration-200">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
              <ShieldCheck size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                100% Genuine Medicine
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Sourced directly from manufacturers
              </p>
            </div>
          </div>

          {/* Easy Returns & Refunds */}
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-700/30 hover:bg-slate-700/50 transition-colors duration-200">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
              <RotateCcw size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                Easy Returns & Refunds
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Hassle-free return policy
              </p>
            </div>
          </div>

          {/* 24/7 Support Desk */}
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-700/30 hover:bg-slate-700/50 transition-colors duration-200">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
              <Clock size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">24/7 Support Desk</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Chat with registered pharmacists
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ২. মেইন ফুটার লিংক সেকশন (Primary Links) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* ব্র্যান্ড পরিচিতি ও হেল্পলাইন */}
        <div className="space-y-4">
          <Link
            href="/"
            className="flex items-center gap-1 text-2xl font-black tracking-tight text-white rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 p-1 w-fit animate-none"
            aria-label="Medico Home"
          >
            <span className="text-emerald-400 flex items-center">
              M
              <Plus
                size={18}
                className="stroke-4 text-red-400 -mx-0.5 animate-pulse"
                aria-hidden="true"
              />
              dico
            </span>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed">
            Your trusted digital pharmacy in Bangladesh. Sourcing 100% genuine
            healthcare essentials, prescription drugs, and baby care formulas,
            delivered directly to your doorstep.
          </p>
          <div className="pt-2">
            <a
              href="tel:16263"
              className="inline-flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold px-4 py-2.5 rounded-xl text-xs uppercase border border-emerald-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <Heart
                size={14}
                className="animate-pulse text-red-400"
                aria-hidden="true"
              />
              <span>Pharmacist Support: 16263</span>
            </a>
          </div>
        </div>

        {/* শপ ক্যাটাগরি কলাম */}
        <nav aria-label="Footer Shop Categories">
          <p className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
            Shop Categories
          </p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                href="/category/medicine"
                className="text-slate-400 hover:text-emerald-400 transition-colors focus:outline-none focus:underline"
              >
                Prescription Drugs
              </Link>
            </li>
            <li>
              <Link
                href="/category/healthcare"
                className="text-slate-400 hover:text-emerald-400 transition-colors focus:outline-none focus:underline"
              >
                Diabetic Care
              </Link>
            </li>
            <li>
              <Link
                href="/category/baby-mom-care"
                className="text-slate-400 hover:text-emerald-400 transition-colors focus:outline-none focus:underline"
              >
                Baby & Mom Care
              </Link>
            </li>
            <li>
              <Link
                href="/category/supplement"
                className="text-slate-400 hover:text-emerald-400 transition-colors focus:outline-none focus:underline"
              >
                Vitamins & Supplements
              </Link>
            </li>
            <li>
              <Link
                href="/category/beauty"
                className="text-slate-400 hover:text-emerald-400 transition-colors focus:outline-none focus:underline"
              >
                Personal Care
              </Link>
            </li>
          </ul>
        </nav>

        {/* কাস্টমার সার্ভিস কলাম */}
        <nav aria-label="Customer Services Links">
          <p className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
            Customer Services
          </p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                href="/prescription"
                className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors focus:outline-none focus:underline"
              >
                Upload Prescription
              </Link>
            </li>
            <li>
              <Link
                href="/orders/track"
                className="text-slate-400 hover:text-emerald-400 transition-colors focus:outline-none focus:underline"
              >
                Track Your Order
              </Link>
            </li>
            <li>
              <Link
                href="/refund-policy"
                className="text-slate-400 hover:text-emerald-400 transition-colors focus:outline-none focus:underline"
              >
                Refunds & Returns
              </Link>
            </li>
            <li>
              <Link
                href="/store-locator"
                className="text-slate-400 hover:text-emerald-400 transition-colors focus:outline-none focus:underline"
              >
                Our Store Locations
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="text-slate-400 hover:text-emerald-400 transition-colors focus:outline-none focus:underline"
              >
                Frequently Asked Questions
              </Link>
            </li>
          </ul>
        </nav>

        {/* কন্টাক্ট ও সাপোর্ট কলাম */}
        <div className="space-y-3">
          <p className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
            Support &amp; Contact
          </p>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-2.5">
              <MapPin
                size={16}
                className="text-emerald-400 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span>Gulshan, Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail
                size={16}
                className="text-emerald-400 shrink-0"
                aria-hidden="true"
              />
              <a
                href="mailto:support@medico.com.bd"
                className="hover:text-emerald-400 transition-colors focus:outline-none focus:underline"
              >
                support@medico.com.bd
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone
                size={16}
                className="text-emerald-400 shrink-0"
                aria-hidden="true"
              />
              <a
                href="tel:+8809612MEDICO"
                className="hover:text-emerald-400 transition-colors focus:outline-none focus:underline"
              >
                +880 9612-MEDICO (633426)
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ৩. লিগ্যাল কপিরাইট ও পেমেন্ট পার্টনার সেকশন (Bottom Bar) */}
      <div className="border-t border-slate-700/50 bg-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="space-y-1 text-center md:text-left">
            <p>
              &copy; {currentYear} Medico Digital Healthcare Limited. DGDA Drug
              License No: Under-process. All rights reserved.
            </p>
          </div>

          {/* সিকিউর পেমেন্ট মেথড এবং সোশ্যাল লিংক */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mr-2 hidden sm:inline">
              Secure Payments: bKash / Cards
            </span>

            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-emerald-400 transition-colors p-1.5 bg-slate-800 rounded-full border border-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Visit Medico on Facebook"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-emerald-400 transition-colors p-1.5 bg-slate-800 rounded-full border border-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Visit Medico on LinkedIn"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
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
      </div>
    </footer>
  );
}
