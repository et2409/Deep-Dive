import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Calendar,
  Users,
  ShieldCheck,
  Radio,
  MapPin,
  FileText,
  Sparkles,
} from 'lucide-react';
import {
  EXPEDITIONS,
  ACADEMY_COURSES,
  Expedition,
  LEGAL_DOCUMENTS,
} from '../data/deepDiveData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialExpeditionId?: string;
  initialCourseId?: string;
  initialCustomSite?: string;
  initialTab?: 'expedition' | 'academy' | 'concierge';
  currency: 'AUD' | 'USD' | 'EUR';
  formatPrice: (aud: number) => string;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  initialExpeditionId,
  initialCourseId,
  initialCustomSite,
  initialTab = 'expedition',
  formatPrice,
}) => {
  const [activeTab, setActiveTab] = useState<'expedition' | 'academy' | 'concierge'>(initialTab);
  const [selectedExpId, setSelectedExpId] = useState<string>(
    initialExpeditionId || EXPEDITIONS[0].id
  );
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    initialCourseId || ACADEMY_COURSES[0].id
  );
  const [diversCount, setDiversCount] = useState<number>(2);
  const [charterMode, setCharterMode] = useState<'berth' | 'private-yacht'>('berth');
  const [gasBlend, setGasBlend] = useState<'EANx32' | 'EANx36' | 'Trimix 18/45' | 'CCR Diluent'>(
    'EANx32'
  );
  const [departureDate, setDepartureDate] = useState<string>('2026-11-18');
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [certLevel, setCertLevel] = useState<string>('PADI Advanced Open Water');
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [bookingReference, setBookingReference] = useState<string | null>(null);

  useEffect(() => {
    if (initialExpeditionId) {
      setSelectedExpId(initialExpeditionId);
      setActiveTab('expedition');
    } else if (initialCourseId) {
      setSelectedCourseId(initialCourseId);
      setActiveTab('academy');
    } else if (initialTab) {
      setActiveTab(initialTab);
    }
    if (initialCustomSite) {
      setSpecialNotes(`Requested Priority Coordinate: ${initialCustomSite}`);
    }
    setBookingReference(null);
    setFormError('');
  }, [initialExpeditionId, initialCourseId, initialCustomSite, initialTab, isOpen]);

  if (!isOpen) return null;

  const currentExpedition: Expedition =
    EXPEDITIONS.find((e) => e.id === selectedExpId) || EXPEDITIONS[0];
  const currentCourse =
    ACADEMY_COURSES.find((c) => c.id === selectedCourseId) || ACADEMY_COURSES[0];

  const baseUnitAUD =
    activeTab === 'expedition' ? currentExpedition.priceAUD : currentCourse.priceAUD;
  const totalAUD =
    charterMode === 'private-yacht'
      ? Math.round(baseUnitAUD * 5.2)
      : baseUnitAUD * diversCount + (gasBlend.includes('Trimix') ? 380 * diversCount : 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || guestName.trim().length < 2) {
      setFormError('Please enter the Lead Diver full name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(guestEmail.trim())) {
      setFormError('Please provide a valid email address for your embarkation dossier.');
      return;
    }
    setFormError('');
    const randomRef = `DDA-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingReference(randomRef);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Expedition & Academy Reservation Desk"
      className="fixed inset-0 z-50 bg-[#030C16]/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full rounded-xl bg-[#071524] gold-hairline shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#030C16] border-b border-[#D4AF37]/20">
          <div>
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#D4AF37]">
              PORT DOUGLAS · CAIRNS · EXMOUTH MARINA DESK
            </p>
            <h3 className="font-display text-2xl text-[#F0F7F9] font-semibold">
              Expedition Berth &amp; Private Charter Manifest
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close reservation modal"
            className="p-2 rounded-lg bg-[#0A1F33] text-[#E2EEF2] hover:text-[#D4AF37] border border-[#D4AF37]/20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-2 px-6 py-3 bg-[#0A1F33] border-b border-[#D4AF37]/15 overflow-x-auto">
          <button
            type="button"
            onClick={() => {
              setActiveTab('expedition');
              setBookingReference(null);
            }}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'expedition'
                ? 'bg-[#D4AF37] text-[#030C16] font-semibold'
                : 'text-[#E2EEF2]/75 hover:text-[#F0F7F9]'
            }`}
          >
            01. Reserve Expedition or Liveaboard
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('academy');
              setBookingReference(null);
            }}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'academy'
                ? 'bg-[#D4AF37] text-[#030C16] font-semibold'
                : 'text-[#E2EEF2]/75 hover:text-[#F0F7F9]'
            }`}
          >
            02. PADI Academy Masterclass
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('concierge');
              setBookingReference(null);
            }}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'concierge'
                ? 'bg-[#127D97] text-[#F0F7F9] font-semibold'
                : 'text-[#E2EEF2]/75 hover:text-[#F0F7F9]'
            }`}
          >
            03. Direct VHF &amp; Superyacht Concierge
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 max-h-[78vh] overflow-y-auto">
          {bookingReference ? (
            <div className="py-8 text-center max-w-xl mx-auto">
              <div className="w-14 h-14 rounded-full bg-[#127D97]/25 border border-[#D4AF37] flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#D4AF37] mb-2">
                MANIFEST REGISTERED · REF {bookingReference}
              </p>
              <h4 className="font-display text-3xl text-[#F0F7F9] font-semibold mb-4">
                Your Berth &amp; Dive Profile Are Held
              </h4>
              <p className="text-sm text-[#E2EEF2]/80 leading-relaxed mb-6">
                Thank you, <strong className="text-[#F0F7F9]">{guestName}</strong>. Our Expedition
                Captain and Dive Medic have logged your request for{' '}
                <strong className="text-[#D4AF37]">
                  {activeTab === 'expedition' ? currentExpedition.title : currentCourse.title}
                </strong>{' '}
                departing <span className="font-mono-tech">{departureDate}</span> with{' '}
                <span className="font-mono-tech">{gasBlend}</span> gas blending.
              </p>

              <div className="rounded-xl bg-[#030C16] gold-hairline p-5 text-left text-xs font-mono-tech space-y-2 mb-8">
                <div className="flex justify-between">
                  <span className="text-[#E2EEF2]/60">MANIFEST CODE:</span>
                  <span className="text-[#D4AF37]">{bookingReference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#E2EEF2]/60">ALLOCATION:</span>
                  <span className="text-[#F0F7F9]">
                    {charterMode === 'private-yacht'
                      ? 'Whole-Vessel Private Catamaran Buyout'
                      : `${diversCount} Diver Berth(s)`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#E2EEF2]/60">CERTIFICATION TIER:</span>
                  <span className="text-[#F0F7F9]">{certLevel}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#D4AF37]/20">
                  <span className="text-[#E2EEF2]/60">ESTIMATED CHARTER TOTAL:</span>
                  <span className="text-[#D4AF37] font-semibold tabular-nums">
                    {formatPrice(totalAUD)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="btn-gold-metallic px-8 py-3 rounded-lg text-sm font-semibold cursor-pointer"
              >
                Return to Deep Dive Australia
              </button>
            </div>
          ) : activeTab === 'concierge' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl bg-[#0A1F33] gold-hairline p-6">
                <div className="flex items-center gap-2.5 text-[#D4AF37] font-mono-tech text-xs mb-3">
                  <Radio className="w-4 h-4 text-[#1696B5]" />
                  <span>OFFSHORE MARITIME TELEMETRY &amp; VHF</span>
                </div>
                <h4 className="font-display text-2xl text-[#F0F7F9] font-semibold mb-3">
                  Port Douglas &amp; Cairns Marina Bases
                </h4>
                <p className="text-sm text-[#E2EEF2]/80 leading-relaxed mb-6">
                  Our fleet captains monitor VHF Marine Channels 16 and 68 continuously. For
                  helicopter reef transfers from Lizard Island or superyacht tender rendezvous,
                  contact our 24-hour operations desk.
                </p>
                <div className="space-y-3 text-xs font-mono-tech">
                  <div className="p-3 rounded-lg bg-[#030C16] border border-[#D4AF37]/15">
                    <span className="block text-[#E2EEF2]/50 mb-0.5">PORT DOUGLAS BASE</span>
                    <span className="text-[#F0F7F9]">
                      Crystalbrook Superyacht Marina · Berth C-04
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#030C16] border border-[#D4AF37]/15">
                    <span className="block text-[#E2EEF2]/50 mb-0.5">CAIRNS LIVEABOARD PIER</span>
                    <span className="text-[#F0F7F9]">Marlin Marina Pier B · Gate 2</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#030C16] border border-[#D4AF37]/15">
                    <span className="block text-[#E2EEF2]/50 mb-0.5">
                      DIRECT WHATSAPP &amp; SATCOM CONCIERGE
                    </span>
                    <span className="text-[#D4AF37]">+61 (0) 7 4099 8826 · VHF CH 16 / 68</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-[#0A1F33] gold-hairline p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 text-[#D4AF37] font-mono-tech text-xs mb-3">
                    <MapPin className="w-4 h-4 text-[#1696B5]" />
                    <span>BESPOKE SUPERYACHT &amp; HELI-DIVE BRIEF</span>
                  </div>
                  <h4 className="font-display text-2xl text-[#F0F7F9] font-semibold mb-3">
                    Request Custom Coordinates
                  </h4>
                  <p className="text-sm text-[#E2EEF2]/80 leading-relaxed mb-4">
                    Planning a private expedition to the Far Northern Great Barrier Reef, Raine
                    Island, or Rowley Shoals? Switch to the Expedition tab to lock in your dates and
                    vessel configuration.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('expedition')}
                  className="btn-gold-metallic w-full py-3.5 px-6 rounded-lg text-sm font-semibold cursor-pointer"
                >
                  Configure Private Charter Manifest
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left 7 Columns: Configuration Inputs */}
              <div className="lg:col-span-7 space-y-5">
                {activeTab === 'expedition' ? (
                  <div>
                    <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#D4AF37] mb-2">
                      Select Expedition Itinerary
                    </label>
                    <select
                      value={selectedExpId}
                      onChange={(e) => setSelectedExpId(e.target.value)}
                      className="w-full rounded-lg bg-[#030C16] border border-[#D4AF37]/30 px-4 py-3 text-sm text-[#F0F7F9] focus:outline-none focus:border-[#D4AF37]"
                    >
                      {EXPEDITIONS.map((exp) => (
                        <option key={exp.id} value={exp.id}>
                          {exp.title} ({exp.depthRange} · {exp.duration})
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#D4AF37] mb-2">
                      Select PADI Academy Masterclass
                    </label>
                    <select
                      value={selectedCourseId}
                      onChange={(e) => setSelectedCourseId(e.target.value)}
                      className="w-full rounded-lg bg-[#030C16] border border-[#D4AF37]/30 px-4 py-3 text-sm text-[#F0F7F9] focus:outline-none focus:border-[#D4AF37]"
                    >
                      {ACADEMY_COURSES.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.index}. {course.title} ({course.maxDepth})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Charter Allocation Mode & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#E2EEF2]/70 mb-2">
                      Charter Configuration
                    </label>
                    <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-[#030C16] border border-[#D4AF37]/20">
                      <button
                        type="button"
                        onClick={() => setCharterMode('berth')}
                        className={`py-2 px-3 rounded text-xs font-medium transition-colors cursor-pointer ${
                          charterMode === 'berth'
                            ? 'bg-[#127D97] text-[#F0F7F9]'
                            : 'text-[#E2EEF2]/70 hover:text-[#F0F7F9]'
                        }`}
                      >
                        Individual Berths
                      </button>
                      <button
                        type="button"
                        onClick={() => setCharterMode('private-yacht')}
                        className={`py-2 px-3 rounded text-xs font-medium transition-colors cursor-pointer ${
                          charterMode === 'private-yacht'
                            ? 'bg-[#D4AF37] text-[#030C16] font-semibold'
                            : 'text-[#E2EEF2]/70 hover:text-[#F0F7F9]'
                        }`}
                      >
                        Private Yacht
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#E2EEF2]/70 mb-2">
                      Number of Divers (Max 8)
                    </label>
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-[#1696B5]" />
                      <input
                        type="number"
                        min={1}
                        max={8}
                        value={diversCount}
                        onChange={(e) =>
                          setDiversCount(Math.max(1, Math.min(8, Number(e.target.value) || 1)))
                        }
                        className="w-full rounded-lg bg-[#030C16] border border-[#D4AF37]/30 px-4 py-2.5 text-sm text-[#F0F7F9] font-mono-tech tabular-nums"
                      />
                    </div>
                  </div>
                </div>

                {/* Date & Gas Blend */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#E2EEF2]/70 mb-2">
                      Preferred Embarkation Date
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-3 pointer-events-none" />
                      <input
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className="w-full rounded-lg bg-[#030C16] border border-[#D4AF37]/30 pl-10 pr-4 py-2.5 text-sm text-[#F0F7F9] font-mono-tech"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#E2EEF2]/70 mb-2">
                      Primary Gas Blend
                    </label>
                    <select
                      value={gasBlend}
                      onChange={(e) => setGasBlend(e.target.value as typeof gasBlend)}
                      className="w-full rounded-lg bg-[#030C16] border border-[#D4AF37]/30 px-3.5 py-2.5 text-sm text-[#F0F7F9] font-mono-tech"
                    >
                      <option value="EANx32">Enriched Air Nitrox 32% (Included)</option>
                      <option value="EANx36">Enriched Air Nitrox 36% (Included)</option>
                      <option value="Trimix 18/45">Normoxic Trimix 18/45 (+AUD $380)</option>
                      <option value="CCR Diluent">Closed-Circuit Rebreather Heliox/O2</option>
                    </select>
                  </div>
                </div>

                {/* Guest Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#E2EEF2]/70 mb-2">
                      Lead Diver Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Capt. Alistair Sterling"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full rounded-lg bg-[#030C16] border border-[#D4AF37]/30 px-4 py-2.5 text-sm text-[#F0F7F9] placeholder-[#E2EEF2]/35 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#E2EEF2]/70 mb-2">
                      Satellite / Private Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alistair@sterlingmarine.au"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full rounded-lg bg-[#030C16] border border-[#D4AF37]/30 px-4 py-2.5 text-sm text-[#F0F7F9] placeholder-[#E2EEF2]/35 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#E2EEF2]/70 mb-2">
                      Current Certification Held
                    </label>
                    <select
                      value={certLevel}
                      onChange={(e) => setCertLevel(e.target.value)}
                      className="w-full rounded-lg bg-[#030C16] border border-[#D4AF37]/30 px-3.5 py-2.5 text-sm text-[#F0F7F9]"
                    >
                      <option value="Beginner / Discover Scuba">Beginner / Discover Scuba</option>
                      <option value="PADI Open Water Diver">PADI Open Water Diver (18m)</option>
                      <option value="PADI Advanced Open Water">
                        PADI Advanced Open Water (30m–40m)
                      </option>
                      <option value="PADI Rescue / Master Scuba Diver">
                        PADI Rescue / Master Scuba Diver
                      </option>
                      <option value="Technical Trimix / TDI / GUE">
                        Technical Trimix / TDI / GUE CCR
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#E2EEF2]/70 mb-2">
                      Bespoke Rigging or Dietary Notes
                    </label>
                    <input
                      type="text"
                      placeholder="Sidemount rig, helicopter transfer..."
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      className="w-full rounded-lg bg-[#030C16] border border-[#D4AF37]/30 px-4 py-2.5 text-sm text-[#F0F7F9] placeholder-[#E2EEF2]/35"
                    />
                  </div>
                </div>

                {formError && (
                  <p className="text-xs text-[#E5C158] bg-[#D4AF37]/15 border border-[#D4AF37]/40 rounded-lg px-4 py-2.5">
                    {formError}
                  </p>
                )}
              </div>

              {/* Right 5 Columns: Dossier Summary & Price Breakdown */}
              <div className="lg:col-span-5 rounded-xl bg-[#0A1F33] gold-hairline p-6 flex flex-col justify-between">
                <div>
                  <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-[#D4AF37] block mb-2">
                    SELECTED CHARTER DOSSIER
                  </span>
                  <h4 className="font-display text-2xl text-[#F0F7F9] font-semibold mb-2">
                    {activeTab === 'expedition' ? currentExpedition.title : currentCourse.title}
                  </h4>
                  <p className="text-xs font-mono-tech text-[#1696B5] mb-4">
                    {activeTab === 'expedition'
                      ? `${currentExpedition.departurePort} · ${currentExpedition.depthRange}`
                      : `${currentCourse.tierLabel} · ${currentCourse.maxDepth}`}
                  </p>

                  {/* Daily Dive Profile or Curriculum Preview */}
                  <div className="space-y-2.5 pt-4 pb-5 border-y border-[#D4AF37]/20 mb-5">
                    <p className="text-[11px] font-mono-tech uppercase tracking-wider text-[#E2EEF2]/60">
                      {activeTab === 'expedition'
                        ? 'EXPEDITION DIVE PROFILE'
                        : 'MASTERCLASS SYLLABUS'}
                    </p>
                    {activeTab === 'expedition'
                      ? currentExpedition.itinerary.map((item) => (
                          <div key={item.phase} className="text-xs">
                            <div className="flex justify-between font-mono-tech text-[#F0F7F9]">
                              <span>{item.phase}</span>
                              <span className="text-[#D4AF37]">{item.depth}</span>
                            </div>
                            <p className="text-[#E2EEF2]/65 text-[11px] mt-0.5">{item.detail}</p>
                          </div>
                        ))
                      : currentCourse.curriculum.map((step, i) => (
                          <div key={step} className="text-xs text-[#E2EEF2]/80 flex gap-2">
                            <span className="font-mono-tech text-[#D4AF37]">0{i + 1}.</span>
                            <span>{step}</span>
                          </div>
                        ))}
                  </div>

                  {/* Pricing Calculation */}
                  <div className="space-y-2 text-xs font-mono-tech mb-6">
                    <div className="flex justify-between text-[#E2EEF2]/75">
                      <span>
                        {charterMode === 'private-yacht'
                          ? 'Whole-Catamaran Private Buyout'
                          : `${diversCount} × Diver Berth Allocation`}
                      </span>
                      <span className="tabular-nums">{formatPrice(totalAUD)}</span>
                    </div>
                    <div className="flex justify-between text-[#E2EEF2]/75">
                      <span>Apeks Carbon Rig &amp; GPS Beacon</span>
                      <span className="text-[#1696B5]">INCLUDED</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-[#F0F7F9] pt-3 border-t border-[#D4AF37]/20">
                      <span>Estimated Total</span>
                      <span className="text-[#D4AF37] tabular-nums">{formatPrice(totalAUD)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full btn-gold-metallic py-3.5 px-6 rounded-lg text-sm font-semibold cursor-pointer mb-3"
                  >
                    Confirm &amp; Lock Expedition Berth
                  </button>
                  <p className="text-[11px] text-[#E2EEF2]/55 text-center flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1696B5]" />
                    <span>Zero-Anchor Reef Permit · 100% Weather Assurance</span>
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Compliance & Legal Document Modal (RSTC Medical Form, Marine Park Permits, Weather Policy, Terms of Charter)
 */
export const ComplianceModal: React.FC<{
  docKey: string | null;
  onClose: () => void;
}> = ({ docKey, onClose }) => {
  if (!docKey || !LEGAL_DOCUMENTS[docKey]) return null;
  const doc = LEGAL_DOCUMENTS[docKey];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={doc.title}
      className="fixed inset-0 z-50 bg-[#030C16]/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full rounded-xl bg-[#071524] gold-hairline p-6 md:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#D4AF37]/20 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tech text-[#D4AF37] mb-1">
              <FileText className="w-3.5 h-3.5 text-[#1696B5]" />
              <span>{doc.code}</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-[#F0F7F9] font-semibold">
              {doc.title}
            </h3>
            <p className="text-xs text-[#E2EEF2]/65 mt-1">{doc.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close document"
            className="p-2 rounded-lg bg-[#0A1F33] text-[#E2EEF2] hover:text-[#D4AF37] border border-[#D4AF37]/20 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2">
          {doc.clauses.map((clause) => (
            <div
              key={clause.heading}
              className="p-4 rounded-lg bg-[#0A1F33] border border-[#D4AF37]/15"
            >
              <h4 className="font-display text-lg text-[#D4AF37] font-semibold mb-1.5">
                {clause.heading}
              </h4>
              <p className="text-sm text-[#E2EEF2]/85 leading-relaxed">{clause.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-5 border-t border-[#D4AF37]/20 flex items-center justify-between">
          <span className="text-xs font-mono-tech text-[#E2EEF2]/60">
            DEEP DIVE AUSTRALIA MARITIME COMPLIANCE DIVISION
          </span>
          <button
            type="button"
            onClick={onClose}
            className="btn-gold-metallic px-5 py-2 rounded-lg text-xs font-semibold cursor-pointer"
          >
            Acknowledge Protocol
          </button>
        </div>
      </div>
    </div>
  );
};
