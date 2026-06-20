"use client";

import React, { useState } from "react";
import { CheckCircle2, MapPin, Calendar, ArrowRight, Star } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  degree: string;
  hospital: string;
  location: string;
  rating: number;
  reviews: number;
  availability: string;
}

const SPECIALTIES = [
  "All Specialties",
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Gynecology",
];

const SAMPLE_DOCTORS: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Mahbub Rahman",
    specialty: "Cardiology",
    degree: "MBBS, FCPS (Cardiology)",
    hospital: "National Heart Foundation",
    location: "Mirpur, Dhaka",
    rating: 4.9,
    reviews: 142,
    availability: "Today, 4 PM - 8 PM",
  },
  {
    id: "doc-2",
    name: "Prof. Dr. Nasrin Sultana",
    specialty: "Gynecology",
    degree: "MBBS, MS (OBGYN)",
    hospital: "Dhaka Medical College & Hospital",
    location: "Ramna, Dhaka",
    rating: 4.8,
    reviews: 98,
    availability: "Tomorrow, 5 PM - 9 PM",
  },
  {
    id: "doc-3",
    name: "Dr. Asif Ahmed",
    specialty: "Neurology",
    degree: "MBBS, MD (Neurology)",
    hospital: "National Institute of Neurosciences",
    location: "Agargaon, Dhaka",
    rating: 4.9,
    reviews: 115,
    availability: "Sun, 3 PM - 7 PM",
  },
  {
    id: "doc-4",
    name: "Dr. Tanzina Khan",
    specialty: "Pediatrics",
    degree: "MBBS, MD (Pediatrics)",
    hospital: "Evercare Hospital",
    location: "Bashundhara, Dhaka",
    rating: 4.7,
    reviews: 84,
    availability: "Today, 2 PM - 6 PM",
  },
];

export default function DoctorRosterPreview() {
  const [activeTab, setActiveTab] = useState("All Specialties");

  const filteredDoctors =
    activeTab === "All Specialties"
      ? SAMPLE_DOCTORS
      : SAMPLE_DOCTORS.filter((doc) => doc.specialty === activeTab);

  return (
    <section
      className="w-full bg-white text-slate-900 py-20 border-b border-slate-100"
      aria-labelledby="doctor-roster-heading"
    >
      <div className="container">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
              Verified Matrix
            </div>
            <h2
              id="doctor-roster-heading"
              className="text-3xl font-black tracking-tight sm:text-4xl text-slate-900"
            >
              Consult Verified Medical Specialists
            </h2>
            <p className="text-base sm:text-lg text-slate-500 font-medium max-w-2xl">
              Connect directly with credential-verified practitioners registered
              across Bangladesh&apos;s medical boards.
            </p>
          </div>

          <button
            type="button"
            onClick={() => alert("Routing to full doctor search grid...")}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group cursor-pointer"
          >
            <span>View All 2,400+ Doctors</span>
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Tab Filter Filter Strip - Touch Scrollable on Mobile */}
        <div className="w-full overflow-x-auto pb-3 mb-10 select-none scrollbar-hidden">
          <div className="flex gap-2 min-w-max">
            {SPECIALTIES.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  activeTab === tab
                    ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                    : "bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-slate-100/70 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Doctor Grid Layout - Smooth touch-swipe strip on mobile */}
        <div className="w-full overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hidden">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 min-w-250 md:min-w-0">
            {filteredDoctors.map((doc) => (
              <article
                key={doc.id}
                className="w-70 md:w-auto bg-slate-50/60 border border-slate-200/60 rounded-2xl p-5 flex flex-col justify-between transition-all hover:bg-white hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 group duration-200"
              >
                <div>
                  {/* Doctor Metadata Row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-sm">
                        {doc.specialty}
                      </span>
                      <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-1.5 pt-1.5">
                        {doc.name}
                        <CheckCircle2
                          size={16}
                          className="text-blue-500 fill-blue-500/10 shrink-0"
                          aria-label="BMDC Verified Practitioner Badge"
                        />
                      </h3>
                      <p className="text-xs font-semibold text-slate-500">
                        {doc.degree}
                      </p>
                    </div>
                  </div>

                  {/* Rating Stack */}
                  <div className="flex items-center gap-1.5 mt-3 text-xs font-bold text-slate-700">
                    <div className="flex items-center text-amber-500">
                      <Star size={14} className="fill-amber-500" />
                    </div>
                    <span>{doc.rating}</span>
                    <span className="text-slate-400 font-medium">
                      ({doc.reviews} reviews)
                    </span>
                  </div>

                  {/* Location & Institution Parameters */}
                  <div className="mt-5 space-y-2.5 border-t border-slate-200/60 pt-4 text-xs font-medium text-slate-600">
                    <div className="flex items-start gap-2">
                      <MapPin
                        size={14}
                        className="text-slate-400 shrink-0 mt-0.5"
                      />
                      <span className="line-clamp-2 leading-tight">
                        <strong className="text-slate-800 font-semibold">
                          {doc.hospital}
                        </strong>
                        <span className="block text-slate-400 text-[11px] mt-0.5">
                          {doc.location}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-slate-400 shrink-0" />
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-xs text-[11px]">
                        {doc.availability}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        `Launching profile scheduler booking for ${doc.name}...`,
                      )
                    }
                    className="w-full py-2.5 px-4 bg-white border border-slate-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl transition-all outline-hidden cursor-pointer shadow-xs group-hover:border-transparent group-hover:bg-blue-600 group-hover:text-white"
                  >
                    Book Consultation
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
