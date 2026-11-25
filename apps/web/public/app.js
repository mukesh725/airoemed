/**
 * AIRO eMed US — Client Application Logic
 * Implements Hims-style audience switching, interactive intake funnel,
 * real-time CDSS contraindication checks, and FTC 1-click subscription management.
 */

// ----------------------------------------------------
// PRODUCT CATALOG DATA
// ----------------------------------------------------
const PRODUCTS = [
  {
    id: 'med-semaglutide',
    audience: 'BOTH',
    category: 'WEIGHT_MANAGEMENT',
    categoryLabel: 'Weight Management',
    title: 'Semaglutide Oral Tablets',
    ingredients: 'Oral Semaglutide 3mg / 7mg / 14mg',
    badge: 'Rx Required · Oral GLP-1',
    badgeType: 'rx',
    price: 59,
    priceInr: 4999,
    originalPrice: 79,
    originalPriceInr: 6499,
    period: '/ month',
    image: '/images/pdp/semaglutide/main.jpg',
    description: 'Once-daily oral GLP-1 tablet — clinically proven to reduce hunger, curb cravings, and support sustainable metabolic weight loss without injections.',
    rating: 4.9,
    reviews: 320,
    concernKey: 'WEIGHT_MANAGEMENT'
  },
  {
    id: 'med-glow-serum',
    audience: 'BOTH',
    category: 'DERMATOLOGY',
    categoryLabel: 'Skin Care',
    title: 'Glow Renewal Night Serum',
    ingredients: 'Retinol 0.5% + Niacinamide 5%',
    badge: 'Dermatologist Formulated',
    badgeType: 'doctor',
    price: 15,
    priceInr: 1299,
    originalPrice: 20,
    originalPriceInr: 1699,
    period: '/ bottle',
    image: '/images/pdp/glow-serum/main.jpg',
    description: 'Dermatologist-formulated nightly serum that pairs retinol with niacinamide to smooth fine lines, fade dark spots, and brighten dull skin without irritation.',
    rating: 4.8,
    reviews: 342,
    concernKey: 'DERMATOLOGY'
  },
  {
    id: 'med-hair-regrow',
    audience: 'HIM',
    category: 'HAIR_LOSS',
    categoryLabel: 'Hair Care',
    title: 'Hair Regrow Solution',
    ingredients: 'Minoxidil 5% + Finasteride 0.1%',
    badge: 'Clinically Proven',
    badgeType: 'bestseller',
    price: 18,
    priceInr: 1499,
    originalPrice: 24,
    originalPriceInr: 1999,
    period: '/ month',
    image: '/images/card-prod-hair-spray.jpg',
    description: 'Dual-active topical solution that reactivates shrinking hair follicles, extends the growth phase, and reduces scalp DHT at the root.',
    rating: 4.8,
    reviews: 891,
    concernKey: 'HAIR_LOSS'
  },
  {
    id: 'med-finasteride',
    audience: 'HIM',
    category: 'HAIR_LOSS',
    categoryLabel: 'Hair Care',
    title: 'Finasteride 1 mg Tablets',
    ingredients: 'Finasteride USP 1 mg',
    badge: 'Rx Required · DHT Blocker',
    badgeType: 'rx',
    price: 12,
    priceInr: 999,
    originalPrice: 17,
    originalPriceInr: 1399,
    period: '/ month',
    image: '/images/card-prod-finasteride.jpg',
    description: 'FDA-approved daily oral tablet that blocks up to 70% of DHT, halting male pattern hair thinning and restoring follicular thickness.',
    rating: 4.9,
    reviews: 612,
    concernKey: 'HAIR_LOSS'
  },
  {
    id: 'med-hair-her',
    audience: 'HER',
    category: 'HAIR_LOSS',
    categoryLabel: 'Hair Care',
    title: 'Women’s Hair Regrowth System',
    ingredients: 'Minoxidil 2% + Biotin + Caffeine',
    badge: 'Formulated for Women',
    badgeType: 'doctor',
    price: 16,
    priceInr: 1299,
    originalPrice: 20,
    originalPriceInr: 1599,
    period: '/ month',
    image: '/images/card-prod-hair-her.jpg',
    description: 'Specially balanced topical formula for female diffuse thinning and part-line widening without scalp dryness or unwanted systemic effects.',
    rating: 4.8,
    reviews: 420,
    concernKey: 'HAIR_LOSS'
  },
  {
    id: 'med-sildenafil',
    audience: 'HIM',
    category: 'SEXUAL_HEALTH_ED',
    categoryLabel: 'Sexual Health',
    title: 'Sildenafil 50 mg Tablets',
    ingredients: 'Sildenafil Citrate 50 mg / 100 mg',
    badge: 'Rx Required · Fast-Acting',
    badgeType: 'rx',
    price: 14,
    priceInr: 1199,
    originalPrice: 20,
    originalPriceInr: 1699,
    period: '/ month',
    image: '/images/card-prod-sildenafil.jpg',
    description: 'Fast-acting PDE-5 inhibitor for reliable erectile performance. Works in 30–60 minutes for up to 4–6 hours of confidence.',
    rating: 4.9,
    reviews: 950,
    concernKey: 'SEXUAL_HEALTH_ED'
  },
  {
    id: 'med-hard-mints',
    audience: 'HIM',
    category: 'SEXUAL_HEALTH_ED',
    categoryLabel: 'Sexual Health',
    title: 'Tadalafil Chewable Mints',
    ingredients: 'Compounded Tadalafil 10 mg Mint',
    badge: 'Most Popular · 36-Hr Window',
    badgeType: 'bestseller',
    price: 18,
    priceInr: 1499,
    originalPrice: 24,
    originalPriceInr: 1999,
    period: '/ month',
    image: '/images/card-prod-hard-mints.jpg',
    description: 'Discreet, fresh mint-flavored chewable offering up to 36 hours of readiness. Take daily or on-demand without water.',
    rating: 4.9,
    reviews: 780,
    concernKey: 'SEXUAL_HEALTH_ED'
  },
  {
    id: 'med-tretinoin',
    audience: 'BOTH',
    category: 'DERMATOLOGY',
    categoryLabel: 'Skin Care',
    title: 'Tretinoin 0.025% Cream',
    ingredients: 'Micronized Tretinoin 0.025%',
    badge: 'Rx Gold Standard',
    badgeType: 'rx',
    price: 14,
    priceInr: 1199,
    originalPrice: 18,
    originalPriceInr: 1499,
    period: '/ tube',
    image: '/images/card-prod-tretinoin.jpg',
    description: 'Gold-standard prescription retinoid for acne, texture, and cellular collagen renewal. Evaluated by licensed dermatologists.',
    rating: 4.8,
    reviews: 518,
    concernKey: 'DERMATOLOGY'
  },
  {
    id: 'med-clear-gel',
    audience: 'BOTH',
    category: 'DERMATOLOGY',
    categoryLabel: 'Skin Care',
    title: 'ClearSkin Acne Gel',
    ingredients: 'Salicylic Acid 2% (Clinical BHA)',
    badge: 'Clarifying Formula',
    badgeType: 'bestseller',
    price: 11,
    priceInr: 899,
    originalPrice: 15,
    originalPriceInr: 1199,
    period: '/ tube',
    image: '/images/card-prod-clear-gel.jpg',
    description: 'Targeted purifying BHA gel that unclogs trapped sebum, clarifies blemishes, and refines pores without over-drying.',
    rating: 4.6,
    reviews: 380,
    concernKey: 'DERMATOLOGY'
  },
  {
    id: 'med-shampoo',
    audience: 'BOTH',
    category: 'HAIR_LOSS',
    categoryLabel: 'Hair Care',
    title: 'Scalp Relief Shampoo',
    ingredients: 'Ketoconazole 2% Scalp Therapy',
    badge: 'Doctor Recommended',
    badgeType: 'doctor',
    price: 7,
    priceInr: 549,
    originalPrice: 10,
    originalPriceInr: 799,
    period: '/ bottle',
    image: '/images/card-prod-shampoo.jpg',
    description: 'Clinical-strength antifungal shampoo that eliminates stubborn dandruff flakes and calms scalp irritation.',
    rating: 4.7,
    reviews: 450,
    concernKey: 'HAIR_LOSS'
  },
  {
    id: 'med-niacinamide',
    audience: 'BOTH',
    category: 'DERMATOLOGY',
    categoryLabel: 'Skin Care',
    title: 'Bright Balance Serum',
    ingredients: 'Niacinamide 10% + Zinc PCA 1%',
    badge: 'Barrier Support',
    badgeType: 'doctor',
    price: 10,
    priceInr: 799,
    originalPrice: 12,
    originalPriceInr: 999,
    period: '/ bottle',
    image: '/images/card-prod-niacinamide.jpg',
    description: 'High-potency balancing serum that refines enlarged pores, regulates sebum, and repairs the lipid moisture barrier.',
    rating: 4.8,
    reviews: 290,
    concernKey: 'DERMATOLOGY'
  },
  {
    id: 'med-metformin',
    audience: 'BOTH',
    category: 'WEIGHT_MANAGEMENT',
    categoryLabel: 'Weight Management',
    title: 'Metformin 500 mg ER',
    ingredients: 'Metformin Hydrochloride 500 mg',
    badge: 'Metabolic Health',
    badgeType: 'rx',
    price: 6,
    priceInr: 499,
    originalPrice: 9,
    originalPriceInr: 699,
    period: '/ month',
    image: '/images/card-prod-metformin.jpg',
    description: 'First-line prescription metabolic therapy supporting insulin sensitivity, steady glucose control, and healthy weight management.',
    rating: 4.7,
    reviews: 215,
    concernKey: 'WEIGHT_MANAGEMENT'
  },
  {
    id: 'med-b12',
    audience: 'BOTH',
    category: 'SUPPLEMENTS',
    categoryLabel: 'Daily Supplements',
    title: 'Vitamin B12 1000 mcg',
    ingredients: 'Methylcobalamin 1000 mcg Sublingual',
    badge: 'Metabolic Energy',
    badgeType: 'doctor',
    price: 5,
    priceInr: 449,
    originalPrice: 7,
    originalPriceInr: 599,
    period: '/ bottle',
    image: '/images/card-prod-b12.jpg',
    description: 'Bioactive sublingual B12 designed for rapid absorption, cellular energy production, and nerve health support.',
    rating: 4.8,
    reviews: 190,
    concernKey: 'WEIGHT_MANAGEMENT'
  },
  {
    id: 'med-omega3',
    audience: 'BOTH',
    category: 'SUPPLEMENTS',
    categoryLabel: 'Daily Supplements',
    title: 'Omega-3 Marine Fish Oil',
    ingredients: 'Purified Marine EPA 600 mg + DHA 400 mg',
    badge: 'Heart & Inflammation',
    badgeType: 'doctor',
    price: 8,
    priceInr: 699,
    originalPrice: 11,
    originalPriceInr: 899,
    period: '/ bottle',
    image: '/images/card-prod-omega3.jpg',
    description: 'Pharmaceutical-grade, molecularly distilled wild omega-3 fatty acids for cardiovascular endurance and joint comfort.',
    rating: 4.9,
    reviews: 310,
    concernKey: 'WEIGHT_MANAGEMENT'
  },
  {
    id: 'med-rybelsus',
    audience: 'BOTH',
    category: 'WEIGHT_MANAGEMENT',
    categoryLabel: 'Weight Management',
    title: 'Rybelsus® Oral Tablets',
    ingredients: 'Oral Semaglutide 7 mg / 14 mg',
    badge: 'Oral GLP-1 · Brand',
    badgeType: 'rx',
    price: 54,
    priceInr: 4499,
    originalPrice: 72,
    originalPriceInr: 5999,
    period: '/ month',
    image: '/images/airo_opt/med-71-rybelsus-2-1790712161977-c9475b04.jpg',
    description: 'Brand-name oral GLP-1 peptide absorption technology for clinically demonstrated weight and glycemic control without injections.',
    rating: 4.9,
    reviews: 480,
    concernKey: 'WEIGHT_MANAGEMENT'
  },
  {
    id: 'med-limits',
    audience: 'HIM',
    category: 'SEXUAL_HEALTH_ED',
    categoryLabel: 'Sexual Health',
    title: 'GO BEYOND™ Limits Dual',
    ingredients: 'Sildenafil 50 mg + Tadalafil 20 mg Compound',
    badge: 'Dual Action Compound',
    badgeType: 'doctor',
    price: 18,
    priceInr: 1499,
    originalPrice: 24,
    originalPriceInr: 1999,
    period: '/ month',
    image: '/images/airo_opt/med-62-sexual-health-product-images-12-1786655381163-377c05e2.jpg',
    description: 'Compounded dual-action formula pairing the 30-minute rapid onset of sildenafil with the 36-hour weekend longevity of tadalafil.',
    rating: 4.9,
    reviews: 620,
    concernKey: 'SEXUAL_HEALTH_ED'
  }
];

// ----------------------------------------------------
// APPLICATION STATE
// ----------------------------------------------------
let currentAudience = 'ALL';
let currentCatalogAudience = 'ALL'; // 'HIM' or 'HER'
let currentCategoryFilter = 'ALL';
let intakeState = {
  step: 1,
  residenceState: 'TX',
  currentPhysicalState: 'TX',
  patientAge: 29,
  category: 'HAIR_LOSS',
  biologicalSex: 'MALE',
  answers: {
    // Sexual Health
    takesNitratesOrPoppers: false,
    takesRiociguat: false,
    takesAlphaBlockers: false,
    recentHeartAttackOrStroke: false,
    unstableAnginaOrChestPainDuringSex: false,
    systolicBloodPressure: 122,
    diastolicBloodPressure: 78,
    // Weight
    calculatedBMI: 31,
    personalOrFamilyMTC: false,
    personalOrFamilyMEN2: false,
    historyOfPancreatitis: false,
    historyOfEatingDisorder: false,
    hasWeightRelatedComorbidity: true,
    // Hair
    pregnantOrBreastfeeding: false,
    tryingToConceive: false,
    suddenPatchyHairLoss: false,
    scalpPainBurningOrPustules: false,
    // Derm
    activeSevereEczemaOnFace: false
  }
};

let userSubscription = {
  status: 'ACTIVE',
  planName: 'Custom Topical Hair Regrowth',
  category: 'HAIR_LOSS',
  price: '$45/mo',
  refillDaysLeft: 24,
  assignedClinician: 'Dr. Sarah Jenkins, MD (TX Lic #98721)',
  trackingNumber: '9400 1118 9956 2201'
};

// (initApp moved to bottom of file to prevent TDZ errors)

// ====================================================
// HERO APPLE-STYLE AUDIENCE TOGGLE & FROSTED GLASS CARDS
// ====================================================
let heroSelectedAudience = 'HER'; // Default matches user reference image
let heroCategoriesRevealed = true; // Categories shown on selection

const CATEGORY_CARDS_DATA = {
  HER: [
    {
      id: 'HAIR_LOSS',
      name: 'Hair',
      image: '/images/cat-hair.jpg',
      iconSvg: `<svg class="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-current shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.75">
        <circle cx="6" cy="18" r="2" />
        <circle cx="12" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path stroke-linecap="round" d="M6 16C6 11 8 8 9 4" />
        <path stroke-linecap="round" d="M12 16C12 11 14 8 15 4" />
        <path stroke-linecap="round" d="M18 16C18 11 20 8 21 4" />
      </svg>`
    },
    {
      id: 'WEIGHT_MANAGEMENT',
      name: 'Weight<br>Care',
      image: '/images/cat-weight.jpg',
      iconSvg: `<svg class="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-current shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.75">
        <rect x="4" y="3" width="16" height="18" rx="4" />
        <rect x="8" y="6" width="8" height="5" rx="1.5" />
        <circle cx="12" cy="15" r="1.5" />
      </svg>`
    },
    {
      id: 'DERMATOLOGY',
      name: 'Skin',
      image: '/images/cat-skin.jpg',
      iconSvg: `<svg class="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-current shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.75">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3L20 7.5L12 12L4 7.5L12 3Z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 12L12 16.5L20 12" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 16.5L12 21L20 16.5" />
      </svg>`
    }
  ],
  HIM: [
    {
      id: 'HAIR_LOSS',
      name: 'Hair',
      image: '/images/cat-hair.jpg',
      iconSvg: `<svg class="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-current shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.75">
        <circle cx="6" cy="18" r="2" />
        <circle cx="12" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path stroke-linecap="round" d="M6 16C6 11 8 8 9 4" />
        <path stroke-linecap="round" d="M12 16C12 11 14 8 15 4" />
        <path stroke-linecap="round" d="M18 16C18 11 20 8 21 4" />
      </svg>`
    },
    {
      id: 'SEXUAL_HEALTH_ED',
      name: 'Sex &<br>ED',
      image: '/images/cat-ed.jpg',
      iconSvg: `<svg class="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-current shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.75">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
      </svg>`
    },
    {
      id: 'WEIGHT_MANAGEMENT',
      name: 'Weight<br>Care',
      image: '/images/cat-weight.jpg',
      iconSvg: `<svg class="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-current shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.75">
        <rect x="4" y="3" width="16" height="18" rx="4" />
        <rect x="8" y="6" width="8" height="5" rx="1.5" />
        <circle cx="12" cy="15" r="1.5" />
      </svg>`
    },
    {
      id: 'DERMATOLOGY',
      name: 'Skin',
      image: '/images/cat-skin.jpg',
      iconSvg: `<svg class="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-current shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.75">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3L20 7.5L12 12L4 7.5L12 3Z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 12L12 16.5L20 12" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 16.5L12 21L20 16.5" />
      </svg>`
    }
  ]
};

function selectHeroAudience(audience) {
  heroSelectedAudience = audience;
  currentAudience = audience;

  // Toggle active class on all matching audience buttons
  document.querySelectorAll('.hero-toggle-him').forEach(b => {
    if (audience === 'HIM') {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });

  document.querySelectorAll('.hero-toggle-her').forEach(b => {
    if (audience === 'HER') {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });

  // Render frosted glass category cards with Apple-style animation
  renderHeroCategoryCards(audience);

  // Sync lower section & products
  renderProducts();
}

function renderHeroCategoryCards(audience) {
  const items = CATEGORY_CARDS_DATA[audience] || CATEGORY_CARDS_DATA.HER;
  const grids = document.querySelectorAll('.hero-categories-grid');

  grids.forEach(grid => {
    // Dynamic grid classes: 4 equal square columns for HIM, 3 equal square columns for HER
    if (audience === 'HIM') {
      grid.className = 'hero-categories-grid grid grid-cols-4 gap-2.5 sm:gap-3.5 w-full max-w-md sm:max-w-xl md:max-w-2xl pt-2';
    } else {
      grid.className = 'hero-categories-grid grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-sm sm:max-w-md md:max-w-lg pt-2';
    }

    grid.innerHTML = items.map((item, idx) => `
      <button onclick="handleHeroCategoryClick('${item.id}')" 
              class="hero-cat-card hero-cat-card-animate group/cat aspect-square relative overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl text-left cursor-pointer select-none border border-white/30 shadow-xl"
              style="animation-delay: ${idx * 0.05}s">
        
        <!-- Background Treatment Image with smooth zoom on hover -->
        <img src="${item.image}" alt="${item.id}" class="hero-cat-img absolute inset-0 w-full h-full object-cover object-center group-hover/cat:scale-110 transition-transform duration-500 z-0">
        
        <!-- Rich dark gradient vignette overlay for high-contrast legible text -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 group-hover/cat:via-black/25 transition-colors z-[1]"></div>
        
        <!-- Top: Frosted glass icon capsule + subtle arrow -->
        <div class="relative z-10 flex items-start justify-between w-full">
          <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/25 group-hover/cat:bg-white/20 transition-colors shadow-sm">
            ${item.iconSvg}
          </div>
          <div class="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black/35 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover/cat:bg-white/25 transition-colors shadow-sm">
            <svg class="w-3 h-3 text-white/80 group-hover/cat:text-white group-hover/cat:translate-x-0.5 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        <!-- Bottom: Category Label -->
        <div class="relative z-10 w-full pt-1.5">
          <div class="text-white text-xs sm:text-sm font-bold tracking-tight leading-tight drop-shadow-md">
            ${item.name}
          </div>
        </div>
      </button>
    `).join('');
  });
}

function handleHeroCategoryClick(categoryId) {
  filterCategory(categoryId);
  scrollToCatalog();
}

function initHeroCategories() {
  selectHeroAudience('HER');
}

// ====================================================
// HERO APPLE-STYLE CAROUSEL LOGIC
// ====================================================
let currentHeroSlide = 0;
const totalHeroSlides = 4;
let heroSlideTimer = null;
const HERO_SLIDE_DURATION = 5000; // 5 seconds per slide

function heroGoToSlide(index, autoRestart = true) {
  currentHeroSlide = (index + totalHeroSlides) % totalHeroSlides;
  
  // 1. Update slide visibility
  const slides = document.querySelectorAll('.hero-slide');
  slides.forEach((slide, idx) => {
    if (idx === currentHeroSlide) {
      slide.classList.add('active');
      slide.classList.remove('opacity-0', 'pointer-events-none', 'invisible');
      slide.classList.add('opacity-100', 'pointer-events-auto', 'z-10');
      slide.removeAttribute('aria-hidden');
    } else {
      slide.classList.remove('active');
      slide.classList.add('opacity-0', 'pointer-events-none', 'invisible');
      slide.classList.remove('opacity-100', 'pointer-events-auto', 'z-10');
      slide.setAttribute('aria-hidden', 'true');
    }
  });

  // 2. Update Apple-style expanding pill dots
  const dots = document.querySelectorAll('.apple-dot');
  dots.forEach((dot, idx) => {
    if (idx === currentHeroSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });

  if (autoRestart) {
    resetHeroTimer();
  }
}

function heroNextSlide() {
  heroGoToSlide(currentHeroSlide + 1);
}

function heroPrevSlide() {
  heroGoToSlide(currentHeroSlide - 1);
}

function startHeroTimer() {
  if (heroSlideTimer) clearInterval(heroSlideTimer);
  heroSlideTimer = setInterval(() => {
    heroNextSlide();
  }, HERO_SLIDE_DURATION);
}

function stopHeroTimer() {
  if (heroSlideTimer) {
    clearInterval(heroSlideTimer);
    heroSlideTimer = null;
  }
}

function resetHeroTimer() {
  stopHeroTimer();
  startHeroTimer();
}

function initHeroCarousel() {
  const container = document.getElementById('hero-slideshow');
  if (!container) return;

  // Pause on hover, resume on mouse leave
  container.addEventListener('mouseenter', stopHeroTimer);
  container.addEventListener('mouseleave', startHeroTimer);

  heroGoToSlide(0, false);
  startHeroTimer();
}

// ----------------------------------------------------
// LUXURY MEGA MENUS: Concerns, Treatments, Shop (Design from Image 3, items from Image 2)
// ----------------------------------------------------
let currentActiveMenu = null;

function toggleMegaMenu(menuName, e) {
  if (e) {
    e.stopPropagation();
  }
  if (currentActiveMenu === menuName) {
    closeAllMegaMenus();
  } else {
    openMegaMenu(menuName);
  }
}

function openMegaMenu(menuName) {
  closeAllMegaMenus();
  currentActiveMenu = menuName;
  
  const menu = document.getElementById(`${menuName}-mega-menu`);
  const btn = document.getElementById(`${menuName}-menu-btn`);
  const chevron = document.getElementById(`${menuName}-chevron`);
  
  if (menu) {
    menu.classList.add('active');
  }
  if (btn) {
    btn.classList.add('active');
    btn.setAttribute('aria-expanded', 'true');
  }
  if (chevron) {
    chevron.classList.add('rotate-180');
  }
}

function closeAllMegaMenus() {
  ['treatments', 'shop'].forEach(name => {
    const menu = document.getElementById(`${name}-mega-menu`);
    const btn = document.getElementById(`${name}-menu-btn`);
    const chevron = document.getElementById(`${name}-chevron`);
    
    if (menu) {
      menu.classList.remove('active');
    }
    if (btn) {
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
    }
    if (chevron) {
      chevron.classList.remove('rotate-180');
    }
  });
  currentActiveMenu = null;
}

// Backward compatibility helpers
function toggleTreatmentsMenu(e) {
  toggleMegaMenu('treatments', e);
}
function openTreatmentsMenu() {
  openMegaMenu('treatments');
}
function closeTreatmentsMenu() {
  closeAllMegaMenus();
}

function selectMegaMenuItem(audience, category) {
  closeAllMegaMenus();
  if (audience === 'HIM' || audience === 'HER') {
    switchAudience(audience);
    setCatalogAudience(audience);
    if (typeof selectHeroAudience === 'function') {
      selectHeroAudience(audience);
    }
  } else {
    setCatalogAudience('ALL');
  }

  if (category === 'ALL') {
    filterCatalogCategory('ALL');
  } else if (category) {
    filterCatalogCategory(category);
  }

  const el = document.getElementById('catalog-section');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function scrollToDoctors() {
  closeAllMegaMenus();
  const el = document.getElementById('doctors');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Global outside click listener & Escape key handler
if (typeof document !== 'undefined') {
  document.addEventListener('click', (e) => {
    if (currentActiveMenu) {
      const activeMenuEl = document.getElementById(`${currentActiveMenu}-mega-menu`);
      const activeBtnEl = document.getElementById(`${currentActiveMenu}-menu-btn`);
      if (activeMenuEl && !activeMenuEl.contains(e.target) && activeBtnEl && !activeBtnEl.contains(e.target)) {
        closeAllMegaMenus();
      }
    }
  });

  document.addEventListener('focusin', (e) => {
    if (currentActiveMenu) {
      const activeMenuEl = document.getElementById(`${currentActiveMenu}-mega-menu`);
      const activeBtnEl = document.getElementById(`${currentActiveMenu}-menu-btn`);
      if (activeMenuEl && !activeMenuEl.contains(e.target) && activeBtnEl && !activeBtnEl.contains(e.target)) {
        closeAllMegaMenus();
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentActiveMenu) {
      const prevBtn = document.getElementById(`${currentActiveMenu}-menu-btn`);
      closeAllMegaMenus();
      if (prevBtn) prevBtn.focus();
    }
  });
}

// ----------------------------------------------------
// SMOOTH SCROLL TO CATALOG
// ----------------------------------------------------
function scrollToCatalog() {
  closeAllMegaMenus();
  const el = document.getElementById('catalog-heading') || document.getElementById('catalog-section');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ----------------------------------------------------
// AUDIENCE SWITCHER (FOR HIM / FOR HER)
// ----------------------------------------------------
function switchAudience(audience) {
  currentAudience = audience;
  const btnHim = document.getElementById('toggle-him');
  const btnHer = document.getElementById('toggle-her');
  const sexLink = document.getElementById('nav-sex-link');
  const catBtnSex = document.getElementById('cat-btn-SEXUAL_HEALTH_ED');
  const catalogPillEd = document.getElementById('catalog-pill-ed');

  if (audience === 'HIM') {
    if (btnHim && btnHer) {
      btnHim.className = 'px-4 py-1 text-xs font-bold rounded-full transition-all duration-200 bg-white text-[#191817] shadow-sm';
      btnHer.className = 'px-4 py-1 text-xs font-bold rounded-full transition-all duration-200 text-[#54504C] hover:text-[#191817]';
    }

    intakeState.biologicalSex = 'MALE';
    if (sexLink) sexLink.style.display = 'inline-block';
    if (catBtnSex) catBtnSex.style.display = 'inline-block';
    if (catalogPillEd) catalogPillEd.style.display = 'inline-block';
  } else {
    if (btnHim && btnHer) {
      btnHer.className = 'px-4 py-1 text-xs font-bold rounded-full transition-all duration-200 bg-white text-[#191817] shadow-sm';
      btnHim.className = 'px-4 py-1 text-xs font-bold rounded-full transition-all duration-200 text-[#54504C] hover:text-[#191817]';
    }

    intakeState.biologicalSex = 'FEMALE';
    if (sexLink) sexLink.style.display = 'none';
    if (catBtnSex) catBtnSex.style.display = 'none';
    if (catalogPillEd) catalogPillEd.style.display = 'none';

    if (currentCategoryFilter === 'SEXUAL_HEALTH_ED') {
      currentCategoryFilter = 'ALL';
      const pills = document.querySelectorAll('.catalog-filter-pill');
      pills.forEach(p => {
        if (p.getAttribute('data-category') === 'ALL') {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });
    }
  }

  renderProducts();
  showToast(`Switched view to For ${audience === 'HIM' ? 'Him' : 'Her'}`);
}

// ----------------------------------------------------
// CATEGORY FILTER
// ----------------------------------------------------
function filterCategory(category) {
  currentCategoryFilter = category;
  
  const pills = document.querySelectorAll('.cat-pill');
  pills.forEach(p => p.classList.remove('active'));

  const activePill = document.getElementById(`cat-btn-${category}`);
  if (activePill) activePill.classList.add('active');

  // Synchronize catalog filter pills
  const catalogPills = document.querySelectorAll('.catalog-filter-pill');
  catalogPills.forEach(p => {
    if (p.getAttribute('data-category') === category) {
      p.classList.add('active');
    } else {
      p.classList.remove('active');
    }
  });

  // Synchronize Hero Carousel slide with selected category
  if (category === 'WEIGHT_MANAGEMENT') {
    heroGoToSlide(0);
  } else if (category === 'DERMATOLOGY') {
    heroGoToSlide(1);
  } else if (category === 'SEXUAL_HEALTH_ED') {
    heroGoToSlide(2);
  } else if (category === 'HAIR_LOSS') {
    heroGoToSlide(3);
  }

  renderProducts();
  scrollToCatalog();
}

// catalog filters (state declared above at application state block)

function setCatalogAudience(aud) {
  currentCatalogAudience = aud;
  ['ALL', 'HIM', 'HER'].forEach(a => {
    const btn = document.getElementById(`catalog-aud-${a}`);
    if (btn) {
      if (a === aud) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }
  });
  renderProducts();
}

function filterCatalogCategory(category) {
  currentCategoryFilter = category;
  const pills = document.querySelectorAll('.catalog-filter-pill[data-category]');
  pills.forEach(p => {
    if (p.getAttribute('data-category') === category) {
      p.classList.add('active');
    } else {
      p.classList.remove('active');
    }
  });
  renderProducts();
}

function showAllTreatmentsCatalog() {
  closeAllMegaMenus();
  setCatalogAudience('ALL');
  filterCatalogCategory('ALL');
  const el = document.getElementById('catalog-section');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function filterCatalogBy(audience, category) {
  closeAllMegaMenus();
  if (audience) setCatalogAudience(audience);
  if (category) filterCatalogCategory(category);
  const el = document.getElementById('catalog-section');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ----------------------------------------------------
// FILTER CAROUSEL — homepage only (show/hide existing snap-scroll cards)
// Called by renderProducts() when #product-grid is the flex carousel on the homepage
// ----------------------------------------------------
function filterCarousel() {
  const cards = document.querySelectorAll('#product-grid .product-carousel-card');
  if (!cards.length) return;

  let visibleCount = 0;
  cards.forEach(card => {
    const cardAudience = card.dataset.audience || 'BOTH';
    const cardCategory = card.dataset.category || 'ALL';

    const audienceMatch =
      currentCatalogAudience === 'ALL' ||
      cardAudience === 'BOTH' ||
      cardAudience === currentCatalogAudience;

    const categoryMatch =
      currentCategoryFilter === 'ALL' ||
      cardCategory === currentCategoryFilter;

    if (audienceMatch && categoryMatch) {
      card.style.display = '';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // Update count badge if present
  const countBadge = document.getElementById('catalog-count-badge');
  if (countBadge) {
    countBadge.textContent = `Showing ${visibleCount} treatment${visibleCount === 1 ? '' : 's'}`;
  }
}

function scrollProductCatalog(direction) {
  const container = document.getElementById('product-grid');
  if (!container) return;
  const scrollAmount = Math.max(300, Math.floor(container.clientWidth * 0.75));
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

// ----------------------------------------------------
// RENDER PRODUCT CATALOG (4-COLUMN MINIM GRID AESTHETIC)
// Only runs on /treatments.html and /shop.html — NOT on the homepage.
// The homepage (#product-grid is a flex scroll carousel) uses filterCarousel() instead.
// ----------------------------------------------------
function renderProducts() {
  const container = document.getElementById('product-grid');
  if (!container) return;

  // If this is the homepage carousel (flex scroll track), use filterCarousel instead
  if (container.classList.contains('product-scroll-track') || container.closest('#catalog-section .product-scroll-track')) {
    filterCarousel();
    return;
  }

  // Ensure grid classes are present (only on shop/treatments pages)
  container.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-4 pb-8';

  let filtered = PRODUCTS;

  // Filter by Audience (Hims, Hers, All)
  if (currentCatalogAudience === 'HIM') {
    filtered = filtered.filter(p => p.audience === 'HIM' || p.audience === 'BOTH');
  } else if (currentCatalogAudience === 'HER') {
    filtered = filtered.filter(p => p.audience === 'HER' || p.audience === 'BOTH');
  }

  // Filter by Category
  if (currentCategoryFilter !== 'ALL') {
    filtered = filtered.filter(p => p.category === currentCategoryFilter);
  }

  // Update count indicator
  const countBadge = document.getElementById('catalog-count-badge');
  if (countBadge) {
    countBadge.textContent = `Showing ${filtered.length} treatment${filtered.length === 1 ? '' : 's'}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full w-full text-center py-16 text-[#54504C] bg-[#FAF7F2] rounded-3xl border border-[#DDD5C9] my-4">
        <p class="text-base font-serif font-bold text-[#191817]">No treatments match this filter.</p>
        <p class="text-xs text-[#736E67] mt-1 mb-4">Try clearing filters or selecting "All Treatments" to see all formulations.</p>
        <button onclick="showAllTreatmentsCatalog()" class="px-5 py-2 rounded-full bg-[#0F1B38] text-white text-xs font-semibold hover:bg-[#1E40AF] transition-colors shadow-sm">
          Reset All Filters
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => {
    const badgeBg = p.badgeType === 'sale'
      ? 'bg-[#D84A38] text-white'
      : p.badgeType === 'bestseller'
      ? 'bg-[#5B7E6F] text-white'
      : p.badgeType === 'rx'
      ? 'bg-[#0F1B38] text-white'
      : 'bg-[#191817]/90 text-white';

    const audienceLabel = p.audience === 'HIM' ? 'Hims' : p.audience === 'HER' ? 'Hers' : 'Unisex';
    const concernKey = p.concernKey || p.category;

    return `
      <div class="product-treatment-card group select-none flex flex-col justify-between cursor-pointer" onclick="startIntakeFor('${concernKey}')" data-audience="${p.audience}" data-category="${p.category}">
        
        <!-- Square Image Box (Minim Style) -->
        <div class="treatment-image-box aspect-square bg-[#F5F4F0] rounded-2xl flex items-center justify-center p-6 sm:p-7 relative overflow-hidden border border-[#EBE8E2] transition-all duration-300">
          
          <!-- Top Badge -->
          ${p.badge ? `
            <div class="absolute top-3.5 left-3.5 z-10 pointer-events-none">
              <span class="${badgeBg} text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm inline-block">
                ${p.badge}
              </span>
            </div>
          ` : ''}

          <!-- Centered Product Photo from airoemed.com -->
          <img src="${p.image}" 
               alt="${p.title}" 
               class="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out" 
               loading="lazy" />
        </div>

        <!-- Lower Metadata & Details -->
        <div class="pt-3.5 pb-1 flex flex-col justify-between flex-1">
          <div>
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#78726A]">
                ${p.categoryLabel || p.category.replace('_', ' ')}
              </span>
              <span class="text-[10px] font-semibold text-[#1E40AF] bg-[#1E40AF]/10 px-2 py-0.5 rounded-full">
                ${audienceLabel}
              </span>
            </div>

            <h3 class="text-sm sm:text-base font-bold text-[#191817] mt-1 group-hover:text-[#1E40AF] transition-colors leading-snug line-clamp-1" title="${p.title}">
              ${p.title}
            </h3>

            <p class="text-xs font-mono text-[#8A857F] truncate mt-0.5" title="${p.ingredients}">
              ${p.ingredients}
            </p>

            <!-- Star Ratings -->
            <div class="flex items-center space-x-1.5 mt-2">
              <div class="flex text-amber-500 text-xs">★★★★★</div>
              <span class="text-xs font-bold text-[#191817] tabular-nums">${p.rating || '4.8'}</span>
              <span class="text-[11px] text-[#8A857F]">(${p.reviews || '300'}+)</span>
            </div>
          </div>

          <!-- Price & Action Button -->
          <div class="flex items-center justify-between pt-3 mt-3 border-t border-[#EAE5DD]/80">
            <div>
              <span class="text-base sm:text-lg font-bold text-[#191817] tabular-nums">
                ₹${p.priceInr.toLocaleString('en-IN')}
              </span>
              <span class="text-xs text-[#736E67] font-medium ml-1">($${p.price.toFixed(0)})</span>
              <span class="text-[10px] text-[#8A857F] block">${p.period || '/ month'}</span>
            </div>

            <button onclick="event.stopPropagation(); startIntakeFor('${concernKey}')" 
                    aria-label="Start consult for ${p.title}" 
                    class="px-3.5 py-1.5 rounded-full bg-[#0F1B38] text-white text-xs font-semibold hover:bg-[#1E40AF] transition-colors shadow-sm cursor-pointer flex items-center space-x-1">
              <span>Consult</span>
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    `;
  }).join('');
}

// ----------------------------------------------------
// MULTI-STEP INTAKE FUNNEL (HIMS WORKFLOW)
// ----------------------------------------------------
function startIntakeFlow() {
  closeAllMegaMenus();
  intakeState.step = 1;
  const modal = document.getElementById('intake-modal');
  if (modal) {
    updateModalStepUI();
    modal.classList.remove('hidden');
  } else {
    const cat = intakeState.category || 'HAIR_LOSS';
    window.location.href = `/questionnaire.html?category=${encodeURIComponent(cat)}`;
  }
}

function startIntakeFor(category) {
  intakeState.category = category;
  const modal = document.getElementById('intake-modal');
  if (modal) {
    startIntakeFlow();
    selectIntakeCategory(category);
  } else {
    window.location.href = `/questionnaire.html?category=${encodeURIComponent(category || 'HAIR_LOSS')}`;
  }
}

function closeIntakeModal() {
  const modal = document.getElementById('intake-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function setupStateSelectorListener() {
  const stateSelect = document.getElementById('input-residence-state');
  if (!stateSelect) return;

  stateSelect.addEventListener('change', (e) => {
    const selectedState = e.target.value;
    intakeState.residenceState = selectedState;
    intakeState.currentPhysicalState = selectedState;

    const alertBanner = document.getElementById('state-status-alert');
    const phase1States = ['TX', 'FL', 'GA', 'AZ', 'CO', 'IL', 'OH', 'PA', 'NC', 'WA'];

    if (phase1States.includes(selectedState)) {
      alertBanner.className = 'p-4 rounded-2xl bg-[#EBF3EF] border border-[#2F5645]/20 text-xs text-[#244436] flex items-start space-x-2.5';
      alertBanner.innerHTML = `
        <span class="font-bold text-base leading-none">✓</span>
        <div><strong>Active in your state!</strong> Asynchronous online consultation is approved. A physician licensed in ${selectedState} will review your case.</div>
      `;
    } else {
      alertBanner.className = 'p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start space-x-2.5';
      alertBanner.innerHTML = `
        <span class="font-bold text-base leading-none">⚠️</span>
        <div><strong>Expansion State:</strong> AIRO eMed US is launching in ${selectedState} in Phase 2. You will be placed on our priority waitlist.</div>
      `;
    }
  });
}

function goToStep1() {
  intakeState.step = 1;
  updateModalStepUI();
}

function goToStep2() {
  const age = parseInt(document.getElementById('input-patient-age').value, 10);
  intakeState.patientAge = isNaN(age) ? 29 : age;
  intakeState.step = 2;
  updateModalStepUI();
}

function selectIntakeCategory(cat) {
  intakeState.category = cat;
  const cards = document.querySelectorAll('.category-choice-card');
  cards.forEach(c => c.classList.remove('active'));

  const activeCard = document.getElementById(`cat-card-${cat}`);
  if (activeCard) activeCard.classList.add('active');
}

function goToStep3() {
  intakeState.step = 3;
  renderDynamicMedicalQuestions();
  updateModalStepUI();
}

function renderDynamicMedicalQuestions() {
  const container = document.getElementById('dynamic-medical-questions');
  if (!container) return;

  if (intakeState.category === 'SEXUAL_HEALTH_ED') {
    container.innerHTML = `
      <div class="question-card space-y-3">
        <div class="flex items-start justify-between">
          <div>
            <label class="block text-xs font-bold text-[#191817]">Do you take nitroglycerin, nitrates, or poppers for heart or recreational use?</label>
            <p class="text-[11px] text-[#54504C] mt-0.5">Why we ask: Nitrates combined with PDE5 inhibitors cause life-threatening low blood pressure.</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2 text-xs">
          <label class="question-radio">
            <span>No, I do not take nitrates</span>
            <input type="radio" name="nitrates" value="no" checked onchange="intakeState.answers.takesNitratesOrPoppers = false">
          </label>
          <label class="question-radio">
            <span class="text-red-600 font-semibold">Yes, I take nitrates</span>
            <input type="radio" name="nitrates" value="yes" onchange="intakeState.answers.takesNitratesOrPoppers = true">
          </label>
        </div>
      </div>

      <div class="question-card space-y-3">
        <div>
          <label class="block text-xs font-bold text-[#191817]">Have you had a heart attack, stroke, or unstable angina in the last 6 months?</label>
        </div>
        <div class="grid grid-cols-2 gap-2 text-xs">
          <label class="question-radio">
            <span>No</span>
            <input type="radio" name="heartAttack" value="no" checked onchange="intakeState.answers.recentHeartAttackOrStroke = false">
          </label>
          <label class="question-radio">
            <span class="text-red-600 font-semibold">Yes</span>
            <input type="radio" name="heartAttack" value="yes" onchange="intakeState.answers.recentHeartAttackOrStroke = true">
          </label>
        </div>
      </div>

      <div class="question-card space-y-3">
        <div>
          <label class="block text-xs font-bold text-[#191817]">What was your last blood pressure reading?</label>
          <p class="text-[11px] text-[#54504C] mt-0.5">Approximate reading is acceptable.</p>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <input type="number" placeholder="Systolic (e.g. 120)" value="122" onchange="intakeState.answers.systolicBloodPressure = parseInt(this.value, 10)" class="input-text text-xs tabular-nums">
          <input type="number" placeholder="Diastolic (e.g. 80)" value="78" onchange="intakeState.answers.diastolicBloodPressure = parseInt(this.value, 10)" class="input-text text-xs tabular-nums">
        </div>
      </div>
    `;
  } else if (intakeState.category === 'WEIGHT_MANAGEMENT') {
    container.innerHTML = `
      <div class="question-card space-y-3">
        <div>
          <label class="block text-xs font-bold text-[#191817]">Do you or a family member have a history of Medullary Thyroid Carcinoma (MTC) or MEN2?</label>
          <p class="text-[11px] text-[#54504C] mt-0.5">FDA Black Box Warning requirement for all GLP-1 medications.</p>
        </div>
        <div class="grid grid-cols-2 gap-2 text-xs">
          <label class="question-radio">
            <span>No personal or family history</span>
            <input type="radio" name="mtc" value="no" checked onchange="intakeState.answers.personalOrFamilyMTC = false">
          </label>
          <label class="question-radio">
            <span class="text-red-600 font-semibold">Yes, MTC or MEN2</span>
            <input type="radio" name="mtc" value="yes" onchange="intakeState.answers.personalOrFamilyMTC = true">
          </label>
        </div>
      </div>

      <div class="question-card space-y-3">
        <div>
          <label class="block text-xs font-bold text-[#191817]">Are you currently pregnant, trying to conceive, or breastfeeding?</label>
        </div>
        <div class="grid grid-cols-2 gap-2 text-xs">
          <label class="question-radio">
            <span>No</span>
            <input type="radio" name="pregWeight" value="no" checked onchange="intakeState.answers.pregnantOrBreastfeeding = false">
          </label>
          <label class="question-radio">
            <span class="text-red-600 font-semibold">Yes</span>
            <input type="radio" name="pregWeight" value="yes" onchange="intakeState.answers.pregnantOrBreastfeeding = true">
          </label>
        </div>
      </div>

      <div class="question-card space-y-3">
        <div>
          <label class="block text-xs font-bold text-[#191817]">What is your current Body Mass Index (BMI)?</label>
          <p class="text-[11px] text-[#54504C] mt-0.5">FDA indications require BMI ≥ 30, or BMI ≥ 27 with comorbidity.</p>
        </div>
        <input type="number" step="0.1" value="31.2" onchange="intakeState.answers.calculatedBMI = parseFloat(this.value)" class="input-text text-xs tabular-nums">
      </div>
    `;
  } else if (intakeState.category === 'HAIR_LOSS') {
    container.innerHTML = `
      <div class="question-card space-y-3">
        <div>
          <label class="block text-xs font-bold text-[#191817]">Are you currently pregnant, planning to become pregnant, or breastfeeding?</label>
          <p class="text-[11px] text-[#54504C] mt-0.5">Finasteride is teratogenic to male fetuses and strictly contraindicated in pregnancy.</p>
        </div>
        <div class="grid grid-cols-2 gap-2 text-xs">
          <label class="question-radio">
            <span>No</span>
            <input type="radio" name="pregHair" value="no" checked onchange="intakeState.answers.pregnantOrBreastfeeding = false">
          </label>
          <label class="question-radio">
            <span class="text-red-600 font-semibold">Yes</span>
            <input type="radio" name="pregHair" value="yes" onchange="intakeState.answers.pregnantOrBreastfeeding = true">
          </label>
        </div>
      </div>

      <div class="question-card space-y-3">
        <div>
          <label class="block text-xs font-bold text-[#191817]">Do you have sudden patchy hair loss or painful scalp pustules?</label>
        </div>
        <div class="grid grid-cols-2 gap-2 text-xs">
          <label class="question-radio">
            <span>No, standard gradual thinning</span>
            <input type="radio" name="patchy" value="no" checked onchange="intakeState.answers.suddenPatchyHairLoss = false">
          </label>
          <label class="question-radio">
            <span>Yes, sudden or painful</span>
            <input type="radio" name="patchy" value="yes" onchange="intakeState.answers.suddenPatchyHairLoss = true">
          </label>
        </div>
      </div>
    `;
  } else {
    // Dermatology
    container.innerHTML = `
      <div class="question-card space-y-3">
        <div>
          <label class="block text-xs font-bold text-[#191817]">Are you currently pregnant or nursing?</label>
        </div>
        <div class="grid grid-cols-2 gap-2 text-xs">
          <label class="question-radio">
            <span>No</span>
            <input type="radio" name="pregDerm" value="no" checked onchange="intakeState.answers.pregnantOrBreastfeeding = false">
          </label>
          <label class="question-radio">
            <span class="text-red-600 font-semibold">Yes</span>
            <input type="radio" name="pregDerm" value="yes" onchange="intakeState.answers.pregnantOrBreastfeeding = true">
          </label>
        </div>
      </div>
    `;
  }
}

// ----------------------------------------------------
// LIVE CDSS CLINICAL SAFETY EVALUATION
// ----------------------------------------------------
async function runCDSSCheckAndProceed() {
  const spinner = document.getElementById('cdss-spinner');
  spinner.classList.remove('hidden');

  try {
    const payload = {
      stateOfResidence: intakeState.residenceState,
      currentPhysicalState: intakeState.currentPhysicalState,
      category: intakeState.category,
      patientAge: intakeState.patientAge,
      biologicalSex: intakeState.biologicalSex,
      answers: intakeState.answers
    };

    const res = await fetch('/api/intake/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    spinner.classList.add('hidden');

    intakeState.step = 4;
    updateModalStepUI();

    const hardStopView = document.getElementById('cdss-hardstop-view');
    const approvedView = document.getElementById('cdss-approved-view');

    if (!data.success && data.error === 'CLINICAL_CONTRAINDICATION_HARD_STOP') {
      // Contraindication Triggered!
      hardStopView.classList.remove('hidden');
      approvedView.classList.add('hidden');

      const reasonsContainer = document.getElementById('cdss-rejection-reasons');
      reasonsContainer.innerHTML = data.reasons.map(r => `<div>⚠️ <strong>Safety Flag:</strong> ${r}</div>`).join('');
    } else if (!data.success && data.error === 'ELIGIBILITY_RESTRICTION') {
      hardStopView.classList.remove('hidden');
      approvedView.classList.add('hidden');

      const reasonsContainer = document.getElementById('cdss-rejection-reasons');
      reasonsContainer.innerHTML = data.reasons.map(r => `<div>📍 <strong>State Restriction:</strong> ${r}</div>`).join('');
    } else {
      // Clinical checks passed
      hardStopView.classList.add('hidden');
      approvedView.classList.remove('hidden');

      // Update plan details
      const planNameEl = document.getElementById('plan-match-name');
      const planPriceEl = document.getElementById('plan-match-price');

      if (intakeState.category === 'SEXUAL_HEALTH_ED') {
        planNameEl.innerText = 'Hard Mints (Tadalafil 5mg Daily)';
        planPriceEl.innerText = '$40.00 / mo';
      } else if (intakeState.category === 'WEIGHT_MANAGEMENT') {
        planNameEl.innerText = 'Wegovy® Care & Clinical Membership';
        planPriceEl.innerText = '$79.00 / mo (+ pass-through drug)';
      } else if (intakeState.category === 'DERMATOLOGY') {
        planNameEl.innerText = 'Custom Tretinoin Night Formula';
        planPriceEl.innerText = '$35.00 / mo';
      } else {
        planNameEl.innerText = 'Custom Topical Hair Regrowth Plan';
        planPriceEl.innerText = '$45.00 / mo';
      }
    }
  } catch (err) {
    spinner.classList.add('hidden');
    alert('Communication error with clinical evaluation engine: ' + err.message);
  }
}

// ----------------------------------------------------
// COMPLETE CHECKOUT & ACTIVATE
// ----------------------------------------------------
async function completeSubscriptionCheckout() {
  try {
    const payload = {
      patientId: 'pat_user_guest_101',
      category: intakeState.category,
      state: intakeState.currentPhysicalState
    };

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    closeIntakeModal();
    showToast('Consultation submitted! Doctor reviewing in your state.');

    userSubscription = {
      status: 'PENDING_APPROVAL',
      planName: data.planName || 'AIRO Rx Treatment',
      category: intakeState.category,
      price: data.monthlyPrice || '$45/mo',
      refillDaysLeft: 30,
      assignedClinician: `Dr. Sarah Jenkins, MD (${intakeState.currentPhysicalState} Licensed)`,
      trackingNumber: 'PENDING_CLINICAL_SIGNATURE'
    };

    openPortalModal();
  } catch (err) {
    alert('Checkout failed: ' + err.message);
  }
}

// ----------------------------------------------------
// STEP NAVIGATION UI UPDATES
// ----------------------------------------------------
function updateModalStepUI() {
  const step = intakeState.step;
  const bar = document.getElementById('intake-progress-bar');
  const stepTitle = document.getElementById('intake-step-title');
  const stepPercent = document.getElementById('intake-step-percent');

  const step1 = document.getElementById('step-1-content');
  const step2 = document.getElementById('step-2-content');
  const step3 = document.getElementById('step-3-content');
  const step4 = document.getElementById('step-4-content');

  step1.classList.add('hidden');
  step2.classList.add('hidden');
  step3.classList.add('hidden');
  step4.classList.add('hidden');

  if (step === 1) {
    step1.classList.remove('hidden');
    bar.style.width = '25%';
    stepTitle.innerText = 'Step 1 of 4: Location Check';
    stepPercent.innerText = '25%';
  } else if (step === 2) {
    step2.classList.remove('hidden');
    bar.style.width = '50%';
    stepTitle.innerText = 'Step 2 of 4: Care Area';
    stepPercent.innerText = '50%';
  } else if (step === 3) {
    step3.classList.remove('hidden');
    bar.style.width = '75%';
    stepTitle.innerText = 'Step 3 of 4: Medical Intake';
    stepPercent.innerText = '75%';
  } else if (step === 4) {
    step4.classList.remove('hidden');
    bar.style.width = '100%';
    stepTitle.innerText = 'Step 4 of 4: Doctor Review';
    stepPercent.innerText = '100%';
  }
}

// ----------------------------------------------------
// PATIENT PORTAL
// ----------------------------------------------------
function openPortalModal() {
  closeAllMegaMenus();
  const modal = document.getElementById('portal-modal');
  const statusEl = document.getElementById('portal-sub-status');
  const titleEl = document.getElementById('portal-sub-title');
  const priceEl = document.getElementById('portal-sub-price');

  titleEl.innerText = userSubscription.planName;
  priceEl.innerText = userSubscription.price;

  if (userSubscription.status === 'ACTIVE') {
    statusEl.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider';
    statusEl.innerText = 'Active';
  } else if (userSubscription.status === 'PAUSED') {
    statusEl.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 uppercase tracking-wider';
    statusEl.innerText = 'Paused for 30 Days';
  } else if (userSubscription.status === 'PENDING_APPROVAL') {
    statusEl.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 uppercase tracking-wider';
    statusEl.innerText = 'Pending Doctor Sign-off';
  } else {
    statusEl.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 uppercase tracking-wider';
    statusEl.innerText = 'Cancelled';
  }

  modal.classList.remove('hidden');
}

function closePortalModal() {
  document.getElementById('portal-modal').classList.add('hidden');
}

async function pauseSubscriptionAction() {
  try {
    await fetch('/api/patient/subscription/pause', { method: 'POST' });
    userSubscription.status = 'PAUSED';
    openPortalModal();
    showToast('Subscription paused for 30 days. No recurring charges will occur.');
  } catch {
    userSubscription.status = 'PAUSED';
    openPortalModal();
    showToast('Subscription paused for 30 days.');
  }
}

async function cancelSubscriptionAction() {
  if (!confirm('Are you sure you want to cancel your monthly subscription? You can reactivate anytime.')) {
    return;
  }
  try {
    await fetch('/api/patient/subscription/cancel', { method: 'POST' });
    userSubscription.status = 'CANCELLED';
    openPortalModal();
    showToast('Subscription cancelled in 1 click. Zero further billing.');
  } catch {
    userSubscription.status = 'CANCELLED';
    openPortalModal();
    showToast('Subscription cancelled in 1 click.');
  }
}

// ----------------------------------------------------
// TOAST NOTIFICATION UTILITY
// ----------------------------------------------------
function showToast(message) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-msg');
  if (!toast || !msgEl) return;

  msgEl.innerText = message;
  toast.classList.remove('translate-y-24', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-24', 'opacity-0');
  }, 3500);
}

// ====================================================
// SECTION 2: FRESH INGREDIENTS INTERACTIVE MODAL & DATA
// ====================================================
const FRESH_INGREDIENTS = [
  {
    id: 'azelaic-acid',
    name: 'Azelaic Acid',
    category: 'DERMATOLOGY',
    categoryLabel: 'Skin & Dermatology',
    image: '/images/ing-clean-azelaic-acid.jpg',
    tagline: 'Multi-action dicarboxylic active for clear, radiant skin.',
    clinicalDetail: 'Prescription-grade compound that suppresses acne-causing bacteria, normalizes skin cell keratinization, and selectively inhibits abnormal melanocytes to fade melasma and dark spots without irritation.',
    purity: '99.8% Pure Compounded API',
    formulation: 'Customized 15% – 20% Cream Base'
  },
  {
    id: 'dutasteride',
    name: 'Dutasteride',
    category: 'HAIR_LOSS',
    categoryLabel: 'Advanced Hair Restoration',
    image: '/images/ing-clean-dutasteride.jpg',
    tagline: 'Dual 5α-reductase inhibitor blocking both Type I & II DHT.',
    clinicalDetail: 'Clinically proven to inhibit over 90% of scalp and systemic DHT (dihydrotestosterone). Engineered for stubborn vertex and hairline hair thinning when standard therapies need a powerful boost.',
    purity: '503A USP Grade',
    formulation: 'Custom 0.1% Topical Solution or 0.5mg Oral'
  },
  {
    id: 'finasteride',
    name: 'Finasteride',
    category: 'HAIR_LOSS',
    categoryLabel: 'Hair Loss Prevention & Regrowth',
    image: '/images/ing-clean-finasteride.jpg',
    tagline: 'The gold-standard, FDA-approved DHT inhibitor.',
    clinicalDetail: 'Blocks the 5α-reductase Type II enzyme responsible for follicular miniaturization. Proven in clinical trials to stop male pattern hair loss in 85%+ of patients and promote thicker terminal regrowth.',
    purity: 'USP Analytical Grade',
    formulation: '1mg Daily Oral or 0.3% Spray with Minoxidil'
  },
  {
    id: 'sildenafil',
    name: 'Sildenafil',
    category: 'SEXUAL_HEALTH_ED',
    categoryLabel: 'Sexual Health & ED',
    image: '/images/ing-clean-sildenafil.jpg',
    tagline: 'Fast-acting on-demand PDE5 inhibitor.',
    clinicalDetail: 'Active within 30 to 60 minutes. Selectively inhibits PDE5 to preserve cyclic GMP in penile vascular tissue, enabling firm, dependable erections when sexually stimulated.',
    purity: '100% Active Compounded API',
    formulation: '25mg – 100mg Rapid-Dissolve Chewable'
  },
  {
    id: 'tadalafil',
    name: 'Tadalafil',
    category: 'SEXUAL_HEALTH_ED',
    categoryLabel: 'Sexual Health & ED',
    image: '/images/ing-clean-tadalafil.jpg',
    tagline: 'Extended 36-hour window for spontaneous confidence.',
    clinicalDetail: 'Featuring an extended 17.5-hour half-life, Tadalafil allows once-daily micro-dosing (5mg) or on-demand 20mg Hard Mints™. Removes the pressure of planning around a pill window.',
    purity: 'USP Grade Active Compound',
    formulation: '5mg Daily or 20mg On-Demand Chewable'
  },
  {
    id: 'vitamin-b12',
    name: 'Vitamin B12 (Methylcobalamin)',
    category: 'WEIGHT_MANAGEMENT',
    categoryLabel: 'Metabolic & Energy Co-factor',
    image: '/images/ing-clean-vitamin-b12.jpg',
    tagline: 'Bioavailable active coenzyme for cellular metabolism.',
    clinicalDetail: 'The naturally occurring bioactive methylated coenzyme form of B12. Supports neuro-regeneration, cellular energy production, and healthy red blood cell synthesis alongside GLP-1 weight management.',
    purity: 'Bioactive Coenzyme Form',
    formulation: '1,000mcg – 5,000mcg Sublingual Formulation'
  }
];

function openIngredientModal(ingredientId) {
  closeAllMegaMenus();
  const ing = FRESH_INGREDIENTS.find(i => i.id === ingredientId);
  if (!ing) return;

  const modal = document.getElementById('ingredient-modal');
  const panel = document.getElementById('ingredient-modal-panel');
  if (!modal || !panel) return;

  panel.innerHTML = `
    <!-- Top Visual Banner with Texture -->
    <div class="relative h-44 sm:h-52 overflow-hidden bg-[#1E1915]">
      <img src="${ing.image}" alt="${ing.name}" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-[#191817] via-[#191817]/40 to-transparent"></div>
      
      <button onclick="closeIngredientModal()" class="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer">
        ✕
      </button>

      <div class="absolute bottom-4 left-6 right-6 z-10 text-white">
        <span class="text-[10px] font-bold uppercase tracking-widest text-[#C8623D] block font-sans">${ing.categoryLabel}</span>
        <h3 class="text-2xl sm:text-3xl font-bold font-sans tracking-tight">${ing.name}</h3>
      </div>
    </div>

    <!-- Modal Body -->
    <div class="p-6 sm:p-7 space-y-4 sm:space-y-5 bg-[#FAF7F2]">
      <p class="text-sm font-semibold text-[#191817] leading-snug">
        ${ing.tagline}
      </p>

      <p class="text-xs sm:text-[13px] text-[#54504C] leading-relaxed">
        ${ing.clinicalDetail}
      </p>

      <div class="grid grid-cols-2 gap-3 py-1">
        <div class="bg-white p-3 rounded-xl border border-[#DDD5C9]/80">
          <span class="text-[10px] font-bold uppercase tracking-wider text-[#8A857F] block">Purity Standard</span>
          <span class="text-xs font-bold text-[#1B3328]">${ing.purity}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-[#DDD5C9]/80">
          <span class="text-[10px] font-bold uppercase tracking-wider text-[#8A857F] block">Typical Dosing</span>
          <span class="text-xs font-bold text-[#191817]">${ing.formulation}</span>
        </div>
      </div>

      <div class="pt-2 flex items-center justify-between gap-3 border-t border-[#DDD5C9]/80">
        <button onclick="closeIngredientModal(); filterCategory('${ing.category}'); scrollToCatalog();" class="btn-primary w-full justify-center py-3 text-xs sm:text-sm font-bold shadow-md cursor-pointer">
          Explore Treatments with ${ing.name.split(' ')[0]} →
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');
  panel.classList.remove('scale-95');
  panel.classList.add('scale-100');
}

function closeIngredientModal() {
  const modal = document.getElementById('ingredient-modal');
  const panel = document.getElementById('ingredient-modal-panel');
  if (!modal || !panel) return;

  modal.classList.remove('opacity-100', 'pointer-events-auto');
  modal.classList.add('opacity-0', 'pointer-events-none');
  panel.classList.remove('scale-100');
  panel.classList.add('scale-95');
}

// Close on backdrop click
document.addEventListener('click', (e) => {
  const ingModal = document.getElementById('ingredient-modal');
  if (ingModal && e.target === ingModal) {
    closeIngredientModal();
  }
});

// ==========================================================================
// APPLE-STYLE SCROLL-DRIVEN ANIMATION (SEXUAL WELLNESS)
// ==========================================================================
function initSexualWellnessScroll() {
  const container = document.getElementById('sexual-wellness-scroll-section');
  const video = document.getElementById('ed-scroll-video');
  const step1 = document.getElementById('ed-step-1');
  const step2 = document.getElementById('ed-step-2');
  const step3 = document.getElementById('ed-step-3');
  const dot1 = document.getElementById('ed-dot-1');
  const dot2 = document.getElementById('ed-dot-2');
  const dot3 = document.getElementById('ed-dot-3');

  if (!container || !step1 || !step2 || !step3) return;

  function onScroll() {
    const rect = container.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalDist = rect.height - windowH;

    // Skip if section is far out of view
    if (rect.top > windowH || rect.bottom < 0) return;

    // Calculate progress (0.0 to 1.0)
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / totalDist));

    // Video dynamic 3D scale with scroll
    if (video) {
      const scale = 1 + progress * 0.08;
      video.style.transform = `scale(${scale.toFixed(3)})`;
    }

    // Step 1: Active 0.00 to 0.33
    // Step 2: Active 0.33 to 0.67
    // Step 3: Active 0.67 to 1.00
    if (progress < 0.33) {
      step1.classList.add('active');
      step2.classList.remove('active');
      step3.classList.remove('active');
      setDotActive(1);
    } else if (progress < 0.67) {
      step1.classList.remove('active');
      step2.classList.add('active');
      step3.classList.remove('active');
      setDotActive(2);
    } else {
      step1.classList.remove('active');
      step2.classList.remove('active');
      step3.classList.add('active');
      setDotActive(3);
    }
  }

  function setDotActive(index) {
    if (dot1 && dot2 && dot3) {
      [dot1, dot2, dot3].forEach((d, i) => {
        if (i + 1 === index) {
          d.className = 'ed-progress-dot active w-2 h-6 rounded-full bg-white transition-all duration-300 shadow-md';
        } else {
          d.className = 'ed-progress-dot w-2 h-2 rounded-full bg-white/30 transition-all duration-300';
        }
      });
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function toggleEdVideoAudio() {
  const video = document.getElementById('ed-scroll-video');
  const iconMuted = document.getElementById('ed-sound-icon-muted');
  const iconUnmuted = document.getElementById('ed-sound-icon-unmuted');
  if (!video) return;

  video.muted = !video.muted;
  if (video.muted) {
    if (iconMuted) iconMuted.classList.remove('hidden');
    if (iconUnmuted) iconUnmuted.classList.add('hidden');
    showToast('Video audio muted');
  } else {
    if (iconMuted) iconMuted.classList.add('hidden');
    if (iconUnmuted) iconUnmuted.classList.remove('hidden');
    showToast('Video audio enabled');
  }
}

// ==========================================================================
// APPLE-STYLE SCROLL-DRIVEN ANIMATION (SKINCARE)
// ==========================================================================
function initSkincareScroll() {
  const container = document.getElementById('skincare-scroll-section');
  const bgImg = document.getElementById('skin-scroll-bg');
  const step1 = document.getElementById('skin-step-1');
  const step2 = document.getElementById('skin-step-2');
  const step3 = document.getElementById('skin-step-3');
  const dot1 = document.getElementById('skin-dot-1');
  const dot2 = document.getElementById('skin-dot-2');
  const dot3 = document.getElementById('skin-dot-3');

  if (!container || !step1 || !step2 || !step3) return;

  function onScroll() {
    const rect = container.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalDist = rect.height - windowH;

    if (rect.top > windowH || rect.bottom < 0) return;

    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / totalDist));

    if (bgImg) {
      const scale = 1 + progress * 0.08;
      bgImg.style.transform = `scale(${scale.toFixed(3)})`;
    }

    if (progress < 0.33) {
      step1.classList.add('active');
      step2.classList.remove('active');
      step3.classList.remove('active');
      setDotActive(1);
    } else if (progress < 0.67) {
      step1.classList.remove('active');
      step2.classList.add('active');
      step3.classList.remove('active');
      setDotActive(2);
    } else {
      step1.classList.remove('active');
      step2.classList.remove('active');
      step3.classList.add('active');
      setDotActive(3);
    }
  }

  function setDotActive(index) {
    if (dot1 && dot2 && dot3) {
      [dot1, dot2, dot3].forEach((d, i) => {
        if (i + 1 === index) {
          d.className = 'skin-progress-dot active w-2 h-6 rounded-full bg-white transition-all duration-300 shadow-md';
        } else {
          d.className = 'skin-progress-dot w-2 h-2 rounded-full bg-white/30 transition-all duration-300';
        }
      });
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ====================================================
// APPLICATION BOOTSTRAP (INITIALIZATION)
// ====================================================
function initApp() {
  try {
    renderProducts();
  } catch (e) {
    console.error('Error in renderProducts:', e);
  }

  try {
    setupStateSelectorListener();
  } catch (e) {
    console.error('Error in setupStateSelectorListener:', e);
  }

  try {
    initHeroCarousel();
  } catch (e) {
    console.error('Error in initHeroCarousel:', e);
  }

  try {
    initHeroCategories();
  } catch (e) {
    console.error('Error in initHeroCategories:', e);
  }

  try {
    initSexualWellnessScroll();
  } catch (e) {
    console.error('Error in initSexualWellnessScroll:', e);
  }

  try {
    initSkincareScroll();
  } catch (e) {
    console.error('Error in initSkincareScroll:', e);
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
}
