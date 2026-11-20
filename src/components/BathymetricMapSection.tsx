import React, { useState } from 'react';
import { Compass, Navigation, Waves, Eye, Thermometer, ArrowUpRight } from 'lucide-react';
import { DIVE_SITES, DiveSitePin } from '../data/deepDiveData';

interface BathymetricMapSectionProps {
  onSelectSiteForBooking: (site: DiveSitePin) => void;
}

export const BathymetricMapSection: React.FC<BathymetricMapSectionProps> = ({
  onSelectSiteForBooking,
}) => {
  const [activeSite, setActiveSite] = useState<DiveSitePin>(DIVE_SITES[0]);

  return (
    <section
      id="dive-sites"
      className="relative py-24 lg:py-32 bg-[#030C16] border-t border-[#D4AF37]/20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#D4AF37] mb-3">
              03. BATHYMETRIC CARTOGRAPHY &amp; SANCTUARY ZONES
            </p>
            <h2
              className="font-display text-3xl md:text-5xl text-[#F0F7F9] font-semibold tracking-tight leading-[1.1]"
              style={{ textWrap: 'balance' }}
            >
              Australia&apos;s Untamed Continental Drop-Offs
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#E2EEF2]/75 max-w-md leading-relaxed">
            Select a sonar mooring pin across the Coral Sea, Indian Ocean, or Southern Ocean to
            inspect depth contours, seasonal visibility, and resident megafauna.
          </p>
        </div>

        {/* 2-Column Split: Stylized Dark Bathymetric Map (Left 7 cols) + Active Flyout Telemetry Dossier (Right 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive Bathymetric Map Container */}
          <div className="lg:col-span-7 relative rounded-xl bg-[#071524] gold-hairline p-6 md:p-8 flex flex-col justify-between overflow-hidden min-h-[460px]">
            {/* Top Map Coordinate Strip */}
            <div className="relative z-10 flex items-center justify-between text-xs font-mono-tech text-[#E2EEF2]/60 pb-4 border-b border-[#D4AF37]/15">
              <span>DATUM: WGS84 · AUSTRALIAN HYDROGRAPHIC CHART</span>
              <span className="text-[#D4AF37] tabular-nums">{activeSite.coordinates}</span>
            </div>

            {/* Stylized Bathymetric SVG Map of Australia & Surrounding Continental Shelf */}
            <div className="relative my-4 flex-1 flex items-center justify-center">
              <svg
                viewBox="0 0 800 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto max-h-[440px] select-none"
                aria-label="Bathymetric Dive Map of Australia"
              >
                <defs>
                  <radialGradient id="shelfBathymetry" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#127D97" stopOpacity="0.18" />
                    <stop offset="65%" stopColor="#0D2840" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#030C16" stopOpacity="0" />
                  </radialGradient>
                  <pattern
                    id="hydroGrid"
                    width="50"
                    height="50"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 50 0 L 0 0 0 50"
                      fill="none"
                      stroke="#1696B5"
                      strokeOpacity="0.09"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>

                {/* Hydrographic Grid Background */}
                <rect width="800" height="600" fill="url(#hydroGrid)" />
                <circle cx="430" cy="300" r="290" fill="url(#shelfBathymetry)" />

                {/* -2000m Abyssal Plain Outer Bathymetric Contour */}
                <path
                  d="M75 235 C95 140, 210 85, 330 75 C445 65, 550 40, 680 85 C745 120, 770 235, 745 340 C725 430, 665 520, 560 555 C450 530, 345 475, 225 485 C135 490, 75 425, 85 335 Z"
                  stroke="#127D97"
                  strokeOpacity="0.22"
                  strokeWidth="1"
                  strokeDasharray="6 6"
                  fill="none"
                />

                {/* -200m Continental Shelf Edge Contour */}
                <path
                  d="M105 245 C125 165, 230 115, 340 105 C440 95, 535 72, 650 115 C705 150, 720 245, 700 335 C680 410, 625 485, 540 515 C445 485, 350 435, 240 445 C160 450, 105 395, 115 315 Z"
                  stroke="#1696B5"
                  strokeOpacity="0.38"
                  strokeWidth="1.2"
                  fill="#0A1F33"
                  fillOpacity="0.35"
                />

                {/* Great Barrier Reef & Coral Sea Atoll Chain Ridge */}
                <path
                  d="M595 105 Q645 155 675 225 Q692 265 695 295"
                  stroke="#D4AF37"
                  strokeOpacity="0.45"
                  strokeWidth="2.5"
                  strokeDasharray="3 5"
                  fill="none"
                />

                {/* Ningaloo Reef Western Shelf Contour */}
                <path
                  d="M110 230 Q95 265 112 305"
                  stroke="#D4AF37"
                  strokeOpacity="0.45"
                  strokeWidth="2.5"
                  strokeDasharray="3 5"
                  fill="none"
                />

                {/* Continent of Australia Topographic Landmass */}
                <path
                  d="M135 260
                     L160 220 L215 190 L265 155 L315 165 L355 125 L415 135 L445 175
                     L480 175 L515 110 L545 115 L575 170 L620 215 L655 270 L665 325
                     L640 385 L605 445 L555 465 L510 445 L475 415 L445 430 L405 395
                     L340 385 L270 405 L195 415 L155 385 L145 320 L125 280 Z"
                  fill="#030C16"
                  stroke="#D4AF37"
                  strokeOpacity="0.45"
                  strokeWidth="1.6"
                />

                {/* Tasmania */}
                <path
                  d="M545 500 L580 500 L575 538 L550 535 Z"
                  fill="#030C16"
                  stroke="#D4AF37"
                  strokeOpacity="0.4"
                  strokeWidth="1.4"
                />

                {/* Internal Topographic Basin Contours */}
                <ellipse
                  cx="440"
                  cy="310"
                  rx="115"
                  ry="65"
                  stroke="#1696B5"
                  strokeOpacity="0.14"
                  strokeWidth="1"
                />
                <ellipse
                  cx="260"
                  cy="295"
                  rx="75"
                  ry="50"
                  stroke="#1696B5"
                  strokeOpacity="0.12"
                  strokeWidth="1"
                />

                {/* Ocean Labels */}
                <text
                  x="675"
                  y="92"
                  fill="#1696B5"
                  fillOpacity="0.7"
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                  letterSpacing="2"
                >
                  CORAL SEA BASIN (-2,000m)
                </text>
                <text
                  x="30"
                  y="215"
                  fill="#1696B5"
                  fillOpacity="0.7"
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                  letterSpacing="2"
                >
                  INDIAN OCEAN SHELF
                </text>
                <text
                  x="295"
                  y="545"
                  fill="#1696B5"
                  fillOpacity="0.7"
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                  letterSpacing="2"
                >
                  SOUTHERN OCEAN KELP CANYONS
                </text>
                <text
                  x="335"
                  y="295"
                  fill="#E2EEF2"
                  fillOpacity="0.22"
                  fontSize="14"
                  fontFamily="Cormorant Garamond, serif"
                  letterSpacing="6"
                >
                  AUSTRALIA
                </text>
              </svg>

              {/* Interactive HTML Pin Buttons Overlaid on SVG Percentage Coordinates */}
              <div className="absolute inset-0">
                {DIVE_SITES.map((site) => {
                  const isSelected = activeSite.id === site.id;
                  return (
                    <button
                      key={site.id}
                      type="button"
                      onClick={() => setActiveSite(site)}
                      style={{
                        left: `${site.xPercent}%`,
                        top: `${site.yPercent}%`,
                      }}
                      aria-label={`Inspect dive site ${site.name}`}
                      className="group absolute -translate-x-1/2 -translate-y-1/2 p-2 focus:outline-none cursor-pointer"
                    >
                      {/* Sonar Ring */}
                      <span
                        className={`block w-7 h-7 rounded-full transition-transform duration-200 flex items-center justify-center ${
                          isSelected
                            ? 'bg-[#D4AF37]/25 border-2 border-[#D4AF37] scale-125 shadow-[0_0_24px_rgba(212,175,55,0.65)]'
                            : 'bg-[#0D2840]/90 border border-[#1696B5] hover:border-[#D4AF37] hover:scale-110'
                        }`}
                      >
                        <span
                          className={`block w-2.5 h-2.5 rounded-full ${
                            isSelected ? 'bg-[#D4AF37]' : 'bg-[#1696B5] group-hover:bg-[#D4AF37]'
                          }`}
                        />
                      </span>

                      {/* Floating Pin Label */}
                      <span
                        className={`mt-1.5 block px-2.5 py-1 rounded text-[11px] font-mono-tech whitespace-nowrap transition-all ${
                          isSelected
                            ? 'bg-[#D4AF37] text-[#030C16] font-semibold shadow-lg'
                            : 'bg-[#030C16]/90 text-[#F0F7F9] border border-[#1696B5]/40 group-hover:border-[#D4AF37]'
                        }`}
                      >
                        {site.name.split('—')[0].split('&')[0].trim()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Quick Site Switcher Buttons */}
            <div className="relative z-10 pt-4 border-t border-[#D4AF37]/15 flex flex-wrap items-center gap-2">
              {DIVE_SITES.map((site) => (
                <button
                  key={site.id}
                  type="button"
                  onClick={() => setActiveSite(site)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeSite.id === site.id
                      ? 'bg-[#127D97] text-[#F0F7F9] font-medium'
                      : 'bg-[#0A1F33] text-[#E2EEF2]/70 hover:text-[#F0F7F9]'
                  }`}
                >
                  {site.name.split('—')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Right Flyout Card: Active Dive Site Telemetry & Wildlife Dossier */}
          <div className="lg:col-span-5 rounded-xl bg-[#0A1F33] gold-hairline p-7 md:p-9 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 text-xs font-mono-tech text-[#D4AF37] mb-3">
                <span>{activeSite.region}</span>
                <span>{activeSite.difficulty}</span>
              </div>

              <h3 className="font-display text-2xl md:text-3xl text-[#F0F7F9] font-semibold mb-2">
                {activeSite.name}
              </h3>

              <p className="font-mono-tech text-xs text-[#1696B5] mb-6 tabular-nums">
                GPS: {activeSite.coordinates} · {activeSite.seasonWindow}
              </p>

              <p className="text-sm text-[#E2EEF2]/85 leading-relaxed mb-8">
                {activeSite.bathymetryNote}
              </p>

              {/* 4-Metric Hydrographic Grid */}
              <div className="grid grid-cols-2 gap-4 pt-6 pb-6 border-y border-[#D4AF37]/20 mb-7">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#E2EEF2]/60 mb-1">
                    <Waves className="w-3.5 h-3.5 text-[#1696B5]" />
                    <span>Depth Profile</span>
                  </div>
                  <p className="font-mono-tech text-sm md:text-base text-[#F0F7F9] font-medium tabular-nums">
                    {activeSite.depthRange}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#E2EEF2]/60 mb-1">
                    <Eye className="w-3.5 h-3.5 text-[#1696B5]" />
                    <span>Average Visibility</span>
                  </div>
                  <p className="font-mono-tech text-sm md:text-base text-[#F0F7F9] font-medium tabular-nums">
                    {activeSite.avgVisibility}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#E2EEF2]/60 mb-1">
                    <Thermometer className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Thermal Range</span>
                  </div>
                  <p className="font-mono-tech text-sm md:text-base text-[#F0F7F9] font-medium tabular-nums">
                    {activeSite.waterTemp}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#E2EEF2]/60 mb-1">
                    <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Current Vector</span>
                  </div>
                  <p className="font-mono-tech text-sm text-[#F0F7F9] font-medium">
                    {activeSite.currentStrength}
                  </p>
                </div>
              </div>

              {/* Target Pelagic & Endemic Wildlife (Unboxed Editorial List) */}
              <div className="mb-8">
                <p className="text-xs font-mono-tech uppercase tracking-[0.16em] text-[#D4AF37] mb-3">
                  Target Resident Megafauna &amp; Species
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[#F0F7F9]">
                  {activeSite.targetWildlife.map((species, idx) => (
                    <React.Fragment key={species}>
                      <span>{species}</span>
                      {idx < activeSite.targetWildlife.length - 1 && (
                        <span aria-hidden="true" className="text-[#1696B5]">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectSiteForBooking(activeSite)}
              className="w-full btn-gold-metallic py-3.5 px-6 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Charter Expedition to {activeSite.name.split('—')[0].trim()}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
