"use client";

import React from "react";
import {
  Building2,
  ShieldCheck,
  HeartHandshake,
  ArrowUpRight,
  Users,
} from "lucide-react";

export default function PlatformGrowthCTA() {
  return (
    <section
      className="w-full bg-white text-slate-900 py-16 border-b border-slate-100"
      aria-labelledby="growth-cta-heading"
    >
      <div className="container">
        <h2 id="growth-cta-heading" className="sr-only">
          Platform Expansion Onboarding Pipelines
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Split: Medical Providers Pipeline */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-8 flex flex-col justify-between items-start transition-all hover:border-blue-200 hover:shadow-xs group">
            <div className="w-full">
              <div className="flex items-center justify-between gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Building2 size={24} aria-hidden="true" />
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-sm">
                  <ShieldCheck size={12} />
                  <span>Institutional Verification</span>
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mt-6">
                Are you a Doctor or Hospital Administrator?
              </h3>
              <p className="text-sm md:text-base text-slate-500 font-medium mt-3 leading-relaxed max-w-xl">
                List your facility, update live bed configurations, or verify
                your medical practitioner profile inside Bangladesh&apos;s
                largest 64-district decentralized health infrastructure node.
              </p>
            </div>

            <div className="w-full mt-8 pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Requires BMDC / Govt License
              </span>
              <button
                type="button"
                onClick={() =>
                  alert(
                    "Routing to secure institutional credential verification portal...",
                  )
                }
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-colors cursor-pointer group/btn"
                aria-label="Apply for secure practitioner or facility registry listing"
              >
                <span>Apply for Secure Listing</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                />
              </button>
            </div>
          </div>

          {/* Right Split: Volunteer Network Pipeline */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-8 flex flex-col justify-between items-start transition-all hover:border-red-200 hover:shadow-xs group">
            <div className="w-full">
              <div className="flex items-center justify-between gap-4">
                <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                  <HeartHandshake size={24} aria-hidden="true" />
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-red-700 bg-red-50 border border-red-100 px-2.5 py-0.5 rounded-sm">
                  <Users size={12} />
                  <span>Community Network</span>
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mt-6">
                Join the Local Volunteer Network
              </h3>
              <p className="text-sm md:text-base text-slate-500 font-medium mt-3 leading-relaxed max-w-xl">
                Become a verified district coordinator or area ambassador. Help
                validate emergency donor request parameters and manage critical
                response pipelines inside your sub-radius.
              </p>
            </div>

            <div className="w-full mt-8 pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                All 64 Districts Active
              </span>
              <button
                type="button"
                onClick={() =>
                  alert(
                    "Redirecting to volunteer ambassador setup onboarding pipeline...",
                  )
                }
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-colors cursor-pointer group/btn"
                aria-label="Register an account to join the regional volunteer network matrix"
              >
                <span>Become Coordinator</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
