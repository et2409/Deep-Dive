import React from 'react';

/**
 * Custom SVG Brand Logo inspired directly by the Deep Dive Australia brand sheet:
 * Teal Surf curling ocean waves intertwined with Sunlit Gold crescents and a descending scuba diver.
 */
export const DeepDiveLogo: React.FC<{ className?: string; showText?: boolean }> = ({
  className = 'h-9',
  showText = true,
}) => {
  return (
    <div className="inline-flex items-center gap-3.5 select-none">
      <svg
        viewBox="0 0 120 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} w-auto shrink-0`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="tealWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1696B5" />
            <stop offset="55%" stopColor="#127D97" />
            <stop offset="100%" stopColor="#0D2840" />
          </linearGradient>
          <linearGradient id="goldLeafGrad" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#F4DC88" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#A6821F" />
          </linearGradient>
        </defs>
        {/* Main sweeping teal wave crest */}
        <path
          d="M6 52C22 40 32 45 45 48C56 50 65 44 63 32C61 22 49 20 44 27C41 31 44 37 50 37C43 41 34 36 36 25C38 14 53 10 66 18C77 25 81 42 70 52C57 62 36 58 22 52C14 49 9 50 6 52Z"
          fill="url(#tealWaveGrad)"
        />
        {/* Secondary lower teal swell */}
        <path
          d="M14 58C28 52 44 59 60 57C74 55 83 45 87 34C83 49 71 62 54 63C38 64 25 57 14 58Z"
          fill="#1696B5"
          fillOpacity="0.78"
        />
        {/* Inner gold crescent curl */}
        <path
          d="M42 35C47 36 52 32 51 26C50 21 44 20 40 24C45 22 48 25 48 29C47 33 44 34 42 35Z"
          fill="url(#goldLeafGrad)"
        />
        {/* Lower gold wave ribbon */}
        <path
          d="M68 36C66 45 73 53 83 52C91 51 96 46 99 42C93 47 84 48 77 44C71 41 69 36 68 36Z"
          fill="url(#goldLeafGrad)"
        />
        {/* Diver silhouette descending at 35-degree angle */}
        {/* Flippers & legs */}
        <path
          d="M67 8L74 14L79 23L89 31L85 35L75 26L70 16L63 11L67 8Z"
          fill="url(#tealWaveGrad)"
        />
        {/* Fin tip in sunlit gold */}
        <path d="M62 10L68 6L74 13L69 15L62 10Z" fill="url(#goldLeafGrad)" />
        {/* Diver torso & extended arms */}
        <path
          d="M84 29C89 31 95 36 101 42L113 50L110 52L97 44C91 40 85 37 80 34L84 29Z"
          fill="url(#tealWaveGrad)"
        />
        {/* Gold Scuba Cylinder on back */}
        <rect
          x="89"
          y="23"
          width="15"
          height="5.5"
          rx="2.75"
          transform="rotate(34 89 23)"
          fill="url(#goldLeafGrad)"
        />
        {/* Diver Head */}
        <circle cx="105.5" cy="39.5" r="4" fill="url(#goldLeafGrad)" />
        {/* Extended gold hand/torch spear */}
        <path d="M98 43L115 52L112 53.5L96 45L98 43Z" fill="url(#goldLeafGrad)" />
      </svg>
      {showText && (
        <span className="font-display text-lg md:text-xl font-semibold tracking-[0.18em] text-[#F0F7F9] whitespace-nowrap shrink-0">
          DEEP DIVE <span className="text-[#D4AF37] font-normal tracking-[0.22em]">AUSTRALIA</span>
        </span>
      )}
    </div>
  );
};

/**
 * High-detail atmospheric underwater visual renderer for Expedition Cards and Editorial Journal Plates.
 * Combines the local Great Barrier Reef photography asset with bespoke vector bathymetry, megafauna silhouettes,
 * caustic light shafts, and depth grading.
 */
export const UnderwaterVisualPlate: React.FC<{
  variant:
    | 'outer-reef'
    | 'yongala-wreck'
    | 'ningaloo-manta'
    | 'osprey-shark'
    | 'canyon-sunburst'
    | 'nudibranch-macro'
    | 'tiger-cathedral'
    | 'yongala-stern'
    | 'leafy-seadragon'
    | 'manta-cleaning';
  className?: string;
}> = ({ variant, className = '' }) => {
  // Determine crop/filter positioning on the local high-res reef asset + specialized vector overlay
  const getPhotoStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'outer-reef':
      case 'canyon-sunburst':
        return {
          backgroundImage: `url('/assets/aistudio/Deep_Dive_Gemini_Hero_Background_Image_a616aa55.png')`,
          backgroundSize: '135%',
          backgroundPosition: '50% 25%',
          filter: 'contrast(1.12) saturate(1.15)',
        };
      case 'yongala-wreck':
      case 'yongala-stern':
        return {
          backgroundImage: `url('/assets/aistudio/Deep_Dive_Gemini_Hero_Background_Image_a616aa55.png')`,
          backgroundSize: '165%',
          backgroundPosition: '80% 70%',
          filter: 'hue-rotate(12deg) contrast(1.25) brightness(0.68)',
        };
      case 'ningaloo-manta':
      case 'manta-cleaning':
        return {
          backgroundImage: `url('/assets/aistudio/Deep_Dive_Gemini_Hero_Background_Image_a616aa55.png')`,
          backgroundSize: '150%',
          backgroundPosition: '20% 15%',
          filter: 'hue-rotate(-8deg) contrast(1.15) brightness(0.88)',
        };
      case 'osprey-shark':
      case 'tiger-cathedral':
        return {
          backgroundImage: `url('/assets/aistudio/Deep_Dive_Gemini_Hero_Background_Image_a616aa55.png')`,
          backgroundSize: '160%',
          backgroundPosition: '62% 18%',
          filter: 'hue-rotate(18deg) saturate(0.9) contrast(1.3) brightness(0.62)',
        };
      case 'nudibranch-macro':
        return {
          backgroundImage: `url('/assets/aistudio/Deep_Dive_Gemini_Hero_Background_Image_a616aa55.png')`,
          backgroundSize: '240%',
          backgroundPosition: '18% 88%',
          filter: 'contrast(1.35) saturate(1.35) brightness(0.75)',
        };
      case 'leafy-seadragon':
      default:
        return {
          backgroundImage: `url('/assets/aistudio/Deep_Dive_Gemini_Hero_Background_Image_a616aa55.png')`,
          backgroundSize: '185%',
          backgroundPosition: '42% 85%',
          filter: 'hue-rotate(-22deg) contrast(1.2) saturate(1.15) brightness(0.8)',
        };
    }
  };

  return (
    <div className={`relative overflow-hidden bg-[#030C16] select-none ${className}`}>
      {/* Base Reef Photographic Layer */}
      <div
        className="absolute inset-0 bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-105"
        style={getPhotoStyle()}
      />

      {/* Bespoke Scene-Specific Oceanic SVG Art Layer */}
      <svg
        viewBox="0 0 800 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id={`abyssGlow-${variant}`} cx="50%" cy="20%" r="75%">
            <stop offset="0%" stopColor="#1696B5" stopOpacity="0.28" />
            <stop offset="60%" stopColor="#071524" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#030C16" stopOpacity="0.92" />
          </radialGradient>
          <linearGradient id={`causticRay-${variant}`} x1="50%" y1="0%" x2="30%" y2="100%">
            <stop offset="0%" stopColor="#E2EEF2" stopOpacity="0.26" />
            <stop offset="60%" stopColor="#1696B5" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#030C16" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="goldAccentLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Atmospheric depth wash */}
        <rect width="800" height="520" fill={`url(#abyssGlow-${variant})`} />

        {/* Zenith Sunbeams */}
        <polygon points="320,0 440,0 240,520 80,520" fill={`url(#causticRay-${variant})`} />
        <polygon points="460,0 590,0 520,520 340,520" fill={`url(#causticRay-${variant})`} />

        {/* Scene-Specific Silhouettes & Marine Geometry */}
        {(variant === 'yongala-wreck' || variant === 'yongala-stern') && (
          <g opacity="0.86">
            {/* Historic Steamship Bow & Mast Superstructure Silhouette */}
            <path
              d="M90 480 L230 220 L580 265 L710 490 Z"
              fill="#04101E"
              stroke="#1696B5"
              strokeOpacity="0.3"
              strokeWidth="1.5"
            />
            <line x1="340" y1="235" x2="310" y2="70" stroke="#092138" strokeWidth="8" />
            <line x1="265" y1="125" x2="365" y2="145" stroke="#092138" strokeWidth="5" />
            {/* Giant Queensland Grouper & Schooling Trevally silhouettes */}
            <ellipse cx="480" cy="190" rx="46" ry="20" fill="#030C16" opacity="0.85" />
            <polygon points="522,190 548,174 545,206" fill="#030C16" opacity="0.85" />
            {/* Dive Torch Beam cutting into wreck */}
            <polygon
              points="180,140 460,230 390,340"
              fill="#D4AF37"
              fillOpacity="0.16"
            />
          </g>
        )}

        {(variant === 'ningaloo-manta' || variant === 'manta-cleaning') && (
          <g opacity="0.9">
            {/* Graceful Oceanic Manta Ray Silhouette gliding overhead */}
            <path
              d="M210 210 C290 155, 365 160, 410 190 C455 160, 530 155, 610 210 C540 225, 465 245, 415 275 L410 385 L405 275 C355 245, 280 225, 210 210 Z"
              fill="#041322"
              stroke="#1696B5"
              strokeOpacity="0.4"
              strokeWidth="1.2"
            />
            {/* Whale Shark spotted silhouette in upper distance */}
            <path
              d="M520 95 C580 82, 650 88, 710 105 L750 82 L742 124 L710 112 C650 124, 580 120, 520 95 Z"
              fill="#071B30"
              opacity="0.72"
            />
          </g>
        )}

        {(variant === 'osprey-shark' || variant === 'tiger-cathedral') && (
          <g opacity="0.92">
            {/* Scalloped Hammerhead Patrol Squadron */}
            <path
              d="M270 165 L295 148 L305 162 L385 170 L435 142 L425 175 L495 182 L530 155 L522 198 L485 188 L415 196 L395 225 L380 192 L295 184 L280 196 Z"
              fill="#030D19"
              stroke="#1696B5"
              strokeOpacity="0.35"
              strokeWidth="1"
            />
            <path
              d="M470 285 L490 272 L498 282 L555 288 L590 268 L582 292 L635 298 L660 278 L654 310 L625 302 L575 308 L560 328 L548 304 L490 298 Z"
              fill="#041222"
              opacity="0.8"
            />
          </g>
        )}

        {variant === 'nudibranch-macro' && (
          <g>
            {/* Bioluminescent Macro Nudibranch Plumes */}
            <circle cx="400" cy="260" r="145" fill="#030C16" fillOpacity="0.65" />
            <path
              d="M280 330 Q360 230 480 280 Q530 300 550 340 Q420 365 280 330 Z"
              fill="#0A233A"
              stroke="#1696B5"
              strokeWidth="2"
            />
            <circle cx="395" cy="255" r="28" fill="#D4AF37" fillOpacity="0.28" />
            <circle cx="425" cy="245" r="18" fill="#1696B5" fillOpacity="0.45" />
            <circle cx="345" cy="265" r="12" fill="#D4AF37" fillOpacity="0.55" />
          </g>
        )}

        {variant === 'leafy-seadragon' && (
          <g opacity="0.9">
            {/* Golden Leafy Sea Dragon & Kelp Ribbons */}
            <path
              d="M310 180 C345 160, 380 210, 415 205 C450 200, 480 250, 455 305 C430 345, 380 330, 395 285"
              stroke="#D4AF37"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              opacity="0.65"
            />
            <ellipse cx="335" cy="155" rx="18" ry="9" fill="#D4AF37" fillOpacity="0.55" />
            <ellipse cx="420" cy="175" rx="22" ry="10" fill="#1696B5" fillOpacity="0.55" />
            <ellipse cx="475" cy="235" rx="20" ry="9" fill="#D4AF37" fillOpacity="0.5" />
          </g>
        )}

        {/* Subtle Bathymetric Hairline Reticle Overlay */}
        <line x1="40" y1="40" x2="760" y2="40" stroke="url(#goldAccentLine)" strokeWidth="0.75" />
        <line x1="40" y1="480" x2="760" y2="480" stroke="url(#goldAccentLine)" strokeWidth="0.75" />
      </svg>

      {/* Measured Bottom Scrim for WCAG AA Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030C16] via-[#030C16]/45 to-transparent pointer-events-none" />
    </div>
  );
};
