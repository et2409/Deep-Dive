/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Anchor,
  Award,
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  Gauge,
  LifeBuoy,
  Menu,
  PhoneCall,
  Radio,
  Shield,
  Sliders,
  Star,
  Users,
  Waves,
  X,
  ArrowUpRight,
  BookOpen,
} from 'lucide-react';
import {
  EXPEDITIONS,
  ACADEMY_COURSES,
  GUEST_REVIEWS,
  Expedition,
  DiveSitePin,
} from './data/deepDiveData';
import { DeepDiveLogo, UnderwaterVisualPlate } from './components/MarineVisuals';
import { HeroDiveLight } from './components/HeroDiveLight';
import { BathymetricMapSection } from './components/BathymetricMapSection';
import { EditorialJournalSection } from './components/EditorialJournalSection';
import { ReservationModal, ComplianceModal } from './components/ReservationModal';

export default function App() {
  // Global Currency State (AUD default as specified)
  const [currency, setCurrency] = useState<'AUD' | 'USD' | 'EUR'>('AUD');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Expeditions Filter & Expanded Itinerary State
  const [expeditionFilter, setExpeditionFilter] = useState<
    'all' | 'pelagic' | 'wreck' | 'liveaboard'
  >('all');
  const [expandedItineraryId, setExpandedItineraryId] = useState<string | null>(null);

  // PADI Academy Active Course State
  const [selectedAcademyIndex, setSelectedAcademyIndex] = useState<number>(0);

  // Fleet & Armory Interactive Vessel Selector
  const [selectedVessel, setSelectedVessel] = useState<'sovereign' | 'southern-cross'>('sovereign');
  const [showBrandCrestModal, setShowBrandCrestModal] = useState<boolean>(false);

  // Reviews Carousel & Filter State
  const [activeReviewIndex, setActiveReviewIndex] = useState<number>(0);

  // Newsletter ("The Logbook") State
  const [logbookEmail, setLogbookEmail] = useState<string>('');
  const [logbookStatus, setLogbookStatus] = useState<'idle' | 'error' | 'subscribed'>('idle');

  // Reservation & Compliance Modals State
  const [reservationModal, setReservationModal] = useState<{
    isOpen: boolean;
    expeditionId?: string;
    courseId?: string;
    customSite?: string;
    tab?: 'expedition' | 'academy' | 'concierge';
  }>({ isOpen: false });

  const [activeComplianceDoc, setActiveComplianceDoc] = useState<string | null>(null);

  // Currency Conversion Helper
  const formatPrice = (audAmount: number): string => {
    if (currency === 'USD') {
      return `USD $${Math.round(audAmount * 0.67).toLocaleString()}`;
    }
    if (currency === 'EUR') {
      return `EUR €${Math.round(audAmount * 0.61).toLocaleString()}`;
    }
    return `AUD $${audAmount.toLocaleString()}`;
  };

  const cycleCurrency = () => {
    setCurrency((prev) => (prev === 'AUD' ? 'USD' : prev === 'USD' ? 'EUR' : 'AUD'));
  };

  const filteredExpeditions: Expedition[] =
    expeditionFilter === 'all'
      ? EXPEDITIONS
      : EXPEDITIONS.filter((exp) => exp.category === expeditionFilter);

  const activeAcademyCourse = ACADEMY_COURSES[selectedAcademyIndex];
  const currentReview = GUEST_REVIEWS[activeReviewIndex];

  const handleLogbookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(logbookEmail.trim());
    if (!valid) {
      setLogbookStatus('error');
      return;
    }
    setLogbookStatus('subscribed');
    setLogbookEmail('');
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030C16] text-[#E2EEF2] flex flex-col selection:bg-[#D4AF37]/30 selection:text-[#F0F7F9]">
      {/* =====================================================================
          1. GLOBAL HEADER & NAVIGATION (Strict 3-Zone Top Bar Contract)
      ===================================================================== */}
      <header className="fixed top-0 inset-x-0 z-40 glass-header border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark & Wave/Diver Icon */}
          <a
            href="#"
            aria-label="Deep Dive Australia Home"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded"
          >
            <DeepDiveLogo className="h-9" />
          </a>

          {/* Zone 2: Navigation Links (Clean Single-Line Typography) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#E2EEF2]/80"
          >
            <a
              href="#expeditions"
              className="hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#D4AF37]"
            >
              Expeditions
            </a>
            <a
              href="#academy"
              className="hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#D4AF37]"
            >
              Academy
            </a>
            <a
              href="#dive-sites"
              className="hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#D4AF37]"
            >
              Dive Sites
            </a>
            <a
              href="#fleet"
              className="hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#D4AF37]"
            >
              Fleet
            </a>
            <a
              href="#journal"
              className="hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#D4AF37]"
            >
              Journal
            </a>
            <a
              href="#reviews"
              className="hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#D4AF37]"
            >
              Reviews
            </a>
          </nav>

          {/* Zone 3: Primary Action ("Reserve") + Mobile Menu Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() =>
                setReservationModal({
                  isOpen: true,
                  tab: 'expedition',
                })
              }
              className="btn-gold-metallic px-5 py-2.5 rounded-lg text-xs md:text-sm font-semibold tracking-wide whitespace-nowrap shrink-0 cursor-pointer"
            >
              Reserve
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-2.5 rounded-lg bg-[#0A1F33] text-[#E2EEF2] border border-[#D4AF37]/25 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#030C16]/98 border-b border-[#D4AF37]/25 px-6 py-6 space-y-4">
            <div className="flex flex-col space-y-3 text-base font-medium text-[#F0F7F9]">
              <button
                type="button"
                onClick={() => scrollToSection('expeditions')}
                className="text-left py-1.5 hover:text-[#D4AF37]"
              >
                Expeditions
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('academy')}
                className="text-left py-1.5 hover:text-[#D4AF37]"
              >
                Academy
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('dive-sites')}
                className="text-left py-1.5 hover:text-[#D4AF37]"
              >
                Dive Sites
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('fleet')}
                className="text-left py-1.5 hover:text-[#D4AF37]"
              >
                Fleet &amp; Armory
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('journal')}
                className="text-left py-1.5 hover:text-[#D4AF37]"
              >
                Visual Journal
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('reviews')}
                className="text-left py-1.5 hover:text-[#D4AF37]"
              >
                Guest Reviews
              </button>
            </div>
            <div className="pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between">
              <button
                type="button"
                onClick={cycleCurrency}
                className="px-3.5 py-2 rounded-lg bg-[#0A1F33] gold-hairline font-mono-tech text-xs text-[#D4AF37]"
              >
                Currency: {currency}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setReservationModal({ isOpen: true, tab: 'concierge' });
                }}
                className="text-xs font-mono-tech text-[#1696B5] underline"
              >
                VHF &amp; Marina Concierge
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* =====================================================================
            HERO SECTION: "DIVE LIGHT" REVEAL INTERACTION
        ===================================================================== */}
        <HeroDiveLight
          onBookExpedition={() =>
            setReservationModal({
              isOpen: true,
              tab: 'expedition',
            })
          }
          onExploreSites={() => scrollToSection('dive-sites')}
          currency={currency}
          onToggleCurrency={cycleCurrency}
          onOpenConcierge={() =>
            setReservationModal({
              isOpen: true,
              tab: 'concierge',
            })
          }
        />

        {/* =====================================================================
            2. FEATURED EXPEDITIONS & DAY TRIPS
        ===================================================================== */}
        <section
          id="expeditions"
          className="py-24 lg:py-32 bg-[#030C16] relative border-t border-[#D4AF37]/20"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            {/* Section Header + Interactive Filter Controls */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
              <div className="max-w-2xl">
                <p className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#D4AF37] mb-3">
                  01. CURATED OFFSHORE VOYAGES &amp; LIVEABOARDS
                </p>
                <h2
                  className="font-display text-3xl md:text-5xl text-[#F0F7F9] font-semibold tracking-tight leading-[1.1]"
                  style={{ textWrap: 'balance' }}
                >
                  Featured Expeditions &amp; Day Trips
                </h2>
              </div>

              {/* Interactive Segmented Filter Bar + Currency Toggle */}
              <div className="flex flex-wrap items-center gap-3">
                <div
                  role="group"
                  aria-label="Filter expeditions by discipline"
                  className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#0A1F33] gold-hairline"
                >
                  {[
                    { id: 'all', label: 'All Voyages' },
                    { id: 'pelagic', label: 'Pelagic Drift' },
                    { id: 'wreck', label: 'Deep Wreck' },
                    { id: 'liveaboard', label: 'Coral Sea Liveaboard' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() =>
                        setExpeditionFilter(tab.id as 'all' | 'pelagic' | 'wreck' | 'liveaboard')
                      }
                      className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        expeditionFilter === tab.id
                          ? 'bg-[#127D97] text-[#F0F7F9] shadow-sm'
                          : 'text-[#E2EEF2]/70 hover:text-[#F0F7F9]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={cycleCurrency}
                  title="Click to switch currency (AUD / USD / EUR)"
                  className="px-3.5 py-2 rounded-lg bg-[#0A1F33] gold-hairline text-xs font-mono-tech text-[#D4AF37] hover:border-[#D4AF37] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {currency} Pricing
                </button>
              </div>
            </div>

            {/* Expedition Cards Grid (2x2 Architectural Deck) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredExpeditions.map((exp) => {
                const isExpanded = expandedItineraryId === exp.id;
                return (
                  <article
                    key={exp.id}
                    className="group rounded-xl bg-[#0A1F33] gold-hairline gold-hairline-hover overflow-hidden flex flex-col justify-between transition-all"
                  >
                    <div>
                      {/* Visual Header with Smooth Hover Zoom & Depth-Gradient Overlay */}
                      <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                        <UnderwaterVisualPlate
                          variant={exp.visualTheme}
                          className="w-full h-full"
                        />

                        {/* Top Unboxed Coordinate & Departure Telemetry */}
                        <div className="absolute top-4 inset-x-6 flex items-center justify-between text-xs font-mono-tech text-[#F0F7F9]/90">
                          <span>{exp.region}</span>
                          <span className="text-[#D4AF37] tabular-nums">
                            Next: {exp.nextDeparture} · {exp.berthsRemaining} Berths Left
                          </span>
                        </div>

                        {/* Bottom Depth & Tier Kicker Over Scrim */}
                        <div className="absolute bottom-4 inset-x-6">
                          <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tech text-[#D4AF37] mb-1 tabular-nums">
                            <span>Depth {exp.depthRange}</span>
                            <span aria-hidden="true" className="text-[#1696B5]">
                              ·
                            </span>
                            <span className="text-[#F0F7F9]">{exp.diverTier}</span>
                            <span aria-hidden="true" className="text-[#1696B5]">
                              ·
                            </span>
                            <span className="text-[#E2EEF2]/80">{exp.duration}</span>
                          </div>
                          <h3 className="font-display text-2xl sm:text-3xl text-[#F0F7F9] font-semibold leading-tight">
                            {exp.title}
                          </h3>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 sm:p-8">
                        <p className="text-sm text-[#E2EEF2]/85 leading-relaxed mb-6">
                          {exp.summary}
                        </p>

                        {/* Equipment & Charter Inclusions */}
                        <div className="pt-5 border-t border-[#D4AF37]/15 mb-6">
                          <p className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-[#1696B5] mb-3">
                            Included Expedition Kit &amp; Support
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {exp.inclusions.map((inc) => (
                              <div
                                key={inc}
                                className="text-xs text-[#E2EEF2]/85 flex items-start gap-2"
                              >
                                <span aria-hidden="true" className="text-[#D4AF37] font-mono-tech">
                                  —
                                </span>
                                <span>{inc}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Expandable Decompression & Dive Profile */}
                        {isExpanded && (
                          <div className="mb-6 p-4 rounded-lg bg-[#030C16]/80 border border-[#D4AF37]/20 space-y-3">
                            <p className="font-mono-tech text-[11px] uppercase tracking-wider text-[#D4AF37]">
                              Logged Dive Profile &amp; Schedule ({exp.departurePort})
                            </p>
                            {exp.itinerary.map((step) => (
                              <div
                                key={step.phase}
                                className="text-xs border-b border-[#D4AF37]/10 pb-2 last:border-0 last:pb-0"
                              >
                                <div className="flex justify-between font-mono-tech text-[#F0F7F9]">
                                  <span>{step.phase}</span>
                                  <span className="text-[#1696B5] tabular-nums">{step.depth}</span>
                                </div>
                                <p className="text-[#E2EEF2]/70 mt-0.5">{step.detail}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Footer: AUD Pricing + Actions */}
                    <div className="px-6 sm:px-8 py-5 bg-[#071524] border-t border-[#D4AF37]/20 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="block text-[11px] font-mono-tech uppercase tracking-wider text-[#E2EEF2]/60">
                          All-Inclusive Berth Rate
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-display text-2xl sm:text-3xl font-semibold text-[#D4AF37] tabular-nums">
                            {formatPrice(exp.priceAUD)}
                          </span>
                          <span className="text-xs text-[#E2EEF2]/60">/ diver</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedItineraryId(isExpanded ? null : exp.id)
                          }
                          className="px-4 py-2.5 rounded-lg text-xs font-medium text-[#E2EEF2] bg-[#0A1F33] border border-[#1696B5]/50 hover:border-[#D4AF37] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          {isExpanded ? 'Hide Dive Profile' : 'Inspect Profile'}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setReservationModal({
                              isOpen: true,
                              expeditionId: exp.id,
                              tab: 'expedition',
                            })
                          }
                          className="btn-gold-metallic px-5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Reserve Berth
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================================
            3. PADI CERTIFICATION & TRAINING ACADEMY
        ===================================================================== */}
        <section
          id="academy"
          className="py-24 lg:py-32 bg-[#071524] border-t border-[#D4AF37]/20"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            {/* Section Heading */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
              <div className="max-w-2xl">
                <p className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#D4AF37] mb-3">
                  02. PADI 5-STAR CAREER DEVELOPMENT &amp; TECHNICAL WING
                </p>
                <h2
                  className="font-display text-3xl md:text-5xl text-[#F0F7F9] font-semibold tracking-tight leading-[1.1]"
                  style={{ textWrap: 'balance' }}
                >
                  From First Submersion to Normoxic Trimix Mastery
                </h2>
              </div>
              <p className="text-sm md:text-base text-[#E2EEF2]/75 max-w-md leading-relaxed">
                Every certification is conducted offshore aboard our private catamarans with digital
                theory completed prior to arrival.
              </p>
            </div>

            {/* Luxury Progression Path Selector (4 Steps from Novice to Elite) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
              {ACADEMY_COURSES.map((course, idx) => {
                const isSelected = selectedAcademyIndex === idx;
                return (
                  <button
                    key={course.id}
                    type="button"
                    onClick={() => setSelectedAcademyIndex(idx)}
                    className={`text-left p-6 rounded-xl transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#0D2840] border border-[#D4AF37] shadow-[0_12px_35px_-12px_rgba(212,175,55,0.3)]'
                        : 'bg-[#0A1F33] gold-hairline hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between font-mono-tech text-xs mb-4">
                        <span className="text-[#D4AF37] font-semibold">
                          TIER {course.index} · {course.tierLabel.toUpperCase()}
                        </span>
                        <span className="text-[#1696B5] tabular-nums">{course.maxDepth}</span>
                      </div>

                      <h3 className="font-display text-2xl text-[#F0F7F9] font-semibold leading-snug mb-3">
                        {course.title}
                      </h3>
                    </div>

                    <div className="pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between text-xs font-mono-tech text-[#E2EEF2]/75">
                      <span>{course.duration}</span>
                      <span className="text-[#D4AF37] font-semibold tabular-nums">
                        {formatPrice(course.priceAUD)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Course Masterclass Dossier + 3 Pillars */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left 7 Cols: Selected Course Syllabus */}
              <div className="lg:col-span-7 rounded-xl bg-[#030C16] gold-hairline p-7 sm:p-9 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono-tech text-[#D4AF37] mb-3 tabular-nums">
                    <span>SYLLABUS CODE: {activeAcademyCourse.certificationCode}</span>
                    <span aria-hidden="true" className="text-[#1696B5]">
                      ·
                    </span>
                    <span>{activeAcademyCourse.ratio}</span>
                    <span aria-hidden="true" className="text-[#1696B5]">
                      ·
                    </span>
                    <span className="text-[#F0F7F9]">Depth Ceiling: {activeAcademyCourse.maxDepth}</span>
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl text-[#F0F7F9] font-semibold mb-4">
                    {activeAcademyCourse.index}. {activeAcademyCourse.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#E2EEF2]/85 leading-relaxed mb-6">
                    {activeAcademyCourse.description}
                  </p>

                  <div className="p-5 rounded-lg bg-[#0A1F33] border border-[#D4AF37]/20 mb-7">
                    <p className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#D4AF37] mb-3">
                      Offshore Practical &amp; Decompression Modules
                    </p>
                    <ul className="space-y-2.5">
                      {activeAcademyCourse.curriculum.map((module, i) => (
                        <li
                          key={module}
                          className="text-xs sm:text-sm text-[#F0F7F9] flex items-start gap-3"
                        >
                          <span className="font-mono-tech text-[#1696B5] shrink-0">
                            0{i + 1}.
                          </span>
                          <span>{module}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-5 border-t border-[#D4AF37]/20 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="block text-xs text-[#E2EEF2]/60">
                      Prerequisites: {activeAcademyCourse.prerequisites}
                    </span>
                    <span className="font-display text-2xl text-[#D4AF37] font-semibold tabular-nums">
                      {formatPrice(activeAcademyCourse.priceAUD)}{' '}
                      <span className="text-xs font-sans font-normal text-[#E2EEF2]/65">
                        incl. PADI eLearning &amp; Full Apeks Kit
                      </span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setReservationModal({
                        isOpen: true,
                        courseId: activeAcademyCourse.id,
                        tab: 'academy',
                      })
                    }
                    className="btn-gold-metallic px-6 py-3 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Enroll in Masterclass
                  </button>
                </div>
              </div>

              {/* Right 5 Cols: Key Academy Distinctions */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-5">
                <div className="rounded-xl bg-[#0A1F33] gold-hairline p-6 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2.5">
                    <Users className="w-5 h-5 text-[#D4AF37]" />
                    <h4 className="font-display text-xl text-[#F0F7F9] font-semibold">
                      Intimate Masterclasses (Max 4 : 1)
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#E2EEF2]/80 leading-relaxed">
                    While commercial operators crowd 12 students per instructor into concrete hotel
                    pools, our masterclasses cap strictly at 2 to 4 divers per PADI Course Director
                    on the outer reef.
                  </p>
                </div>

                <div className="rounded-xl bg-[#0A1F33] gold-hairline p-6 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2.5">
                    <Anchor className="w-5 h-5 text-[#1696B5]" />
                    <h4 className="font-display text-xl text-[#F0F7F9] font-semibold">
                      1-on-1 Private Superyacht Instruction
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#E2EEF2]/80 leading-relaxed">
                    Charter our Course Directors aboard M.V. Abyssal Sovereign or directly onto your
                    private motor yacht anywhere in the Whitsundays, Lizard Island, or Ningaloo.
                  </p>
                </div>

                <div className="rounded-xl bg-[#0A1F33] gold-hairline p-6 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2.5">
                    <BookOpen className="w-5 h-5 text-[#D4AF37]" />
                    <h4 className="font-display text-xl text-[#F0F7F9] font-semibold">
                      Bespoke Digital E-Learning Suites
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#E2EEF2]/80 leading-relaxed">
                    Complete all decompression theory, physics, and physiology modules from your
                    residence or private jet before stepping aboard in Port Douglas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            4. INTERACTIVE DIVE SITES & BATHYMETRIC MAP
        ===================================================================== */}
        <BathymetricMapSection
          onSelectSiteForBooking={(site: DiveSitePin) =>
            setReservationModal({
              isOpen: true,
              customSite: `${site.name} (${site.coordinates})`,
              tab: 'expedition',
            })
          }
        />

        {/* =====================================================================
            5. SAFETY, FLEET, & GEAR STANDARDS
        ===================================================================== */}
        <section
          id="fleet"
          className="py-24 lg:py-32 bg-[#071524] border-t border-[#D4AF37]/20"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
              <div className="max-w-2xl">
                <p className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#D4AF37] mb-3">
                  04. MARITIME ENGINEERING, ARMORY &amp; HYPERBARIC CREDO
                </p>
                <h2
                  className="font-display text-3xl md:text-5xl text-[#F0F7F9] font-semibold tracking-tight leading-[1.1]"
                  style={{ textWrap: 'balance' }}
                >
                  Safety, Fleet &amp; Technical Gear Standards
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowBrandCrestModal(true)}
                  className="px-4 py-2.5 rounded-lg bg-[#0A1F33] gold-hairline text-xs font-mono-tech text-[#D4AF37] hover:border-[#D4AF37] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  Inspect 2026 Maritime Crest &amp; Heraldry
                </button>
              </div>
            </div>

            {/* Asymmetric Bento Architecture for The Fleet, The Armory, and Safety Credo */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* THE FLEET (Spans 7 columns) */}
              <div className="lg:col-span-7 rounded-xl bg-[#030C16] gold-hairline p-7 sm:p-9 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                      <span className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#D4AF37] block mb-1">
                        01. THE EXPEDITION FLEET
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl text-[#F0F7F9] font-semibold">
                        Custom 50ft Hydrofoil-Assisted Catamarans
                      </h3>
                    </div>

                    {/* Interactive Vessel Switcher */}
                    <div className="inline-flex p-1 rounded-lg bg-[#0A1F33] gold-hairline">
                      <button
                        type="button"
                        onClick={() => setSelectedVessel('sovereign')}
                        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                          selectedVessel === 'sovereign'
                            ? 'bg-[#127D97] text-[#F0F7F9]'
                            : 'text-[#E2EEF2]/70 hover:text-[#F0F7F9]'
                        }`}
                      >
                        M.V. Abyssal Sovereign
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedVessel('southern-cross')}
                        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                          selectedVessel === 'southern-cross'
                            ? 'bg-[#127D97] text-[#F0F7F9]'
                            : 'text-[#E2EEF2]/70 hover:text-[#F0F7F9]'
                        }`}
                      >
                        M.V. Southern Cross
                      </button>
                    </div>
                  </div>

                  {/* Architectural Vessel Schematic SVG */}
                  <div className="rounded-lg bg-[#071524] border border-[#1696B5]/25 p-5 mb-6">
                    <div className="flex items-center justify-between text-[11px] font-mono-tech text-[#1696B5] mb-3 tabular-nums">
                      <span>
                        {selectedVessel === 'sovereign'
                          ? 'HOME PORT: PORT DOUGLAS & CAIRNS · LOA 15.4m · BEAM 7.2m'
                          : 'HOME PORT: EXMOUTH & NINGALOO · LOA 15.8m · BEAM 7.4m'}
                      </span>
                      <span className="text-[#D4AF37]">CRUISE: 26 KTS</span>
                    </div>

                    <svg
                      viewBox="0 0 680 150"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-28 select-none"
                    >
                      {/* Waterline datum */}
                      <line
                        x1="10"
                        y1="115"
                        x2="670"
                        y2="115"
                        stroke="#1696B5"
                        strokeOpacity="0.4"
                        strokeDasharray="4 4"
                      />
                      {/* Twin Catamaran Hull Profile */}
                      <path
                        d="M55 112 L95 75 L575 75 L635 112 L540 120 L85 120 Z"
                        fill="#0A1F33"
                        stroke="#D4AF37"
                        strokeWidth="1.5"
                      />
                      {/* Salon & Flybridge Superstructure */}
                      <path
                        d="M175 75 L220 38 L465 38 L520 75 Z"
                        fill="#0D2840"
                        stroke="#1696B5"
                        strokeWidth="1.2"
                      />
                      {/* Radar & SatCom Mast */}
                      <line x1="340" y1="38" x2="325" y2="10" stroke="#D4AF37" strokeWidth="2" />
                      <circle cx="325" cy="10" r="3.5" fill="#D4AF37" />
                      {/* Hydraulic Stern Submersible Dive Platform */}
                      <path
                        d="M18 118 L60 112 L60 132 L18 132 Z"
                        fill="#127D97"
                        fillOpacity="0.45"
                        stroke="#D4AF37"
                        strokeWidth="1.2"
                      />
                      {/* Technical Annotations */}
                      <text
                        x="22"
                        y="102"
                        fill="#D4AF37"
                        fontSize="9"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        HYDRAULIC STERN PLATFORM
                      </text>
                      <text
                        x="245"
                        y="60"
                        fill="#F0F7F9"
                        fontSize="9"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        NITROX / TRIMIX MEMBRANE BANK &amp; CAMERA LAB
                      </text>
                    </svg>
                  </div>

                  <p className="text-sm text-[#E2EEF2]/85 leading-relaxed mb-6">
                    Naval-architected specifically for long-range Coral Sea and Ningaloo shelf
                    crossings. Each 50ft catamaran features a submersible hydraulic stern platform
                    that lowers divers directly to chest-deep water—eliminating heavy ladder climbs
                    in twinset rigs.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 border-t border-[#D4AF37]/20 text-xs font-mono-tech">
                  <div>
                    <span className="block text-[#E2EEF2]/50 mb-1">DIVE DECK</span>
                    <span className="text-[#F0F7F9]">Submersible Hydraulic Lift</span>
                  </div>
                  <div>
                    <span className="block text-[#E2EEF2]/50 mb-1">OPTICS LAB</span>
                    <span className="text-[#F0F7F9]">Dedicated Air-Dry Camera Benches</span>
                  </div>
                  <div>
                    <span className="block text-[#E2EEF2]/50 mb-1">APRES-DIVE</span>
                    <span className="text-[#F0F7F9]">Heated Freshwater Deck Showers</span>
                  </div>
                  <div>
                    <span className="block text-[#E2EEF2]/50 mb-1">MEDICAL O2</span>
                    <span className="text-[#D4AF37]">Twin 15,000L Decompression Arrays</span>
                  </div>
                </div>
              </div>

              {/* Right 5 Columns: THE ARMORY & SAFETY CREDO */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-8">
                {/* THE ARMORY */}
                <div className="rounded-xl bg-[#0A1F33] gold-hairline p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#D4AF37]">
                        02. THE TECHNICAL ARMORY
                      </span>
                      <Gauge className="w-4 h-4 text-[#1696B5]" />
                    </div>
                    <h3 className="font-display text-2xl text-[#F0F7F9] font-semibold mb-3">
                      Bespoke Carbon &amp; Mixed-Gas Rigging
                    </h3>
                    <p className="text-xs sm:text-sm text-[#E2EEF2]/80 leading-relaxed mb-5">
                      Leave heavy luggage ashore. Every berth includes a sanitized, pressure-tested
                      expedition rig calibrated to your breathing resistance preference:
                    </p>
                  </div>

                  <div className="space-y-2.5 text-xs font-mono-tech pt-4 border-t border-[#D4AF37]/20">
                    <div className="flex justify-between">
                      <span className="text-[#E2EEF2]/65">REGULATORS:</span>
                      <span className="text-[#F0F7F9]">Apeks MTX-RC &amp; Black Sapphire Carbon</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#E2EEF2]/65">COMPUTERS:</span>
                      <span className="text-[#F0F7F9]">Suunto EON Core &amp; Shearwater Perdix 2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#E2EEF2]/65">EXPOSURE SUITS:</span>
                      <span className="text-[#F0F7F9]">Fourth Element Proteus II &amp; Argonaut</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#E2EEF2]/65">GAS BLENDING:</span>
                      <span className="text-[#D4AF37]">Continuous Nitrox &amp; Trimix Bank</span>
                    </div>
                  </div>
                </div>

                {/* SAFETY CREDO */}
                <div className="rounded-xl bg-[#0A1F33] gold-hairline p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#D4AF37]">
                        03. THE SAFETY CREDO
                      </span>
                      <LifeBuoy className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <h3 className="font-display text-2xl text-[#F0F7F9] font-semibold mb-3">
                      Zero-Compromise Offshore Telemetry
                    </h3>
                    <p className="text-xs sm:text-sm text-[#E2EEF2]/80 leading-relaxed mb-5">
                      Every diver carries an individual Nautilus LifeLine GPS/AIS marine rescue
                      transponder clipped to their BCD, paired with Iridium Certus satellite
                      bridge telemetry and resident Marine Biologist Dive Leaders.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs font-mono-tech">
                    <span className="text-[#1696B5]">100% GPS DIVER TRACKING</span>
                    <button
                      type="button"
                      onClick={() => setActiveComplianceDoc('rstc')}
                      className="text-[#D4AF37] hover:underline cursor-pointer"
                    >
                      Inspect Hyperbaric Protocol →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            6. EDITORIAL VISUAL JOURNAL / GALLERY
        ===================================================================== */}
        <EditorialJournalSection />

        {/* =====================================================================
            7. CUSTOMER REVIEWS & TRIPADVISOR ACCREDITATIONS
        ===================================================================== */}
        <section
          id="reviews"
          className="py-24 lg:py-32 bg-[#071524] border-t border-[#D4AF37]/20"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
              <div className="max-w-2xl">
                <p className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#D4AF37] mb-3">
                  06. VERIFIED LOGBOOK TESTIMONIALS &amp; ACCREDITATIONS
                </p>
                <h2
                  className="font-display text-3xl md:text-5xl text-[#F0F7F9] font-semibold tracking-tight leading-[1.1]"
                  style={{ textWrap: 'balance' }}
                >
                  Endorsed by Private Charter Guests &amp; Technical Explorers
                </h2>
              </div>

              {/* Carousel Controls */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setActiveReviewIndex(
                      (prev) => (prev - 1 + GUEST_REVIEWS.length) % GUEST_REVIEWS.length
                    )
                  }
                  aria-label="Previous guest review"
                  className="p-3 rounded-lg bg-[#0A1F33] gold-hairline text-[#E2EEF2] hover:text-[#D4AF37] cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="font-mono-tech text-xs text-[#D4AF37] tabular-nums px-2">
                  0{activeReviewIndex + 1} / 0{GUEST_REVIEWS.length}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setActiveReviewIndex((prev) => (prev + 1) % GUEST_REVIEWS.length)
                  }
                  aria-label="Next guest review"
                  className="p-3 rounded-lg bg-[#0A1F33] gold-hairline text-[#E2EEF2] hover:text-[#D4AF37] cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Featured Interactive Testimonial Showcase + All 3 Quick Selectors */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
              {/* Main Active Testimonial Card (8 columns) */}
              <div className="lg:col-span-8 rounded-xl bg-[#030C16] gold-hairline p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#D4AF37]/15 mb-7">
                    <div className="flex items-center gap-2 text-xs font-mono-tech text-[#D4AF37]">
                      <span>{currentReview.category.toUpperCase()}</span>
                      <span aria-hidden="true" className="text-[#1696B5]">
                        ·
                      </span>
                      <span className="text-[#E2EEF2]/80">{currentReview.expeditionTaken}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[#D4AF37]" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl text-[#F0F7F9] font-semibold italic mb-5 leading-snug">
                    &ldquo;{currentReview.headline}&rdquo;
                  </h3>

                  <p className="text-sm sm:text-base text-[#E2EEF2]/85 leading-relaxed mb-8">
                    {currentReview.account}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-display text-xl text-[#F0F7F9] font-semibold">
                      {currentReview.guestName}
                    </p>
                    <p className="text-xs text-[#E2EEF2]/65">
                      {currentReview.guestRole} · {currentReview.guestOrigin} ·{' '}
                      <span className="text-[#1696B5]">{currentReview.certificationHeld}</span>
                    </p>
                  </div>

                  <div className="text-xs font-mono-tech text-[#D4AF37] tabular-nums">
                    {currentReview.verifiedMetric}
                  </div>
                </div>
              </div>

              {/* Right 4 Columns: Selector List of Verified Accounts */}
              <div className="lg:col-span-4 flex flex-col justify-between gap-4">
                {GUEST_REVIEWS.map((rev, idx) => {
                  const isCurrent = idx === activeReviewIndex;
                  return (
                    <button
                      key={rev.id}
                      type="button"
                      onClick={() => setActiveReviewIndex(idx)}
                      className={`text-left p-5 rounded-xl transition-all flex-1 flex flex-col justify-between cursor-pointer ${
                        isCurrent
                          ? 'bg-[#0D2840] border border-[#D4AF37]'
                          : 'bg-[#0A1F33] gold-hairline hover:border-[#D4AF37]/50'
                      }`}
                    >
                      <div>
                        <span className="font-mono-tech text-[11px] uppercase tracking-wider text-[#D4AF37] block mb-1">
                          {rev.category} · {rev.date}
                        </span>
                        <p className="font-display text-lg text-[#F0F7F9] font-semibold line-clamp-2">
                          {rev.headline}
                        </p>
                      </div>
                      <p className="text-xs text-[#E2EEF2]/65 mt-3">
                        {rev.guestName} · {rev.guestOrigin}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Verified Accreditations Bar (3 Architectural Trust Panels) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl bg-[#0A1F33] gold-hairline p-6 flex items-start gap-4">
                <Award className="w-7 h-7 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono-tech text-xs text-[#D4AF37] uppercase tracking-wider mb-1">
                    5.0 / 5.0 · 418 VERIFIED CHARTERS
                  </p>
                  <h4 className="font-display text-xl text-[#F0F7F9] font-semibold mb-1">
                    TripAdvisor Travelers&apos; Choice 2026
                  </h4>
                  <p className="text-xs text-[#E2EEF2]/70 leading-relaxed">
                    Ranked Top 1% of Maritime &amp; Scuba Expedition Operators globally based on
                    independent guest logbooks.
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-[#0A1F33] gold-hairline p-6 flex items-start gap-4">
                <Shield className="w-7 h-7 text-[#1696B5] shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono-tech text-xs text-[#1696B5] uppercase tracking-wider mb-1">
                    REGISTRY #S-29401 · TECREC CERTIFIED
                  </p>
                  <h4 className="font-display text-xl text-[#F0F7F9] font-semibold mb-1">
                    PADI 5-Star Career Development Center
                  </h4>
                  <p className="text-xs text-[#E2EEF2]/70 leading-relaxed">
                    Authorized for Instructor Development, Normoxic Trimix, and Closed-Circuit
                    Rebreather expedition training.
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-[#0A1F33] gold-hairline p-6 flex items-start gap-4">
                <Waves className="w-7 h-7 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono-tech text-xs text-[#D4AF37] uppercase tracking-wider mb-1">
                    GBRMPA HIGH-STANDARD PERMIT
                  </p>
                  <h4 className="font-display text-xl text-[#F0F7F9] font-semibold mb-1">
                    100% Eco-Tourism Certified Operator
                  </h4>
                  <p className="text-xs text-[#E2EEF2]/70 leading-relaxed">
                    Zero-anchor GPS dynamic station keeping, solar-hybrid auxiliary power, and active
                    coral larval restoration funding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          8. FOOTER & COMPLIANCE
      ===================================================================== */}
      <footer className="bg-[#030C16] border-t border-[#D4AF37]/25 pt-20 pb-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Top Row: Brand + "The Logbook" Newsletter Subscription */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#D4AF37]/15">
            <div className="lg:col-span-6 space-y-4">
              <DeepDiveLogo className="h-10" />
              <p className="text-sm text-[#E2EEF2]/75 max-w-md leading-relaxed pt-2">
                Established 2026. Ultra-exclusive scuba expeditions, technical mixed-gas diving, and
                private superyacht charters across the Great Barrier Reef, Coral Sea, and Ningaloo.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono-tech text-[#D4AF37]">
                <span>EST. 2026 / AUSTRALIA</span>
                <span aria-hidden="true" className="text-[#1696B5]">
                  ·
                </span>
                <span>AMSA SURVEYED FLEET</span>
                <span aria-hidden="true" className="text-[#1696B5]">
                  ·
                </span>
                <span>DAN INDUSTRY PARTNER</span>
              </div>
            </div>

            {/* "The Logbook" Newsletter Subscription */}
            <div className="lg:col-span-6 rounded-xl bg-[#071524] gold-hairline p-6 sm:p-8">
              <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#D4AF37] mb-2">
                THE LOGBOOK — SEASONAL DISPATCHES
              </p>
              <h3 className="font-display text-2xl text-[#F0F7F9] font-semibold mb-2">
                Receive Pelagic Migration Alerts &amp; Private Charter Windows
              </h3>
              <p className="text-xs sm:text-sm text-[#E2EEF2]/70 mb-5">
                Quarterly hydrographic reports covering Dwarf Minke whale arrivals, Coral Sea
                hammerhead aggregations, and unannounced liveaboard berths.
              </p>

              {logbookStatus === 'subscribed' ? (
                <div className="p-4 rounded-lg bg-[#0D2840] border border-[#D4AF37]/40 text-xs font-mono-tech text-[#D4AF37] flex items-center gap-2.5">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>
                    Coordinates logged. You are subscribed to The Logbook seasonal dispatches.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleLogbookSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={logbookEmail}
                    onChange={(e) => {
                      setLogbookEmail(e.target.value);
                      if (logbookStatus === 'error') setLogbookStatus('idle');
                    }}
                    placeholder="Enter private email for Logbook dispatches..."
                    aria-label="Email address for The Logbook newsletter"
                    className="flex-1 rounded-lg bg-[#030C16] border border-[#D4AF37]/40 px-4 py-3 text-sm text-[#F0F7F9] placeholder-[#E2EEF2]/40 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="submit"
                    className="btn-gold-metallic px-6 py-3 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Subscribe to Logbook
                  </button>
                </form>
              )}
              {logbookStatus === 'error' && (
                <p className="text-xs text-[#E5C158] mt-2">
                  Please enter a valid email address.
                </p>
              )}
            </div>
          </div>

          {/* Middle Row: Marina Bases, VHF Radio, Concierge & Legal Compliance */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-14 border-b border-[#D4AF37]/15 text-sm">
            {/* Column 1: Port Douglas & Cairns Bases */}
            <div>
              <h4 className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#D4AF37] mb-4">
                Queensland Marina Bases
              </h4>
              <ul className="space-y-2.5 text-xs text-[#E2EEF2]/80 leading-relaxed">
                <li>
                  <strong className="text-[#F0F7F9] block">Port Douglas Base</strong>
                  Crystalbrook Superyacht Marina, Berth C-04, Wharf Street, QLD 4877
                </li>
                <li>
                  <strong className="text-[#F0F7F9] block">Cairns Liveaboard Base</strong>
                  Marlin Marina Pier B, Finger 2, Spence Street, QLD 4870
                </li>
                <li>
                  <strong className="text-[#F0F7F9] block">Western Australia Base</strong>
                  Exmouth Boat Harbour, Mews Road, WA 6707
                </li>
              </ul>
            </div>

            {/* Column 2: VHF Marine Radio & Direct Concierge */}
            <div>
              <h4 className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#D4AF37] mb-4">
                Maritime Telemetry &amp; Concierge
              </h4>
              <ul className="space-y-3 text-xs text-[#E2EEF2]/80 font-mono-tech">
                <li className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-[#1696B5] shrink-0" />
                  <span>VHF Marine Radio: Ch 16 / Working Ch 68</span>
                </li>
                <li className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>WhatsApp Concierge: +61 7 4099 8826</span>
                </li>
                <li>
                  <span className="text-[#E2EEF2]/55 block">IRIDIUM SATCOM BRIDGE:</span>
                  <span className="text-[#F0F7F9]">+8816 314 89201 (24h Offshore)</span>
                </li>
                <li className="pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      setReservationModal({ isOpen: true, tab: 'concierge' })
                    }
                    className="text-[#D4AF37] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open Direct Charter Desk</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal & Maritime Compliance Documents */}
            <div>
              <h4 className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#D4AF37] mb-4">
                Maritime Compliance &amp; Legal
              </h4>
              <ul className="space-y-2.5 text-xs text-[#E2EEF2]/80">
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveComplianceDoc('rstc')}
                    className="hover:text-[#D4AF37] transition-colors text-left cursor-pointer"
                  >
                    Medical Clearances (RSTC Form)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveComplianceDoc('permits')}
                    className="hover:text-[#D4AF37] transition-colors text-left cursor-pointer"
                  >
                    Marine Park Permits (GBRMPA #G26-8841)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveComplianceDoc('weather')}
                    className="hover:text-[#D4AF37] transition-colors text-left cursor-pointer"
                  >
                    Weather Cancellation Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveComplianceDoc('charter')}
                    className="hover:text-[#D4AF37] transition-colors text-left cursor-pointer"
                  >
                    Terms of Private Charter &amp; Berth
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Quick Navigation */}
            <div>
              <h4 className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#D4AF37] mb-4">
                Expedition Directory
              </h4>
              <ul className="space-y-2.5 text-xs text-[#E2EEF2]/80">
                <li>
                  <a href="#expeditions" className="hover:text-[#D4AF37] transition-colors">
                    The Outer Reef Pelagic Drift
                  </a>
                </li>
                <li>
                  <a href="#expeditions" className="hover:text-[#D4AF37] transition-colors">
                    S.S. Yongala Deep Wreck Odyssey
                  </a>
                </li>
                <li>
                  <a href="#expeditions" className="hover:text-[#D4AF37] transition-colors">
                    Ningaloo Whale Shark Immersion
                  </a>
                </li>
                <li>
                  <a href="#expeditions" className="hover:text-[#D4AF37] transition-colors">
                    Osprey Reef Shark Vortex (4-Day)
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setShowBrandCrestModal(true)}
                    className="text-[#1696B5] hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    Brand Identity &amp; Heraldry Sheet
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Australian Acknowledgement of Country */}
          <div className="py-8 border-b border-[#D4AF37]/15">
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-[#D4AF37] mb-2">
              ACKNOWLEDGEMENT OF COUNTRY &amp; SEA CUSTODIANS
            </p>
            <p className="text-xs text-[#E2EEF2]/70 leading-relaxed max-w-5xl">
              Deep Dive Australia respectfully acknowledges the Traditional Custodians of the land
              and Sea Country across which we navigate—including the Eastern Kuku Yalanji,
              Yirrganydji, Gimuy Walubara Yidinji, Wulgurukaba, Bindal, and Baiyungu Peoples. We
              honor their unbroken sixty-thousand-year stewardship of the Great Barrier Reef, Coral
              Sea, and Ningaloo marine sanctuaries, and pay our respects to Elders past and present.
            </p>
          </div>

          {/* Bottom Copyright & Telemetry Line */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E2EEF2]/55 font-mono-tech">
            <p>© 2026 DEEP DIVE AUSTRALIA PTY LTD · ACN 684 219 042 · ALL RIGHTS RESERVED.</p>
            <p>ABYSS NAVY #030C16 · SUNLIT GOLD #D4AF37 · TEAL SURF #127D97</p>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          INTERACTIVE MODALS (Reservation Desk, Compliance Docs, Brand Heraldry)
      ===================================================================== */}
      <ReservationModal
        isOpen={reservationModal.isOpen}
        onClose={() => setReservationModal({ isOpen: false })}
        initialExpeditionId={reservationModal.expeditionId}
        initialCourseId={reservationModal.courseId}
        initialCustomSite={reservationModal.customSite}
        initialTab={reservationModal.tab}
        currency={currency}
        formatPrice={formatPrice}
      />

      <ComplianceModal
        docKey={activeComplianceDoc}
        onClose={() => setActiveComplianceDoc(null)}
      />

      {/* Brand Heraldry & Palette Sheet Modal (Displays the uploaded Brand Sheet asset) */}
      {showBrandCrestModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Deep Dive Australia 2026 Brand Heraldry & Color System"
          className="fixed inset-0 z-50 bg-[#030C16]/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          onClick={() => setShowBrandCrestModal(false)}
        >
          <div
            className="relative max-w-3xl w-full rounded-xl bg-[#071524] gold-hairline overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#D4AF37]/20">
              <span className="font-mono-tech text-xs text-[#D4AF37] uppercase tracking-wider">
                DEEP DIVE AUSTRALIA · EST. 2026 BRAND HERALDRY &amp; COLOR PALETTE
              </span>
              <button
                type="button"
                onClick={() => setShowBrandCrestModal(false)}
                className="p-2 rounded-lg bg-[#0A1F33] text-[#E2EEF2] hover:text-[#D4AF37] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 bg-[#030C16]">
              <img
                src="/assets/aistudio/Deep_Dive_Gemini_Logo_and_Colors_3966d759.jfif"
                alt="Deep Dive Australia Official Brand Crest and Color Palette"
                referrerPolicy="no-referrer"
                className="w-full h-auto rounded-lg gold-hairline"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
