"use client";

import React, { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Star,
  Plus,
  ShoppingCart,
  Eye,
  Check,
  Sparkles,
  Info,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// ৩.১ ক্যাটাগরি ও প্রোডাক্ট ডাটাবেস প্রস্তুত করা
interface Product {
  id: string;
  name: string;
  subTitle?: string;
  brand?: string;
  strength?: string;
  originalPrice: number;
  currentPrice: number;
  discount: number;
  deliveryTime: string;
  rating?: number;
  reviewsCount?: number;
  imageUrl: string;
  category: string;
}

const PRODUCTS_DATA: Product[] = [
  // --- BEST SELLING PRODUCTS ---
  {
    id: "best-1",
    name: "Napa 500 500mg",
    strength: "500mg",
    brand: "Beximco Pharmaceuticals",
    originalPrice: 12,
    currentPrice: 10.8,
    discount: 10,
    deliveryTime: "12-24 HOURS",
    category: "Best Selling Products",
    imageUrl:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "best-2",
    name: "Sergel 20 20mg",
    strength: "20mg",
    brand: "Healthcare Pharmaceuticals",
    originalPrice: 70,
    currentPrice: 63,
    discount: 10,
    deliveryTime: "12-24 HOURS",
    category: "Best Selling Products",
    imageUrl:
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "best-3",
    name: "Ceevit 250mg",
    strength: "250mg",
    brand: "Square Pharmaceuticals",
    originalPrice: 19,
    currentPrice: 17.1,
    discount: 10,
    deliveryTime: "12-24 HOURS",
    category: "Best Selling Products",
    imageUrl:
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "best-4",
    name: "Ecosprin 75 75mg",
    strength: "75mg",
    brand: "The ACME Laboratories",
    originalPrice: 11.2,
    currentPrice: 10.08,
    discount: 10,
    deliveryTime: "12-24 HOURS",
    category: "Best Selling Products",
    imageUrl:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "best-5",
    name: "Pantonix 20 20mg",
    strength: "20mg",
    brand: "Incepta Pharmaceuticals",
    originalPrice: 98,
    currentPrice: 88.2,
    discount: 10,
    deliveryTime: "12-24 HOURS",
    category: "Best Selling Products",
    imageUrl:
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "best-6",
    name: "Monas 10 10mg",
    strength: "10mg",
    brand: "Square Pharmaceuticals",
    originalPrice: 262.5,
    currentPrice: 236.25,
    discount: 10,
    deliveryTime: "12-24 HOURS",
    category: "Best Selling Products",
    imageUrl:
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=400&auto=format&fit=crop",
  },

  // --- NEWLY LAUNCHED ITEMS ---
  {
    id: "new-1",
    name: "Lanbena Witch Hazel Nose Strip",
    strength: "10 Sheets",
    brand: "Lanbena Cosmetics",
    originalPrice: 350,
    currentPrice: 264,
    discount: 25,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 0,
    category: "Newly Launched Items",
    imageUrl:
      "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "new-2",
    name: "Melao Hydrating Mineral Sunscreen",
    strength: "SPF 50 75ml",
    brand: "Melao Organics",
    originalPrice: 850,
    currentPrice: 540,
    discount: 36,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 0,
    category: "Newly Launched Items",
    imageUrl:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "new-3",
    name: "Melao PDRN Pink Peptide Serum",
    strength: "35ml",
    brand: "Melao Lab",
    originalPrice: 850,
    currentPrice: 480,
    discount: 44,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 0,
    category: "Newly Launched Items",
    imageUrl:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "new-4",
    name: "Melao Whitening Sunscreen",
    strength: "SPF50+ PA++++ 30ml",
    brand: "Melao Lab",
    originalPrice: 550,
    currentPrice: 300,
    discount: 45,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 0,
    category: "Newly Launched Items",
    imageUrl:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "new-5",
    name: "Sadoer Repair & Nourish Cream",
    strength: "4in1 50g",
    brand: "Sadoer Skin",
    originalPrice: 650,
    currentPrice: 384,
    discount: 41,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 0,
    category: "Newly Launched Items",
    imageUrl:
      "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "new-6",
    name: "BG Lip Gloss - 106 Rosy",
    strength: "Volume Plumping",
    brand: "Beauty Glazed",
    originalPrice: 450,
    currentPrice: 180,
    discount: 60,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 0,
    category: "Newly Launched Items",
    imageUrl:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "new-7",
    name: "BG Lip Gloss - 105 Rose Wood",
    strength: "Volume Plumping",
    brand: "Beauty Glazed",
    originalPrice: 450,
    currentPrice: 180,
    discount: 60,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 0,
    category: "Newly Launched Items",
    imageUrl:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=400&auto=format&fit=crop",
  },

  // --- BREATHE & RELIEVE ---
  {
    id: "breathe-1",
    name: "Green Seven Sleep Balm Lavender",
    strength: "Lavender 50g",
    brand: "Green Seven Herb",
    originalPrice: 700,
    currentPrice: 520,
    discount: 26,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 11,
    category: "Breathe & Relieve",
    imageUrl:
      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "breathe-2",
    name: "Hong Thai Inhaler",
    strength: "40g Heritage",
    brand: "Thai Herbal Co.",
    originalPrice: 350,
    currentPrice: 300,
    discount: 14,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 23,
    category: "Breathe & Relieve",
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "breathe-3",
    name: "Seven Massage Balm Green",
    strength: "Balm 20g",
    brand: "Green Seven Herb",
    originalPrice: 500,
    currentPrice: 380,
    discount: 24,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 0,
    category: "Breathe & Relieve",
    imageUrl:
      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "breathe-4",
    name: "Poy Sian Menthol Inhaler",
    strength: "1pc Aromatherapy",
    brand: "Poy Sian Brand",
    originalPrice: 220,
    currentPrice: 120,
    discount: 45,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 13,
    category: "Breathe & Relieve",
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "breathe-5",
    name: "Seven Balm White",
    strength: "Cooling 20g",
    brand: "Green Seven Herb",
    originalPrice: 500,
    currentPrice: 380,
    discount: 24,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 0,
    category: "Breathe & Relieve",
    imageUrl:
      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "breathe-6",
    name: "Pim-Sean Roll-on Balm Oil",
    strength: "Poy-Sian 5ml",
    brand: "Poy Sian Brand",
    originalPrice: 350,
    currentPrice: 210,
    discount: 40,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 0,
    category: "Breathe & Relieve",
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&auto=format&fit=crop",
  },

  // --- PROTECT YOUR HEALTH ---
  {
    id: "protect-1",
    name: "Accu-Chek Glucose Strip",
    strength: "100's Pack",
    brand: "Roche Diagnostics",
    originalPrice: 2367,
    currentPrice: 2343,
    discount: 1,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 3,
    category: "Protect Your Health🩺",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "protect-2",
    name: "Pulse Oximeter OLED Version",
    strength: "JPD-500D",
    brand: "Jumper Medical",
    originalPrice: 1650,
    currentPrice: 1600,
    discount: 3,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 12,
    category: "Protect Your Health🩺",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "protect-3",
    name: "Cervical Pillow Regular",
    strength: "Model B-08",
    brand: "Flamingo Orthotics",
    originalPrice: 2184,
    currentPrice: 1928,
    discount: 12,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 3,
    category: "Protect Your Health🩺",
    imageUrl:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "protect-4",
    name: "Counterpain Analgesic Balm",
    strength: "Relief Gel 120g",
    brand: "Taisho Pharma",
    originalPrice: 1000,
    currentPrice: 881.4,
    discount: 12,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 6,
    category: "Protect Your Health🩺",
    imageUrl:
      "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "protect-5",
    name: "Voveran Emulgel Diclofenac",
    strength: "Pain Relief 50g",
    brand: "Novartis Pharmaceuticals",
    originalPrice: 670,
    currentPrice: 520,
    discount: 22,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 0,
    category: "Protect Your Health🩺",
    imageUrl:
      "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "protect-6",
    name: "Neck Cushion Soft Foam",
    strength: "Bravo Cushion",
    brand: "Bravo Medical",
    originalPrice: 1150,
    currentPrice: 893,
    discount: 22,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 9,
    category: "Protect Your Health🩺",
    imageUrl:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=400&auto=format&fit=crop",
  },

  // --- BOOST & BALANCE ---
  {
    id: "boost-1",
    name: "Upakarma Shilajit + Ashwagandha",
    strength: "Pure Resin 20g",
    brand: "Upakarma Ayurveda",
    originalPrice: 3499,
    currentPrice: 2700,
    discount: 23,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 1,
    category: "Boost & Balance 💊",
    imageUrl:
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "boost-2",
    name: "Korean Ginseng 1000mg",
    strength: "240 Capsules",
    brand: "Nutricost",
    originalPrice: 5490,
    currentPrice: 4400,
    discount: 20,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 0,
    category: "Boost & Balance 💊",
    imageUrl:
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "boost-3",
    name: "Piping Rock Olive Leaf Extract",
    strength: "200 Veg Caps",
    brand: "Piping Rock Health",
    originalPrice: 3490,
    currentPrice: 2600,
    discount: 26,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 0,
    category: "Boost & Balance 💊",
    imageUrl:
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "boost-4",
    name: "Alpha Lipoic Acid 600 Mg",
    strength: "60 Capsules",
    brand: "Amazing Formulas",
    originalPrice: 3490,
    currentPrice: 2626,
    discount: 25,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 0,
    category: "Boost & Balance 💊",
    imageUrl:
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "boost-5",
    name: "Now Castor Oil 650mg",
    strength: "120 Capsules",
    brand: "Now Foods Health",
    originalPrice: 3649.2,
    currentPrice: 3144,
    discount: 14,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 0,
    category: "Boost & Balance 💊",
    imageUrl:
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "boost-6",
    name: "Just D3 800 Drops",
    strength: "Vitamin D3",
    brand: "Just Nutrition",
    originalPrice: 990,
    currentPrice: 940.5,
    discount: 5,
    deliveryTime: "12-24 HOURS",
    category: "Boost & Balance 💊",
    imageUrl:
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "boost-7",
    name: "Ashol Lychee Honey",
    strength: "লিচু মধু 500gm",
    brand: "Ashol Food",
    originalPrice: 480,
    currentPrice: 431,
    discount: 10,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 0,
    category: "Boost & Balance 💊",
    imageUrl:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=400&auto=format&fit=crop",
  },

  // --- OTC MEDICINE ---
  {
    id: "otc-1",
    name: "Montair 10 10mg",
    strength: "10mg Asthma",
    brand: "Incepta Pharmaceuticals",
    originalPrice: 175,
    currentPrice: 157.5,
    discount: 10,
    deliveryTime: "12-24 HOURS",
    category: "OTC Medicine",
    imageUrl:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "otc-2",
    name: "Pantonix 20 20mg",
    strength: "20mg Acid",
    brand: "Incepta Pharmaceuticals",
    originalPrice: 98,
    currentPrice: 88.2,
    discount: 10,
    deliveryTime: "12-24 HOURS",
    category: "OTC Medicine",
    imageUrl:
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "otc-3",
    name: "Bislol 2.5 2.5mg",
    strength: "2.5mg BP",
    brand: "Incepta Pharmaceuticals",
    originalPrice: 98,
    currentPrice: 88.2,
    discount: 10,
    deliveryTime: "12-24 HOURS",
    category: "OTC Medicine",
    imageUrl:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "otc-4",
    name: "Napa 500 500mg",
    strength: "500mg Regular",
    brand: "Beximco Pharmaceuticals",
    originalPrice: 12,
    currentPrice: 10.8,
    discount: 10,
    deliveryTime: "12-24 HOURS",
    category: "OTC Medicine",
    imageUrl:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "otc-5",
    name: "Adovas 200ml Syrup",
    strength: "Herbal 200ml",
    brand: "Hamdard Laboratories",
    originalPrice: 110,
    currentPrice: 99,
    discount: 10,
    deliveryTime: "12-24 HOURS",
    category: "OTC Medicine",
    imageUrl:
      "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "otc-6",
    name: "Alcet 5mg",
    strength: "5mg Allergy",
    brand: "The ACME Laboratories",
    originalPrice: 45,
    currentPrice: 40.5,
    discount: 10,
    deliveryTime: "12-24 HOURS",
    category: "OTC Medicine",
    imageUrl:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "otc-7",
    name: "Cinaron 15 15mg",
    strength: "15mg Dizziness",
    brand: "Square Pharmaceuticals",
    originalPrice: 13.5,
    currentPrice: 12.15,
    discount: 10,
    deliveryTime: "12-24 HOURS",
    category: "OTC Medicine",
    imageUrl:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400&auto=format&fit=crop",
  },

  // --- SUPPLEMENT FESTIVAL ---
  {
    id: "sup-1",
    name: "Male Extra Enhancement",
    strength: "90 Capsules",
    brand: "Male Extra Group",
    originalPrice: 7990.2,
    currentPrice: 3600,
    discount: 55,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 6,
    category: "Supplement Festival",
    imageUrl:
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "sup-2",
    name: "Ashwagandha 12,500 mg",
    strength: "240 Capsules",
    brand: "NatureBell Health",
    originalPrice: 5490,
    currentPrice: 3843,
    discount: 30,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 0,
    category: "Supplement Festival",
    imageUrl:
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "sup-3",
    name: "Himalayan Shilajit Pure",
    strength: "10000mg 150 Caps",
    brand: "Dorado Health",
    originalPrice: 6490,
    currentPrice: 3910,
    discount: 40,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 0,
    category: "Supplement Festival",
    imageUrl:
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "sup-4",
    name: "Herbtonics Liver Cleanse Formula",
    strength: "120 Vegan Capsules",
    brand: "Herbtonics Lab",
    originalPrice: 6490,
    currentPrice: 4900,
    discount: 24,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 0,
    category: "Supplement Festival",
    imageUrl:
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "sup-5",
    name: "Force Factor L-Arginine 3000mg",
    strength: "150 Capsules",
    brand: "Force Factor Health",
    originalPrice: 3990,
    currentPrice: 3200,
    discount: 20,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 0,
    category: "Supplement Festival",
    imageUrl:
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "sup-6",
    name: "Carlyle Norwegian Cod Liver Oil",
    strength: "EPA DHA 473ml",
    brand: "Carlyle Wellness",
    originalPrice: 5490,
    currentPrice: 3300,
    discount: 40,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 0,
    category: "Supplement Festival",
    imageUrl:
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=400&auto=format&fit=crop",
  },

  // --- ALL-IN-ONE CARE DEALS ---
  {
    id: "deal-1",
    name: "Seravix Cleanser + Dermalix Combo",
    strength: "Acne Combo Treatment",
    brand: "Seravix & Dermalix Labs",
    originalPrice: 999,
    currentPrice: 949,
    discount: 5,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 0,
    category: "All-in-One Care Deals",
    imageUrl:
      "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "deal-2",
    name: "Dermalix Glow Vitamin C Serum",
    strength: "10% VC Glow 30ml",
    brand: "The Dermalix Cosmetics",
    originalPrice: 890,
    currentPrice: 645,
    discount: 28,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 0,
    category: "All-in-One Care Deals",
    imageUrl:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "deal-3",
    name: "Hair Got Right Scalp Shampoo",
    strength: "Anti-Dandruff 85ml",
    brand: "Hair Got Right Corp.",
    originalPrice: 390,
    currentPrice: 382,
    discount: 2,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 8,
    category: "All-in-One Care Deals",
    imageUrl:
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "deal-4",
    name: "Seravix Cleanser + Niacinamide Combo",
    strength: "Brightening Treatment 30ml",
    brand: "Seravix & Dermalix Labs",
    originalPrice: 999,
    currentPrice: 890,
    discount: 11,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 0,
    category: "All-in-One Care Deals",
    imageUrl:
      "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "deal-5",
    name: "Seravix Cleanser + Vit-C Combo",
    strength: "All Skin Glow Kit",
    brand: "Seravix & Dermalix Labs",
    originalPrice: 899,
    currentPrice: 790,
    discount: 12,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 0,
    category: "All-in-One Care Deals",
    imageUrl:
      "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "deal-6",
    name: "Dermalix Shower Combo (BOGO)",
    strength: "Rose + Lavender Free",
    brand: "The Dermalix Cosmetics",
    originalPrice: 700,
    currentPrice: 350,
    discount: 50,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 1,
    category: "All-in-One Care Deals",
    imageUrl:
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "deal-7",
    name: "Dermalix Premium Cotton Pads",
    strength: "80Pcs Pack",
    brand: "The Dermalix Cosmetics",
    originalPrice: 150,
    currentPrice: 102,
    discount: 32,
    deliveryTime: "12-24 HOURS",
    rating: 5,
    reviewsCount: 0,
    category: "All-in-One Care Deals",
    imageUrl:
      "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=400&auto=format&fit=crop",
  },
];

export default function ProductShowcase() {
  // --- কাস্টম ক্যারোসেল স্ক্রলিং স্টেট ও রেডি-মেড রিলিজ ---
  const categoriesList = [
    "Best Selling Products",
    "Newly Launched Items",
    "Breathe & Relieve",
    "Protect Your Health🩺",
    "Boost & Balance 💊",
    "OTC Medicine",
    "Supplement Festival",
    "All-in-One Care Deals",
  ];

  // প্রতিটি ক্যারোসেলের জন্য আলাদা রেফ ডিক্লেয়ার করা
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // কার্ট এবং টোস্ট নোটিফিকেশন স্টেট
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);

  // কুইক ভিউ মডাল স্টেট
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(
    null,
  );

  // ডিসপ্লে টোস্ট নোটিফিকেশন
  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // স্ক্রলিং হ্যান্ডলার (Smoothly scroll left and right)
  const handleScroll = (categoryName: string, direction: "left" | "right") => {
    const container = scrollRefs.current[categoryName];
    if (container) {
      const scrollAmount = 300; // ক্যারোসেলের স্ক্রলিং স্পিড
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // কার্টে আইটেম যুক্ত করার ইন্টারঅ্যাকশন
  const addToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setCartCount((prev) => prev + 1);
    triggerToast(`Added ${product.name} to Cart successfully! 🛒`);
  };

  return (
    <section className="bg-slate-50 min-h-screen py-10 font-sans">
      <div className="container">
        {/* মেডিকো প্রমোশনাল টপ বার (গ্লোবাল কার্ট রিয়েল-টাইম ট্র্যাকার) */}
        <div className="bg-emerald-600 text-white rounded-2xl p-4 sm:p-6 mb-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500 rounded-xl">
              <Sparkles className="text-amber-300 animate-pulse" size={24} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                Medico Seasonal Wellness Festival
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 font-semibold mt-0.5">
                Sourcing 100% genuine products directly to your doorstep.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-emerald-700/60 px-4 py-2.5 rounded-xl border border-emerald-500/30">
            <ShoppingCart size={18} className="text-emerald-300" />
            <span className="text-xs uppercase tracking-wider font-black">
              Your Cart Count:
            </span>
            <span className="bg-red-500 text-white font-extrabold text-sm px-2.5 py-0.5 rounded-full animate-bounce">
              {cartCount}
            </span>
          </div>
        </div>

        {/* ৩.২ ডাইনামিক ক্যারোসেল লুপ (ক্যাটাগরি ভিত্তিক রেন্ডারিং) */}
        <div className="space-y-12">
          {categoriesList.map((category) => {
            const filteredProducts = PRODUCTS_DATA.filter(
              (p) => p.category === category,
            );

            return (
              <div
                key={category}
                className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative group"
              >
                {/* ক্যাটাগরি হেডার - বামে নাম এবং ডানে ক্যারোসেল নেভিগেশন বাটন */}
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-50">
                  <div className="space-y-1">
                    <h3 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-2">
                      {category}
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      Genuine Wellness Essentials
                    </p>
                  </div>

                  {/* নেভিগেশন কন্ট্রোল্স (Lighthouse friendly accessible touch actions) */}
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/category/${category.replace(/\s+/g, "-").toLowerCase()}`}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-emerald-500/20 px-2 py-1 rounded"
                    >
                      See All
                    </Link>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleScroll(category, "left")}
                        className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-emerald-600 hover:border-emerald-300 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                        aria-label={`Scroll Left in ${category}`}
                      >
                        <ChevronLeft size={18} className="stroke-[2.5]" />
                      </button>

                      <button
                        onClick={() => handleScroll(category, "right")}
                        className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-emerald-600 hover:border-emerald-300 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                        aria-label={`Scroll Right in ${category}`}
                      >
                        <ChevronRight size={18} className="stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* ৩.৩ ক্যারোসেল প্রোডাক্ট ট্র্যাকার */}
                <div
                  ref={(el) => {
                    scrollRefs.current[category] = el;
                  }}
                  className="flex items-stretch gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-4"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {filteredProducts.map((product) => {
                    return (
                      <div
                        key={product.id}
                        className="flex-shrink-0 w-[190px] sm:w-[220px] bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group/card relative"
                      >
                        {/* ডিসকাউন্ট ব্যাজ */}
                        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
                          <span className="bg-red-500 text-white font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                            {product.discount}% OFF
                          </span>

                          {/* <span className="bg-emerald-600 text-white font-semibold text-[9px] px-1.5 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                            <Clock size={8} />
                            {product.deliveryTime}
                          </span> */}
                        </div>

                        {/* প্রোডাক্ট ইমেজ ও প্রিভিউ ওভারলে */}
                        <div className="relative aspect-square w-full bg-slate-50 overflow-hidden group">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <Image
                            src={product.imageUrl}
                            alt={`${product.name} Medico Genuine Specimen`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                            loading="lazy"
                            height={300}
                            width={300}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                `https://placehold.co/300x300/e2e8f0/0f172a?text=${encodeURIComponent(product.name)}`;
                            }}
                          />

                          {/* হোভার আইকন অ্যাকশন (নির্দিষ্ট কার্ডের হোভার অ্যাক্সেস করতে group-hover/card ব্যবহার করা হয়েছে) */}
                          <div className="absolute inset-0 bg-slate-900/35 backdrop-blur-xs opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                            <button
                              onClick={() => setActiveModalProduct(product)}
                              className="p-2.5 bg-white text-slate-800 rounded-full hover:bg-emerald-600 hover:text-white transition-all transform hover:scale-115 focus:outline-none"
                              title="Quick View"
                            >
                              <Eye size={16} />
                            </button>
                          </div>
                        </div>

                        {/* প্রোডাক্ট ইনফরমেশন */}
                        <div className="p-3.5 flex-1 flex flex-col justify-between">
                          <div className="space-y-1">
                            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide truncate">
                              {product.brand || "Medico Pharma"}
                            </p>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight line-clamp-2 min-h-[36px]">
                              {product.name}
                            </h4>
                            <p className="text-[10px] font-semibold text-slate-500">
                              {product.strength || "Standard Dosage"}
                            </p>
                          </div>

                          {/* রেটিং স্টারস */}
                          {product.rating !== undefined && (
                            <div className="flex items-center gap-1 py-1">
                              <div className="flex items-center text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={10}
                                    fill="currentColor"
                                    className="stroke-none"
                                  />
                                ))}
                              </div>
                              <span className="text-[9px] text-slate-400 font-bold">
                                ({product.reviewsCount || 0})
                              </span>
                            </div>
                          )}

                          {/* প্রাইসিং এবং অ্যাড বাটন */}
                          <div className="pt-3 border-t border-slate-50 flex items-center justify-between gap-1 mt-3">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-slate-400 line-through">
                                ৳ {product.originalPrice.toFixed(2)}
                              </span>
                              <span className="text-xs sm:text-sm font-extrabold text-emerald-600">
                                ৳ {product.currentPrice.toFixed(2)}
                              </span>
                            </div>

                            <button
                              onClick={(e) => addToCart(product, e)}
                              className="bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs px-2.5 py-1.5 rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-1 uppercase tracking-wider hover:shadow-md"
                            >
                              <Plus size={12} className="stroke-[3]" />
                              ADD
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ৩.৪ ইন্টারঅ্যাক্টিভ টোস্ট নোটিফিকেশন */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 animate-slide-up">
          <div className="p-1 bg-emerald-500 rounded-lg text-white">
            <Check size={14} className="stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ৩.৫ কুইক ভিউ মডাল */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100 relative animate-scale-up">
            {/* ক্লোজ বাটন */}
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 z-10 p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-all focus:outline-none"
            >
              <X size={18} />
            </button>

            {/* মডাল কন্টেন্ট */}
            <div className="relative aspect-video w-full bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <Image
                height={220}
                width={220}
                src={activeModalProduct.imageUrl}
                alt={activeModalProduct.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    `https://placehold.co/400x250/e2e8f0/0f172a?text=${encodeURIComponent(activeModalProduct.name)}`;
                }}
              />
              <span className="absolute bottom-4 left-4 bg-red-500 text-white font-black text-xs px-2.5 py-1 rounded-lg">
                Flat {activeModalProduct.discount}% OFF
              </span>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <span className="text-xs text-emerald-600 font-extrabold uppercase tracking-widest block">
                  {activeModalProduct.brand || "Medico Certified Brand"}
                </span>
                <h3 className="text-lg font-black text-slate-900 leading-tight">
                  {activeModalProduct.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Pack Size / Strength:{" "}
                  {activeModalProduct.strength || "Standard Unit"}
                </p>
              </div>

              <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-100/50 p-3 rounded-2xl text-xs text-emerald-800 font-semibold">
                <Info size={16} className="text-emerald-600 shrink-0" />
                <span>
                  Genuine product sourced directly from pharmaceuticals labs.
                  Eligible for 1-3 hour express delivery.
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 line-through">
                    ৳ {activeModalProduct.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-xl font-black text-slate-900">
                    ৳ {activeModalProduct.currentPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      addToCart(activeModalProduct, e);
                      setActiveModalProduct(null);
                    }}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs px-5 py-3 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5 uppercase tracking-wider"
                  >
                    <ShoppingCart size={14} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
