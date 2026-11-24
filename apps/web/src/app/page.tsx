'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * AIRO eMed US — Next.js 15 Landing Page
 * Exact match to user reference mockups (media_1795139636957_25d4fb54.jpg & media_1795139653205_2aefb919.jpg).
 * Features Apple-style audience toggle, frosted glass category tiles,
 * Apple expanding pill dots, and compact Hims/Hers split cards.
 */
export default function HomePage() {
  const [audience, setAudience] = useState<'HIM' | 'HER'>('HER');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [catalogFilter, setCatalogFilter] = useState('ALL');
  const [catalogAudience, setCatalogAudience] = useState<'ALL' | 'HIM' | 'HER'>('ALL');
  const [catalogCategory, setCatalogCategory] = useState<string>('ALL');
  const [activeMegaMenu, setActiveMegaMenu] = useState<'treatments' | 'shop' | null>(null);
  const [intakeModalOpen, setIntakeModalOpen] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const megaNavRef = React.useRef<HTMLDivElement>(null);

  const scrollCatalog = (direction: number) => {
    if (scrollRef.current) {
      const scrollAmount = Math.max(300, Math.floor(scrollRef.current.clientWidth * 0.75));
      scrollRef.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  };

  const filterCategory = (cat: string) => {
    setActiveMegaMenu(null);
    setCatalogCategory(cat);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToSection = (id: string) => {
    setActiveMegaMenu(null);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const selectMegaMenuItem = (aud: 'HIM' | 'HER' | 'ALL', cat: string) => {
    setActiveMegaMenu(null);
    setCatalogAudience(aud);
    if (aud === 'HIM' || aud === 'HER') {
      setAudience(aud);
    }
    setCatalogCategory(cat);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const showAllTreatmentsCatalog = () => {
    setActiveMegaMenu(null);
    setCatalogAudience('ALL');
    setCatalogCategory('ALL');
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleMegaMenu = (menu: 'treatments' | 'shop') => {
    setActiveMegaMenu((prev) => (prev === menu ? null : menu));
  };

  const closeMegaMenus = () => {
    setActiveMegaMenu(null);
  };

  useEffect(() => {
    if (!activeMegaMenu) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (megaNavRef.current && !megaNavRef.current.contains(e.target as Node)) {
        setActiveMegaMenu(null);
      }
    };
    const handleFocusIn = (e: FocusEvent) => {
      if (megaNavRef.current && !megaNavRef.current.contains(e.target as Node)) {
        setActiveMegaMenu(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const curMenu = activeMegaMenu;
        setActiveMegaMenu(null);
        if (curMenu) {
          document.getElementById(`${curMenu}-menu-btn`)?.focus();
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('focusin', handleFocusIn);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeMegaMenu]);

  const catalogProducts = [
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

  const filteredProducts = catalogProducts.filter((p) => {
    const matchesAudience =
      catalogAudience === 'ALL' || p.audience === catalogAudience || p.audience === 'BOTH';
    const matchesCategory =
      catalogCategory === 'ALL' || p.category === catalogCategory;
    return matchesAudience && matchesCategory;
  });

  const categoryCardsData = {
    HER: [
      {
        id: 'HAIR_LOSS',
        name: 'Hair',
        image: '/images/cat-hair.jpg',
        icon: (
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-current shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.75">
            <circle cx="6" cy="18" r="2" />
            <circle cx="12" cy="18" r="2" />
            <circle cx="18" cy="18" r="2" />
            <path strokeLinecap="round" d="M6 16C6 11 8 8 9 4" />
            <path strokeLinecap="round" d="M12 16C12 11 14 8 15 4" />
            <path strokeLinecap="round" d="M18 16C18 11 20 8 21 4" />
          </svg>
        )
      },
      {
        id: 'WEIGHT_MANAGEMENT',
        name: 'Weight Care',
        image: '/images/cat-weight.jpg',
        icon: (
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-current shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.75">
            <rect x="4" y="3" width="16" height="18" rx="4" />
            <rect x="8" y="6" width="8" height="5" rx="1.5" />
            <circle cx="12" cy="15" r="1.5" />
          </svg>
        )
      },
      {
        id: 'DERMATOLOGY',
        name: 'Skin',
        image: '/images/cat-skin.jpg',
        icon: (
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-current shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L20 7.5L12 12L4 7.5L12 3Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 12L12 16.5L20 12" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16.5L12 21L20 16.5" />
          </svg>
        )
      }
    ],
    HIM: [
      {
        id: 'HAIR_LOSS',
        name: 'Hair',
        image: '/images/cat-hair.jpg',
        icon: (
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-current shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.75">
            <circle cx="6" cy="18" r="2" />
            <circle cx="12" cy="18" r="2" />
            <circle cx="18" cy="18" r="2" />
            <path strokeLinecap="round" d="M6 16C6 11 8 8 9 4" />
            <path strokeLinecap="round" d="M12 16C12 11 14 8 15 4" />
            <path strokeLinecap="round" d="M18 16C18 11 20 8 21 4" />
          </svg>
        )
      },
      {
        id: 'SEXUAL_HEALTH_ED',
        name: 'Sex & ED',
        image: '/images/cat-ed.jpg',
        icon: (
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-current shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
          </svg>
        )
      },
      {
        id: 'WEIGHT_MANAGEMENT',
        name: 'Weight Care',
        image: '/images/cat-weight.jpg',
        icon: (
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-current shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.75">
            <rect x="4" y="3" width="16" height="18" rx="4" />
            <rect x="8" y="6" width="8" height="5" rx="1.5" />
            <circle cx="12" cy="15" r="1.5" />
          </svg>
        )
      },
      {
        id: 'DERMATOLOGY',
        name: 'Skin',
        image: '/images/cat-skin.jpg',
        icon: (
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-current shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L20 7.5L12 12L4 7.5L12 3Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 12L12 16.5L20 12" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16.5L12 21L20 16.5" />
          </svg>
        )
      }
    ]
  };

  const slides = [
    {
      id: 'weight',
      eyebrow: 'METABOLIC SCIENCE — WEIGHT CARE',
      headline: <>Physician-led<br />weight care for<br />real results.</>,
      subhead: 'Access genuine compounded GLP-1s, oral metabolic therapies, and continuous licensed doctor guidance delivered to your door.',
      image: '/images/hero-weight.jpg',
      alt: 'Physician-Led Weight Loss & GLP-1 Care',
      slideClassName: 'hero-slide-weight'
    },
    {
      id: 'dermatology',
      eyebrow: 'DERMATOLOGY & CELLULAR RENEWAL',
      headline: <>Modern care<br />for radiant,<br />confident skin.</>,
      subhead: 'Custom-compounded dermatologist treatments with prescription Tretinoin, Azelaic Acid, and Niacinamide.',
      image: '/images/hero-skin.jpg',
      alt: 'Radiant Skincare & Modern Healthcare',
      slideClassName: 'hero-slide-skin'
    },
    {
      id: 'ed',
      eyebrow: 'DISCREET & TRUSTED — SEXUAL HEALTH',
      headline: <>Hard Mints™.<br />Spontaneous<br />confidence.</>,
      subhead: 'Doctor-prescribed chewable Tadalafil & Sildenafil. Fast-acting, customized dosages, 100% online & discreet.',
      image: '/images/hero-sexual-wellness.jpg',
      alt: 'Hard Mints & Sexual Wellness',
      slideClassName: 'hero-slide-sex'
    },
    {
      id: 'hair',
      eyebrow: 'CLINICAL TRICHOLOGY & HAIR DENSITY',
      headline: <>Regrow thicker,<br />fuller hair with<br />doctor care.</>,
      subhead: 'Custom topical Finasteride + Minoxidil spray & once-daily oral therapies. 85% saw visible regrowth.',
      image: '/images/hero-hair.jpg',
      alt: 'Hair Restoration & Regrowth',
      slideClassName: 'hero-slide-hair'
    }
  ];

  // Auto-advance slides every 5 seconds with interaction reset
  const slideTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const resetSlideTimer = React.useCallback(() => {
    if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    slideTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide((index + slides.length) % slides.length);
    resetSlideTimer();
  };

  useEffect(() => {
    resetSlideTimer();
    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, [resetSlideTimer]);

  // Apple-style scroll-driven chapter activation for Sexual Wellness & Dermatology in Next.js
  useEffect(() => {
    const handleScrollSections = () => {
      const windowH = window.innerHeight;

      // 1. Sexual Wellness
      const edContainer = document.getElementById('sexual-wellness-scroll-section');
      const edVideo = document.getElementById('ed-scroll-video');
      const edStep1 = document.getElementById('ed-step-1');
      const edStep2 = document.getElementById('ed-step-2');
      const edStep3 = document.getElementById('ed-step-3');
      const edDots = [document.getElementById('ed-dot-1'), document.getElementById('ed-dot-2'), document.getElementById('ed-dot-3')];

      if (edContainer && edStep1 && edStep2 && edStep3) {
        const rect = edContainer.getBoundingClientRect();
        if (rect.top <= windowH && rect.bottom >= 0) {
          const totalDist = rect.height - windowH;
          const scrolled = -rect.top;
          const progress = Math.max(0, Math.min(1, scrolled / totalDist));
          if (edVideo) edVideo.style.transform = `scale(${(1 + progress * 0.08).toFixed(3)})`;

          const activeIdx = progress < 0.33 ? 1 : progress < 0.67 ? 2 : 3;
          edStep1.classList.toggle('active', activeIdx === 1);
          edStep2.classList.toggle('active', activeIdx === 2);
          edStep3.classList.toggle('active', activeIdx === 3);

          edDots.forEach((dot, i) => {
            if (!dot) return;
            dot.className = (i + 1 === activeIdx)
              ? 'ed-progress-dot active w-2 h-6 rounded-full bg-white transition-all duration-300 shadow-md'
              : 'ed-progress-dot w-2 h-2 rounded-full bg-white/30 transition-all duration-300';
          });
        }
      }

      // 2. Skincare & Dermatology
      const skinContainer = document.getElementById('skincare-scroll-section');
      const skinBg = document.getElementById('skin-scroll-bg');
      const skinStep1 = document.getElementById('skin-step-1');
      const skinStep2 = document.getElementById('skin-step-2');
      const skinStep3 = document.getElementById('skin-step-3');
      const skinDots = [document.getElementById('skin-dot-1'), document.getElementById('skin-dot-2'), document.getElementById('skin-dot-3')];

      if (skinContainer && skinStep1 && skinStep2 && skinStep3) {
        const rect = skinContainer.getBoundingClientRect();
        if (rect.top <= windowH && rect.bottom >= 0) {
          const totalDist = rect.height - windowH;
          const scrolled = -rect.top;
          const progress = Math.max(0, Math.min(1, scrolled / totalDist));
          if (skinBg) skinBg.style.transform = `scale(${(1 + progress * 0.08).toFixed(3)})`;

          const activeIdx = progress < 0.33 ? 1 : progress < 0.67 ? 2 : 3;
          skinStep1.classList.toggle('active', activeIdx === 1);
          skinStep2.classList.toggle('active', activeIdx === 2);
          skinStep3.classList.toggle('active', activeIdx === 3);

          skinDots.forEach((dot, i) => {
            if (!dot) return;
            dot.className = (i + 1 === activeIdx)
              ? 'skin-progress-dot active w-2 h-6 rounded-full bg-white transition-all duration-300 shadow-md'
              : 'skin-progress-dot w-2 h-2 rounded-full bg-white/30 transition-all duration-300';
          });
        }
      }
    };

    window.addEventListener('scroll', handleScrollSections, { passive: true });
    handleScrollSections();
    return () => window.removeEventListener('scroll', handleScrollSections);
  }, []);

  return (
    <div className="bg-[#FAF7F2] text-[#191817] font-sans min-h-screen antialiased">
      {/* Top Header */}
      <header ref={megaNavRef} className="site-header py-5 px-4 sm:px-6 lg:px-8 w-full max-w-full flex items-center justify-between sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md box-border relative">
        <a href="/" className="brand-logo flex items-baseline space-x-1.5 group select-none">
          <span className="brand-airo font-extrabold text-2xl sm:text-3xl tracking-tight text-[#191817]">AIRO</span>
          <span className="brand-emed text-xl sm:text-2xl font-normal text-[#191817]/85 tracking-tight">eMed</span>
        </a>

        {/* Center Nav Capsule - Concerns, Treatments, Shop (All 3 with luxury dropdowns) */}
        <nav className="nav-capsule flex items-center bg-[#EBE5DC] border border-[#DDD5C9]/70 px-2 py-1.5 rounded-full space-x-1 sm:space-x-1.5 text-xs font-semibold text-[#191817] shadow-sm relative">
          {/* Concerns Link - Direct to Separate Concerns Page */}
          <Link
            href="/concerns"
            id="concerns-nav-link"
            className="nav-pill-btn flex items-center space-x-1.5 px-4 py-1.5 rounded-full font-semibold text-[#191817]/85 hover:bg-white hover:shadow-sm transition-all duration-200 cursor-pointer"
          >
            <span>Concerns</span>
          </Link>

          {/* Treatments Trigger */}
          <button
            type="button"
            id="treatments-menu-btn"
            onClick={() => toggleMegaMenu('treatments')}
            aria-expanded={activeMegaMenu === 'treatments'}
            aria-haspopup="dialog"
            aria-controls="treatments-mega-menu"
            className={`nav-pill-btn flex items-center space-x-1.5 px-4 py-1.5 rounded-full font-semibold transition-all duration-200 cursor-pointer ${activeMegaMenu === 'treatments' ? 'active bg-white text-[#191817] shadow-md border border-[#DDD5C9]' : 'text-[#191817]/85 hover:bg-[#FAF7F2]/60'
              }`}
          >
            <span>Treatments</span>
            <svg className={`nav-chevron w-3.5 h-3.5 text-[#191817]/70 transition-transform duration-200 ${activeMegaMenu === 'treatments' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </button>

          {/* Shop Trigger */}
          <button
            type="button"
            id="shop-menu-btn"
            onClick={() => toggleMegaMenu('shop')}
            aria-expanded={activeMegaMenu === 'shop'}
            aria-haspopup="dialog"
            aria-controls="shop-mega-menu"
            className={`nav-pill-btn flex items-center space-x-1.5 px-4 py-1.5 rounded-full font-semibold transition-all duration-200 cursor-pointer ${activeMegaMenu === 'shop' ? 'active bg-white text-[#191817] shadow-md border border-[#DDD5C9]' : 'text-[#191817]/85 hover:bg-[#FAF7F2]/60'
              }`}
          >
            <span>Shop</span>
            <svg className={`nav-chevron w-3.5 h-3.5 text-[#191817]/70 transition-transform duration-200 ${activeMegaMenu === 'shop' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </button>
        </nav>

        {/* TREATMENTS MEGA MENU (Exact match to User Reference Image) */}
        <div id="treatments-mega-menu" className={`mega-menu-panel ${activeMegaMenu === 'treatments' ? 'active' : ''}`} role="region" aria-label="Treatments Menu">
          <div className="mega-menu-card bg-white rounded-3xl p-7 sm:p-8 lg:p-10 shadow-2xl border border-[#EAE5DD]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

              {/* COLUMN 1: Hims */}
              <div className="lg:col-span-4 flex flex-col justify-start">
                <h3 className="dropdown-col-title">Hims</h3>
                <div className="space-y-4">
                  <button type="button" onClick={() => selectMegaMenuItem('HIM', 'HAIR_LOSS')} className="dropdown-menu-item group">
                    <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Hair</div>
                    <p className="dropdown-item-desc">Thinning · regrowth · postpartum</p>
                  </button>

                  <button type="button" onClick={() => selectMegaMenuItem('HIM', 'SEXUAL_HEALTH_ED')} className="dropdown-menu-item group">
                    <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Sexual Health</div>
                    <p className="dropdown-item-desc">Performance · wellness</p>
                  </button>

                  <button type="button" onClick={() => selectMegaMenuItem('HIM', 'DERMATOLOGY')} className="dropdown-menu-item group">
                    <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Skin</div>
                    <p className="dropdown-item-desc">Skin</p>
                  </button>

                  <button type="button" onClick={() => selectMegaMenuItem('HIM', 'WEIGHT_MANAGEMENT')} className="dropdown-menu-item group">
                    <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Weight Management</div>
                    <p className="dropdown-item-desc">GLP-1 & metabolic care</p>
                  </button>
                </div>
              </div>

              {/* COLUMN 2: Hers */}
              <div className="lg:col-span-4 flex flex-col justify-start">
                <h3 className="dropdown-col-title">Hers</h3>
                <div className="space-y-4">
                  <button type="button" onClick={() => selectMegaMenuItem('HER', 'HAIR_LOSS')} className="dropdown-menu-item group">
                    <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Hair</div>
                    <p className="dropdown-item-desc">Thinning · regrowth · postpartum</p>
                  </button>

                  <button type="button" onClick={() => selectMegaMenuItem('HER', 'DERMATOLOGY')} className="dropdown-menu-item group">
                    <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Skin</div>
                    <p className="dropdown-item-desc">Skin</p>
                  </button>

                  <button type="button" onClick={() => selectMegaMenuItem('HER', 'WEIGHT_MANAGEMENT')} className="dropdown-menu-item group">
                    <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Weight Management</div>
                    <p className="dropdown-item-desc">GLP-1 & metabolic care</p>
                  </button>
                </div>
              </div>

              {/* COLUMN 3: Photo Card (Couple Image from Reference) */}
              <div className="lg:col-span-4 flex items-center">
                <Link href="/concerns" onClick={() => closeMegaMenus()} className="block w-full h-[280px] sm:h-[320px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm bg-neutral-100 group select-none cursor-pointer">
                  <img src="/images/mega-menu-treatments-couple.jpg" alt="AIRO eMed Treatments" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 rounded-2xl sm:rounded-3xl" />
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* 3. SHOP MEGA MENU (Exact match to User Reference Image) */}
        <div id="shop-mega-menu" className={`mega-menu-panel shop-dropdown-panel ${activeMegaMenu === 'shop' ? 'active' : ''}`} role="region" aria-label="Shop Menu">
          <div className="mega-menu-card bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#EAE5DD]">
            <div className="space-y-4">
              <button type="button" onClick={() => selectMegaMenuItem('ALL', 'HAIR_LOSS')} className="dropdown-menu-item group">
                <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Hair</div>
                <p className="dropdown-item-desc">Thinning · regrowth · postpartum</p>
              </button>

              <button type="button" onClick={() => selectMegaMenuItem('HIM', 'SEXUAL_HEALTH_ED')} className="dropdown-menu-item group">
                <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Sexual Health</div>
                <p className="dropdown-item-desc">Performance · wellness</p>
              </button>

              <button type="button" onClick={() => selectMegaMenuItem('ALL', 'DERMATOLOGY')} className="dropdown-menu-item group">
                <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Skin</div>
                <p className="dropdown-item-desc">Skin</p>
              </button>

              <button type="button" onClick={() => selectMegaMenuItem('ALL', 'WEIGHT_MANAGEMENT')} className="dropdown-menu-item group">
                <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Weight Management</div>
                <p className="dropdown-item-desc">GLP-1 & metabolic care</p>
              </button>
            </div>

            {/* Browse All Treatments Link with Underline */}
            <div className="pt-6 mt-2 border-t border-[#F0ECE4]">
              <a href="#catalog-section" onClick={() => selectMegaMenuItem('ALL', 'ALL')} className="dropdown-browse-link">
                <span>Browse All Treatments</span>
                <span className="font-bold">→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="nav-actions flex items-center space-x-5 text-[#191817]">
          <a href="#catalog-section" onClick={() => filterCategory('ALL')} className="nav-icon-btn hover:text-[#1B3328] transition-colors p-1" title="Search Treatments">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </a>
          <a href="#catalog-section" className="nav-icon-btn hover:text-[#1B3328] transition-colors p-1" title="My Account">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </a>
          <a href="#catalog-section" className="nav-icon-btn hover:text-[#1B3328] transition-colors p-1" title="Start Consultation">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </a>
        </div>
      </header>

      {/* Main Hero Container */}
      <section className="hero-container w-full px-4 sm:px-6 lg:px-8 pb-12 pt-2">
        {/* Apple-Style Slideshow Card */}
        <div className="hero-slideshow relative rounded-[2.25rem] sm:rounded-[2.75rem] overflow-hidden min-h-[620px] sm:min-h-[680px] lg:min-h-[740px] bg-[#1E1915] shadow-2xl group select-none">
          {slides.map((s, idx) => (
            <div
              key={s.id}
              aria-hidden={idx !== currentSlide}
              className={`hero-slide ${s.slideClassName} absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center ${idx === currentSlide ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none invisible'
                }`}
            >
              <div className="hero-bg absolute inset-0 z-0">
                <img
                  src={s.image}
                  alt={s.alt}
                  className="w-full h-full object-cover"
                />
                <div className="hero-slide-overlay absolute inset-0" />
              </div>

              <div className="hero-content relative z-10 p-8 sm:p-12 lg:p-16 w-full sm:w-3/5 lg:w-1/2 space-y-4 sm:space-y-5">
                <div className="hero-eyebrow flex items-center space-x-3 text-white/90 text-[11px] font-bold tracking-[0.2em] uppercase">
                  <span>{s.eyebrow}</span>
                  <span className="hero-eyebrow-dash w-7 h-[1.5px] bg-white/70 inline-block"></span>
                </div>

                {idx === 0 ? (
                  <h1 className="hero-headline text-4xl sm:text-5xl lg:text-[4rem] font-bold text-white tracking-tight leading-[1.08] font-sans">
                    {s.headline}
                  </h1>
                ) : (
                  <h2 className="hero-headline text-4xl sm:text-5xl lg:text-[4rem] font-bold text-white tracking-tight leading-[1.08] font-sans">
                    {s.headline}
                  </h2>
                )}

                <p className="hero-subhead text-white/85 text-sm sm:text-base font-normal leading-relaxed">
                  {s.subhead}
                </p>

                {/* Audience Toggle (for him / for her) */}
                <div className="hero-toggle-wrap pt-1 sm:pt-2">
                  <div className="hero-toggle-capsule inline-flex items-center p-1 rounded-full bg-[#EEE7DD] border border-[#DDD5C9] shadow-sm select-none">
                    <button
                      onClick={() => setAudience('HIM')}
                      className={`hero-toggle-btn px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${audience === 'HIM'
                        ? 'active bg-white text-[#1E6BFF] border-2 border-[#1E6BFF] shadow-sm font-bold'
                        : 'text-[#191817]/80'
                        }`}
                    >
                      for him
                    </button>
                    <button
                      onClick={() => setAudience('HER')}
                      className={`hero-toggle-btn px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${audience === 'HER'
                        ? 'active bg-white text-[#1E6BFF] border-2 border-[#1E6BFF] shadow-sm font-bold'
                        : 'text-[#191817]/80'
                        }`}
                    >
                      for her
                    </button>
                  </div>
                </div>

                {/* Frosted Glass Categories Panel (Second Page / State) */}
                <div className="hero-categories-panel transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <div className={`hero-categories-grid grid ${audience === 'HIM' ? 'grid-cols-4 max-w-md sm:max-w-xl md:max-w-2xl gap-2.5 sm:gap-3.5' : 'grid-cols-3 max-w-sm sm:max-w-md md:max-w-lg gap-3 sm:gap-4'} w-full pt-2`}>
                    {categoryCardsData[audience].map((cat, catIdx) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => filterCategory(cat.id)}
                        className="hero-cat-card hero-cat-card-animate group/cat aspect-square relative overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl text-left cursor-pointer border border-white/30 shadow-xl select-none"
                        style={{ animationDelay: `${catIdx * 0.05}s` }}
                      >
                        {/* Background Image with smooth hover zoom */}
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="hero-cat-img absolute inset-0 w-full h-full object-cover object-center group-hover/cat:scale-110 transition-transform duration-500 z-0"
                        />
                        {/* Dark Vignette Overlay for high-contrast legible text */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 group-hover/cat:via-black/25 transition-colors z-[1]" />

                        <div className="relative z-10 flex items-start justify-between w-full">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/25 group-hover/cat:bg-white/20 transition-colors shadow-sm">
                            {cat.icon}
                          </div>
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black/35 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover/cat:bg-white/25 transition-colors shadow-sm">
                            <svg className="w-3 h-3 text-white/80 group-hover/cat:text-white group-hover/cat:translate-x-0.5 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                        <div className="relative z-10 w-full pt-1.5">
                          <div className="text-white text-xs sm:text-sm font-bold tracking-tight leading-tight drop-shadow-md">
                            {cat.name}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Apple-Style Expanding Pill Dots */}
          <div className="apple-dots-capsule absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2.5 bg-black/35 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => goToSlide(idx)}
                className={`apple-dot ${idx === currentSlide ? 'active' : ''}`}
                title={s.eyebrow}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Previous / Next Arrows */}
          <button
            onClick={() => goToSlide(currentSlide - 1)}
            aria-label="Previous Slide"
            className="apple-nav-btn absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/65 text-white/95 hover:text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={() => goToSlide(currentSlide + 1)}
            aria-label="Next Slide"
            className="apple-nav-btn absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/65 text-white/95 hover:text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </section>

      {/* SECTION 2: FRESH INGREDIENTS (Compounded Pharmacy Showcase) */}
      <section className="py-20 sm:py-24 lg:py-28 bg-[#FAF7F2] border-b border-[#DDD5C9] relative">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-2 sm:space-y-3">
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.24em] text-[#C8623D] block font-sans">
              FRESH INGREDIENTS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#191817] tracking-tight leading-[1.18] font-sans">
              Freshly Compounded, Potent,<br className="hidden sm:inline" /> Customized For You
            </h2>
          </div>

          {/* 6 Ingredient Cards Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-4.5">
            {[
              { id: 'azelaic-acid', name: 'Azelaic Acid', image: '/images/ing-clean-azelaic-acid.jpg' },
              { id: 'dutasteride', name: 'Dutasteride', image: '/images/ing-clean-dutasteride.jpg' },
              { id: 'finasteride', name: 'Finasteride', image: '/images/ing-clean-finasteride.jpg' },
              { id: 'sildenafil', name: 'Sildenafil', image: '/images/ing-clean-sildenafil.jpg' },
              { id: 'tadalafil', name: 'Tadalafil', image: '/images/ing-clean-tadalafil.jpg' },
              { id: 'vitamin-b12', name: 'Vitamin B12', subname: '(Methylcobalamin)', image: '/images/ing-clean-vitamin-b12.jpg' }
            ].map((ing) => (
              <div
                key={ing.id}
                className="ing-card group cursor-pointer aspect-square rounded-2xl overflow-hidden relative shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5 hover:border-black/15 bg-[#EBE7DF]"
              >
                <img
                  src={ing.image}
                  alt={ing.name}
                  className="ing-img absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 z-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-[1] transition-opacity group-hover:from-black/90" />

                <div className="absolute bottom-0 inset-x-0 p-3 sm:p-3.5 z-10 flex items-end justify-between gap-1.5">
                  <div className="flex flex-col text-left">
                    <span className="text-xs sm:text-[13px] font-bold text-white leading-tight drop-shadow-sm">
                      {ing.name}
                    </span>
                    {ing.subname && (
                      <span className="text-[10px] text-white/80 font-normal leading-none pt-0.5">
                        {ing.subname}
                      </span>
                    )}
                  </div>
                  <span className="ing-plus-btn w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 group-hover:bg-white/35 backdrop-blur-sm flex items-center justify-center text-white text-xs sm:text-sm font-semibold transition-all shrink-0">
                    <svg className="w-3 h-3 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* SECTION 3: SEED-STYLE HAIR CARE SPLIT (MEN'S & WOMEN'S) */}
      <section id="hair-care-split-section" className="py-20 sm:py-24 lg:py-28 bg-[#FAF7F2] border-b border-[#DDD5C9] relative">
        <div className="w-full px-3 sm:px-4 lg:px-6">
          {/* Split 2-Card Flagship Grid (One Side Men's Hair Care, One Side Women's) */}
          {/* Tighter gap (gap-3 sm:gap-4) & bigger squares with full images & bottom-up frosted glass */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-4.5">

            {/* Left Flagship Card: Men's Hair Care (Full Image Card) */}
            <div className="seed-split-card group cursor-pointer">
              {/* Full-Bleed Background Image */}
              <img
                src="/images/mens-hair-seed.jpg"
                alt="Men's Hair Regrowth [MH-01]"
                className="seed-card-bg-img object-[center_15%]"
              />

              {/* Top Gradient Vignette */}
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 via-black/25 to-transparent pointer-events-none z-[2]" />

              {/* Top Row Floating Badges */}
              <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-6 flex items-center justify-between z-10">
                <span className="bg-[#C6E688] text-[#1B3518] text-[11px] sm:text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                  Bestseller
                </span>
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-white/95 shadow-sm font-sans">
                  FOR HIM
                </span>
              </div>

              {/* Seamless Blended Frosted Glass Backdrop (Feathers into photo with zero hard stops) */}
              <div className="seed-frosted-backdrop seed-frosted-backdrop-men" />

              {/* Bottom Content on Frosted Glass */}
              <div className="seed-frosted-content">
                <div className="space-y-2 sm:space-y-2.5">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="border border-white/60 rounded-full px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold text-white tracking-wider">
                      MH-01
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans tracking-tight drop-shadow-sm">
                      Men’s Hair Regrowth
                    </h3>
                  </div>
                  <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed max-w-xl font-normal drop-shadow-sm">
                    Clinically proven topical Finasteride + Minoxidil spray & oral tablets. Blocks DHT at the scalp to stop loss and regrow thicker vertex & hairline density.*
                  </p>
                  <div className="flex items-center space-x-4 pt-1 sm:pt-2">
                    <button className="bg-white hover:bg-white/90 text-[#191817] font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-lg transition-all cursor-pointer select-none">
                      Shop Now
                    </button>
                    <span className="inline-flex items-center space-x-1.5 text-xs text-white/95 font-medium drop-shadow-sm">
                      <svg className="w-3.5 h-3.5 text-white/95" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      <span>Free Clinician Consult</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Flagship Card: Women's Hair Care (Full Image Card) */}
            <div className="seed-split-card group cursor-pointer">
              {/* Full-Bleed Background Image */}
              <img
                src="/images/womens-hair-seed.jpg"
                alt="Women’s Hair Density [WH-02]"
                className="seed-card-bg-img object-[center_20%]"
              />

              {/* Top Gradient Vignette */}
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 via-black/25 to-transparent pointer-events-none z-[2]" />

              {/* Top Row Floating Badges */}
              <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-6 flex items-center justify-between z-10">
                <span className="bg-[#F6D5C7] text-[#44231A] text-[11px] sm:text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                  Doctor-Formulated
                </span>
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-white/95 shadow-sm font-sans">
                  FOR HER
                </span>
              </div>

              {/* Seamless Blended Frosted Glass Backdrop (Feathers into photo with zero hard stops) */}
              <div className="seed-frosted-backdrop seed-frosted-backdrop-women" />

              {/* Bottom Content on Frosted Glass */}
              <div className="seed-frosted-content">
                <div className="space-y-2 sm:space-y-2.5">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="border border-white/60 rounded-full px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold text-white tracking-wider">
                      WH-02
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans tracking-tight drop-shadow-sm">
                      Women’s Hair Density
                    </h3>
                  </div>
                  <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed max-w-xl font-normal drop-shadow-sm">
                    Doctor-prescribed oral Minoxidil + Biotin blend & hormone-safe topical solutions proven to widen part lines and restore natural volume.*
                  </p>
                  <div className="flex items-center space-x-4 pt-1 sm:pt-2">
                    <button className="bg-white hover:bg-white/90 text-[#191817] font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-lg transition-all cursor-pointer select-none">
                      Shop Now
                    </button>
                    <span className="inline-flex items-center space-x-1.5 text-xs text-white/95 font-medium drop-shadow-sm">
                      <svg className="w-3.5 h-3.5 text-white/95" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      <span>Free Clinician Consult</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: APPLE-STYLE SCROLL ANIMATION (SEXUAL WELLNESS) */}
      <section id="sexual-wellness-scroll-section" className="apple-scroll-container relative bg-[#0C0A09] text-white">
        {/* Sticky Full-Screen Viewport Stage (100vh pinned) */}
        <div id="ed-scroll-stage" className="apple-scroll-stage sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          {/* Video Background Layer with Cinematic Vignette */}
          <div className="apple-video-wrap absolute inset-0 w-full h-full overflow-hidden z-0">
            <video
              id="ed-scroll-video"
              className="apple-scroll-video w-full h-full object-cover object-center transition-transform duration-300 ease-out"
              autoPlay
              muted
              loop
              playsInline
              poster="/images/sexual-wellness-poster.jpg"
            >
              <source src="/videos/sexual-wellness.mp4" type="video/mp4" />
              <source src="/videos/sexual-wellness.mov" type="video/quicktime" />
            </video>

            {/* Apple Cinema Vignettes & Dark Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09] via-black/45 to-[#0C0A09]/80 z-[1] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(12,10,9,0.75)_100%)] z-[1] pointer-events-none" />
          </div>

          {/* Top Floating Eyebrow Capsule */}
          <div className="absolute top-6 sm:top-8 inset-x-0 flex justify-center z-20 pointer-events-none">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#E07A5F] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-white/90 font-sans">
                CLINICAL SEXUAL WELLNESS
              </span>
            </div>
          </div>

          {/* Bottom Audio Toggle & Scroll Hints */}
          <div className="absolute bottom-6 sm:bottom-8 inset-x-6 sm:inset-x-10 flex items-center justify-between z-20 pointer-events-auto">
            <div className="flex items-center space-x-2 text-[11px] font-medium text-white/60 tracking-wider uppercase select-none">
              <span className="animate-bounce inline-block">↓</span>
              <span>Scroll to explore</span>
            </div>

            <button
              id="ed-video-sound-toggle"
              className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center transition-all shadow-lg active:scale-95 cursor-pointer"
              title="Toggle Sound"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
            </button>
          </div>

          {/* Centered Scroll-Animated Text Sequences */}
          <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center select-none pointer-events-none">
            {/* STEP 1: Main Introduction Hook */}
            <div id="ed-step-1" className="ed-scroll-step active">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-[#E07A5F] block mb-3">
                Peak Performance
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-white tracking-tight leading-[1.08] drop-shadow-2xl">
                Confidence in every moment.
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-xl mx-auto mt-4 sm:mt-5 font-normal leading-relaxed drop-shadow-md">
                Doctor-prescribed treatments designed for reliability, spontaneity, and your peace of mind.
              </p>
            </div>

            {/* STEP 2: Clinical Efficacy & Hard Mints Feature */}
            <div id="ed-step-2" className="ed-scroll-step">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-[#C6E688] block mb-3">
                Fast-Acting Formulation
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-white tracking-tight leading-[1.08] drop-shadow-2xl">
                Harder. Faster. Lasting.
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/85 max-w-2xl mx-auto mt-4 sm:mt-5 font-normal leading-relaxed drop-shadow-md">
                Custom-compounded chewable Hard Mints with Sildenafil & Tadalafil. Dissolves under the tongue to work in as little as 15 minutes.*
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mt-6 sm:mt-8">
                <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-white/90 shadow-md">
                  ⚡️ Starts Working in 15 Mins
                </span>
                <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-white/90 shadow-md">
                  🍬 Breath-Freshening Chewable
                </span>
                <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-white/90 shadow-md">
                  🩺 100% Online Physician Review
                </span>
              </div>
            </div>

            {/* STEP 3: The Action Button & Conversion Stage */}
            <div id="ed-step-3" className="ed-scroll-step">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-[#F4A261] block mb-3">
                Your Prescription Ready
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-white tracking-tight leading-[1.08] drop-shadow-2xl">
                Reclaim your vitality.
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/85 max-w-xl mx-auto mt-4 sm:mt-5 font-normal leading-relaxed drop-shadow-md">
                No waiting rooms. No pharmacy lines. Free discreet delivery in an unmarked box right to your door.
              </p>

              {/* Apple Brand Solid Blue CTA Button */}
              <div className="pt-7 sm:pt-9 flex flex-col items-center justify-center gap-3">
                <button
                  onClick={() => { setAudience('HIM'); filterCategory('SEXUAL_HEALTH_ED'); }}
                  className="apple-glowing-btn group/btn relative inline-flex items-center space-x-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-[#0F1B38] hover:bg-[#1E40AF] text-white font-bold text-sm sm:text-base shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border border-white/20 hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0A09]"
                >
                  <span>Explore Sexual Wellness Treatments</span>
                  <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1.5 font-bold">→</span>
                </button>
                <span className="text-xs text-white/70 font-medium tracking-wide">
                  Prescription products require an online consultation with a licensed clinician.
                </span>
              </div>
            </div>
          </div>

          {/* Right Apple Chapter Stepper Indicators */}
          <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-3 z-20 pointer-events-none">
            <div id="ed-dot-1" className="ed-progress-dot active w-2 h-6 rounded-full bg-white transition-all duration-300 shadow-md" />
            <div id="ed-dot-2" className="ed-progress-dot w-2 h-2 rounded-full bg-white/30 transition-all duration-300" />
            <div id="ed-dot-3" className="ed-progress-dot w-2 h-2 rounded-full bg-white/30 transition-all duration-300" />
          </div>
        </div>
      </section>

      {/* SECTION 5: WEIGHT MANAGEMENT EDITORIAL BENTO GRID */}
      <section id="weight-management-bento-section" className="py-20 sm:py-24 lg:py-28 bg-[#FAF7F2] border-b border-[#DDD5C9] relative">
        <div className="w-full px-3 sm:px-4 lg:px-6">
          {/* Bento Grid (Left: Big Typography Card + 2 Hims & Hers Blocks | Right: Tall Editorial Photo) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-4.5">
            {/* LEFT COLUMN: Top Editorial Text Card + Bottom 2 Hims & Hers Blocks */}
            <div className="lg:col-span-6 flex flex-col gap-3 sm:gap-4 lg:gap-4.5">
              {/* Top Editorial Typography Card */}
              <div className="weight-editorial-card p-7 sm:p-9 lg:p-11 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center space-x-3 sm:space-x-4 mb-2 sm:mb-3">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#191817] tracking-tight uppercase font-sans leading-none">
                      FOR
                    </span>
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#191817] leading-none">
                      ————→
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#191817] tracking-tight uppercase font-sans leading-[1.05]">
                    EVERY BODY BUT<br />NOT JUST ANYONE
                  </h3>
                </div>

                <div className="pt-8 sm:pt-12">
                  <p className="text-xs sm:text-[13px] text-[#4E4A44] leading-relaxed max-w-md font-normal font-sans">
                    We establish personal relationships with board-certified US clinicians to deliver clinically proven, personalized GLP-1 weight care tailored for your metabolic biology.
                  </p>
                </div>
              </div>

              {/* Bottom 2 Blocks (For Him & For Her) */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-4.5">
                {/* Block 1: FOR HIM */}
                <div
                  onClick={() => setAudience('HIM')}
                  className="weight-sub-card group cursor-pointer"
                >
                  <img
                    src="/images/weight-him-card.jpg"
                    alt="Weight Management For Him"
                    className="weight-sub-card-img object-[center_15%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-[1] transition-opacity group-hover:from-black/90" />

                  <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 z-10 flex flex-col justify-end text-left items-start space-y-1.5">
                    <button className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-white text-[#191817] text-xs font-bold tracking-wider uppercase shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all select-none">
                      <span>FOR HIM</span>
                      <svg className="w-3 h-3 text-[#191817] group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <span className="text-[10.5px] sm:text-xs text-white/90 font-medium drop-shadow-md pl-1">
                      Compounded Semaglutide
                    </span>
                  </div>
                </div>

                {/* Block 2: FOR HER */}
                <div
                  onClick={() => setAudience('HER')}
                  className="weight-sub-card group cursor-pointer"
                >
                  <img
                    src="/images/weight-her-card.jpg"
                    alt="Weight Management For Her"
                    className="weight-sub-card-img object-[center_15%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-[1] transition-opacity group-hover:from-black/90" />

                  <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 z-10 flex flex-col justify-end text-left items-start space-y-1.5">
                    <button className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-white text-[#191817] text-xs font-bold tracking-wider uppercase shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all select-none">
                      <span>FOR HER</span>
                      <svg className="w-3 h-3 text-[#191817] group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <span className="text-[10.5px] sm:text-xs text-white/90 font-medium drop-shadow-md pl-1">
                      Metabolic Injections
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Tall Hero Weight Management Photo Card */}
            <div className="lg:col-span-6">
              <div className="weight-hero-card group cursor-pointer">
                <img
                  src="/images/weight-main-editorial.jpg"
                  alt="Clinical Weight Management GLP-1 Injections"
                  className="weight-hero-card-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: APPLE-STYLE SCROLL ANIMATION (SKINCARE) */}
      <section id="skincare-scroll-section" className="apple-scroll-container relative bg-[#0C0A09] text-white">
        {/* Sticky Full-Screen Viewport Stage (100vh pinned) */}
        <div id="skin-scroll-stage" className="apple-scroll-stage sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          {/* Photo Background Layer with Smooth 3D Scale on Scroll */}
          <div className="apple-video-wrap absolute inset-0 w-full h-full overflow-hidden z-0">
            <img
              id="skin-scroll-bg"
              src="/images/skincare-scroll-bg.jpg"
              alt="Radiant Skin Care"
              className="w-full h-full object-cover object-center transition-transform duration-300 ease-out select-none"
            />

            {/* Apple Cinema Dark Vignette & Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09] via-black/45 to-[#0C0A09]/80 z-[1] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(12,10,9,0.75)_100%)] z-[1] pointer-events-none" />
          </div>

          {/* Top Floating Eyebrow Capsule */}
          <div className="absolute top-6 sm:top-8 inset-x-0 flex justify-center z-20 pointer-events-none">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#52B788] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-white/90 font-sans">
                CLINICAL DERMATOLOGY & SKINCARE
              </span>
            </div>
          </div>

          {/* Bottom Scroll Cue */}
          <div className="absolute bottom-6 sm:bottom-8 inset-x-6 sm:inset-x-10 flex items-center justify-between z-20 pointer-events-auto">
            <div className="flex items-center space-x-2 text-[11px] font-medium text-white/60 tracking-wider uppercase select-none">
              <span className="animate-bounce inline-block">↓</span>
              <span>Scroll to explore</span>
            </div>
            <div className="text-[11px] font-bold text-white/70 uppercase tracking-widest hidden sm:block">
              Prescription Dermatology
            </div>
          </div>

          {/* Centered Scroll-Animated Text Sequences */}
          <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center select-none pointer-events-none">
            {/* STEP 1: Main Introduction Hook */}
            <div id="skin-step-1" className="skin-scroll-step active">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-[#52B788] block mb-3">
                Pure Cellular Renewal
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-white tracking-tight leading-[1.08] drop-shadow-2xl">
                Flawless skin starts from within.
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/85 max-w-xl mx-auto mt-4 sm:mt-5 font-normal leading-relaxed drop-shadow-md">
                Custom-compounded dermatologist treatments with prescription Tretinoin, Azelaic Acid, and Niacinamide.
              </p>
            </div>

            {/* STEP 2: Targeted Formulations */}
            <div id="skin-step-2" className="skin-scroll-step">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-[#C6E688] block mb-3">
                Barrier-First Science
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-white tracking-tight leading-[1.08] drop-shadow-2xl">
                Clarity. Radiance. Rejuvenation.
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/85 max-w-2xl mx-auto mt-4 sm:mt-5 font-normal leading-relaxed drop-shadow-md">
                Clinically formulated to eliminate stubborn acne, smooth fine lines, and fade hyperpigmentation while protecting and nourishing your natural skin barrier.*
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mt-6 sm:mt-8">
                <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-white/90 shadow-md">
                  ✨ Medical-Grade Tretinoin
                </span>
                <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-white/90 shadow-md">
                  🌿 Calming Azelaic Acid
                </span>
                <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-white/90 shadow-md">
                  💧 Deep Barrier Hydration
                </span>
              </div>
            </div>

            {/* STEP 3: The Action Button & Conversion Stage */}
            <div id="skin-step-3" className="skin-scroll-step">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-[#E07A5F] block mb-3">
                Your Custom Formulation
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-white tracking-tight leading-[1.08] drop-shadow-2xl">
                Reveal your most radiant skin.
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/85 max-w-xl mx-auto mt-4 sm:mt-5 font-normal leading-relaxed drop-shadow-md">
                Online photo consultation with a licensed dermatologist. Tailored to your exact skin type and delivered fresh to your door.
              </p>

              {/* Apple Brand Solid Blue CTA Button */}
              <div className="pt-7 sm:pt-9 flex flex-col items-center justify-center gap-3">
                <button
                  onClick={() => filterCategory('DERMATOLOGY')}
                  className="apple-glowing-btn group/btn relative inline-flex items-center space-x-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-[#0F1B38] hover:bg-[#1E40AF] text-white font-bold text-sm sm:text-base shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border border-white/20 hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0A09]"
                >
                  <span>Explore Dermatology & Skincare</span>
                  <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1.5 font-bold">→</span>
                </button>
                <span className="text-xs text-white/70 font-medium tracking-wide">
                  Prescription skincare requires a quick online medical consultation with a licensed dermatologist.
                </span>
              </div>
            </div>
          </div>

          {/* Right Apple Chapter Stepper Indicators */}
          <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-3 z-20 pointer-events-none">
            <div id="skin-dot-1" className="skin-progress-dot active w-2 h-6 rounded-full bg-white transition-all duration-300 shadow-md" />
            <div id="skin-dot-2" className="skin-progress-dot w-2 h-2 rounded-full bg-white/30 transition-all duration-300" />
            <div id="skin-dot-3" className="skin-progress-dot w-2 h-2 rounded-full bg-white/30 transition-all duration-300" />
          </div>
        </div>
      </section>

      {/* SECTION 7: ALL TREATMENTS CATALOG (4-COLUMN MINIM GRID) */}
      <section id="catalog-section" className="py-20 sm:py-24 lg:py-28 bg-white border-b border-[#DDD5C9]">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16">

          {/* Section Header with Serif Title, Subtitle and Audience Segmented Switcher */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 sm:mb-8 gap-6">
            <div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#C8623D]">
                Doctor-Formulated Compounds
              </span>
              <h2 id="catalog-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#191817] mt-1.5 tracking-tight">
                All Treatments
              </h2>
              <p className="text-xs sm:text-sm text-[#736E67] mt-1.5 max-w-2xl">
                Clinically tested active ingredients prescribed online by US-licensed physicians. Free shipping in discreet unmarked packaging with auto-refills included.
              </p>
            </div>

            {/* Audience Switcher: Hims / Hers / All Segmented Pill Toggle */}
            <div className="inline-flex p-1 bg-[#F2EFE9] border border-[#DDD5C9] rounded-full self-start md:self-end shadow-sm">
              <button
                type="button"
                onClick={() => setCatalogAudience('ALL')}
                className={`catalog-aud-btn ${catalogAudience === 'ALL' ? 'active' : ''}`}
              >
                All Treatments
              </button>
              <button
                type="button"
                onClick={() => setCatalogAudience('HIM')}
                className={`catalog-aud-btn ${catalogAudience === 'HIM' ? 'active' : ''}`}
              >
                Hims
              </button>
              <button
                type="button"
                onClick={() => setCatalogAudience('HER')}
                className={`catalog-aud-btn ${catalogAudience === 'HER' ? 'active' : ''}`}
              >
                Hers
              </button>
            </div>
          </div>

          {/* Filter Bar: Category Pills + Live Counter */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pt-4 border-t border-[#EAE5DD]/70">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button
                type="button"
                onClick={() => setCatalogCategory('ALL')}
                className={`catalog-filter-pill ${catalogCategory === 'ALL' ? 'active' : ''}`}
              >
                All Categories
              </button>
              <button
                type="button"
                onClick={() => setCatalogCategory('HAIR_LOSS')}
                className={`catalog-filter-pill ${catalogCategory === 'HAIR_LOSS' ? 'active' : ''}`}
              >
                Hair Care
              </button>
              <button
                type="button"
                onClick={() => setCatalogCategory('SEXUAL_HEALTH_ED')}
                className={`catalog-filter-pill ${catalogCategory === 'SEXUAL_HEALTH_ED' ? 'active' : ''}`}
              >
                Sexual Health
              </button>
              <button
                type="button"
                onClick={() => setCatalogCategory('DERMATOLOGY')}
                className={`catalog-filter-pill ${catalogCategory === 'DERMATOLOGY' ? 'active' : ''}`}
              >
                Skin Care
              </button>
              <button
                type="button"
                onClick={() => setCatalogCategory('WEIGHT_MANAGEMENT')}
                className={`catalog-filter-pill ${catalogCategory === 'WEIGHT_MANAGEMENT' ? 'active' : ''}`}
              >
                Weight Management
              </button>
              <button
                type="button"
                onClick={() => setCatalogCategory('SUPPLEMENTS')}
                className={`catalog-filter-pill ${catalogCategory === 'SUPPLEMENTS' ? 'active' : ''}`}
              >
                Daily Supplements
              </button>
            </div>

            {/* Treatments Count */}
            <div className="text-xs font-semibold text-[#78726A] whitespace-nowrap">
              Showing {filteredProducts.length} treatment{filteredProducts.length === 1 ? '' : 's'}
            </div>
          </div>

          {/* 4-Column Product Grid (Minim Aesthetic from User Reference Image) */}
          <div id="product-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-2 pb-8">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full w-full text-center py-16 text-[#54504C] bg-[#FAF7F2] rounded-3xl border border-[#DDD5C9] my-4">
                <p className="text-base font-serif font-bold text-[#191817]">No treatments match this filter.</p>
                <p className="text-xs text-[#736E67] mt-1 mb-4">Try clearing filters or selecting &ldquo;All Treatments&rdquo; to see all formulations.</p>
                <button
                  type="button"
                  onClick={showAllTreatmentsCatalog}
                  className="px-5 py-2 rounded-full bg-[#0F1B38] text-white text-xs font-semibold hover:bg-[#1E40AF] transition-colors shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredProducts.map((p) => {
                const badgeBg =
                  p.badgeType === 'sale'
                    ? 'bg-[#D84A38] text-white'
                    : p.badgeType === 'bestseller'
                    ? 'bg-[#5B7E6F] text-white'
                    : p.badgeType === 'rx'
                    ? 'bg-[#0F1B38] text-white'
                    : 'bg-[#191817]/90 text-white';

                const audienceLabel = p.audience === 'HIM' ? 'Hims' : p.audience === 'HER' ? 'Hers' : 'Unisex';

                return (
                  <div
                    key={p.id}
                    onClick={() => setIntakeModalOpen(true)}
                    className="product-treatment-card group select-none flex flex-col justify-between cursor-pointer"
                  >
                    {/* Square Image Box (Minim Style) */}
                    <div className="treatment-image-box aspect-square bg-[#F5F4F0] rounded-2xl flex items-center justify-center p-6 sm:p-7 relative overflow-hidden border border-[#EBE8E2] transition-all duration-300">
                      {p.badge && (
                        <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                          <span className={`${badgeBg} text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm inline-block`}>
                            {p.badge}
                          </span>
                        </div>
                      )}

                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                    </div>

                    {/* Lower Metadata & Details */}
                    <div className="pt-3.5 pb-1 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#78726A]">
                            {p.categoryLabel}
                          </span>
                          <span className="text-[10px] font-semibold text-[#1E40AF] bg-[#1E40AF]/10 px-2 py-0.5 rounded-full">
                            {audienceLabel}
                          </span>
                        </div>

                        <h3 className="text-sm sm:text-base font-bold text-[#191817] mt-1 group-hover:text-[#1E40AF] transition-colors leading-snug line-clamp-1" title={p.title}>
                          {p.title}
                        </h3>

                        <p className="text-xs font-mono text-[#8A857F] truncate mt-0.5" title={p.ingredients}>
                          {p.ingredients}
                        </p>

                        {/* Star Ratings */}
                        <div className="flex items-center space-x-1.5 mt-2">
                          <div className="flex text-amber-500 text-xs">★★★★★</div>
                          <span className="text-xs font-bold text-[#191817] tabular-nums">{p.rating || '4.8'}</span>
                          <span className="text-[11px] text-[#8A857F]">({p.reviews || '300'}+)</span>
                        </div>
                      </div>

                      {/* Price & Action Button */}
                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#EAE5DD]/80">
                        <div>
                          <span className="text-base sm:text-lg font-bold text-[#191817] tabular-nums">
                            ₹{p.priceInr.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-[#736E67] font-medium ml-1">(${p.price.toFixed(0)})</span>
                          <span className="text-[10px] text-[#8A857F] block">{p.period || '/ month'}</span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIntakeModalOpen(true);
                          }}
                          aria-label={`Start consult for ${p.title}`}
                          className="px-3.5 py-1.5 rounded-full bg-[#0F1B38] text-white text-xs font-semibold hover:bg-[#1E40AF] transition-colors shadow-sm cursor-pointer flex items-center space-x-1"
                        >
                          <span>Consult</span>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      </section>


      {/* SECTION 8: WHY WE'RE DIFFERENT — THE AIRO ADVANTAGE */}
      <section id="airo-advantage-section" className="advantage-section py-20 sm:py-24 lg:py-28 bg-[#FAF7F2] border-b border-[#DDD5C9] relative">
        {/* Subtle Background Ambient Accents */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#1B3328]/[0.03] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#C8623D]/[0.03] rounded-full blur-3xl pointer-events-none" />

        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
          {/* Section Header with Exact Skincare Heading Typography */}
          <div className="text-center w-full max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-14 space-y-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-[#C8623D] font-sans block">
              Why We&apos;re Different
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-[#191817] tracking-tight leading-[1.08]">
              The Airo Advantage
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#6E6962] font-normal leading-relaxed max-w-xl mx-auto font-sans">
              Expert-formulated treatments. Licensed doctors. Delivered to your door.
            </p>
          </div>

          {/* Main Layout: Proportional Grid with 100% Free Natural Page Scrolling */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* ==================================================== */}
            {/* LEFT COLUMN: 2 Stacked Feature Cards                 */}
            {/* ==================================================== */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              {/* Card 1: 3x More Effective */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#DDD5C9] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group flex-1 flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/[0.04] rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#EBF3EF] text-[#244436] text-[10px] font-bold uppercase tracking-wider border border-[#2F5645]/15 font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#244436]" />
                      <span>Compounded Actives</span>
                    </span>
                  </div>

                  {/* Big Typography: 3x More Effective (font-sans bold) */}
                  <div className="flex items-baseline space-x-2.5 mb-3.5">
                    <span className="text-4xl sm:text-5xl font-sans font-bold text-[#191817] tracking-tight leading-none">
                      3x
                    </span>
                    <span className="text-xl sm:text-2xl font-sans font-bold text-[#191817] leading-none">
                      More Effective
                    </span>
                  </div>

                  {/* Clean Concise Checklist */}
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#4A4742] font-sans">
                    <li className="flex items-center space-x-3">
                      <span className="w-5 h-5 rounded-full bg-[#EBF3EF] text-[#244436] flex-shrink-0 flex items-center justify-center font-bold text-xs shadow-sm">✓</span>
                      <span className="text-[#191817] font-semibold">Clinically-formulated active compounds</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-5 h-5 rounded-full bg-[#EBF3EF] text-[#244436] flex-shrink-0 flex items-center justify-center font-bold text-xs shadow-sm">✓</span>
                      <span className="text-[#191817] font-semibold">Personalised to your profile</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-5 h-5 rounded-full bg-[#EBF3EF] text-[#244436] flex-shrink-0 flex items-center justify-center font-bold text-xs shadow-sm">✓</span>
                      <span className="text-[#191817] font-semibold">1M+ successful transformations delivered</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card 2: Free Telehealth Visit */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#DDD5C9] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group flex-1 flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8623D]/[0.04] rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FDF4EB] text-[#C8623D] text-[10px] font-bold uppercase tracking-wider border border-[#C8623D]/20 font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8623D]" />
                      <span>/bin/zsh Out-of-Pocket</span>
                    </span>
                  </div>

                  {/* Big Typography: Free Telehealth Visit (font-sans bold) */}
                  <h3 className="text-2xl sm:text-3xl font-sans font-bold text-[#191817] tracking-tight mb-3.5 leading-tight">
                    Free Telehealth Visit
                  </h3>

                  {/* Clean Concise Checklist */}
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#4A4742] font-sans">
                    <li className="flex items-center space-x-3">
                      <span className="w-5 h-5 rounded-full bg-[#FDF4EB] text-[#C8623D] flex-shrink-0 flex items-center justify-center font-bold text-xs shadow-sm">✓</span>
                      <span className="text-[#191817] font-semibold">Online doctor consult — no clinic needed</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-5 h-5 rounded-full bg-[#FDF4EB] text-[#C8623D] flex-shrink-0 flex items-center justify-center font-bold text-xs shadow-sm">✓</span>
                      <span className="text-[#191817] font-semibold">Expert diagnosis & custom prescription</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-5 h-5 rounded-full bg-[#FDF4EB] text-[#C8623D] flex-shrink-0 flex items-center justify-center font-bold text-xs shadow-sm">✓</span>
                      <span className="text-[#191817] font-semibold">60-day follow-up support included</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ==================================================== */}
            {/* RIGHT COLUMN: 10x More Affordable + Comparison Matrix */}
            {/* ==================================================== */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#1B3328]/15 shadow-xl relative overflow-hidden flex-1 flex flex-col justify-between">
                {/* Top Section Header: 10x More Affordable */}
                <div className="mb-5 sm:mb-6">
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider border border-emerald-200 font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      <span>Transparent Value</span>
                    </span>
                    <span className="text-[11px] font-semibold text-[#8A857F] tracking-wide uppercase font-sans">
                      Direct-to-Patient Model
                    </span>
                  </div>

                  <div className="flex items-baseline space-x-2.5">
                    <span className="text-4xl sm:text-5xl font-sans font-bold text-[#191817] tracking-tight leading-none">
                      10x
                    </span>
                    <span className="text-xl sm:text-2xl font-sans font-bold text-[#191817] leading-none">
                      More Affordable
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6E6962] mt-1.5 max-w-lg leading-relaxed font-sans">
                    Save significantly compared to traditional consultations — without sacrificing quality.
                  </p>
                </div>

                {/* Comparison Table Container */}
                <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-[#DDD5C9] bg-[#FAF8F5] shadow-sm mb-4">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 text-[11px] sm:text-xs font-bold uppercase tracking-wider items-center border-b border-[#DDD5C9] font-sans">
                    <div className="col-span-5 px-3.5 sm:px-5 py-3 text-[#736E67] bg-[#F4EFEB]">
                      Feature
                    </div>
                    <div className="col-span-4 px-3 sm:px-4 py-3 text-center text-white bg-[#1B3328] flex items-center justify-center space-x-1.5 shadow-sm">
                      <span>Airo eMed</span>
                      <span className="text-[9px] bg-white/20 text-white px-1.5 py-0.5 rounded font-mono font-normal">US</span>
                    </div>
                    <div className="col-span-3 px-3 sm:px-4 py-3 text-center text-[#736E67] bg-[#EDE8E0]">
                      Traditional
                    </div>
                  </div>

                  {/* Row 1: Doctor Consult */}
                  <div className="grid grid-cols-12 text-xs sm:text-sm items-center border-b border-[#DDD5C9]/70 bg-white hover:bg-[#F9F7F3] transition-colors font-sans">
                    <div className="col-span-5 px-3.5 sm:px-5 py-2.5 sm:py-3 font-semibold text-[#191817]">
                      Doctor consult
                    </div>
                    <div className="col-span-4 px-2 sm:px-3 py-2.5 sm:py-3 text-center bg-[#EBF3EF]/40">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[11px] sm:text-xs font-bold">
                        Free
                      </span>
                    </div>
                    <div className="col-span-3 px-2 sm:px-3 py-2.5 sm:py-3 text-center text-[#7A756E] font-medium text-xs sm:text-sm">
                      –
                    </div>
                  </div>

                  {/* Row 2: Prescription */}
                  <div className="grid grid-cols-12 text-xs sm:text-sm items-center border-b border-[#DDD5C9]/70 bg-[#FAF8F5] hover:bg-[#F9F7F3] transition-colors font-sans">
                    <div className="col-span-5 px-3.5 sm:px-5 py-2.5 sm:py-3 font-semibold text-[#191817]">
                      Prescription
                    </div>
                    <div className="col-span-4 px-2 sm:px-3 py-2.5 sm:py-3 text-center bg-[#EBF3EF]/40">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[11px] sm:text-xs font-bold">
                        Included
                      </span>
                    </div>
                    <div className="col-span-3 px-2 sm:px-3 py-2.5 sm:py-3 text-center text-red-700 font-medium text-xs sm:text-sm">
                      Extra cost
                    </div>
                  </div>

                  {/* Row 3: Home Delivery */}
                  <div className="grid grid-cols-12 text-xs sm:text-sm items-center border-b border-[#DDD5C9]/70 bg-white hover:bg-[#F9F7F3] transition-colors font-sans">
                    <div className="col-span-5 px-3.5 sm:px-5 py-2.5 sm:py-3 font-semibold text-[#191817]">
                      Home delivery
                    </div>
                    <div className="col-span-4 px-2 sm:px-3 py-2.5 sm:py-3 text-center bg-[#EBF3EF]/40">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white inline-flex items-center justify-center text-xs font-bold mx-auto shadow-sm">
                        ✓
                      </span>
                    </div>
                    <div className="col-span-3 px-2 sm:px-3 py-2.5 sm:py-3 text-center">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 inline-flex items-center justify-center text-xs font-bold mx-auto">
                        ✕
                      </span>
                    </div>
                  </div>

                  {/* Row 4: Follow-up */}
                  <div className="grid grid-cols-12 text-xs sm:text-sm items-center border-b border-[#DDD5C9]/70 bg-[#FAF8F5] hover:bg-[#F9F7F3] transition-colors font-sans">
                    <div className="col-span-5 px-3.5 sm:px-5 py-2.5 sm:py-3 font-semibold text-[#191817]">
                      Follow-up
                    </div>
                    <div className="col-span-4 px-2 sm:px-3 py-2.5 sm:py-3 text-center bg-[#EBF3EF]/40 font-bold text-emerald-900 text-xs sm:text-sm">
                      Ongoing
                    </div>
                    <div className="col-span-3 px-2 sm:px-3 py-2.5 sm:py-3 text-center text-[#7A756E] font-medium text-xs sm:text-sm">
                      By appt.
                    </div>
                  </div>

                  {/* Row 5: Discreet pack. */}
                  <div className="grid grid-cols-12 text-xs sm:text-sm items-center bg-white hover:bg-[#F9F7F3] transition-colors font-sans">
                    <div className="col-span-5 px-3.5 sm:px-5 py-2.5 sm:py-3 font-semibold text-[#191817]">
                      Discreet pack.
                    </div>
                    <div className="col-span-4 px-2 sm:px-3 py-2.5 sm:py-3 text-center bg-[#EBF3EF]/40">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white inline-flex items-center justify-center text-xs font-bold mx-auto shadow-sm">
                        ✓
                      </span>
                    </div>
                    <div className="col-span-3 px-2 sm:px-3 py-2.5 sm:py-3 text-center">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 inline-flex items-center justify-center text-xs font-bold mx-auto">
                        ✕
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Highlights Strip & Action */}
                <div className="pt-3.5 border-t border-[#E5E0D8] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center space-x-2 text-xs text-[#54504C] font-sans">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Zero hidden clinic fees • Self-serve 1-click pause or cancel</span>
                  </div>
                  <button className="w-full sm:w-auto btn-primary py-2 px-5 text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all">
                    Start Free Visit →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: HOW AIRO WORKS (OXINIX REFERENCE REDESIGN) */}
      <section id="how-it-works" className="py-20 sm:py-24 lg:py-28 bg-white border-b border-[#DDD5C9] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          {/* Section Header matching Oxinix Style */}
          <div className="text-center w-full max-w-3xl mx-auto mb-14 sm:mb-16 lg:mb-20 space-y-3">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold text-[#191817] tracking-tight">
              How <span className="text-[#1E40AF]">Airo</span> works?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#6E6962] font-normal leading-relaxed max-w-xl mx-auto font-sans">
              Simple, clinically-guided healthcare — from 3-minute intake to discreet doorstep delivery.
            </p>
          </div>

          {/* 4-Card Grid matching Oxinix Reference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7 items-stretch">
            {/* CARD 1: Select your concerns */}
            <Link href="/concerns" className="how-airo-card group block text-left hover:shadow-lg transition-all duration-300">
              <div className="how-visual-stage">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl shadow-[0_10px_25px_-4px_rgba(0,0,0,0.06)] border border-[#E8E3DA] flex items-center justify-center p-3 transform -rotate-3 group-hover:-rotate-6 transition-transform duration-300">
                  <svg className="w-8 h-8 text-[#8A857F] group-hover:text-[#1E40AF] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="4" strokeWidth="1.8" />
                    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                    <path d="M21 15l-5-5L5 21" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl shadow-[0_10px_25px_-4px_rgba(0,0,0,0.06)] border border-[#E8E3DA] flex flex-col justify-center px-4 space-y-2 transform rotate-3 group-hover:rotate-6 transition-transform duration-300 ml-3">
                  <div className="h-2 w-full bg-[#1E40AF] rounded-full" />
                  <div className="h-2 w-4/5 bg-[#DDD5C9] rounded-full" />
                  <div className="h-2 w-3/5 bg-[#DDD5C9] rounded-full" />
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-sans font-bold text-[#191817] leading-snug mb-2 group-hover:text-[#1E40AF] transition-colors">
                  Select your concerns &rarr;
                </h3>
                <p className="text-xs sm:text-sm text-[#6E6962] font-normal leading-relaxed font-sans">
                  Tell us what you want to treat — pick all that apply in a quick 3-minute online questionnaire.
                </p>
              </div>
            </Link>

            {/* CARD 2: Get matched treatments */}
            <div className="how-airo-card group">
              <div className="how-visual-stage">
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-28 h-28 rounded-full bg-gradient-to-tr from-[#1E40AF]/25 via-[#2563EB]/15 to-transparent blur-2xl pointer-events-none" />
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 drop-shadow-sm" viewBox="0 0 100 100" fill="none">
                    <defs>
                      <linearGradient id="airoSparkleGradReact" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0F265C" />
                        <stop offset="50%" stopColor="#1E40AF" />
                        <stop offset="100%" stopColor="#2563EB" />
                      </linearGradient>
                    </defs>
                    <path d="M50 0 C50 30, 70 50, 100 50 C70 50, 50 70, 50 100 C50 70, 30 50, 0 50 C30 50, 50 30, 50 0 Z" fill="url(#airoSparkleGradReact)" />
                  </svg>
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 absolute -bottom-1 -right-3 transform group-hover:scale-125 transition-transform duration-500 delay-75" viewBox="0 0 100 100" fill="none">
                    <path d="M50 0 C50 30, 70 50, 100 50 C70 50, 50 70, 50 100 C50 70, 30 50, 0 50 C30 50, 50 30, 50 0 Z" fill="#1E40AF" />
                  </svg>
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-sans font-bold text-[#191817] leading-snug mb-2">
                  Get matched treatments
                </h3>
                <p className="text-xs sm:text-sm text-[#6E6962] font-normal leading-relaxed font-sans">
                  We recommend genuine Rx products and personalized compounded formulas tailored to your profile.
                </p>
              </div>
            </div>

            {/* CARD 3: Doctor review & consult */}
            <div className="how-airo-card group">
              <div className="how-visual-stage">
                <div className="relative flex items-center justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl shadow-[0_10px_25px_-4px_rgba(0,0,0,0.06)] border border-[#E8E3DA] flex flex-col items-center justify-center p-3 relative group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-9 h-9 text-[#1B3328]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-[9px] font-mono font-bold text-[#1E40AF] uppercase tracking-wider mt-1">Rx Plan</span>
                  </div>

                  <div className="absolute -top-1.5 right-4 sm:right-6 z-20 pointer-events-none transform -rotate-12 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                    <svg className="w-6 h-6 fill-[#1E40AF] text-[#1E40AF] drop-shadow-md" viewBox="0 0 24 24">
                      <path d="M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.437z" />
                    </svg>
                  </div>

                  <div className="absolute -bottom-2 -right-4 sm:-right-5 w-14 h-14 sm:w-15 sm:h-15 rounded-full border-[2.5px] border-white shadow-xl overflow-hidden z-20 bg-white">
                    <img src="/images/doctor-avatar.jpg" alt="Licensed US Physician" className="w-full h-full object-cover object-top" />
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#1E40AF] border-2 border-white flex items-center justify-center text-[7px] text-white font-bold shadow-sm">✓</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-sans font-bold text-[#191817] leading-snug mb-2">
                  Doctor review & consult
                </h3>
                <p className="text-xs sm:text-sm text-[#6E6962] font-normal leading-relaxed font-sans">
                  Licensed doctors review Rx items; a US-licensed physician evaluates your case and prescribes treatment.
                </p>
              </div>
            </div>

            {/* CARD 4: Discreet doorstep delivery */}
            <div className="how-airo-card group">
              <div className="how-visual-stage">
                <div className="relative flex items-center justify-center">
                  <svg className="w-28 h-28 sm:w-32 sm:h-32 transform -rotate-90 drop-shadow-sm" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="44" fill="none" stroke="#EBE6DE" strokeWidth="3" />
                    <circle cx="50" cy="50" r="44" fill="none" stroke="#1E40AF" strokeWidth="3.5" strokeDasharray="276" strokeDashoffset="65" strokeLinecap="round" className="transition-all duration-700 group-hover:stroke-dashoffset-35" />
                  </svg>

                  <div className="w-18 h-18 sm:w-20 sm:h-20 bg-white rounded-full shadow-[0_10px_25px_-4px_rgba(0,0,0,0.08)] border border-[#E8E3DA] flex items-center justify-center absolute z-10 group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-8 h-8 text-[#1E40AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>

                  <span className="absolute -top-1.5 -right-1 px-2 py-0.5 rounded-full bg-[#0F265C] text-white text-[9px] font-bold tracking-wider uppercase font-mono shadow-sm">
                    48h
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-sans font-bold text-[#191817] leading-snug mb-2">
                  Discreet doorstep delivery
                </h3>
                <p className="text-xs sm:text-sm text-[#6E6962] font-normal leading-relaxed font-sans">
                  Everything ships discreetly to your door in unmarked packaging with automated refills and 24/7 care support.
                </p>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* SECTION 10: DOCTORS — GENUINE MEDICINES, VERIFIED FOR YOU */}
      <section id="doctors" className="py-20 sm:py-24 lg:py-28 bg-[#FAF7F2] border-b border-[#DDD5C9] relative overflow-hidden w-full max-w-full">
        {/* Header */}
        <div className="text-center w-full max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 px-4">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-[#1E40AF] font-sans block">
            Licensed Medical Board
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-[#191817] tracking-tight">
            Genuine medicines, verified for you
          </h2>
          <p className="text-sm sm:text-base text-[#6E6962] font-normal leading-relaxed max-w-2xl mx-auto font-sans">
            Every Rx medicine is dispensed against a verified prescription by our licensed physicians and CDSCO/US-compliant pharmacy partners.
          </p>
        </div>

        {/* Horizontal Infinite Loop Scroll Marquee Track */}
        <div className="doctors-marquee-wrap">
          <div className="doctors-marquee-track">

            {/* ================= SET 1 (CARDS EXACTLY LIKE SARAH SWIFT IMAGE) ================= */}
            {/* CARD 1: Sarah Swift (Exact match to reference photo!) */}
            <div className="sarah-doctor-card group" onClick={() => setIntakeModalOpen(true)}>
              <img src="/images/doctor-swift.jpg" alt="Sarah Swift" className="sarah-card-bg-photo" />
              <div className="sarah-card-frosted"></div>
              <div className="sarah-card-content">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <h3 className="text-xl sm:text-[22px] font-sans font-bold text-[#191817] tracking-tight">
                    Sarah Swift
                  </h3>
                  <svg className="w-5 h-5 text-[#00875A] flex-shrink-0 inline-block drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor" title="Verified">
                    <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.33 2.33 4.99-4.99 1.41 1.41-6.4 6.41z" />
                  </svg>
                </div>
                <p className="text-sm text-[#4A4742] leading-snug font-normal font-sans mb-4">
                  Product Designer who focuses on simplicity & usability.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-3 text-xs sm:text-sm text-[#4A4742] font-medium font-sans">
                    <span className="inline-flex items-center space-x-1.5">
                      <svg className="w-4 h-4 text-[#7A756E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>312</span>
                    </span>
                    <span className="inline-flex items-center space-x-1.5">
                      <svg className="w-4 h-4 text-[#7A756E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15l5-5 4 4 5-5 4 4" />
                      </svg>
                      <span>48</span>
                    </span>
                  </div>
                  <button onClick={() => setIntakeModalOpen(true)} className="inline-flex items-center space-x-1 bg-white text-[#191817] font-semibold text-xs sm:text-sm px-4 py-2 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-black/[0.04] hover:shadow-md hover:scale-105 active:scale-95 transition-all">
                    <span>Follow</span>
                    <span className="text-sm font-bold leading-none">+</span>
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 2: Dr Lokendra Thakur */}
            <div className="sarah-doctor-card group" onClick={() => setIntakeModalOpen(true)}>
              <img src="/images/doctor-thakur.jpg" alt="Dr Lokendra K Thakur" className="sarah-card-bg-photo" />
              <div className="sarah-card-frosted"></div>
              <div className="sarah-card-content">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <h3 className="text-xl sm:text-[22px] font-sans font-bold text-[#191817] tracking-tight">
                    Lokendra Thakur
                  </h3>
                  <svg className="w-5 h-5 text-[#00875A] flex-shrink-0 inline-block drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor" title="Verified">
                    <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.33 2.33 4.99-4.99 1.41 1.41-6.4 6.41z" />
                  </svg>
                </div>
                <p className="text-sm text-[#4A4742] leading-snug font-normal font-sans mb-4">
                  Internal Medicine specialist who focuses on metabolic health & longevity.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-3 text-xs sm:text-sm text-[#4A4742] font-medium font-sans">
                    <span className="inline-flex items-center space-x-1.5">
                      <svg className="w-4 h-4 text-[#7A756E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>428</span>
                    </span>
                    <span className="inline-flex items-center space-x-1.5">
                      <svg className="w-4 h-4 text-[#7A756E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15l5-5 4 4 5-5 4 4" />
                      </svg>
                      <span>56</span>
                    </span>
                  </div>
                  <button onClick={() => setIntakeModalOpen(true)} className="inline-flex items-center space-x-1 bg-white text-[#191817] font-semibold text-xs sm:text-sm px-4 py-2 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-black/[0.04] hover:shadow-md hover:scale-105 active:scale-95 transition-all">
                    <span>Follow</span>
                    <span className="text-sm font-bold leading-none">+</span>
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 3: DR LENIN REDDY */}
            <div className="sarah-doctor-card group" onClick={() => setIntakeModalOpen(true)}>
              <img src="/images/doctor-reddy.jpg" alt="DR LENIN REDDY" className="sarah-card-bg-photo" />
              <div className="sarah-card-frosted"></div>
              <div className="sarah-card-content">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <h3 className="text-xl sm:text-[22px] font-sans font-bold text-[#191817] tracking-tight">
                    Lenin Reddy
                  </h3>
                  <svg className="w-5 h-5 text-[#00875A] flex-shrink-0 inline-block drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor" title="Verified">
                    <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.33 2.33 4.99-4.99 1.41 1.41-6.4 6.41z" />
                  </svg>
                </div>
                <p className="text-sm text-[#4A4742] leading-snug font-normal font-sans mb-4">
                  General Medicine doctor who focuses on preventative care & chronic health.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-3 text-xs sm:text-sm text-[#4A4742] font-medium font-sans">
                    <span className="inline-flex items-center space-x-1.5">
                      <svg className="w-4 h-4 text-[#7A756E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>384</span>
                    </span>
                    <span className="inline-flex items-center space-x-1.5">
                      <svg className="w-4 h-4 text-[#7A756E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15l5-5 4 4 5-5 4 4" />
                      </svg>
                      <span>62</span>
                    </span>
                  </div>
                  <button onClick={() => setIntakeModalOpen(true)} className="inline-flex items-center space-x-1 bg-white text-[#191817] font-semibold text-xs sm:text-sm px-4 py-2 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-black/[0.04] hover:shadow-md hover:scale-105 active:scale-95 transition-all">
                    <span>Follow</span>
                    <span className="text-sm font-bold leading-none">+</span>
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 4: Dr. K. Raman */}
            <div className="sarah-doctor-card group" onClick={() => setIntakeModalOpen(true)}>
              <img src="/images/doctor-raman.jpg" alt="Dr. K. Raman" className="sarah-card-bg-photo" />
              <div className="sarah-card-frosted"></div>
              <div className="sarah-card-content">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <h3 className="text-xl sm:text-[22px] font-sans font-bold text-[#191817] tracking-tight">
                    K. Raman
                  </h3>
                  <svg className="w-5 h-5 text-[#00875A] flex-shrink-0 inline-block drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor" title="Verified">
                    <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.33 2.33 4.99-4.99 1.41 1.41-6.4 6.41z" />
                  </svg>
                </div>
                <p className="text-sm text-[#4A4742] leading-snug font-normal font-sans mb-4">
                  Cardiometabolic specialist who focuses on clinical pharmacology & custom Rx.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-3 text-xs sm:text-sm text-[#4A4742] font-medium font-sans">
                    <span className="inline-flex items-center space-x-1.5">
                      <svg className="w-4 h-4 text-[#7A756E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>290</span>
                    </span>
                    <span className="inline-flex items-center space-x-1.5">
                      <svg className="w-4 h-4 text-[#7A756E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15l5-5 4 4 5-5 4 4" />
                      </svg>
                      <span>39</span>
                    </span>
                  </div>
                  <button onClick={() => setIntakeModalOpen(true)} className="inline-flex items-center space-x-1 bg-white text-[#191817] font-semibold text-xs sm:text-sm px-4 py-2 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-black/[0.04] hover:shadow-md hover:scale-105 active:scale-95 transition-all">
                    <span>Follow</span>
                    <span className="text-sm font-bold leading-none">+</span>
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 5: Dr. Maya Chen */}
            <div className="sarah-doctor-card group" onClick={() => setIntakeModalOpen(true)}>
              <img src="/images/doctor-avatar.jpg" alt="Dr. Maya Chen" className="sarah-card-bg-photo" />
              <div className="sarah-card-frosted"></div>
              <div className="sarah-card-content">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <h3 className="text-xl sm:text-[22px] font-sans font-bold text-[#191817] tracking-tight">
                    Maya Chen
                  </h3>
                  <svg className="w-5 h-5 text-[#00875A] flex-shrink-0 inline-block drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor" title="Verified">
                    <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.33 2.33 4.99-4.99 1.41 1.41-6.4 6.41z" />
                  </svg>
                </div>
                <p className="text-sm text-[#4A4742] leading-snug font-normal font-sans mb-4">
                  Endocrinology physician who focuses on sustainable metabolic wellness.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-3 text-xs sm:text-sm text-[#4A4742] font-medium font-sans">
                    <span className="inline-flex items-center space-x-1.5">
                      <svg className="w-4 h-4 text-[#7A756E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>512</span>
                    </span>
                    <span className="inline-flex items-center space-x-1.5">
                      <svg className="w-4 h-4 text-[#7A756E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15l5-5 4 4 5-5 4 4" />
                      </svg>
                      <span>74</span>
                    </span>
                  </div>
                  <button onClick={() => setIntakeModalOpen(true)} className="inline-flex items-center space-x-1 bg-white text-[#191817] font-semibold text-xs sm:text-sm px-4 py-2 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-black/[0.04] hover:shadow-md hover:scale-105 active:scale-95 transition-all">
                    <span>Follow</span>
                    <span className="text-sm font-bold leading-none">+</span>
                  </button>
                </div>
              </div>
            </div>


            {/* ================= SET 2 (DUPLICATE FOR SEAMLESS CONTINUOUS LOOP) ================= */}
            {/* CARD 1 (DUPLICATE) */}
            <div className="sarah-doctor-card group" onClick={() => setIntakeModalOpen(true)}>
              <img src="/images/doctor-swift.jpg" alt="Sarah Swift" className="sarah-card-bg-photo" />
              <div className="sarah-card-frosted"></div>
              <div className="sarah-card-content">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <h3 className="text-xl sm:text-[22px] font-sans font-bold text-[#191817] tracking-tight">
                    Sarah Swift
                  </h3>
                  <svg className="w-5 h-5 text-[#00875A] flex-shrink-0 inline-block drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor" title="Verified">
                    <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.33 2.33 4.99-4.99 1.41 1.41-6.4 6.41z" />
                  </svg>
                </div>
                <p className="text-sm text-[#4A4742] leading-snug font-normal font-sans mb-4">
                  Product Designer who focuses on simplicity & usability.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-3 text-xs sm:text-sm text-[#4A4742] font-medium font-sans">
                    <span className="inline-flex items-center space-x-1.5">
                      <svg className="w-4 h-4 text-[#7A756E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>312</span>
                    </span>
                    <span className="inline-flex items-center space-x-1.5">
                      <svg className="w-4 h-4 text-[#7A756E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15l5-5 4 4 5-5 4 4" />
                      </svg>
                      <span>48</span>
                    </span>
                  </div>
                  <button onClick={() => setIntakeModalOpen(true)} className="inline-flex items-center space-x-1 bg-white text-[#191817] font-semibold text-xs sm:text-sm px-4 py-2 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-black/[0.04] hover:shadow-md hover:scale-105 active:scale-95 transition-all">
                    <span>Follow</span>
                    <span className="text-sm font-bold leading-none">+</span>
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 2 (DUPLICATE) */}
            <div className="sarah-doctor-card group" onClick={() => setIntakeModalOpen(true)}>
              <img src="/images/doctor-thakur.jpg" alt="Dr Lokendra K Thakur" className="sarah-card-bg-photo" />
              <div className="sarah-card-frosted"></div>
              <div className="sarah-card-content">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <h3 className="text-xl sm:text-[22px] font-sans font-bold text-[#191817] tracking-tight">
                    Lokendra Thakur
                  </h3>
                  <svg className="w-5 h-5 text-[#00875A] flex-shrink-0 inline-block drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor" title="Verified">
                    <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.33 2.33 4.99-4.99 1.41 1.41-6.4 6.41z" />
                  </svg>
                </div>
                <p className="text-sm text-[#4A4742] leading-snug font-normal font-sans mb-4">
                  Internal Medicine specialist who focuses on metabolic health & longevity.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-3 text-xs sm:text-sm text-[#4A4742] font-medium font-sans">
                    <span className="inline-flex items-center space-x-1.5">
                      <svg className="w-4 h-4 text-[#7A756E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>428</span>
                    </span>
                    <span className="inline-flex items-center space-x-1.5">
                      <svg className="w-4 h-4 text-[#7A756E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15l5-5 4 4 5-5 4 4" />
                      </svg>
                      <span>56</span>
                    </span>
                  </div>
                  <button onClick={() => setIntakeModalOpen(true)} className="inline-flex items-center space-x-1 bg-white text-[#191817] font-semibold text-xs sm:text-sm px-4 py-2 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-black/[0.04] hover:shadow-md hover:scale-105 active:scale-95 transition-all">
                    <span>Follow</span>
                    <span className="text-sm font-bold leading-none">+</span>
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 3 (DUPLICATE) */}
            <div className="sarah-doctor-card group" onClick={() => setIntakeModalOpen(true)}>
              <img src="/images/doctor-reddy.jpg" alt="DR LENIN REDDY" className="sarah-card-bg-photo" />
              <div className="sarah-card-frosted"></div>
              <div className="sarah-card-content">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <h3 className="text-xl sm:text-[22px] font-sans font-bold text-[#191817] tracking-tight">
                    Lenin Reddy
                  </h3>
                  <svg className="w-5 h-5 text-[#00875A] flex-shrink-0 inline-block drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor" title="Verified">
                    <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.33 2.33 4.99-4.99 1.41 1.41-6.4 6.41z" />
                  </svg>
                </div>
                <p className="text-sm text-[#4A4742] leading-snug font-normal font-sans mb-4">
                  General Medicine doctor who focuses on preventative care & chronic health.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-3 text-xs sm:text-sm text-[#4A4742] font-medium font-sans">
                    <span className="inline-flex items-center space-x-1.5">
                      <svg className="w-4 h-4 text-[#7A756E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>384</span>
                    </span>
                    <span className="inline-flex items-center space-x-1.5">
                      <svg className="w-4 h-4 text-[#7A756E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15l5-5 4 4 5-5 4 4" />
                      </svg>
                      <span>62</span>
                    </span>
                  </div>
                  <button onClick={() => setIntakeModalOpen(true)} className="inline-flex items-center space-x-1 bg-white text-[#191817] font-semibold text-xs sm:text-sm px-4 py-2 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-black/[0.04] hover:shadow-md hover:scale-105 active:scale-95 transition-all">
                    <span>Follow</span>
                    <span className="text-sm font-bold leading-none">+</span>
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 4 (DUPLICATE) */}
            <div className="sarah-doctor-card group" onClick={() => setIntakeModalOpen(true)}>
              <img src="/images/doctor-raman.jpg" alt="Dr. K. Raman" className="sarah-card-bg-photo" />
              <div className="sarah-card-frosted"></div>
              <div className="sarah-card-content">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <h3 className="text-xl sm:text-[22px] font-sans font-bold text-[#191817] tracking-tight">
                    K. Raman
                  </h3>
                  <svg className="w-5 h-5 text-[#00875A] flex-shrink-0 inline-block drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor" title="Verified">
                    <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.33 2.33 4.99-4.99 1.41 1.41-6.4 6.41z" />
                  </svg>
                </div>
                <p className="text-sm text-[#4A4742] leading-snug font-normal font-sans mb-4">
                  Cardiometabolic specialist who focuses on clinical pharmacology & custom Rx.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-3 text-xs sm:text-sm text-[#4A4742] font-medium font-sans">
                    <span className="inline-flex items-center space-x-1.5">
                      <svg className="w-4 h-4 text-[#7A756E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>290</span>
                    </span>
                    <span className="inline-flex items-center space-x-1.5">
                      <svg className="w-4 h-4 text-[#7A756E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15l5-5 4 4 5-5 4 4" />
                      </svg>
                      <span>39</span>
                    </span>
                  </div>
                  <button onClick={() => setIntakeModalOpen(true)} className="inline-flex items-center space-x-1 bg-white text-[#191817] font-semibold text-xs sm:text-sm px-4 py-2 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-black/[0.04] hover:shadow-md hover:scale-105 active:scale-95 transition-all">
                    <span>Follow</span>
                    <span className="text-sm font-bold leading-none">+</span>
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 5 (DUPLICATE) */}
            <div className="sarah-doctor-card group" onClick={() => setIntakeModalOpen(true)}>
              <img src="/images/doctor-avatar.jpg" alt="Dr. Maya Chen" className="sarah-card-bg-photo" />
              <div className="sarah-card-frosted"></div>
              <div className="sarah-card-content">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <h3 className="text-xl sm:text-[22px] font-sans font-bold text-[#191817] tracking-tight">
                    Maya Chen
                  </h3>
                  <svg className="w-5 h-5 text-[#00875A] flex-shrink-0 inline-block drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor" title="Verified">
                    <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.33 2.33 4.99-4.99 1.41 1.41-6.4 6.41z" />
                  </svg>
                </div>
                <p className="text-sm text-[#4A4742] leading-snug font-normal font-sans mb-4">
                  Endocrinology physician who focuses on sustainable metabolic wellness.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-3 text-xs sm:text-sm text-[#4A4742] font-medium font-sans">
                    <span className="inline-flex items-center space-x-1.5">
                      <svg className="w-4 h-4 text-[#7A756E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>512</span>
                    </span>
                    <span className="inline-flex items-center space-x-1.5">
                      <svg className="w-4 h-4 text-[#7A756E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15l5-5 4 4 5-5 4 4" />
                      </svg>
                      <span>74</span>
                    </span>
                  </div>
                  <button onClick={() => setIntakeModalOpen(true)} className="inline-flex items-center space-x-1 bg-white text-[#191817] font-semibold text-xs sm:text-sm px-4 py-2 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-black/[0.04] hover:shadow-md hover:scale-105 active:scale-95 transition-all">
                    <span>Follow</span>
                    <span className="text-sm font-bold leading-none">+</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Pharmacy Partners Compliance Badges */}
        <div className="mt-12 pt-8 border-t border-[#DDD5C9]/70 flex flex-wrap items-center justify-between gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="flex items-center space-x-3 text-xs sm:text-sm text-[#6E6962] font-sans">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>100% CDSCO & State Board Verified • LegitScript Certified • US FDA-Inspected Compounding</span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#1E40AF] font-sans">
            <span className="px-3.5 py-1.5 bg-white rounded-full border border-[#DDD5C9] shadow-sm">Verified Rx Dispensing</span>
            <span className="px-3.5 py-1.5 bg-white rounded-full border border-[#DDD5C9] shadow-sm">Licensed Doctors in 50 States</span>
          </div>
        </div>
      </section>

      {/* SECTION 11: PATIENT REVIEWS */}
      <section id="reviews" className="py-20 sm:py-24 lg:py-28 bg-white border-b border-[#DDD5C9]">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="text-center w-full mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8623D]">Patient Stories</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#191817]">Real Patients. Real Outcomes.</h2>
            <div className="flex items-center justify-center space-x-1 text-amber-500 text-sm">
              <span>★★★★★</span>
              <span className="text-xs font-bold text-[#191817] ml-2">4.8 / 5 Rating from 250,000+ Consultations</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F8F6F2] p-8 rounded-[1.75rem] border border-[#DDD5C9] shadow-sm space-y-4">
              <div className="text-amber-500 text-sm font-bold">★★★★★</div>
              <p className="text-xs text-[#54504C] italic leading-relaxed">
                &ldquo;I was embarrassed to talk to my GP about ED. Took 5 minutes on AIRO from my couch. The chewable mints arrived in a plain brown box 3 days later. Absolutely life-changing.&rdquo;
              </p>
              <div className="pt-2 border-t border-[#DDD5C9]/60">
                <strong className="text-xs text-[#191817] block">Marcus T., 41</strong>
                <span className="text-[11px] text-[#8A857F]">Atlanta, GA · Sexual Wellness</span>
              </div>
            </div>

            <div className="bg-[#F8F6F2] p-8 rounded-[1.75rem] border border-[#DDD5C9] shadow-sm space-y-4">
              <div className="text-amber-500 text-sm font-bold">★★★★★</div>
              <p className="text-xs text-[#54504C] italic leading-relaxed">
                &ldquo;My hairline was receding fast in my late 20s. The custom topical spray stopped my shedding within 2 months, and I have visible regrowth at month 4. Super easy auto-refills.&rdquo;
              </p>
              <div className="pt-2 border-t border-[#DDD5C9]/60">
                <strong className="text-xs text-[#191817] block">Jake M., 28</strong>
                <span className="text-[11px] text-[#8A857F]">Austin, TX · Hair Regrowth</span>
              </div>
            </div>

            <div className="bg-[#F8F6F2] p-8 rounded-[1.75rem] border border-[#DDD5C9] shadow-sm space-y-4">
              <div className="text-amber-500 text-sm font-bold">★★★★★</div>
              <p className="text-xs text-[#54504C] italic leading-relaxed">
                &ldquo;Dermatologists in Denver had a 3-month waitlist. AIRO’s doctor reviewed my skin photos within 6 hours and prescribed custom tretinoin. My acne cleared up completely.&rdquo;
              </p>
              <div className="pt-2 border-t border-[#DDD5C9]/60">
                <strong className="text-xs text-[#191817] block">Emily R., 34</strong>
                <span className="text-[11px] text-[#8A857F]">Denver, CO · Dermatology</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER (Navy Royal Theme — Exactly as Reference Screenshot) */}
      <footer className="bg-[#0F1B38] text-white pt-16 sm:pt-20 lg:pt-24 pb-4 sm:pb-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

          {/* Main Top Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

            {/* Left Brand & Info Column (Span 6) */}
            <div className="lg:col-span-6 space-y-7">
              <div>
                <div className="flex items-baseline space-x-2">
                  <span className="font-serif font-bold text-3xl sm:text-4xl text-white tracking-tight">AIRO</span>
                  <span className="font-serif font-normal text-3xl sm:text-4xl text-white tracking-normal">eMed</span>
                </div>
                <div className="text-xs text-slate-400 font-sans mt-1">
                  Powered by Praana
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mt-3.5 max-w-md">
                  Doctor-led care for skin, hair, weight and intimate health — delivered discreetly across India.
                </p>
              </div>

              {/* Socials and App Downloads */}
              <div className="flex flex-wrap items-start gap-8 sm:gap-10 pt-1">
                {/* Follow Us */}
                <div>
                  <h5 className="text-xs font-semibold text-white tracking-wide mb-3 font-sans">Follow Us</h5>
                  <div className="flex items-center space-x-3">
                    <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                    <a href="#" aria-label="X (Twitter)" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Download The App */}
                <div>
                  <h5 className="text-xs font-semibold text-white tracking-wide mb-3 font-sans">Download The App</h5>
                  <div className="flex items-center space-x-3">
                    <a href="#" className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-white/20 bg-transparent hover:bg-white/5 transition-all text-left">
                      <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.47c.61-.75 1.04-1.8 0.92-2.85-.92.04-2.06.62-2.73 1.4-.57.66-.99 1.73-.86 2.76 1.03.08 2.06-.56 2.67-1.31z" />
                      </svg>
                      <div className="leading-none">
                        <span className="text-[9px] text-slate-400 block tracking-tight font-sans">Download on the</span>
                        <span className="text-xs font-semibold text-white block mt-0.5 tracking-tight font-sans">App Store</span>
                      </div>
                    </a>
                    <a href="#" className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-white/20 bg-transparent hover:bg-white/5 transition-all text-left">
                      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M3.6 1.5c-.2.2-.4.6-.4 1v19c0 .4.2.8.4 1l10.9-10.5L3.6 1.5z" />
                        <path fill="#FBBC05" d="M17.8 8.6L14.5 12l3.3 3.4 3.9-2.2c1.1-.6 1.1-1.7 0-2.3l-3.9-2.3z" />
                        <path fill="#EA4335" d="M3.6 22.5l10.9-10.5 3.3 3.4-11.7 6.6c-.9.5-1.9.5-2.5.5z" />
                        <path fill="#34A853" d="M3.6 1.5l14.2 8-3.3 3.4-10.9-10.5c.6-.6 1.6-.4 2.5.1z" />
                      </svg>
                      <div className="leading-none">
                        <span className="text-[9px] text-slate-400 block tracking-tight font-sans">Get it on</span>
                        <span className="text-xs font-semibold text-white block mt-0.5 tracking-tight font-sans">Google Play</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 3 Links Columns (Span 6) */}
            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 pt-2 lg:pt-0">
              {/* Tools */}
              <div>
                <h4 className="text-sm font-bold text-white mb-4 font-sans">Tools</h4>
                <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                  <li><a href="#" className="hover:text-white transition-colors">Find your treatment</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">BMI Calculator</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">BMR Calculator</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">TDEE Calculator</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Calorie Deficit Calculator</a></li>
                </ul>
              </div>

              {/* Help */}
              <div>
                <h4 className="text-sm font-bold text-white mb-4 font-sans">Help</h4>
                <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                  <li><a href="#" className="hover:text-white transition-colors">Help centre</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Track your order</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Shipping &amp; delivery</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Returns &amp; refunds</a></li>
                </ul>
              </div>

              {/* About & Policies */}
              <div className="col-span-2 sm:col-span-1">
                <h4 className="text-sm font-bold text-white mb-4 font-sans">About &amp; Policies</h4>
                <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                  <li><a href="#" className="hover:text-white transition-colors">About us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of use</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Telemedicine consent</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Delete account</a></li>
                </ul>
              </div>
            </div>

          </div>

          {/* Legal Disclaimer & Copyright */}
          <div className="pt-8 sm:pt-10 border-t border-white/10 mt-12 sm:mt-14 space-y-4">
            <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed font-sans max-w-5xl">
              AIRO eMed connects you with registered medical practitioners and licensed pharmacists. Prescription medicines are dispensed only against a valid prescription verified by a registered doctor. Content on this site is for educational purposes and is not a substitute for professional medical advice, diagnosis or treatment. Individual results may vary. Telemedicine services follow the Telemedicine Practice Guidelines, 2020. Personal data is processed in India (AWS ap-south-1) in accordance with the DPDPA Act, 2023, and the Consumer Protection (E-Commerce) Rules, 2020.
            </p>
            <p className="text-xs text-slate-400 font-sans">
              &copy; 2026 AIRO eMed Pvt Ltd. All rights reserved.
            </p>
          </div>

          {/* Giant Brand Watermark at Bottom */}
          <div className="w-full mt-6 sm:mt-8 pt-2 overflow-hidden pointer-events-none select-none flex justify-center">
            <img
              src="/images/footer_watermark_clean.png"
              alt="AIRO eMed"
              className="w-full max-w-5xl h-auto opacity-75 object-contain"
            />
          </div>

        </div>
      </footer>

    </div>
  );
}