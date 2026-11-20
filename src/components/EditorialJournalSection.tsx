import React, { useState, useEffect } from 'react';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { JOURNAL_PLATES, JournalPlate } from '../data/deepDiveData';
import { UnderwaterVisualPlate } from './MarineVisuals';

export const EditorialJournalSection: React.FC = () => {
  const [selectedPlateIndex, setSelectedPlateIndex] = useState<number | null>(null);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (selectedPlateIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPlateIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedPlateIndex((prev) =>
          prev === null ? null : (prev + 1) % JOURNAL_PLATES.length
        );
      }
      if (e.key === 'ArrowLeft') {
        setSelectedPlateIndex((prev) =>
          prev === null ? null : (prev - 1 + JOURNAL_PLATES.length) % JOURNAL_PLATES.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPlateIndex]);

  const activePlate: JournalPlate | null =
    selectedPlateIndex !== null ? JOURNAL_PLATES[selectedPlateIndex] : null;

  return (
    <section
      id="journal"
      className="py-24 lg:py-32 bg-[#030C16] border-t border-[#D4AF37]/20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Editorial Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#D4AF37] mb-3">
              05. THE SUB-AQUATIC JOURNAL &amp; ARCHIVE
            </p>
            <h2
              className="font-display text-3xl md:text-5xl text-[#F0F7F9] font-semibold tracking-tight leading-[1.1]"
              style={{ textWrap: 'balance' }}
            >
              Dispatches from the Twilight Zone
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#E2EEF2]/75 max-w-md leading-relaxed">
            Every expedition is accompanied by a resident marine cinematographer. Select any archival
            plate to inspect full optical housing and depth EXIF telemetry.
          </p>
        </div>

        {/* Asymmetrical Magazine-Style Bento / Masonry Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[290px]">
          {JOURNAL_PLATES.map((plate, index) => {
            // Asymmetric spans for magazine cadence
            const spanClass =
              index === 0
                ? 'md:col-span-7 md:row-span-2'
                : index === 1
                ? 'md:col-span-5 md:row-span-2'
                : index === 2
                ? 'md:col-span-4 md:row-span-1'
                : index === 3
                ? 'md:col-span-4 md:row-span-1'
                : 'md:col-span-4 md:row-span-1';

            return (
              <article
                key={plate.id}
                onClick={() => setSelectedPlateIndex(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedPlateIndex(index);
                  }
                }}
                aria-label={`Open lightbox for ${plate.title}`}
                className={`group relative rounded-xl overflow-hidden gold-hairline gold-hairline-hover cursor-pointer flex flex-col justify-end ${spanClass}`}
              >
                <UnderwaterVisualPlate
                  variant={plate.sceneType}
                  className="absolute inset-0 w-full h-full"
                />

                {/* Top Right Expand Affordance */}
                <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-lg glass-abyss gold-hairline flex items-center justify-center text-[#E2EEF2] group-hover:text-[#D4AF37] transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom Overlay Editorial Caption & Inline EXIF */}
                <div className="relative z-10 p-6 bg-gradient-to-t from-[#030C16] via-[#030C16]/85 to-transparent">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono-tech text-[#D4AF37] mb-1.5 tabular-nums">
                    <span>Depth: {plate.exif.depth}</span>
                    <span aria-hidden="true" className="text-[#1696B5]">
                      ·
                    </span>
                    <span>{plate.exif.location}</span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl text-[#F0F7F9] font-semibold leading-snug mb-1">
                    {plate.title}
                  </h3>
                  <p className="text-xs text-[#E2EEF2]/75 line-clamp-2">{plate.caption}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Lightbox Modal with Technical EXIF Metadata */}
      {activePlate && selectedPlateIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePlate.title}
          className="fixed inset-0 z-50 bg-[#030C16]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedPlateIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full rounded-xl bg-[#071524] gold-hairline overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Lightbox Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#D4AF37]/20 bg-[#030C16]/60">
              <div className="flex items-center gap-2.5 text-xs font-mono-tech text-[#D4AF37]">
                <Camera className="w-4 h-4 text-[#1696B5]" />
                <span>
                  ARCHIVAL PLATE 0{selectedPlateIndex + 1} / 0{JOURNAL_PLATES.length}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-[#E2EEF2]/80">{activePlate.exif.coordinates}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedPlateIndex(
                      (selectedPlateIndex - 1 + JOURNAL_PLATES.length) % JOURNAL_PLATES.length
                    )
                  }
                  aria-label="Previous plate"
                  className="p-2 rounded-lg bg-[#0A1F33] text-[#E2EEF2] hover:text-[#D4AF37] border border-[#D4AF37]/20 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedPlateIndex((selectedPlateIndex + 1) % JOURNAL_PLATES.length)
                  }
                  aria-label="Next plate"
                  className="p-2 rounded-lg bg-[#0A1F33] text-[#E2EEF2] hover:text-[#D4AF37] border border-[#D4AF37]/20 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPlateIndex(null)}
                  aria-label="Close lightbox"
                  className="p-2 rounded-lg bg-[#0A1F33] text-[#E2EEF2] hover:text-[#D4AF37] border border-[#D4AF37]/20 ml-2 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* High-Resolution Visual Canvas */}
            <div className="relative h-[340px] md:h-[460px] w-full">
              <UnderwaterVisualPlate
                variant={activePlate.sceneType}
                className="w-full h-full"
              />
            </div>

            {/* EXIF Telemetry & Caption Footer */}
            <div className="p-6 md:p-8 bg-[#0A1F33] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-6">
                <h3 className="font-display text-2xl md:text-3xl text-[#F0F7F9] font-semibold mb-2">
                  {activePlate.title}
                </h3>
                <p className="text-sm text-[#E2EEF2]/85 leading-relaxed mb-3">
                  {activePlate.caption}
                </p>
                <p className="text-xs font-mono-tech text-[#1696B5]">{activePlate.photographer}</p>
              </div>

              <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 lg:pt-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-[#D4AF37]/20 text-xs font-mono-tech">
                <div>
                  <span className="block text-[#E2EEF2]/50 mb-1">DEPTH GAUGE</span>
                  <span className="text-[#D4AF37] font-medium tabular-nums">
                    {activePlate.exif.depth}
                  </span>
                </div>
                <div>
                  <span className="block text-[#E2EEF2]/50 mb-1">LOCATION</span>
                  <span className="text-[#F0F7F9]">{activePlate.exif.location}</span>
                </div>
                <div>
                  <span className="block text-[#E2EEF2]/50 mb-1">WATER TEMP</span>
                  <span className="text-[#F0F7F9] tabular-nums">{activePlate.exif.waterTemp}</span>
                </div>
                <div className="col-span-2">
                  <span className="block text-[#E2EEF2]/50 mb-1">OPTICAL HOUSING &amp; RIG</span>
                  <span className="text-[#F0F7F9]">{activePlate.exif.gear}</span>
                </div>
                <div>
                  <span className="block text-[#E2EEF2]/50 mb-1">EXPOSURE</span>
                  <span className="text-[#F0F7F9] tabular-nums">{activePlate.exif.settings}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
