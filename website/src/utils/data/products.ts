import { PackSize, Product } from "@/src/types/product";

const generateSlug = (name: string, id: string): string => {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") + `-${id}`
  );
};

const generatePackSizes = (
  productId: string,
  basePrice: number,
  baseDiscount: number = 0,
): PackSize[] => {
  const quantities = [10, 20, 30, 40, 50];
  const stripCounts = [1, 2, 3, 4, 5];
  const pricePerUnit = basePrice / 10;

  return quantities.map((quantity, index) => {
    const stripCount = stripCounts[index];
    const totalOriginalPrice = pricePerUnit * quantity;

    let discount = baseDiscount;
    if (quantity >= 50) discount = Math.min(baseDiscount + 11, 30);
    else if (quantity >= 40) discount = Math.min(baseDiscount + 9, 28);
    else if (quantity >= 30) discount = Math.min(baseDiscount + 7, 25);
    else if (quantity >= 20) discount = Math.min(baseDiscount + 5, 22);

    const discountedPrice = totalOriginalPrice * (1 - discount / 100);

    return {
      id: `${productId}-pack-${quantity}`,
      label: `${quantity} Tablets (${stripCount} Strip${stripCount > 1 ? "s" : ""})`,
      quantity,
      stripCount,
      price: Math.round(discountedPrice * 100) / 100,
      originalPrice: Math.round(totalOriginalPrice * 100) / 100,
      discount,
      inStock: true,
    };
  });
};

const addPackSizesToProduct = (product: Product): Product => {
  if (product.packSizes && product.packSizes.length > 0) {
    return product;
  }

  const isTabletProduct =
    product.strength?.includes("mg") ||
    product.strength?.includes("Tablet") ||
    product.strength?.includes("Capsule") ||
    product.category.includes("Medicine") ||
    product.category.includes("Supplement") ||
    product.id.startsWith("best-") ||
    product.id.startsWith("otc-") ||
    product.id.startsWith("boost-") ||
    product.id.startsWith("sup-");

  if (isTabletProduct) {
    const packSizes = generatePackSizes(
      product.id,
      product.originalPrice,
      product.discount,
    );
    return {
      ...product,
      packSizes,
      defaultPackSizeId: packSizes[0]?.id,
    };
  }

  const packSizes = [
    {
      id: `${product.id}-pack-1`,
      label: `1 Unit`,
      quantity: 1,
      price: product.currentPrice,
      originalPrice: product.originalPrice,
      discount: product.discount,
      inStock: true,
    },
  ];
  return {
    ...product,
    packSizes,
    defaultPackSizeId: packSizes[0]?.id,
  };
};

export const PRODUCTS_DATA: Product[] = [
  // --- BEST SELLING PRODUCTS ---
  {
    id: "best-1",
    slug: generateSlug("Napa 500 500mg", "best-1"),
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
    description:
      "Napa 500 is a trusted pain reliever containing Paracetamol 500mg. It effectively reduces fever and relieves mild to moderate pain including headache, toothache, muscle pain, and menstrual cramps.",
    usage:
      "Take 1-2 tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours.",
    benefits: [
      "Fast pain relief",
      "Reduces fever",
      "Trusted brand",
      "Safe for most adults",
    ],
    inStock: true,
  },
  {
    id: "best-2",
    slug: generateSlug("Sergel 20 20mg", "best-2"),
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
    description:
      "Sergel 20mg is a prescription medication containing Cefixime, used to treat various bacterial infections including respiratory tract infections, urinary tract infections, and ear infections.",
    usage: "Take as prescribed by your doctor. Usually taken once daily.",
    benefits: [
      "Broad-spectrum antibiotic",
      "Effective against many bacterial infections",
      "Once-daily dosing",
    ],
    inStock: true,
  },
  {
    id: "best-3",
    slug: generateSlug("Ceevit 250mg", "best-3"),
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
    description:
      "Ceevit 250mg is a Vitamin C supplement that helps boost immunity, promote collagen production, and protect against oxidative stress.",
    usage:
      "Take 1 tablet daily with food or as directed by your healthcare provider.",
    benefits: [
      "Boosts immune system",
      "Powerful antioxidant",
      "Promotes skin health",
      "Supports wound healing",
    ],
    inStock: true,
  },
  {
    id: "best-4",
    slug: generateSlug("Ecosprin 75 75mg", "best-4"),
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
    description:
      "Ecosprin 75mg is a low-dose aspirin used for cardiovascular protection. It helps prevent blood clot formation and reduces the risk of heart attacks and strokes.",
    usage:
      "Take 1 tablet daily or as directed by your doctor. Swallow with water after meals.",
    benefits: [
      "Cardiovascular protection",
      "Prevents blood clots",
      "Reduces stroke risk",
      "Doctor recommended",
    ],
    inStock: true,
  },
  {
    id: "best-5",
    slug: generateSlug("Pantonix 20 20mg", "best-5"),
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
    description:
      "Pantonix 20mg contains Pantoprazole, a proton pump inhibitor that reduces stomach acid production. Used to treat acid reflux, GERD, and stomach ulcers.",
    usage: "Take 1 tablet daily before breakfast. Swallow whole with water.",
    benefits: [
      "Reduces stomach acid",
      "Treats acid reflux",
      "Heals stomach ulcers",
      "Provides long-lasting relief",
    ],
    inStock: true,
  },
  {
    id: "best-6",
    slug: generateSlug("Monas 10 10mg", "best-6"),
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
    description:
      "Monas 10mg contains Montelukast, used to prevent asthma attacks and treat seasonal allergies. It works by blocking substances that cause inflammation in the airways.",
    usage:
      "Take 1 tablet daily in the evening. Can be taken with or without food.",
    benefits: [
      "Prevents asthma attacks",
      "Relieves allergy symptoms",
      "Reduces airway inflammation",
      "Long-term control",
    ],
    inStock: true,
  },

  // --- NEWLY LAUNCHED ITEMS ---
  {
    id: "new-1",
    slug: generateSlug("Lanbena Witch Hazel Nose Strip", "new-1"),
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
    description:
      "Lanbena Witch Hazel Nose Strip helps remove blackheads and unclog pores. Formulated with natural witch hazel extract that soothes and tightens skin while removing impurities.",
    usage:
      "Clean your nose, wet the strip, apply and leave for 10-15 minutes. Gently peel off from the edges.",
    benefits: [
      "Removes blackheads",
      "Unclogs pores",
      "Natural ingredients",
      "Soothes skin",
    ],
    inStock: true,
  },
  {
    id: "new-2",
    slug: generateSlug("Melao Hydrating Mineral Sunscreen", "new-2"),
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
    description:
      "Melao Hydrating Mineral Sunscreen provides broad-spectrum SPF 50 protection with natural minerals. Formulated with hydrating ingredients that keep skin moisturized while protecting from harmful UV rays.",
    usage:
      "Apply generously to face and neck 15 minutes before sun exposure. Reapply every 2 hours.",
    benefits: [
      "SPF 50 protection",
      "Hydrating formula",
      "Mineral-based",
      "Suitable for sensitive skin",
    ],
    inStock: true,
  },
  {
    id: "new-3",
    slug: generateSlug("Melao PDRN Pink Peptide Serum", "new-3"),
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
    description:
      "Melao PDRN Pink Peptide Serum combines PDRN (salmon DNA) with pink peptides for advanced skin regeneration. Helps improve skin texture, reduce fine lines, and promote collagen production.",
    usage:
      "Apply 2-3 drops to cleansed face morning and night. Gently pat into skin until fully absorbed.",
    benefits: [
      "Skin regeneration",
      "Reduces fine lines",
      "Boosts collagen",
      "Improves texture",
    ],
    inStock: true,
  },
  {
    id: "new-4",
    slug: generateSlug("Melao Whitening Sunscreen", "new-4"),
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
    description:
      "Melao Whitening Sunscreen offers maximum protection with SPF50+ PA++++ while brightening skin tone. Formulated with niacinamide and vitamin C for dual action protection and whitening.",
    usage:
      "Apply evenly to face and exposed areas 20 minutes before sun exposure. Reapply regularly.",
    benefits: [
      "Maximum sun protection",
      "Skin brightening",
      "Contains niacinamide",
      "Lightweight formula",
    ],
    inStock: true,
  },
  {
    id: "new-5",
    slug: generateSlug("Sadoer Repair and Nourish Cream", "new-5"),
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
    description:
      "Sadoer 4-in-1 Repair & Nourish Cream provides intensive repair, hydration, nourishment, and protection for damaged skin. Suitable for all skin types.",
    usage:
      "Apply a small amount to clean skin morning and night. Massage gently until absorbed.",
    benefits: [
      "Repairs damaged skin",
      "Deep hydration",
      "Nourishes skin",
      "Protects skin barrier",
    ],
    inStock: true,
  },
  {
    id: "new-6",
    slug: generateSlug("BG Lip Gloss 106 Rosy", "new-6"),
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
    description:
      "BG Lip Gloss 106 Rosy is a volume-plumping lip gloss that gives a natural rosy tint. Enriched with hyaluronic acid for hydration and a fuller appearance.",
    usage:
      "Apply directly to lips with the applicator. Layer for more intense color and shine.",
    benefits: [
      "Volume plumping",
      "Rosy tint",
      "Hydrating formula",
      "High shine finish",
    ],
    inStock: true,
  },
  {
    id: "new-7",
    slug: generateSlug("BG Lip Gloss 105 Rose Wood", "new-7"),
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
    description:
      "BG Lip Gloss 105 Rose Wood is a volume-plumping lip gloss with a rose wood shade. Contains nourishing oils and peptides for fuller, healthier-looking lips.",
    usage:
      "Apply directly to lips with the applicator. For best results, use as a topper over lipstick.",
    benefits: [
      "Volume plumping",
      "Rose wood shade",
      "Nourishing formula",
      "High shine finish",
    ],
    inStock: true,
  },

  // --- BREATHE & RELIEVE ---
  {
    id: "breathe-1",
    slug: generateSlug("Green Seven Sleep Balm Lavender", "breathe-1"),
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
    description:
      "Green Seven Sleep Balm with Lavender helps promote restful sleep and relaxation. Made with natural lavender essential oil and herbal extracts for a calming bedtime ritual.",
    usage:
      "Apply to temples, wrists, and chest before bedtime. Inhale deeply for relaxation benefits.",
    benefits: [
      "Promotes restful sleep",
      "Calming lavender",
      "Natural ingredients",
      "Relaxation aid",
    ],
    inStock: true,
  },
  {
    id: "breathe-2",
    slug: generateSlug("Hong Thai Inhaler", "breathe-2"),
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
    description:
      "Hong Thai Inhaler is a traditional Thai herbal inhaler that provides instant relief from nasal congestion, colds, and headaches. The iconic black and gold packaging makes it a classic choice.",
    usage:
      "Inhale deeply through the nostrils when experiencing congestion or discomfort.",
    benefits: [
      "Relieves nasal congestion",
      "Instant freshness",
      "Traditional formula",
      "Compact and portable",
    ],
    inStock: true,
  },
  {
    id: "breathe-3",
    slug: generateSlug("Seven Massage Balm Green", "breathe-3"),
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
    description:
      "Seven Massage Balm Green provides deep tissue relief with natural herbal ingredients. Perfect for soothing muscle tension and promoting relaxation.",
    usage:
      "Massage onto affected areas with gentle pressure. Repeat as needed for relief.",
    benefits: [
      "Relieves muscle tension",
      "Natural herbs",
      "Deep tissue relief",
      "Promotes relaxation",
    ],
    inStock: true,
  },
  {
    id: "breathe-4",
    slug: generateSlug("Poy Sian Menthol Inhaler", "breathe-4"),
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
    description:
      "Poy Sian Menthol Inhaler is an authentic Thai inhaler with a powerful menthol aroma. Provides instant relief from stuffy noses, dizziness, and helps with alertness.",
    usage:
      "Inhale deeply through both nostrils. Use as needed for relief from congestion.",
    benefits: [
      "Instant relief from stuffy nose",
      "Enhances alertness",
      "Authentic Thai product",
      "Portable design",
    ],
    inStock: true,
  },
  {
    id: "breathe-5",
    slug: generateSlug("Seven Balm White", "breathe-5"),
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
    description:
      "Seven Balm White provides cooling relief for headaches, muscle aches, and insect bites. Made with natural cooling ingredients and herbal extracts.",
    usage:
      "Apply a small amount to temples for headache relief or on affected areas for muscle pain.",
    benefits: [
      "Cooling relief",
      "Soothes headaches",
      "Relieves muscle aches",
      "Natural ingredients",
    ],
    inStock: true,
  },
  {
    id: "breathe-6",
    slug: generateSlug("Pim-Sean Roll-on Balm Oil", "breathe-6"),
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
    description:
      "Pim-Sean Roll-on Balm Oil is a convenient roll-on version of the classic Thai balm. Provides instant relief from nasal congestion, headaches, and fatigue.",
    usage:
      "Apply to temples, chest, or under nose using the roll-on applicator.",
    benefits: [
      "Convenient roll-on",
      "Instant relief",
      "Compact size",
      "Multiple uses",
    ],
    inStock: true,
  },

  // --- PROTECT YOUR HEALTH ---
  {
    id: "protect-1",
    slug: generateSlug("Accu-Chek Glucose Strip", "protect-1"),
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
    description:
      "Accu-Chek Glucose Strips provide accurate blood glucose monitoring for diabetes management. Each strip includes 100 tests with reliable results.",
    usage:
      "Use with Accu-Chek blood glucose meter. Apply blood sample to the strip and read results.",
    benefits: [
      "Accurate results",
      "100 tests per pack",
      "Trusted brand",
      "Easy to use",
    ],
    inStock: true,
  },
  {
    id: "protect-2",
    slug: generateSlug("Pulse Oximeter OLED Version", "protect-2"),
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
    description:
      "Pulse Oximeter OLED Version displays accurate blood oxygen saturation and pulse rate on a clear OLED screen. Compact and easy to use for home monitoring.",
    usage:
      "Place on fingertip and press power button. Read results on the OLED display.",
    benefits: [
      "Accurate oxygen monitoring",
      "OLED display",
      "Compact design",
      "Battery operated",
    ],
    inStock: true,
  },
  {
    id: "protect-3",
    slug: generateSlug("Cervical Pillow Regular", "protect-3"),
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
    description:
      "Cervical Pillow provides ergonomic neck support for proper spinal alignment during sleep. Helps reduce neck pain and improve sleep quality.",
    usage:
      "Place under your neck while sleeping. The contoured design supports natural neck curve.",
    benefits: [
      "Ergonomic neck support",
      "Reduces neck pain",
      "Improves sleep quality",
      "Orthopedic design",
    ],
    inStock: true,
  },
  {
    id: "protect-4",
    slug: generateSlug("Counterpain Analgesic Balm", "protect-4"),
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
    description:
      "Counterpain Analgesic Balm provides fast-acting pain relief for muscle and joint pain. The cooling gel formula penetrates deep for effective relief.",
    usage:
      "Apply to affected areas and massage gently. Use 2-3 times daily or as needed.",
    benefits: [
      "Fast pain relief",
      "Cooling action",
      "Deep penetration",
      "Versatile use",
    ],
    inStock: true,
  },
  {
    id: "protect-5",
    slug: generateSlug("Voveran Emulgel Diclofenac", "protect-5"),
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
    description:
      "Voveran Emulgel contains Diclofenac for effective relief from joint and muscle pain. The emulgel formula is easy to apply and quickly absorbed.",
    usage:
      "Apply a thin layer to the affected area 2-3 times daily. Do not use on broken skin.",
    benefits: [
      "Effective pain relief",
      "Easy application",
      "Quick absorption",
      "Trusted brand",
    ],
    inStock: true,
  },
  {
    id: "protect-6",
    slug: generateSlug("Neck Cushion Soft Foam", "protect-6"),
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
    description:
      "Neck Cushion Soft Foam provides gentle neck support for travelers and office workers. The soft foam conforms to your neck shape for optimal comfort.",
    usage:
      "Place around your neck for support during travel or while resting. Adjust for comfort.",
    benefits: [
      "Comfortable neck support",
      "Soft foam material",
      "Portable design",
      "Versatile use",
    ],
    inStock: true,
  },

  // --- BOOST & BALANCE ---
  {
    id: "boost-1",
    slug: generateSlug("Upakarma Shilajit Ashwagandha", "boost-1"),
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
    description:
      "Upakarma Shilajit + Ashwagandha combines two powerful Ayurvedic herbs for energy, vitality, and overall wellness. Pure resin form for maximum potency.",
    usage:
      "Dissolve a small portion (about 1g) in warm milk or water. Drink once daily.",
    benefits: [
      "Boosts energy",
      "Enhances vitality",
      "Ayurvedic formula",
      "Pure resin",
    ],
    inStock: true,
  },
  {
    id: "boost-2",
    slug: generateSlug("Korean Ginseng 1000mg", "boost-2"),
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
    description:
      "Korean Ginseng 1000mg is a premium supplement that supports energy, mental clarity, and immune function. Contains standard Korean ginseng extract.",
    usage:
      "Take 2 capsules daily with food or as directed by your healthcare provider.",
    benefits: [
      "Boosts energy",
      "Enhances mental clarity",
      "Supports immunity",
      "Premium quality",
    ],
    inStock: true,
  },
  {
    id: "boost-3",
    slug: generateSlug("Piping Rock Olive Leaf Extract", "boost-3"),
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
    description:
      "Piping Rock Olive Leaf Extract provides powerful antioxidant support for immune health. Standardized to contain beneficial oleuropein compounds.",
    usage:
      "Take 2 veg capsules daily with a meal or as directed by your healthcare professional.",
    benefits: [
      "Antioxidant support",
      "Immune health",
      "Natural extract",
      "Vegan formula",
    ],
    inStock: true,
  },
  {
    id: "boost-4",
    slug: generateSlug("Alpha Lipoic Acid 600 Mg", "boost-4"),
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
    description:
      "Alpha Lipoic Acid 600 mg is a powerful antioxidant that supports cellular health and energy production. Helps neutralize free radicals and support nerve health.",
    usage:
      "Take 1 capsule daily with food or as directed by your healthcare provider.",
    benefits: [
      "Powerful antioxidant",
      "Supports cellular health",
      "Promotes nerve health",
      "Energy support",
    ],
    inStock: true,
  },
  {
    id: "boost-5",
    slug: generateSlug("Now Castor Oil 650mg", "boost-5"),
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
    description:
      "Now Castor Oil 650mg is a rich source of fatty acids that support digestive health and immune function. Pure and cold-pressed for maximum benefits.",
    usage:
      "Take 2 capsules daily with meals or as directed by your healthcare professional.",
    benefits: [
      "Digestive health support",
      "Immune support",
      "Rich in fatty acids",
      "Cold-pressed",
    ],
    inStock: true,
  },
  {
    id: "boost-6",
    slug: generateSlug("Just D3 800 Drops", "boost-6"),
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
    description:
      "Just D3 800 Drops provides Vitamin D3 in a convenient liquid drop format for easy absorption. Supports bone health, immunity, and overall wellness.",
    usage:
      "Take the recommended dose daily directly under the tongue or mix with water.",
    benefits: [
      "Vitamin D3 support",
      "Liquid format",
      "Easy absorption",
      "Bone health",
    ],
    inStock: true,
  },
  {
    id: "boost-7",
    slug: generateSlug("Ashol Lychee Honey", "boost-7"),
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
    description:
      "Ashol Lychee Honey is pure, natural honey made from lychee flowers. Rich in antioxidants and natural sweetness, perfect for daily health and wellness.",
    usage:
      "Use as a natural sweetener in tea, on toast, or in smoothies. Can be consumed directly.",
    benefits: [
      "Natural sweetener",
      "Rich in antioxidants",
      "Pure honey",
      "Lychee flower source",
    ],
    inStock: true,
  },

  // --- OTC MEDICINE ---
  {
    id: "otc-1",
    slug: generateSlug("Montair 10 10mg", "otc-1"),
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
    description:
      "Montair 10mg contains Montelukast for the prevention and treatment of asthma symptoms. Helps reduce airway inflammation and improve breathing.",
    usage:
      "Take 1 tablet daily in the evening. Continue use as prescribed for optimal results.",
    benefits: [
      "Asthma prevention",
      "Reduces inflammation",
      "Improves breathing",
      "Daily protection",
    ],
    inStock: true,
  },
  {
    id: "otc-2",
    slug: generateSlug("Pantonix 20 20mg Acid", "otc-2"),
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
    description:
      "Pantonix 20mg is a proton pump inhibitor that effectively reduces stomach acid production. Used for treating acid reflux, GERD, and peptic ulcers.",
    usage:
      "Take 1 tablet daily before breakfast. Swallow whole, do not crush or chew.",
    benefits: [
      "Acid reduction",
      "GERD treatment",
      "Ulcer healing",
      "Once daily dosing",
    ],
    inStock: true,
  },
  {
    id: "otc-3",
    slug: generateSlug("Bislol 2.5 2.5mg", "otc-3"),
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
    description:
      "Bislol 2.5mg contains Bisoprolol, a beta-blocker used to manage high blood pressure and heart conditions. Helps reduce the workload on the heart.",
    usage:
      "Take as prescribed by your doctor. Usually taken once daily in the morning.",
    benefits: [
      "Blood pressure control",
      "Heart protection",
      "Once daily dosing",
      "Trusted medication",
    ],
    inStock: true,
  },
  {
    id: "otc-4",
    slug: generateSlug("Napa 500 500mg Regular", "otc-4"),
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
    description:
      "Napa 500 is a trusted pain reliever and fever reducer containing Paracetamol 500mg. Provides effective relief from various types of pain.",
    usage:
      "Take 1-2 tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours.",
    benefits: [
      "Effective pain relief",
      "Reduces fever",
      "Trusted brand",
      "Quick acting",
    ],
    inStock: true,
  },
  {
    id: "otc-5",
    slug: generateSlug("Adovas 200ml Syrup", "otc-5"),
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
    description:
      "Adovas Syrup is a traditional herbal formulation for digestive health and overall wellness. Made with natural ingredients trusted for generations.",
    usage:
      "Take 10-15ml twice daily after meals or as directed by your healthcare provider.",
    benefits: [
      "Digestive health",
      "Natural ingredients",
      "Traditional formula",
      "Gentle action",
    ],
    inStock: true,
  },
  {
    id: "otc-6",
    slug: generateSlug("Alcet 5mg", "otc-6"),
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
    description:
      "Alcet 5mg is an antihistamine containing Levocetirizine for effective allergy relief. Provides 24-hour relief from allergic symptoms like sneezing, runny nose, and watery eyes.",
    usage:
      "Take 1 tablet once daily. For best results, take at the same time each day.",
    benefits: [
      "24-hour allergy relief",
      "Non-drowsy formula",
      "Effective symptom control",
      "Once daily dosing",
    ],
    inStock: true,
  },
  {
    id: "otc-7",
    slug: generateSlug("Cinaron 15 15mg", "otc-7"),
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
    description:
      "Cinaron 15mg contains Cinnarizine for the treatment of dizziness, vertigo, and motion sickness. Helps improve blood flow to the inner ear.",
    usage:
      "Take 1-2 tablets as directed by your doctor. Usually taken before meals.",
    benefits: [
      "Dizziness relief",
      "Vertigo treatment",
      "Motion sickness prevention",
      "Improves blood flow",
    ],
    inStock: true,
  },

  // --- SUPPLEMENT FESTIVAL ---
  {
    id: "sup-1",
    slug: generateSlug("Male Extra Enhancement", "sup-1"),
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
    description:
      "Male Extra Enhancement is a premium male health supplement designed to support performance, vitality, and overall wellness. Formulated with natural ingredients.",
    usage:
      "Take 2 capsules daily with meals or as directed by your healthcare provider.",
    benefits: [
      "Male health support",
      "Natural ingredients",
      "Performance enhancement",
      "Vitality boost",
    ],
    inStock: true,
  },
  {
    id: "sup-2",
    slug: generateSlug("Ashwagandha 12500 mg", "sup-2"),
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
    description:
      "Ashwagandha 12,500 mg is a potent adaptogenic supplement that helps the body manage stress, improve energy, and support overall wellness.",
    usage:
      "Take 2 capsules daily with meals or as directed by your healthcare provider.",
    benefits: [
      "Stress management",
      "Energy support",
      "Adaptogenic properties",
      "Premium strength",
    ],
    inStock: true,
  },
  {
    id: "sup-3",
    slug: generateSlug("Himalayan Shilajit Pure", "sup-3"),
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
    description:
      "Himalayan Shilajit Pure is a potent adaptogen and mineral supplement sourced from the Himalayas. Rich in fulvic acid and essential minerals.",
    usage:
      "Take 2 capsules daily with meals for optimal absorption and benefits.",
    benefits: [
      "Adaptogen support",
      "Rich in minerals",
      "Fulvic acid content",
      "Energy boost",
    ],
    inStock: true,
  },
  {
    id: "sup-4",
    slug: generateSlug("Herbtonics Liver Cleanse Formula", "sup-4"),
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
    description:
      "Herbtonics Liver Cleanse Formula supports liver health and detoxification. Formulated with milk thistle, dandelion root, and other liver-supporting herbs.",
    usage:
      "Take 2 vegan capsules daily with meals for comprehensive liver support.",
    benefits: [
      "Liver support",
      "Detoxification",
      "Milk thistle based",
      "Vegan formula",
    ],
    inStock: true,
  },
  {
    id: "sup-5",
    slug: generateSlug("Force Factor L-Arginine 3000mg", "sup-5"),
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
    description:
      "Force Factor L-Arginine 3000mg supports nitric oxide production for better blood flow and vascular health. Helps improve athletic performance and recovery.",
    usage: "Take 3 capsules daily on an empty stomach for best results.",
    benefits: [
      "Improves blood flow",
      "Athletic performance",
      "Recovery support",
      "Nitric oxide boost",
    ],
    inStock: true,
  },
  {
    id: "sup-6",
    slug: generateSlug("Carlyle Norwegian Cod Liver Oil", "sup-6"),
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
    description:
      "Carlyle Norwegian Cod Liver Oil is rich in Omega-3 fatty acids EPA and DHA. Supports heart health, brain function, and joint health.",
    usage:
      "Take 1 tablespoon daily with meals or as directed by your healthcare professional.",
    benefits: [
      "Heart health",
      "Brain function",
      "Joint support",
      "Omega-3 rich",
    ],
    inStock: true,
  },

  // --- ALL-IN-ONE CARE DEALS ---
  {
    id: "deal-1",
    slug: generateSlug("Seravix Cleanser Dermalix Combo", "deal-1"),
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
    description:
      "Seravix Cleanser + Dermalix Combo is a complete acne treatment system. Includes a gentle cleanser and a targeted spot treatment for clear, healthy skin.",
    usage:
      "Use the cleanser twice daily followed by the spot treatment on affected areas.",
    benefits: [
      "Acne treatment",
      "Complete system",
      "Gentle formula",
      "Clear skin",
    ],
    inStock: true,
  },
  {
    id: "deal-2",
    slug: generateSlug("Dermalix Glow Vitamin C Serum", "deal-2"),
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
    description:
      "Dermalix Glow Vitamin C Serum contains 10% Vitamin C for brightening and anti-aging benefits. Helps reduce dark spots and improve skin radiance.",
    usage:
      "Apply a few drops to clean face every morning. Follow with sunscreen for best results.",
    benefits: [
      "Skin brightening",
      "Anti-aging",
      "Reduces dark spots",
      "Radiance boost",
    ],
    inStock: true,
  },
  {
    id: "deal-3",
    slug: generateSlug("Hair Got Right Scalp Shampoo", "deal-3"),
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
    description:
      "Hair Got Right Scalp Shampoo is an anti-dandruff formula that cleanses the scalp and promotes healthy hair growth. Contains zinc pyrithione for effective dandruff control.",
    usage:
      "Massage into wet hair and scalp. Leave for 2-3 minutes before rinsing thoroughly.",
    benefits: [
      "Dandruff control",
      "Scalp health",
      "Hair growth support",
      "Gentle formula",
    ],
    inStock: true,
  },
  {
    id: "deal-4",
    slug: generateSlug("Seravix Cleanser Niacinamide Combo", "deal-4"),
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
    description:
      "Seravix Cleanser + Niacinamide Combo is a brightening treatment system. Combines a gentle cleanser with a niacinamide serum for even skin tone.",
    usage:
      "Use the cleanser morning and night, apply niacinamide serum before moisturizing.",
    benefits: [
      "Skin brightening",
      "Even skin tone",
      "Gentle system",
      "Niacinamide based",
    ],
    inStock: true,
  },
  {
    id: "deal-5",
    slug: generateSlug("Seravix Cleanser Vit-C Combo", "deal-5"),
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
    description:
      "Seravix Cleanser + Vit-C Combo is a complete skin glow kit. Includes a gentle cleanser and a Vitamin C serum for radiant, healthy-looking skin.",
    usage:
      "Cleanse twice daily and apply Vitamin C serum every morning for best results.",
    benefits: [
      "Skin glow",
      "Vitamin C benefits",
      "Complete kit",
      "Gentle formula",
    ],
    inStock: true,
  },
  {
    id: "deal-6",
    slug: generateSlug("Dermalix Shower Combo BOGO", "deal-6"),
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
    description:
      "Dermalix Shower Combo offers a BOGO deal on rose and lavender shower products. Enjoy natural aromatherapy benefits while cleansing.",
    usage: "Use daily in the shower. Lather well and rinse thoroughly.",
    benefits: [
      "Buy One Get One",
      "Aromatherapy",
      "Natural ingredients",
      "Luxury shower",
    ],
    inStock: true,
  },
  {
    id: "deal-7",
    slug: generateSlug("Dermalix Premium Cotton Pads", "deal-7"),
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
    description:
      "Dermalix Premium Cotton Pads are soft, gentle, and lint-free for all your skincare needs. Perfect for applying toner, removing makeup, and cleansing.",
    usage:
      "Use with your favorite toner, makeup remover, or cleanser. Gentle on all skin types.",
    benefits: [
      "Premium quality",
      "Lint-free",
      "Gentle on skin",
      "Versatile use",
    ],
    inStock: true,
  },
];

// Export products with pack sizes automatically added
export const PRODUCTS = PRODUCTS_DATA?.map(addPackSizesToProduct);

// Default export
export default PRODUCTS;
