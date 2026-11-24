'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TreatmentsPage() {
  const [catalogAudience, setCatalogAudience] = useState<'ALL' | 'HIM' | 'HER'>('ALL');
  const [catalogCategory, setCatalogCategory] = useState<string>('ALL');
  const [activeMegaMenu, setActiveMegaMenu] = useState<'treatments' | 'shop' | null>(null);
  const [intakeModalOpen, setIntakeModalOpen] = useState(false);
  const megaNavRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const audParam = urlParams.get('audience');
      const catParam = urlParams.get('category');
      if (audParam === 'HIM' || audParam === 'HER') {
        setCatalogAudience(audParam);
      }
      if (catParam) {
        setCatalogCategory(catParam);
      }
    }
  }, []);

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
      period: '/ month',
      image: '/images/pdp/semaglutide/main.jpg',
      rating: 4.9,
      reviews: 320,
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
      period: '/ bottle',
      image: '/images/pdp/glow-serum/main.jpg',
      rating: 4.8,
      reviews: 342,
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
      period: '/ month',
      image: '/images/card-prod-hair-spray.jpg',
      rating: 4.8,
      reviews: 891,
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
      period: '/ month',
      image: '/images/card-prod-finasteride.jpg',
      rating: 4.9,
      reviews: 612,
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
      period: '/ month',
      image: '/images/card-prod-hair-her.jpg',
      rating: 4.8,
      reviews: 420,
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
      period: '/ month',
      image: '/images/card-prod-sildenafil.jpg',
      rating: 4.9,
      reviews: 950,
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
      period: '/ month',
      image: '/images/card-prod-hard-mints.jpg',
      rating: 4.9,
      reviews: 780,
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
      period: '/ tube',
      image: '/images/card-prod-tretinoin.jpg',
      rating: 4.8,
      reviews: 518,
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
      period: '/ tube',
      image: '/images/card-prod-clear-gel.jpg',
      rating: 4.6,
      reviews: 380,
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
      period: '/ bottle',
      image: '/images/card-prod-shampoo.jpg',
      rating: 4.7,
      reviews: 450,
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
      period: '/ bottle',
      image: '/images/card-prod-niacinamide.jpg',
      rating: 4.8,
      reviews: 290,
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
      period: '/ month',
      image: '/images/card-prod-metformin.jpg',
      rating: 4.7,
      reviews: 215,
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
      period: '/ bottle',
      image: '/images/card-prod-b12.jpg',
      rating: 4.8,
      reviews: 190,
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
      period: '/ bottle',
      image: '/images/card-prod-omega3.jpg',
      rating: 4.9,
      reviews: 310,
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
      period: '/ month',
      image: '/images/airo_opt/med-71-rybelsus-2-1790712161977-c9475b04.jpg',
      rating: 4.9,
      reviews: 480,
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
      period: '/ month',
      image: '/images/airo_opt/med-62-sexual-health-product-images-12-1786655381163-377c05e2.jpg',
      rating: 4.9,
      reviews: 620,
    }
  ];

  const filteredProducts = catalogProducts.filter((p) => {
    const matchesAudience =
      catalogAudience === 'ALL' || p.audience === catalogAudience || p.audience === 'BOTH';
    const matchesCategory =
      catalogCategory === 'ALL' || p.category === catalogCategory;
    return matchesAudience && matchesCategory;
  });

  const toggleMegaMenu = (menu: 'treatments' | 'shop') => {
    setActiveMegaMenu((prev) => (prev === menu ? null : menu));
  };

  const selectMegaMenuItem = (aud: 'HIM' | 'HER' | 'ALL', cat: string) => {
    setActiveMegaMenu(null);
    setCatalogAudience(aud);
    setCatalogCategory(cat);
  };

  return (
    <div className="bg-white text-[#191817] font-sans antialiased min-h-screen flex flex-col selection:bg-[#1E40AF]/15 selection:text-[#0F265C]">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E5E0D8] transition-all duration-300">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 h-20 flex items-center justify-between">
          
          <Link href="/" className="brand-logo flex items-baseline space-x-1.5 group select-none">
            <span className="brand-airo font-extrabold text-2xl sm:text-3xl tracking-tight text-[#191817]">AIRO</span>
            <span className="brand-emed text-xl sm:text-2xl font-normal text-[#191817]/85 tracking-tight">eMed</span>
          </Link>

          <nav
            ref={megaNavRef}
            className="nav-capsule flex items-center bg-[#EBE5DC] border border-[#DDD5C9]/70 px-2 py-1.5 rounded-full space-x-1 sm:space-x-1.5 text-xs font-semibold text-[#191817] shadow-sm relative"
          >
            <Link
              href="/concerns"
              className="nav-pill-btn flex items-center space-x-1.5 px-4 py-1.5 rounded-full font-semibold text-[#191817]/85 hover:bg-[#FAF7F2]/60 transition-all duration-200"
            >
              <span>Concerns</span>
            </Link>

            <button
              type="button"
              onClick={() => toggleMegaMenu('treatments')}
              aria-expanded={activeMegaMenu === 'treatments'}
              className="nav-pill-btn active bg-white text-[#191817] shadow-md border border-[#DDD5C9] flex items-center space-x-1.5 px-4 py-1.5 rounded-full font-semibold transition-all duration-200 cursor-pointer"
            >
              <span>Treatments</span>
              <svg className={`nav-chevron w-3.5 h-3.5 text-[#191817]/70 transition-transform duration-200 ${activeMegaMenu === 'treatments' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>

            <button
              type="button"
              onClick={() => toggleMegaMenu('shop')}
              aria-expanded={activeMegaMenu === 'shop'}
              className={`nav-pill-btn flex items-center space-x-1.5 px-4 py-1.5 rounded-full font-semibold transition-all duration-200 cursor-pointer ${
                activeMegaMenu === 'shop' ? 'active bg-white text-[#191817] shadow-md border border-[#DDD5C9]' : 'text-[#191817]/85 hover:bg-[#FAF7F2]/60'
              }`}
            >
              <span>Shop</span>
              <svg className={`nav-chevron w-3.5 h-3.5 text-[#191817]/70 transition-transform duration-200 ${activeMegaMenu === 'shop' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
          </nav>

          <div className="nav-actions flex items-center space-x-5 text-[#191817]">
            <button onClick={() => setCatalogCategory('ALL')} className="nav-icon-btn hover:text-[#1B3328] transition-colors p-1" title="Search Treatments">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
            <button onClick={() => setIntakeModalOpen(true)} className="nav-icon-btn hover:text-[#1B3328] transition-colors p-1 relative" title="Start Consultation">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            </button>
          </div>
        </div>

        {/* TREATMENTS DROPDOWN */}
        {activeMegaMenu === 'treatments' && (
          <div className="mega-menu-panel active">
            <div className="mega-menu-card bg-white rounded-3xl p-7 sm:p-8 lg:p-10 shadow-2xl border border-[#EAE5DD]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                <div className="lg:col-span-4 flex flex-col justify-start">
                  <h3 className="dropdown-col-title">Hims</h3>
                  <div className="space-y-4">
                    <button type="button" onClick={() => selectMegaMenuItem('HIM', 'HAIR_LOSS')} className="dropdown-menu-item group text-left">
                      <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Hair</div>
                      <p className="dropdown-item-desc">Thinning · regrowth · postpartum</p>
                    </button>
                    <button type="button" onClick={() => selectMegaMenuItem('HIM', 'SEXUAL_HEALTH_ED')} className="dropdown-menu-item group text-left">
                      <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Sexual Health</div>
                      <p className="dropdown-item-desc">Performance · wellness</p>
                    </button>
                    <button type="button" onClick={() => selectMegaMenuItem('HIM', 'DERMATOLOGY')} className="dropdown-menu-item group text-left">
                      <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Skin</div>
                      <p className="dropdown-item-desc">Skin</p>
                    </button>
                    <button type="button" onClick={() => selectMegaMenuItem('HIM', 'WEIGHT_MANAGEMENT')} className="dropdown-menu-item group text-left">
                      <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Weight Management</div>
                      <p className="dropdown-item-desc">GLP-1 & metabolic care</p>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-start">
                  <h3 className="dropdown-col-title">Hers</h3>
                  <div className="space-y-4">
                    <button type="button" onClick={() => selectMegaMenuItem('HER', 'HAIR_LOSS')} className="dropdown-menu-item group text-left">
                      <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Hair</div>
                      <p className="dropdown-item-desc">Thinning · regrowth · postpartum</p>
                    </button>
                    <button type="button" onClick={() => selectMegaMenuItem('HER', 'DERMATOLOGY')} className="dropdown-menu-item group text-left">
                      <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Skin</div>
                      <p className="dropdown-item-desc">Skin</p>
                    </button>
                    <button type="button" onClick={() => selectMegaMenuItem('HER', 'WEIGHT_MANAGEMENT')} className="dropdown-menu-item group text-left">
                      <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Weight Management</div>
                      <p className="dropdown-item-desc">GLP-1 & metabolic care</p>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-4 flex items-center">
                  <Link href="/concerns" className="block w-full h-[280px] sm:h-[320px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm bg-neutral-100 group select-none">
                    <img src="/images/mega-menu-treatments-couple.jpg" alt="AIRO eMed Treatments" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 rounded-2xl sm:rounded-3xl" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SHOP DROPDOWN */}
        {activeMegaMenu === 'shop' && (
          <div className="mega-menu-panel shop-dropdown-panel active">
            <div className="mega-menu-card bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#EAE5DD]">
              <div className="space-y-4">
                <button type="button" onClick={() => selectMegaMenuItem('ALL', 'HAIR_LOSS')} className="dropdown-menu-item group text-left">
                  <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Hair</div>
                  <p className="dropdown-item-desc">Thinning · regrowth · postpartum</p>
                </button>
                <button type="button" onClick={() => selectMegaMenuItem('HIM', 'SEXUAL_HEALTH_ED')} className="dropdown-menu-item group text-left">
                  <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Sexual Health</div>
                  <p className="dropdown-item-desc">Performance · wellness</p>
                </button>
                <button type="button" onClick={() => selectMegaMenuItem('ALL', 'DERMATOLOGY')} className="dropdown-menu-item group text-left">
                  <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Skin</div>
                  <p className="dropdown-item-desc">Skin</p>
                </button>
                <button type="button" onClick={() => selectMegaMenuItem('ALL', 'WEIGHT_MANAGEMENT')} className="dropdown-menu-item group text-left">
                  <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Weight Management</div>
                  <p className="dropdown-item-desc">GLP-1 & metabolic care</p>
                </button>
              </div>

              <div className="pt-6 mt-2 border-t border-[#F0ECE4]">
                <button type="button" onClick={() => selectMegaMenuItem('ALL', 'ALL')} className="dropdown-browse-link w-full text-left cursor-pointer flex items-center justify-between">
                  <span>Browse All Treatments</span>
                  <span className="font-bold">→</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* MAIN */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-8 sm:py-12">
        <section id="catalog-section" className="w-full">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 sm:mb-8 gap-6">
            <div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#C8623D]">
                Doctor-Formulated Compounds
              </span>
              <h1 id="catalog-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#191817] mt-1.5 tracking-tight">
                All Treatments
              </h1>
              <p className="text-xs sm:text-sm text-[#736E67] mt-1.5 max-w-2xl">
                Clinically tested active ingredients prescribed online by US-licensed physicians. Free shipping in discreet unmarked packaging with auto-refills included.
              </p>
            </div>

            {/* Audience Segmented Toggle */}
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

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pt-4 border-t border-[#EAE5DD]/70">
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

            <div className="text-xs font-semibold text-[#78726A] whitespace-nowrap">
              Showing {filteredProducts.length} treatment{filteredProducts.length === 1 ? '' : 's'}
            </div>
          </div>

          {/* 4-COLUMN MINIM GRID */}
          <div id="product-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-2 pb-8">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full w-full text-center py-16 text-[#54504C] bg-[#FAF7F2] rounded-3xl border border-[#DDD5C9] my-4">
                <p className="text-base font-serif font-bold text-[#191817]">No treatments match this filter.</p>
                <p className="text-xs text-[#736E67] mt-1 mb-4">Try clearing filters or selecting &ldquo;All Treatments&rdquo; to see all formulations.</p>
                <button
                  type="button"
                  onClick={() => {
                    setCatalogAudience('ALL');
                    setCatalogCategory('ALL');
                  }}
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

                        <div className="flex items-center space-x-1.5 mt-2">
                          <div className="flex text-amber-500 text-xs">★★★★★</div>
                          <span className="text-xs font-bold text-[#191817] tabular-nums">{p.rating || '4.8'}</span>
                          <span className="text-[11px] text-[#8A857F]">({p.reviews || '300'}+)</span>
                        </div>
                      </div>

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
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#191817] text-white pt-16 pb-12 border-t border-neutral-800">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 text-center sm:text-left">
          <p className="text-xs text-neutral-500">© 2026 AIRO eMed Inc. All rights reserved. Prescription products require an online consultation with a licensed clinician.</p>
        </div>
      </footer>
    </div>
  );
}