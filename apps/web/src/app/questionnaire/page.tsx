'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface PhotoCardItem {
  id: string;
  title: string;
  image: string;
}

interface PhotoUploadSlot {
  id: string;
  name: string;
  guide: string;
  refImage: string;
}

interface StepConfig {
  id: string;
  type: 'photo_grid_multi' | 'photo_grid_single' | 'radio' | 'checkbox' | 'interstitial' | 'photo_upload' | 'bmi_metrics' | 'final_step' | 'results';
  title: string;
  subtitle?: string;
  safetyAlert?: string;
  whyWeAsk?: string;
  items?: PhotoCardItem[];
  options?: string[];
  slots?: PhotoUploadSlot[];
  required: boolean;
}

const HAIR_CONCERNS_MEN: PhotoCardItem[] = [
  { id: 'male-pattern-hair-loss', title: 'Male pattern hair loss', image: '/images/concerns/hims/male-pattern-hair-loss.png' },
  { id: 'receding-hairline', title: 'Receding Hairline', image: '/images/concerns/hims/receding-hairline.png' },
  { id: 'deep-receding-hairline', title: 'Deep Receding Hairline', image: '/images/concerns/hims/deep-receding-hairline.png' },
  { id: 'thinning-hair', title: 'Thinning Hair', image: '/images/concerns/hims/thinning-hair.png' },
  { id: 'crown-hair-loss', title: 'Crown Hair Loss', image: '/images/concerns/hims/crown-hair-loss.png' },
  { id: 'crown-balding', title: 'Crown Balding Spot', image: '/images/concerns/hims/crown-balding.png' },
  { id: 'patchy-hair-loss', title: 'Patchy Hair Loss', image: '/images/concerns/hims/patchy-hair-loss.png' },
  { id: 'hair-shedding', title: 'Excessive Hair Shedding', image: '/images/concerns/hims/hair-shedding.png' },
  { id: 'weak-damaged-hair', title: 'Weak or Damaged Hair', image: '/images/concerns/hims/weak-damaged-hair.png' },
  { id: 'prevent-hair-loss', title: 'Prevent Hair Loss', image: '/images/concerns/hims/prevent-hair-loss.png' },
  { id: 'not-sure', title: 'Not Sure', image: '/images/intake/concern-not-sure.jpg' }
];

const HAIR_CONCERNS_WOMEN: PhotoCardItem[] = [
  { id: 'female-pattern-thinning', title: 'Female Pattern Thinning', image: '/images/concerns/hers/female-pattern-thinning.png' },
  { id: 'part-line-widening', title: 'Part Line Widening', image: '/images/concerns/hers/part-line-widening.png' },
  { id: 'part-line-widening-moderate', title: 'Moderate Part Widening', image: '/images/concerns/hers/part-line-widening-moderate.png' },
  { id: 'diffuse-thinning', title: 'Diffuse Thinning Along Part', image: '/images/concerns/hers/diffuse-thinning.png' },
  { id: 'receding-hairline', title: 'Receding Frontal Hairline', image: '/images/concerns/hers/receding-hairline.png' },
  { id: 'hair-shedding', title: 'Excessive Daily Shedding', image: '/images/concerns/hers/hair-shedding.png' },
  { id: 'postpartum-shedding', title: 'Postpartum Hair Shedding', image: '/images/concerns/hers/postpartum-shedding.png' },
  { id: 'patchy-loss', title: 'Patchy Hair Loss', image: '/images/concerns/hers/patchy-hair-loss.png' },
  { id: 'weak-damaged-hair', title: 'Weak, Brittle & Split Ends', image: '/images/concerns/hers/weak-damaged-hair.png' },
  { id: 'prevent-thinning', title: 'Prevent Hair Loss', image: '/images/concerns/hers/prevent-hair-loss.png' },
  { id: 'not-sure-w', title: 'Not Sure', image: '/images/intake/concern-not-sure.jpg' }
];

const SEXUAL_HEALTH_CONCERNS: PhotoCardItem[] = [
  { id: 'erectile-dysfunction', title: 'Erectile Dysfunction (ED)', image: '/images/concerns/sexual/erectile-dysfunction.jpg' },
  { id: 'premature-ejaculation', title: 'Premature Ejaculation (PE)', image: '/images/concerns/sexual/premature-ejaculation.jpg' },
  { id: 'both-ed-pe', title: 'Both Performance & Control', image: '/images/card-prod-sildenafil.jpg' }
];

const SKIN_CONCERNS_MEN: PhotoCardItem[] = [
  { id: 'dark-spots', title: 'Dark Spots & Melasma', image: '/images/card-prod-glow-serum.jpg' },
  { id: 'acne', title: 'Acne & Breakouts', image: '/images/card-prod-clear-gel.jpg' },
  { id: 'anti-aging', title: 'Anti-Aging & Fine Lines', image: '/images/card-prod-tretinoin.jpg' },
  { id: 'body', title: 'Body Skin Concerns', image: '/images/cat-skin.jpg' },
  { id: 'rosacea', title: 'Redness & Rosacea', image: '/images/slide-0-skin.jpg' },
  { id: 'sleep-skin', title: 'Sleep & Night Recovery', image: '/images/slide-skin.jpg' },
  { id: 'longevity', title: 'Cellular Longevity', image: '/images/hero-skin.jpg' }
];

const SKIN_CONCERNS_WOMEN: PhotoCardItem[] = [
  { id: 'dark-spots', title: 'Dark Spots & Hyperpigmentation', image: '/images/card-prod-glow-serum.jpg' },
  { id: 'anti-aging', title: 'Anti-Aging & Wrinkles', image: '/images/card-prod-tretinoin.jpg' },
  { id: 'rosacea', title: 'Redness & Rosacea', image: '/images/slide-0-skin.jpg' },
  { id: 'body', title: 'Body Acne & Texture', image: '/images/cat-skin.jpg' },
  { id: 'acne', title: 'Adult & Hormonal Acne', image: '/images/card-prod-clear-gel.jpg' },
  { id: 'unwanted-facial-hair', title: 'Unwanted Facial Hair', image: '/images/womens-hair-seed.jpg' },
  { id: 'menopause-skin', title: 'Menopause Skin Care', image: '/images/womens-hair-lifestyle.jpg' },
  { id: 'sleep-skin', title: 'Sleep & Night Wellness', image: '/images/slide-skin.jpg' }
];

const US_STATES = [
  { code: 'TX', name: 'Texas (TX) — Immediate Clinician Available' },
  { code: 'CA', name: 'California (CA) — Immediate Clinician Available' },
  { code: 'NY', name: 'New York (NY) — Immediate Clinician Available' },
  { code: 'FL', name: 'Florida (FL) — Immediate Clinician Available' },
  { code: 'IL', name: 'Illinois (IL) — Immediate Clinician Available' },
  { code: 'PA', name: 'Pennsylvania (PA)' },
  { code: 'OH', name: 'Ohio (OH)' },
  { code: 'GA', name: 'Georgia (GA)' },
  { code: 'NC', name: 'North Carolina (NC)' },
  { code: 'MI', name: 'Michigan (MI)' },
  { code: 'NJ', name: 'New Jersey (NJ)' },
  { code: 'VA', name: 'Virginia (VA)' },
  { code: 'WA', name: 'Washington (WA)' }
];

export default function QuestionnairePage() {
  const [category, setCategory] = useState<'HAIR' | 'SKIN' | 'SEXUAL_HEALTH' | 'WEIGHT'>('HAIR');
  const [audience, setAudience] = useState<'HIM' | 'HER'>('HIM');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({
    selectedConcerns: [],
    uploadedPhotos: {},
    state: 'TX',
    dob: '1995-06-15',
    termsAgreed: true,
    height: 178,
    weight: 88,
    goalWeight: 76
  });

  // Build steps
  const steps: StepConfig[] = [];
  const isHair = category === 'HAIR';
  const isSkin = category === 'SKIN';
  const isSex = category === 'SEXUAL_HEALTH';
  const isWeight = category === 'WEIGHT';
  const isHim = audience === 'HIM';

  if (isHair || isSkin || isSex) {
    let concernItems: PhotoCardItem[] = [];
    if (isHair) {
      concernItems = isHim ? HAIR_CONCERNS_MEN : HAIR_CONCERNS_WOMEN;
    } else if (isSkin) {
      concernItems = isHim ? SKIN_CONCERNS_MEN : SKIN_CONCERNS_WOMEN;
    } else if (isSex) {
      concernItems = SEXUAL_HEALTH_CONCERNS;
    }

    steps.push({
      id: 'step_concern_selection',
      type: 'photo_grid_multi',
      title: "What's your concern?",
      subtitle: "Select all that apply.",
      items: concernItems,
      required: true
    });
  }

  if (isHair) {
    steps.push({
      id: 'hair_goal',
      type: 'radio',
      title: "What's your hair goal?",
      options: ["Regrow lost hair", "Keep the hair I have", "Both"],
      required: true
    });

    steps.push({
      id: 'hair_areas',
      type: 'photo_grid_single',
      title: "Where are you noticing changes?",
      subtitle: "Select the primary area of hair changes.",
      items: [
        { id: 'hairline', title: 'Hairline', image: '/images/intake/area-hairline.jpg' },
        { id: 'crown', title: 'Crown / top', image: '/images/intake/area-crown.jpg' },
        { id: 'thinning', title: 'Overall thinning', image: '/images/intake/area-overall-thinning.jpg' },
        { id: 'all-over', title: isHim ? 'All over' : 'Random diffuse loss', image: '/images/intake/area-all-over.jpg' }
      ],
      required: true
    });

    steps.push({
      id: 'hair_duration',
      type: 'radio',
      title: "How long has this been happening?",
      options: ["Less than 6 months", "6–12 months", "1–3 years", "3+ years"],
      required: true
    });

    steps.push({
      id: 'hair_scalp_problems',
      type: 'checkbox',
      title: "Do you have any scalp problems?",
      subtitle: "Select all that apply.",
      whyWeAsk: "Scalp issues can change which hair treatments are suitable for you.",
      options: ["None", "Dandruff", "Itching", "Redness", "Pain", "Rash"],
      required: true
    });

    // Interstitial Slide with Animated Text (Matching Reference Image 3)
    steps.push({
      id: 'hair_interstitial_lifestyle',
      type: 'interstitial',
      title: "Next, let's talk about lifestyle factors.",
      subtitle: "Uncovering which root causes may be affecting you can help us better understand your hair needs.",
      required: false
    });

    steps.push({
      id: 'hair_family',
      type: 'radio',
      title: "Does hair loss run in your family?",
      whyWeAsk: "Genetic sensitivity to DHT is responsible for over 90% of progressive hair loss.",
      options: ["Yes", "No", "Not sure"],
      required: true
    });

    steps.push({
      id: 'hair_format',
      type: 'radio',
      title: "How would you like to treat it?",
      options: ["Oral chew / tablet", "Topical drop / spray", "Both", "Not sure — help me choose"],
      required: true
    });

    steps.push({
      id: 'hair_treated_before',
      type: 'radio',
      title: "Have you treated hair loss before?",
      options: ["No, this is my first time", "Yes — and it worked", "Yes — but it did not work"],
      required: true
    });

    steps.push({
      id: 'hair_medical_conditions',
      type: 'checkbox',
      title: "Do you have any of these conditions?",
      subtitle: "Select all that apply.",
      whyWeAsk: "These can affect which hair treatment is clinically safe for you.",
      options: ["Liver disease", "Prostate condition", "Low blood pressure", "Heart condition", "None"],
      required: true
    });

    if (isHim) {
      steps.push({
        id: 'hair_father_child',
        type: 'radio',
        title: "Are you planning to father a child soon?",
        safetyAlert: "Finasteride and dutasteride can affect fertility parameters, so the physician needs to know.",
        options: ["No", "Yes"],
        required: true
      });
    } else {
      steps.push({
        id: 'hair_pregnancy',
        type: 'radio',
        title: "Are you pregnant, planning to become pregnant, or breastfeeding?",
        safetyAlert: "Certain hair formulations like oral anti-androgens must not be used during pregnancy.",
        options: ["No", "Yes"],
        required: true
      });
    }

    // Photo Upload (Required for Hair)
    steps.push({
      id: 'hair_photos',
      type: 'photo_upload',
      title: "Add photos of your hairline & crown",
      subtitle: "Required for hair clinical assessment — helps the doctor personalize your plan.",
      slots: [
        { id: 'photo_front', name: 'Front hairline', guide: 'Hold hair back so front hairline and temples are clearly visible.', refImage: '/images/intake/ref-front-hairline.jpg' },
        { id: 'photo_crown', name: 'Top of scalp', guide: 'Tilt head forward so crown / vertex is fully visible.', refImage: '/images/intake/ref-top-scalp.jpg' }
      ],
      required: true
    });
  }

  if (isSkin) {
    steps.push({
      id: 'skin_duration',
      type: 'radio',
      title: "How long have you had this concern?",
      options: ["Less than 3 months", "3–12 months", "Over a year", "Many years"],
      required: true
    });

    steps.push({
      id: 'skin_prev_treatment',
      type: 'radio',
      title: "Have you tried prescription treatment for this concern before?",
      options: ["Yes", "No"],
      required: true
    });

    steps.push({
      id: 'skin_photos',
      type: 'photo_upload',
      title: "Add photos of your skin",
      subtitle: "Required for dermatology clinical review — helps the doctor formulate your custom compound.",
      slots: [
        { id: 'photo_front', name: 'Front of face / affected area', guide: 'Ensure natural light on your face without makeup.', refImage: '/images/intake/ref-skin-front.jpg' },
        { id: 'photo_side', name: 'Side profile / close-up', guide: 'Turn slightly to capture the cheeks or jawline.', refImage: '/images/intake/ref-skin-side.jpg' }
      ],
      required: true
    });
  }

  if (isSex) {
    steps.push({
      id: 'sex_help_with',
      type: 'radio',
      title: "What would you like help with?",
      options: ["Getting & staying hard", "Lasting longer", "Both", "Daily confidence"],
      required: true
    });
    steps.push({
      id: 'sex_nitrates',
      type: 'radio',
      title: "Do you take nitrates or any heart / chest-pain medicine?",
      safetyAlert: "CRITICAL SAFETY CHECK: Nitrates must never be combined with PDE5 inhibitors (ED medicine).",
      options: ["No", "Yes", "Not sure"],
      required: true
    });
  }

  if (isWeight) {
    steps.push({
      id: 'weight_goal',
      type: 'radio',
      title: "What's your main goal?",
      options: ["Lose weight", "Improve metabolic health", "Manage type-2 diabetes", "More energy"],
      required: true
    });
    steps.push({
      id: 'weight_metrics',
      type: 'bmi_metrics',
      title: "What is your height and weight?",
      subtitle: "Our medical providers evaluate your body mass index (BMI) for GLP-1 eligibility.",
      required: true
    });
  }

  steps.push({
    id: 'final_step_demographics',
    type: 'final_step',
    title: "Final step — where should we send your plan?",
    subtitle: "Confidential telemedicine verification & licensed doctor matching.",
    required: true
  });

  steps.push({
    id: 'step_results',
    type: 'results',
    title: "Clinical Treatment Plan Matched",
    required: false
  });

  const step = steps[currentStepIndex] || steps[0];
  const totalSteps = steps.length - 1;
  const currentNumber = Math.min(currentStepIndex + 1, totalSteps);
  const percent = Math.min(100, Math.round((currentNumber / totalSteps) * 100));

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#191817] font-sans flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E5E0D8]">
        <div className="w-full px-4 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
          <button
            onClick={handleBack}
            className={`w-10 h-10 rounded-full border border-[#DDD5C9] bg-white flex items-center justify-center text-[#191817] hover:bg-[#F7F5F0] transition-colors cursor-pointer ${
              currentStepIndex === 0 ? 'invisible' : 'visible'
            }`}
          >
            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </button>

          <Link href="/" className="flex items-baseline space-x-1.5 select-none">
            <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-[#191817]">AIRO</span>
            <span className="text-xl sm:text-2xl font-normal text-[#191817]/85 tracking-tight">eMed</span>
          </Link>

          <div className="flex items-center space-x-4">
            <span className="text-xs sm:text-sm font-bold text-[#615C56] tabular-nums">
              {currentNumber}/{totalSteps}
            </span>
            <Link
              href="/concerns"
              className="w-10 h-10 rounded-full border border-[#DDD5C9] bg-white flex items-center justify-center text-[#615C56] hover:text-[#191817] hover:bg-[#F7F5F0]"
            >
              <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </Link>
          </div>
        </div>

        <div className="w-full h-1 bg-[#EBE5DC]">
          <div className="h-full bg-[#0F1B38] transition-all duration-300" style={{ width: `${percent}%` }} />
        </div>
      </header>

      {/* CONTENT */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col justify-between">
        <div>
          {/* Header (Hidden for Results and Interstitial slides) */}
          {step.type !== 'results' && step.type !== 'interstitial' && (
            <div className="mb-8 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-[#191817] tracking-tight leading-tight">
                {step.title}
              </h1>
              {step.subtitle && <p className="text-sm sm:text-base text-[#615C56] mt-2">{step.subtitle}</p>}
            </div>
          )}

          {/* Interstitial Animated Text Slide (Matching Reference Image 3) */}
          {step.type === 'interstitial' && (() => {
            const titleWords = step.title.split(' ');
            const subWords = step.subtitle ? step.subtitle.split(' ') : [];
            const baseDelay = 120;
            const wordSpeed = 70;
            const subStartDelay = baseDelay + titleWords.length * wordSpeed + 220;

            return (
              <div className="min-h-[380px] sm:min-h-[460px] flex flex-col justify-center items-center text-center px-4 sm:px-8 py-8 sm:py-16 max-w-2xl mx-auto">
                <div className="text-2xl sm:text-3xl md:text-4xl font-sans font-semibold text-[#9E4D30] leading-[1.45] tracking-tight mb-6">
                  {titleWords.map((word, i) => (
                    <span
                      key={`t-${i}`}
                      className="animate-word"
                      style={{ animationDelay: `${baseDelay + i * wordSpeed}ms` }}
                    >
                      {word}&nbsp;
                    </span>
                  ))}
                </div>
                {step.subtitle && (
                  <div className="text-base sm:text-lg md:text-xl font-sans font-normal text-[#9E4D30]/90 leading-[1.65] max-w-xl mx-auto">
                    {subWords.map((word, i) => (
                      <span
                        key={`s-${i}`}
                        className="animate-word"
                        style={{ animationDelay: `${subStartDelay + i * wordSpeed}ms` }}
                      >
                        {word}&nbsp;
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}

          {/* Photo Grid Multi */}
          {step.type === 'photo_grid_multi' && step.items && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {step.items.map((item) => {
                const isChecked = (answers.selectedConcerns || []).includes(item.title);
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      const cur = answers.selectedConcerns || [];
                      const next = cur.includes(item.title) ? cur.filter((t: string) => t !== item.title) : [...cur, item.title];
                      setAnswers({ ...answers, selectedConcerns: next });
                    }}
                    className={`q-photo-card ${isChecked ? 'selected' : ''}`}
                  >
                    <div className="w-full aspect-[4/3] bg-neutral-100 overflow-hidden relative">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <div className={`check-indicator absolute top-2 right-2 w-6 h-6 rounded-full bg-[#0F1B38] text-white ${isChecked ? 'flex' : 'hidden'} items-center justify-center shadow-md`}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </div>
                    </div>
                    <div className="p-2.5 text-center">
                      <span className="text-xs sm:text-sm font-semibold text-[#191817] leading-snug line-clamp-2">{item.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Radio */}
          {step.type === 'radio' && step.options && (
            <div className="space-y-3">
              {step.options.map((opt) => {
                const isSelected = answers[step.id] === opt;
                return (
                  <div
                    key={opt}
                    onClick={() => {
                      setAnswers({ ...answers, [step.id]: opt });
                      setTimeout(handleNext, 200);
                    }}
                    className={`q-card-option ${isSelected ? 'selected' : ''}`}
                  >
                    <span className="text-sm sm:text-base font-semibold text-[#191817]">{opt}</span>
                    <div className={`w-5 h-5 rounded-full border-2 ${isSelected ? 'border-[#0F1B38] bg-[#0F1B38]' : 'border-[#DDD5C9] bg-white'} flex items-center justify-center shrink-0`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* BOTTOM ACTION BAR */}
        {step.type !== 'results' && (
          <div className="pt-8 sm:pt-12 pb-6 flex items-center justify-end border-t border-[#E5E0D8]/60 mt-8">
            <button
              type="button"
              onClick={handleNext}
              className="q-btn-navy flex items-center space-x-2 cursor-pointer"
            >
              <span>{step.type === 'interstitial' ? 'Next' : 'Continue'}</span>
              <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}