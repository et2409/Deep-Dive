import React, { useEffect, useRef, useState } from 'react';
import { Flashlight, Compass, ArrowUpRight, SlidersHorizontal } from 'lucide-react';
import { REEF_STATIONS, ReefStationCondition } from '../data/deepDiveData';

interface HeroDiveLightProps {
  onBookExpedition: () => void;
  onExploreSites: () => void;
  currency: 'AUD' | 'USD' | 'EUR';
  onToggleCurrency: () => void;
  onOpenConcierge: () => void;
}

type TorchMode = 'spot' | 'flood' | 'daylight';

interface PlanktonParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  phase: number;
  hue: 'gold' | 'teal' | 'foam';
}

export const HeroDiveLight: React.FC<HeroDiveLightProps> = ({
  onBookExpedition,
  onExploreSites,
  currency,
  onToggleCurrency,
  onOpenConcierge,
}) => {
  const heroRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const illuminatedLayerRef = useRef<HTMLDivElement | null>(null);
  const causticRingRef = useRef<HTMLDivElement | null>(null);

  const [torchMode, setTorchMode] = useState<TorchMode>('flood');
  const [selectedStation, setSelectedStation] = useState<ReefStationCondition>(REEF_STATIONS[1]); // Ribbon Reef default 30m+ / 26°C / 0.8m

  // Mutable animation state for 60fps requestAnimationFrame loop without React re-renders
  const pointerState = useRef({
    targetX: 0.58, // Start near the diver & coral canyon
    targetY: 0.48,
    currentX: 0.58,
    currentY: 0.48,
    lastInputTime: 0,
    isPointerInside: false,
  });

  useEffect(() => {
    const heroEl = heroRef.current;
    const canvas = canvasRef.current;
    if (!heroEl || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = heroEl.clientWidth);
    let height = (canvas.height = heroEl.clientHeight);

    const handleResize = () => {
      if (!heroEl || !canvas) return;
      width = canvas.width = heroEl.clientWidth;
      height = canvas.height = heroEl.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize 68 floating plankton / marine snow particles
    const particles: PlanktonParticle[] = Array.from({ length: 68 }, () => {
      const rand = Math.random();
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: -0.12 - Math.random() * 0.26, // Gentle upward marine current drift
        radius: 0.9 + Math.random() * 1.9,
        baseAlpha: 0.12 + Math.random() * 0.28,
        phase: Math.random() * Math.PI * 2,
        hue: rand > 0.65 ? 'gold' : rand > 0.25 ? 'teal' : 'foam',
      };
    });

    const radiusMap: Record<TorchMode, number> = {
      spot: 220,
      flood: 340,
      daylight: 2400,
    };

    const renderLoop = (timestamp: number) => {
      const state = pointerState.current;
      const idleElapsed = timestamp - state.lastInputTime;

      // Automatic undulating night-dive sweep if on mobile or cursor idle > 2200ms
      if (!state.isPointerInside || idleElapsed > 2400) {
        const t = timestamp * 0.00045;
        state.targetX = 0.52 + Math.sin(t) * 0.26 + Math.cos(t * 0.5) * 0.08;
        state.targetY = 0.48 + Math.sin(t * 1.4) * 0.18;
      }

      // Smooth 60fps exponential interpolation (lerp)
      state.currentX += (state.targetX - state.currentX) * 0.11;
      state.currentY += (state.targetY - state.currentY) * 0.11;

      const px = state.currentX * width;
      const py = state.currentY * height;
      const baseRadius = radiusMap[torchMode];
      // Subtle organic breathing on the torch beam
      const dynamicRadius = baseRadius + Math.sin(timestamp * 0.003) * 8;

      // Update CSS radial-gradient mask on the vivid reef layer
      if (illuminatedLayerRef.current) {
        if (torchMode === 'daylight') {
          illuminatedLayerRef.current.style.maskImage = 'none';
          illuminatedLayerRef.current.style.webkitMaskImage = 'none';
          illuminatedLayerRef.current.style.opacity = '0.92';
        } else {
          const maskGradient = `radial-gradient(circle ${dynamicRadius}px at ${px.toFixed(1)}px ${py.toFixed(
            1
          )}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.88) 38%, rgba(0,0,0,0.35) 68%, rgba(0,0,0,0) 100%)`;
          illuminatedLayerRef.current.style.maskImage = maskGradient;
          illuminatedLayerRef.current.style.webkitMaskImage = maskGradient;
          illuminatedLayerRef.current.style.opacity = '1';
        }
      }

      // Update caustic halo ring position
      if (causticRingRef.current) {
        if (torchMode === 'daylight') {
          causticRingRef.current.style.opacity = '0';
        } else {
          causticRingRef.current.style.opacity = '1';
          causticRingRef.current.style.transform = `translate3d(${(px - dynamicRadius).toFixed(1)}px, ${(
            py - dynamicRadius
          ).toFixed(1)}px, 0)`;
          causticRingRef.current.style.width = `${dynamicRadius * 2}px`;
          causticRingRef.current.style.height = `${dynamicRadius * 2}px`;
        }
      }

      // Render marine plankton particles & subtle dive-torch volumetric glow on Canvas
      ctx.clearRect(0, 0, width, height);

      if (torchMode !== 'daylight') {
        const beamGlow = ctx.createRadialGradient(px, py, 8, px, py, dynamicRadius * 1.05);
        beamGlow.addColorStop(0, 'rgba(22, 150, 181, 0.14)');
        beamGlow.addColorStop(0.45, 'rgba(212, 175, 55, 0.06)');
        beamGlow.addColorStop(0.8, 'rgba(18, 125, 151, 0.04)');
        beamGlow.addColorStop(1, 'rgba(3, 12, 22, 0)');
        ctx.fillStyle = beamGlow;
        ctx.fillRect(0, 0, width, height);
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx + Math.sin(timestamp * 0.0008 + p.phase) * 0.12;
        p.y += p.vy;

        // Wrap around viewport edges
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Calculate proximity to dive torch center for bioluminescent excitation
        const dx = p.x - px;
        const dy = p.y - py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const inBeamFactor =
          torchMode === 'daylight'
            ? 0.55
            : Math.max(0, 1 - dist / (dynamicRadius * 1.15));

        const alpha = Math.min(0.95, p.baseAlpha + inBeamFactor * 0.65);
        const drawRadius = p.radius + inBeamFactor * 1.3;

        ctx.beginPath();
        ctx.arc(p.x, p.y, drawRadius, 0, Math.PI * 2);
        if (p.hue === 'gold') {
          ctx.fillStyle = `rgba(229, 193, 88, ${alpha.toFixed(3)})`;
        } else if (p.hue === 'teal') {
          ctx.fillStyle = `rgba(22, 150, 181, ${alpha.toFixed(3)})`;
        } else {
          ctx.fillStyle = `rgba(240, 247, 249, ${alpha.toFixed(3)})`;
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [torchMode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pointerState.current.targetX = (e.clientX - rect.left) / rect.width;
    pointerState.current.targetY = (e.clientY - rect.top) / rect.height;
    pointerState.current.lastInputTime = performance.now();
    pointerState.current.isPointerInside = true;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    pointerState.current.targetX = (touch.clientX - rect.left) / rect.width;
    pointerState.current.targetY = (touch.clientY - rect.top) / rect.height;
    pointerState.current.lastInputTime = performance.now();
    pointerState.current.isPointerInside = true;
  };

  const handleMouseLeave = () => {
    pointerState.current.isPointerInside = false;
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Interactive Night Dive Hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#030C16] pt-24 pb-0 select-none cursor-crosshair"
    >
      {/* LAYER 1A: Ambient Shrouded Base Reef (6% visibility in pitch-black Abyss Navy #030C16) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `url('/assets/aistudio/Deep_Dive_Gemini_Hero_Background_Image_a616aa55.png')`,
        }}
      />

      {/* LAYER 1B: Pitch-Black / Abyss Navy Shroud (#030C16 at 94% opacity + marine vignette) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(3, 12, 22, 0.90) 0%, rgba(3, 12, 22, 0.96) 75%, rgba(2, 8, 15, 0.99) 100%)',
        }}
      />

      {/* LAYER 2: Vivid Great Barrier Reef Background Revealed by Interactive Dive Torch Mask */}
      <div
        ref={illuminatedLayerRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none transition-opacity duration-300"
        style={{
          backgroundImage: `url('/assets/aistudio/Deep_Dive_Gemini_Hero_Background_Image_a616aa55.png')`,
          filter: 'contrast(1.08) saturate(1.18)',
        }}
      >
        {/* Subtle caustic light-shaft shimmer inside the illuminated reef */}
        <div
          className="absolute inset-0 mix-blend-screen opacity-35"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(22, 150, 181, 0.45) 0%, rgba(212, 175, 55, 0.12) 45%, transparent 75%)',
          }}
        />
      </div>

      {/* LAYER 3: Organic Caustic Falloff Shimmer Ring tracking cursor */}
      <div
        ref={causticRingRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform"
        style={{
          position: 'absolute',
          border: '1px solid rgba(212, 175, 55, 0.18)',
          boxShadow:
            'inset 0 0 60px rgba(22, 150, 181, 0.22), 0 0 50px rgba(18, 125, 151, 0.18)',
        }}
      />

      {/* LAYER 4: 60fps HTML5 Canvas Plankton & Bioluminescent Particle Engine */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Measured Contrast Scrim behind typography so text always exceeds WCAG AA 4.5:1 */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(90deg, rgba(3, 12, 22, 0.84) 0%, rgba(3, 12, 22, 0.56) 48%, rgba(3, 12, 22, 0.20) 100%)',
        }}
      />

      {/* Top Secondary Utility Bar inside Hero (Torch Beam Controls + Currency + Direct Concierge) */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-6 lg:px-10 pt-3 flex flex-wrap items-center justify-between gap-4 text-xs text-[#E2EEF2]/80">
        <div className="flex items-center gap-3">
          <span className="font-mono-tech uppercase tracking-[0.18em] text-[#D4AF37]">
            EST. 2026 · GREAT BARRIER REEF & CORAL SEA
          </span>
          <span aria-hidden="true" className="text-[#1696B5]">
            ·
          </span>
          <span className="hidden sm:inline text-[#E2EEF2]/70">
            Move cursor to sweep umbilical dive torch across the reef
          </span>
        </div>

        {/* Interactive Torch Beam Mode & Currency/Concierge Utility */}
        <div className="flex items-center gap-3">
          <div
            role="group"
            aria-label="Dive Torch Beam Intensity"
            className="inline-flex items-center gap-1 p-1 rounded-lg glass-abyss gold-hairline"
          >
            <Flashlight className="w-3.5 h-3.5 text-[#D4AF37] ml-1.5 mr-1 shrink-0" />
            <button
              type="button"
              onClick={() => setTorchMode('spot')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                torchMode === 'spot'
                  ? 'bg-[#127D97] text-[#F0F7F9]'
                  : 'text-[#E2EEF2]/70 hover:text-[#F0F7F9]'
              }`}
            >
              Spot 1200lm
            </button>
            <button
              type="button"
              onClick={() => setTorchMode('flood')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                torchMode === 'flood'
                  ? 'bg-[#127D97] text-[#F0F7F9]'
                  : 'text-[#E2EEF2]/70 hover:text-[#F0F7F9]'
              }`}
            >
              Flood 3000lm
            </button>
            <button
              type="button"
              onClick={() => setTorchMode('daylight')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                torchMode === 'daylight'
                  ? 'bg-[#D4AF37] text-[#030C16] font-semibold'
                  : 'text-[#E2EEF2]/70 hover:text-[#F0F7F9]'
              }`}
            >
              Full Reef Reveal
            </button>
          </div>

          <button
            type="button"
            onClick={onToggleCurrency}
            title="Switch Display Currency"
            className="px-3 py-1.5 rounded-lg glass-abyss gold-hairline font-mono-tech text-xs text-[#F0F7F9] hover:border-[#D4AF37]/60 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {currency}
          </button>

          <button
            type="button"
            onClick={onOpenConcierge}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-abyss gold-hairline text-xs text-[#E2EEF2] hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>VHF & Concierge</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
          </button>
        </div>
      </div>

      {/* Main Hero Editorial Centerpiece */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-6 lg:px-10 my-auto py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="font-mono-tech text-xs uppercase tracking-[0.24em] text-[#D4AF37] mb-5">
            13°54&apos;S 146°38&apos;E · PRIVATE EXPEDITION FLEET &amp; TECHNICAL ACADEMY
          </p>

          <h1
            className="font-display text-[#F0F7F9] font-semibold tracking-tight leading-[1.06] mb-6"
            style={{
              fontSize: 'clamp(2.75rem, 5.2vw, 4.75rem)',
              textWrap: 'balance',
            }}
          >
            Descend Into the <span className="italic font-normal text-[#D4AF37]">Extraordinary.</span>
          </h1>

          <p className="text-base md:text-lg text-[#E2EEF2]/90 leading-relaxed max-w-2xl mb-10 font-light">
            Bespoke expeditions, technical diving, and elite PADI certifications across the untamed
            depths of Australia.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onBookExpedition}
              className="btn-gold-metallic px-7 py-3.5 rounded-lg text-sm font-semibold tracking-wide whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book an Expedition
            </button>

            <button
              type="button"
              onClick={onExploreSites}
              className="px-7 py-3.5 rounded-lg text-sm font-medium text-[#F0F7F9] bg-[#071524]/70 border border-[#1696B5] hover:bg-[#127D97]/25 hover:border-[#1696B5] transition-all whitespace-nowrap shrink-0 inline-flex items-center gap-2.5 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#1696B5]" />
              <span>Explore Dive Sites</span>
            </button>
          </div>

          {/* Unboxed Architectural Metadata Proof Strip */}
          <div className="mt-12 pt-8 border-t border-[#D4AF37]/20 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#E2EEF2]/75">
            <span>Max 6–8 Divers Per Catamaran</span>
            <span aria-hidden="true" className="text-[#D4AF37]">
              ·
            </span>
            <span>PADI 5-Star Career Development Center</span>
            <span aria-hidden="true" className="text-[#D4AF37]">
              ·
            </span>
            <span>Normoxic Trimix &amp; CCR Support</span>
            <span aria-hidden="true" className="text-[#D4AF37]">
              ·
            </span>
            <span>Port Douglas, Cairns &amp; Exmouth Bases</span>
          </div>
        </div>
      </div>

      {/* Ambient Live Reef Conditions Ticker at Bottom of Hero */}
      <div className="relative z-20 w-full glass-abyss border-t border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3.5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          {/* Primary Required Live Ticker Readout */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs md:text-sm">
            <span className="font-semibold text-[#D4AF37] tracking-wide uppercase font-mono-tech">
              Current Reef Conditions
            </span>
            <span aria-hidden="true" className="text-[#1696B5]">
              |
            </span>
            <span className="text-[#F0F7F9] font-mono-tech tabular-nums">
              Visibility: <strong className="text-[#F0F7F9] font-semibold">30m+</strong>{' '}
              <span className="text-[#E2EEF2]/65">({selectedStation.visibility})</span>
            </span>
            <span aria-hidden="true" className="text-[#1696B5]">
              |
            </span>
            <span className="text-[#F0F7F9] font-mono-tech tabular-nums">
              Water Temp: <strong className="text-[#F0F7F9] font-semibold">26°C</strong>{' '}
              <span className="text-[#E2EEF2]/65">({selectedStation.waterTemp})</span>
            </span>
            <span aria-hidden="true" className="text-[#1696B5]">
              |
            </span>
            <span className="text-[#F0F7F9] font-mono-tech tabular-nums">
              Swell: <strong className="text-[#F0F7F9] font-semibold">0.8m Gentle</strong>
            </span>
          </div>

          {/* Interactive Mooring Buoy Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#1696B5] shrink-0" />
            <span className="text-[11px] text-[#E2EEF2]/60 whitespace-nowrap shrink-0">
              Mooring Telemetry:
            </span>
            {REEF_STATIONS.map((station) => (
              <button
                key={station.id}
                type="button"
                onClick={() => setSelectedStation(station)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono-tech transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedStation.id === station.id
                    ? 'bg-[#0D2840] text-[#D4AF37] border border-[#D4AF37]/40'
                    : 'text-[#E2EEF2]/65 hover:text-[#F0F7F9]'
                }`}
              >
                {station.stationName.split('—')[0].trim()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
