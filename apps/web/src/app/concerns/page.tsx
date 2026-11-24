'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface ConcernItem {
  id: string;
  audience: 'HIM' | 'HER' | 'ALL';
  category: 'HAIR' | 'SKIN' | 'SEXUAL_HEALTH' | 'WEIGHT';
  title: string;
  desc: string;
  tag: string;
  status: string;
  image: string;
}

const CONCERNS: ConcernItem[] = [
  // HAIR CARE - HIM (Real High-Definition Concern Stage Photos)
  { id: 'hair-1', audience: 'HIM', category: 'HAIR', title: 'Male pattern hair loss', desc: 'Androgenetic / male pattern hair loss across crown & temples', tag: 'Rx Regrowth', status: 'Online Doctor Consult', image: '/images/concerns/hims/male-pattern-hair-loss.png' },
  { id: 'hair-2', audience: 'HIM', category: 'HAIR', title: 'Receding Hairline', desc: 'Receding hairline & temple restoration', tag: 'Early Action', status: 'Online Doctor Consult', image: '/images/concerns/hims/receding-hairline.png' },
  { id: 'hair-3', audience: 'HIM', category: 'HAIR', title: 'Deep Receding Hairline', desc: 'Advanced temple recession (Norwood 3+)', tag: 'Targeted Rx', status: 'Online Doctor Consult', image: '/images/concerns/hims/deep-receding-hairline.png' },
  { id: 'hair-4', audience: 'HIM', category: 'HAIR', title: 'Thinning Hair', desc: 'Diffuse hair thinning & density loss', tag: 'Density Rx', status: 'Online Doctor Consult', image: '/images/concerns/hims/thinning-hair.png' },
  { id: 'hair-5', audience: 'HIM', category: 'HAIR', title: 'Crown Hair Loss', desc: 'Thinning or balding at the crown / vertex', tag: 'Targeted Care', status: 'Online Doctor Consult', image: '/images/concerns/hims/crown-hair-loss.png' },
  { id: 'hair-6', audience: 'HIM', category: 'HAIR', title: 'Crown Balding Spot', desc: 'Visible circular thinning at the crown', tag: 'Vertex Regrowth', status: 'Online Doctor Consult', image: '/images/concerns/hims/crown-balding.png' },
  { id: 'hair-7', audience: 'HIM', category: 'HAIR', title: 'Patchy Hair Loss', desc: 'Defined circular bald spots (alopecia areata)', tag: 'Clinical Focus', status: 'Online Doctor Consult', image: '/images/concerns/hims/patchy-hair-loss.png' },
  { id: 'hair-8', audience: 'HIM', category: 'HAIR', title: 'Excessive Hair Shedding', desc: 'Noticeable daily shedding & fallout', tag: 'Follicle Reset', status: 'Online Doctor Consult', image: '/images/concerns/hims/hair-shedding.png' },
  { id: 'hair-9', audience: 'HIM', category: 'HAIR', title: 'Weak or Damaged Hair', desc: 'Dry, brittle, thinning or graying strands', tag: 'Scalp Health', status: 'Online Doctor Consult', image: '/images/concerns/hims/weak-damaged-hair.png' },
  { id: 'hair-10', audience: 'HIM', category: 'HAIR', title: 'Prevent Hair Loss', desc: 'Maintain full density & protect healthy follicles', tag: 'Prevention', status: 'Online Doctor Consult', image: '/images/concerns/hims/prevent-hair-loss.png' },

  // HAIR CARE - HER (Real High-Definition Concern Stage Photos)
  { id: 'hair-w-1', audience: 'HER', category: 'HAIR', title: 'Female Pattern Thinning', desc: 'Diffuse scalp thinning & density reduction', tag: "Women's Rx", status: 'Online Doctor Consult', image: '/images/concerns/hers/female-pattern-thinning.png' },
  { id: 'hair-w-2', audience: 'HER', category: 'HAIR', title: 'Part Line Widening', desc: 'Noticeable space expanding along the center part', tag: 'Early Action', status: 'Online Doctor Consult', image: '/images/concerns/hers/part-line-widening.png' },
  { id: 'hair-w-3', audience: 'HER', category: 'HAIR', title: 'Moderate Part Widening', desc: 'Progressive part line separation (Ludwig II)', tag: 'Targeted Rx', status: 'Online Doctor Consult', image: '/images/concerns/hers/part-line-widening-moderate.png' },
  { id: 'hair-w-4', audience: 'HER', category: 'HAIR', title: 'Diffuse Thinning Along Part', desc: 'Overall scalp visibility & crown density loss', tag: 'Density Boost', status: 'Online Doctor Consult', image: '/images/concerns/hers/diffuse-thinning.png' },
  { id: 'hair-w-5', audience: 'HER', category: 'HAIR', title: 'Receding Frontal Hairline', desc: 'Frontal edges and temple line thinning', tag: 'Edge Care', status: 'Online Doctor Consult', image: '/images/concerns/hers/receding-hairline.png' },
  { id: 'hair-w-6', audience: 'HER', category: 'HAIR', title: 'Excessive Daily Shedding', desc: 'Handfuls of shedding in the shower or brush', tag: 'Follicle Reset', status: 'Online Doctor Consult', image: '/images/concerns/hers/hair-shedding.png' },
  { id: 'hair-w-7', audience: 'HER', category: 'HAIR', title: 'Postpartum Hair Shedding', desc: 'Hormonal shedding & recovery post-childbirth', tag: 'Postpartum Care', status: 'Online Doctor Consult', image: '/images/concerns/hers/postpartum-shedding.png' },
  { id: 'hair-w-8', audience: 'HER', category: 'HAIR', title: 'Patchy Hair Loss', desc: 'Circular localized bald spots needing clinical care', tag: 'Specialist Care', status: 'Online Doctor Consult', image: '/images/concerns/hers/patchy-hair-loss.png' },
  { id: 'hair-w-9', audience: 'HER', category: 'HAIR', title: 'Weak, Brittle & Split Ends', desc: 'Breakage, dryness, and split damaged ends', tag: 'Hair Health', status: 'Online Doctor Consult', image: '/images/concerns/hers/weak-damaged-hair.png' },
  { id: 'hair-w-10', audience: 'HER', category: 'HAIR', title: 'Prevent Hair Loss', desc: 'Protect volume, scalp nutrition & follicle vitality', tag: 'Prevention', status: 'Online Doctor Consult', image: '/images/concerns/hers/prevent-hair-loss.png' },

  // SKINCARE (ALL)
  { id: 'skin-1', audience: 'ALL', category: 'SKIN', title: 'Dark Spots', desc: 'Fade melasma, sun spots, and post-acne marks', tag: 'Brightening', status: 'Clinician Evaluated', image: '/images/card-prod-glow-serum.jpg' },
  { id: 'skin-2', audience: 'ALL', category: 'SKIN', title: 'Anti-Aging', desc: 'Prescription retinoid, tretinoin, and peptides formulas', tag: 'Cellular Renewal', status: 'Clinician Evaluated', image: '/images/card-prod-tretinoin.jpg' },
  { id: 'skin-3', audience: 'ALL', category: 'SKIN', title: 'Redness & Rosacea', desc: 'Doctor-prescribed creams to calm rosacea redness', tag: 'Calming Therapy', status: 'Clinician Evaluated', image: '/images/slide-0-skin.jpg' },
  { id: 'skin-4', audience: 'ALL', category: 'SKIN', title: 'Body', desc: 'Prescription body treatments for back, arms & chest', tag: 'Full Body Rx', status: 'Clinician Evaluated', image: '/images/cat-skin.jpg' },
  { id: 'skin-5', audience: 'ALL', category: 'SKIN', title: 'Acne', desc: 'Prescription compound targeting excess oil & bacteria', tag: 'Blemish Clear', status: 'Clinician Evaluated', image: '/images/card-prod-clear-gel.jpg' },
  { id: 'skin-6', audience: 'ALL', category: 'SKIN', title: 'Sleep & Wellness', desc: 'Topical bedtime cream with magnesium & melatonin', tag: 'Night Recovery', status: 'Clinician Evaluated', image: '/images/slide-skin.jpg' },

  // SEXUAL HEALTH (Editorial Knit Metaphor Imagery from Hims)
  { id: 'sex-1', audience: 'HIM', category: 'SEXUAL_HEALTH', title: 'Erectile Dysfunction (ED)', desc: 'Difficulty getting or keeping an erection firm', tag: 'Discreet Delivery', status: 'Licensed Physician Rx', image: '/images/concerns/sexual/erectile-dysfunction.jpg' },
  { id: 'sex-2', audience: 'HIM', category: 'SEXUAL_HEALTH', title: 'Premature Ejaculation (PE)', desc: 'Climaxing sooner than desired — delay therapy & stamina', tag: 'Last Longer', status: 'Licensed Physician Rx', image: '/images/concerns/sexual/premature-ejaculation.jpg' },

  // WEIGHT MANAGEMENT (ALL)
  { id: 'weight-1', audience: 'ALL', category: 'WEIGHT', title: 'Lose Weight', desc: 'Support healthy clinically-guided weight loss', tag: 'GLP-1 Therapy', status: 'Doctor-Guided Rx', image: '/images/weight-pens-editorial.jpg' },
  { id: 'weight-2', audience: 'ALL', category: 'WEIGHT', title: 'Reduce Belly Fat', desc: 'Target stubborn visceral and belly fat', tag: 'Metabolic Boost', status: 'Doctor-Guided Rx', image: '/images/slide-3-weight.jpg' },
  { id: 'weight-3', audience: 'ALL', category: 'WEIGHT', title: 'Control Appetite', desc: 'Manage persistent hunger and quiet food noise', tag: 'Appetite Care', status: 'Doctor-Guided Rx', image: '/images/card-prod-semaglutide-tablets.jpg' },
  { id: 'weight-4', audience: 'ALL', category: 'WEIGHT', title: 'Emotional Eating', desc: 'Address stress-related snacking and triggers', tag: 'Mind & Diet', status: 'Doctor-Guided Rx', image: '/images/cat-weight.jpg' },
  { id: 'weight-5', audience: 'ALL', category: 'WEIGHT', title: 'Slow Metabolism', desc: 'Support an underactive metabolism with activators', tag: 'Energy Metabolism', status: 'Doctor-Guided Rx', image: '/images/card-prod-metformin.jpg' },
  { id: 'weight-6', audience: 'ALL', category: 'WEIGHT', title: 'Obesity', desc: 'Clinically guided steady medical care', tag: 'Doctor Guided', status: 'Doctor-Guided Rx', image: '/images/weight-him-card.jpg' },
  { id: 'weight-7', audience: 'ALL', category: 'WEIGHT', title: 'Weight Gain Due to Diabetes', desc: 'Dual GIP/GLP-1 receptor therapies for metabolic wellness', tag: 'Dual Incretin', status: 'Doctor-Guided Rx', image: '/images/card-prod-wegovy.jpg' },
  { id: 'weight-8', audience: 'ALL', category: 'WEIGHT', title: 'Weight Loss Plateau', desc: 'Break through a weight-loss plateau with formula update', tag: 'Plateau Reset', status: 'Doctor-Guided Rx', image: '/images/weight-main-editorial.jpg' },
  { id: 'weight-9', audience: 'ALL', category: 'WEIGHT', title: 'Improve Blood Sugar', desc: 'Support healthier post-meal glucose and insulin response', tag: 'Glycemic Health', status: 'Doctor-Guided Rx', image: '/images/slide-weight.jpg' },
  { id: 'weight-10', audience: 'ALL', category: 'WEIGHT', title: 'Maintain Weight', desc: 'Keep weight steady long-term with maintenance care', tag: 'Long-Term Goal', status: 'Doctor-Guided Rx', image: '/images/weight-her-card.jpg' },
  { id: 'weight-11', audience: 'ALL', category: 'WEIGHT', title: 'Build Lean Muscle While Losing Weight', desc: 'Lose fat while preserving muscle definition', tag: 'Body Composition', status: 'Doctor-Guided Rx', image: '/images/hero-weight.jpg' },
  { id: 'weight-12', audience: 'ALL', category: 'WEIGHT', title: 'Improve Energy Levels', desc: 'Boost daily vitality while managing weight', tag: 'Vitality Boost', status: 'Doctor-Guided Rx', image: '/images/card-prod-b12.jpg' }
];

export default function ConcernsPage() {
  const [audience, setAudience] = useState<'HIM' | 'HER'>('HIM');
  const [filter, setFilter] = useState<'ALL' | 'HAIR' | 'WEIGHT' | 'SEXUAL_HEALTH' | 'SKIN'>('ALL');
  const [intakeModalOpen, setIntakeModalOpen] = useState(false);
  const [selectedConcern, setSelectedConcern] = useState<string>('Male pattern hair loss');
  const [selectedState, setSelectedState] = useState<string>('TX');
  const triggerRef = React.useRef<HTMLElement | null>(null);
  const stateSelectRef = React.useRef<HTMLSelectElement>(null);

  const categories = [
    { key: 'HAIR' as const, label: 'Hair Care', sub: 'Clinically proven follicle regrowth, retention & density' },
    { key: 'SKIN' as const, label: 'Skin Care', sub: 'Custom dermatological formulas for tone, texture & aging' },
    { key: 'SEXUAL_HEALTH' as const, label: 'Sexual Health', sub: 'Discreet doctor consultation & proven performance solutions' },
    { key: 'WEIGHT' as const, label: 'Weight Management', sub: 'Modern GLP-1 & metabolic therapies guided by medical doctors' }
  ];

  const activeCategories = filter === 'ALL'
    ? categories
    : categories.filter(c => c.key === filter);

  const startIntake = (title: string, e?: React.MouseEvent<HTMLElement>) => {
    const item = CONCERNS.find(c => c.title === title);
    const cat = item ? item.category : 'HAIR';
    window.location.href = `/questionnaire.html?category=${cat}&audience=${audience}&concern=${encodeURIComponent(title)}`;
  };

  useEffect(() => {
    if (intakeModalOpen) {
      stateSelectRef.current?.focus();
    } else if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [intakeModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIntakeModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [activeMegaMenu, setActiveMegaMenu] = useState<'treatments' | 'shop' | null>(null);

  const toggleMegaMenu = (menu: 'treatments' | 'shop') => {
    setActiveMegaMenu(prev => prev === menu ? null : menu);
  };

  const closeMegaMenus = () => {
    setActiveMegaMenu(null);
  };

  const heroImageSrc = audience === 'HIM' 
    ? '/images/hero-concern-him.jpg' 
    : '/images/hero-concern-her.jpg';

  // Calculate total visible items
  const totalCount = activeCategories.reduce((acc, cat) => {
    return acc + CONCERNS.filter(c => c.category === cat.key && (c.audience === 'ALL' || c.audience === audience)).length;
  }, 0);

  return (
    <div className="bg-white text-[#191817] font-sans antialiased min-h-screen flex flex-col selection:bg-[#1E40AF]/15 selection:text-[#0F265C]">
      {/* GLOBAL HEADER */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E5E0D8] transition-all duration-300">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 h-20 flex items-center justify-between">
          <Link href="/" className="brand-logo flex items-baseline space-x-1.5 group select-none">
            <span className="brand-airo font-extrabold text-2xl sm:text-3xl tracking-tight text-[#191817]">AIRO</span>
            <span className="brand-emed text-xl sm:text-2xl font-normal text-[#191817]/85 tracking-tight">eMed</span>
          </Link>

          {/* Nav Capsule */}
          <nav className="nav-capsule flex items-center bg-[#EBE5DC] border border-[#DDD5C9]/70 px-2 py-1.5 rounded-full space-x-1 sm:space-x-1.5 text-xs font-semibold text-[#191817] shadow-sm relative">
            <Link href="/concerns" className="nav-pill-btn active bg-white text-[#191817] shadow-md border border-[#DDD5C9] flex items-center space-x-1.5 px-4 py-1.5 rounded-full font-semibold transition-all duration-200">
              <span>Concerns</span>
            </Link>
            <button
              type="button"
              onClick={() => toggleMegaMenu('treatments')}
              aria-expanded={activeMegaMenu === 'treatments'}
              className={`nav-pill-btn flex items-center space-x-1.5 px-4 py-1.5 rounded-full font-semibold transition-all duration-200 cursor-pointer ${
                activeMegaMenu === 'treatments' ? 'active bg-white text-[#191817] shadow-md border border-[#DDD5C9]' : 'text-[#191817]/85 hover:bg-[#FAF7F2]/60'
              }`}
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

          {/* Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link href="/#catalog-section" className="nav-icon-btn hover:text-[#1B3328] transition-colors p-1" title="Search Treatments">
              <svg className="w-5 h-5 text-[#191817]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </Link>
            <Link href="/#catalog-section" className="nav-icon-btn hover:text-[#1B3328] transition-colors p-1" title="My Account">
              <svg className="w-5 h-5 text-[#191817]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </Link>
            <Link href="/#catalog-section" className="nav-icon-btn hover:text-[#1B3328] transition-colors p-1" title="Start Consultation">
              <svg className="w-5 h-5 text-[#191817]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            </Link>
            <Link href="/#catalog-section" className="hidden sm:inline-flex items-center space-x-1.5 bg-[#191817] hover:bg-black text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-sm transition-all duration-200 active:scale-95">
              <span>View All Treatments</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>
        </div>

        {/* TREATMENTS MEGA MENU (Exact match to User Reference Image) */}
        <div id="treatments-mega-menu" className={`mega-menu-panel ${activeMegaMenu === 'treatments' ? 'active' : ''}`} role="region" aria-label="Treatments Menu">
          <div className="mega-menu-card bg-white rounded-3xl p-7 sm:p-8 lg:p-10 shadow-2xl border border-[#EAE5DD]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              
              {/* COLUMN 1: Hims */}
              <div className="lg:col-span-4 flex flex-col justify-start">
                <h3 className="dropdown-col-title">Hims</h3>
                <div className="space-y-4">
                  <Link href="/concerns?category=HAIR_LOSS&audience=HIM" onClick={closeMegaMenus} className="dropdown-menu-item group block">
                    <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Hair</div>
                    <p className="dropdown-item-desc">Thinning · regrowth · postpartum</p>
                  </Link>

                  <Link href="/concerns?category=SEXUAL_HEALTH_ED&audience=HIM" onClick={closeMegaMenus} className="dropdown-menu-item group block">
                    <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Sexual Health</div>
                    <p className="dropdown-item-desc">Performance · wellness</p>
                  </Link>

                  <Link href="/concerns?category=DERMATOLOGY&audience=HIM" onClick={closeMegaMenus} className="dropdown-menu-item group block">
                    <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Skin</div>
                    <p className="dropdown-item-desc">Skin</p>
                  </Link>

                  <Link href="/concerns?category=WEIGHT_MANAGEMENT&audience=HIM" onClick={closeMegaMenus} className="dropdown-menu-item group block">
                    <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Weight Management</div>
                    <p className="dropdown-item-desc">GLP-1 & metabolic care</p>
                  </Link>
                </div>
              </div>

              {/* COLUMN 2: Hers */}
              <div className="lg:col-span-4 flex flex-col justify-start">
                <h3 className="dropdown-col-title">Hers</h3>
                <div className="space-y-4">
                  <Link href="/concerns?category=HAIR_LOSS&audience=HER" onClick={closeMegaMenus} className="dropdown-menu-item group block">
                    <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Hair</div>
                    <p className="dropdown-item-desc">Thinning · regrowth · postpartum</p>
                  </Link>

                  <Link href="/concerns?category=DERMATOLOGY&audience=HER" onClick={closeMegaMenus} className="dropdown-menu-item group block">
                    <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Skin</div>
                    <p className="dropdown-item-desc">Skin</p>
                  </Link>

                  <Link href="/concerns?category=WEIGHT_MANAGEMENT&audience=HER" onClick={closeMegaMenus} className="dropdown-menu-item group block">
                    <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Weight Management</div>
                    <p className="dropdown-item-desc">GLP-1 & metabolic care</p>
                  </Link>
                </div>
              </div>

              {/* COLUMN 3: Photo Card (Couple Image from Reference) */}
              <div className="lg:col-span-4 flex items-center">
                <div className="block w-full h-[280px] sm:h-[320px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm bg-neutral-100 group select-none">
                  <img src="/images/mega-menu-treatments-couple.jpg" alt="AIRO eMed Treatments" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 rounded-2xl sm:rounded-3xl" />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* SHOP DROPDOWN MENU (Exact match to User Reference Image) */}
        <div id="shop-mega-menu" className={`mega-menu-panel shop-dropdown-panel ${activeMegaMenu === 'shop' ? 'active' : ''}`} role="region" aria-label="Shop Menu">
          <div className="mega-menu-card bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#EAE5DD]">
            <div className="space-y-4">
              <Link href="/#catalog-section" onClick={closeMegaMenus} className="dropdown-menu-item group block">
                <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Hair</div>
                <p className="dropdown-item-desc">Thinning · regrowth · postpartum</p>
              </Link>

              <Link href="/#catalog-section" onClick={closeMegaMenus} className="dropdown-menu-item group block">
                <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Sexual Health</div>
                <p className="dropdown-item-desc">Performance · wellness</p>
              </Link>

              <Link href="/#catalog-section" onClick={closeMegaMenus} className="dropdown-menu-item group block">
                <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Skin</div>
                <p className="dropdown-item-desc">Skin</p>
              </Link>

              <Link href="/#catalog-section" onClick={closeMegaMenus} className="dropdown-menu-item group block">
                <div className="dropdown-item-title group-hover:text-[#1E6BFF] transition-colors">Weight Management</div>
                <p className="dropdown-item-desc">GLP-1 & metabolic care</p>
              </Link>
            </div>

            {/* Browse All Treatments Link with Underline */}
            <div className="pt-6 mt-2 border-t border-[#F0ECE4]">
              <Link href="/#catalog-section" onClick={closeMegaMenus} className="dropdown-browse-link">
                <span>Browse All Treatments</span>
                <span className="font-bold">→</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-6 sm:py-10">
        
        {/* HERO SECTION MATCHING REFERENCE IMAGE 1 */}
        <section className="concern-hero-card mb-12 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[360px] sm:min-h-[420px] lg:min-h-[460px]">
            {/* Left Content */}
            <div className="p-6 sm:p-10 lg:p-14 lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-5 z-10">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#615C56] block">
                SELECT A CONCERN
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-[#191817] tracking-tight leading-[1.08]">
                What would you like to treat?
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-[#6E6962] font-normal leading-relaxed max-w-xl">
                Choose a concern to start a short clinical questionnaire — we&apos;ll match treatments after you finish.
              </p>

              {/* Segmented Capsule Toggle: [ Hims ] [ Hers ] */}
              <div className="pt-2">
                <div className="inline-flex p-1 bg-[#EBE5DC] rounded-full border border-[#DDD5C9]/80 shadow-inner" role="group" aria-label="Target audience">
                  <button
                    type="button"
                    onClick={() => setAudience('HIM')}
                    aria-pressed={audience === 'HIM'}
                    className={`px-7 sm:px-8 py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                      audience === 'HIM' ? 'bg-[#0F2119] text-white shadow-sm' : 'text-[#191817]/75 hover:text-black'
                    }`}
                  >
                    Hims
                  </button>
                  <button
                    type="button"
                    onClick={() => setAudience('HER')}
                    aria-pressed={audience === 'HER'}
                    className={`px-7 sm:px-8 py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                      audience === 'HER' ? 'bg-[#0F2119] text-white shadow-sm' : 'text-[#191817]/75 hover:text-black'
                    }`}
                  >
                    Hers
                  </button>
                </div>
              </div>
            </div>

            {/* Right Photo */}
            <div className="relative w-full h-[280px] sm:h-[360px] lg:h-full min-h-[340px] lg:min-h-[460px] lg:col-span-5 overflow-hidden flex items-center justify-center">
              <img
                src={heroImageSrc}
                alt="Healthcare for How You Live Today"
                className="w-full h-full object-cover object-center transition-all duration-500 ease-out"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/30 to-transparent lg:w-32 pointer-events-none" />
            </div>
          </div>
        </section>

        {/* CATEGORY FILTER BAR MATCHING REFERENCE IMAGE 2 */}
        <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md py-4 mb-8 sm:mb-12 border-b border-[#E5E0D8]">
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex items-center space-x-2 sm:space-x-3">
              {(['ALL', 'HAIR', 'WEIGHT', 'SEXUAL_HEALTH', 'SKIN'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`concern-category-pill ${filter === cat ? 'active' : ''}`}
                >
                  {cat === 'ALL' && 'All Categories'}
                  {cat === 'HAIR' && 'Hair'}
                  {cat === 'WEIGHT' && 'Weight Management'}
                  {cat === 'SEXUAL_HEALTH' && 'Sexual Health'}
                  {cat === 'SKIN' && 'Skin'}
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-[#615C56] tracking-wider uppercase hidden md:inline-block">
              {totalCount} Conditions
            </span>
          </div>
        </div>

        {/* CONCERNS DIRECTORY WITH CARDS MATCHING REFERENCE IMAGE 3 */}
        <div className="space-y-16">
          {totalCount === 0 ? (
            <div className="text-center py-16 px-4 space-y-4">
              <h3 className="text-xl font-bold text-[#191817]">No conditions currently listed in this category</h3>
              <p className="text-sm text-[#615C56]">Try selecting another category or toggle between Hims and Hers.</p>
              <button type="button" onClick={() => setFilter('ALL')} className="concern-pill-btn mt-2">
                View All Categories
              </button>
            </div>
          ) : (
            activeCategories.map((cat) => {
              const items = CONCERNS.filter(
                (c) => c.category === cat.key && (c.audience === 'ALL' || c.audience === audience)
              );
              if (items.length === 0) return null;

              return (
                <div key={cat.key} className="category-block space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 pb-3 border-b border-[#E5E0D8]">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#B04D28] block">{cat.label}</span>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#191817] mt-0.5">{cat.label}</h2>
                      <p className="text-xs sm:text-sm text-[#615C56] mt-1">{cat.sub}</p>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#DDD5C9] text-[#615C56]">
                      {items.length} Treatments
                    </span>
                  </div>

                  {/* Full-Width Responsive Grid with Sienna Brooks Style Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 sm:gap-6 lg:gap-7">
                    {items.map((item) => (
                      <article
                        key={item.id}
                        className="concern-card group relative"
                      >
                        {/* Inner Rounded Media Canvas (Sienna Brooks Card Style - Text on Image, Zero Overlays) */}
                        <div className="concern-card-inner">
                          <img src={item.image} alt={item.title} className="concern-card-img" loading="lazy" />
                          
                          <div className="concern-inner-header">
                            <h3 className="concern-card-title" title={item.title}>
                              {item.title}
                            </h3>
                            <div className="concern-card-status">
                              <svg aria-hidden="true" className="w-3.5 h-3.5 shrink-0 text-[#55514C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="12" y1="2" x2="12" y2="5" opacity="1" />
                                <line x1="19.07" y1="4.93" x2="16.95" y2="7.05" opacity="0.87" />
                                <line x1="22" y1="12" x2="19" y2="12" opacity="0.75" />
                                <line x1="19.07" y1="19.07" x2="16.95" y2="16.95" opacity="0.62" />
                                <line x1="12" y1="22" x2="12" y2="19" opacity="0.5" />
                                <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" opacity="0.37" />
                                <line x1="2" y1="12" x2="5" y2="12" opacity="0.25" />
                                <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" opacity="0.12" />
                              </svg>
                              <span>{item.status}</span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Footer: Avatar & Capsule Button (NO description, NO divider) */}
                        <div className="concern-card-footer">
                          <div className="concern-clinician-info min-w-0">
                            <div className="relative shrink-0">
                              <img src="/images/doctor-avatar.jpg" alt="Doctor" className="w-8 h-8 rounded-full object-cover border border-[#DDD5C9]" />
                              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-bold text-[#191817] leading-tight truncate">Airo Clinician</span>
                              <span className="text-[10px] text-[#78726A] leading-tight truncate">Rx Prescribed</span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => startIntake(item.title, e)}
                            aria-label={`Start consultation for ${item.title}`}
                            className="concern-pill-btn cursor-pointer after:absolute after:inset-0 after:content-[''] after:z-[5]"
                          >
                            <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
                            <span>Start consult</span>
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* CLINICAL INTAKE MODAL */}
      {intakeModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" 
          role="dialog" 
          aria-modal="true"
          aria-labelledby="modal-concern-title"
        >
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-[#DDD5C9] overflow-hidden p-6 sm:p-8 relative">
            <button
              onClick={() => setIntakeModalOpen(false)}
              aria-label="Close modal"
              className="absolute top-5 right-5 text-[#615C56] hover:text-[#191817] p-2 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="text-center space-y-2 mb-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#1E40AF]">3-Minute Clinical Intake</span>
              <h3 id="modal-concern-title" className="text-2xl sm:text-3xl font-bold text-[#191817]">{selectedConcern}</h3>
              <p className="text-xs sm:text-sm text-[#6E6962]">US licensed physicians evaluate your case and prescribe personalized medical formulations.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="modal-state" className="text-xs font-bold text-[#191817] block mb-1">State of Residence</label>
                <select
                  id="modal-state"
                  ref={stateSelectRef}
                  value={selectedState}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedState(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DDD5C9] rounded-xl px-4 py-2.5 text-xs font-semibold text-[#191817] focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                >
                  <option value="TX">Texas (TX) — Immediate Clinician Available</option>
                  <option value="CA">California (CA) — Immediate Clinician Available</option>
                  <option value="NY">New York (NY) — Immediate Clinician Available</option>
                  <option value="FL">Florida (FL) — Immediate Clinician Available</option>
                  <option value="IL">Illinois (IL) — Immediate Clinician Available</option>
                </select>
              </div>

              <div>
                <label htmlFor="modal-goal" className="text-xs font-bold text-[#191817] block mb-1">Primary Treatment Goal</label>
                <input
                  id="modal-goal"
                  type="text"
                  defaultValue={`Personalized treatment for ${selectedConcern}`}
                  className="w-full bg-[#FAF8F5] border border-[#DDD5C9] rounded-xl px-4 py-2.5 text-xs font-medium text-[#191817] focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  alert(`Connecting you to a US-licensed physician in ${selectedState} for: ${selectedConcern}. Redirecting to secure intake review...`);
                  setIntakeModalOpen(false);
                }}
                className="w-full bg-[#191817] hover:bg-black text-white font-semibold py-3.5 rounded-full text-xs sm:text-sm transition-all duration-200 shadow-md mt-4 active:scale-95 cursor-pointer"
              >
                Match Treatments with Doctor →
              </button>
              <p className="text-[11px] text-center text-[#615C56]">Zero ad tracking. HIPAA & Telehealth Compliant.</p>
            </div>
          </div>
        </div>
      )}

      {/* ROYAL NAVY FOOTER */}
      <footer className="bg-[#0F1B38] text-white pt-16 sm:pt-20 pb-8 mt-20 relative overflow-hidden">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-baseline space-x-2">
                <span className="font-serif font-bold text-3xl sm:text-4xl text-white">AIRO</span>
                <span className="font-serif font-normal text-3xl sm:text-4xl text-white">eMed</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md">Doctor-led care for hair, skin, weight and sexual wellness. Delivered discreetly to your door.</p>
            </div>
            <div className="lg:col-span-6 flex flex-wrap gap-8 justify-between text-xs text-slate-300">
              <div className="space-y-2">
                <strong className="text-white block uppercase tracking-wider text-[11px]">Directory</strong>
                <Link href="/concerns" className="block hover:text-white">All Concerns</Link>
                <Link href="/#catalog-section" className="block hover:text-white">All Treatments</Link>
                <Link href="/#how-it-works" className="block hover:text-white">How Airo Works</Link>
              </div>
              <div className="space-y-2">
                <strong className="text-white block uppercase tracking-wider text-[11px]">Clinical Safety</strong>
                <Link href="/#doctors" className="block hover:text-white">Licensed Medical Board</Link>
                <span className="block text-slate-400">CDSCO & FDA Partner Compliant</span>
                <span className="block text-slate-400">HIPAA Protected Records</span>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700/60 mt-12 pt-6 text-[11px] text-slate-400 text-center">
            © 2026 AIRO eMed US Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
