'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn, Maximize2 } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  alt: string;
  color?: string;
  badge?: React.ReactNode;
  video?: string;
}

export default function ProductGallery({ images, alt, color = '#111720', badge, video }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const totalItems = images.length + (video ? 1 : 0);
  const isVideoActive = video && activeIdx === images.length;

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeIdx < totalItems - 1) {
        setActiveIdx((p) => p + 1);
      } else if (diff < 0 && activeIdx > 0) {
        setActiveIdx((p) => p - 1);
      }
    }
  }, [activeIdx, totalItems]);

  useEffect(() => {
    if (!thumbnailRef.current) return;
    const active = thumbnailRef.current.children[activeIdx] as HTMLElement;
    if (active) {
      active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeIdx]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') setLightboxIdx((p) => Math.min(p + 1, totalItems - 1));
      if (e.key === 'ArrowLeft') setLightboxIdx((p) => Math.max(p - 1, 0));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxOpen, totalItems]);

  return (
    <>
      <div className="relative">
        {/* Main Image */}
        <div
          className="relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden"
          style={{ background: color }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={() => { setLightboxIdx(activeIdx); setLightboxOpen(true); }}
        >
          {isVideoActive && video ? (
            <video
              src={video}
              controls
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-contain"
            />
          ) : (
            <img
              src={images[activeIdx]}
              alt={`${alt} - ${activeIdx + 1}`}
              className="absolute inset-0 w-full h-full object-contain"
              decoding="async"
              loading={activeIdx === 0 ? 'eager' : 'lazy'}
            />
          )}

          {badge && <div className="absolute top-3 left-3 z-10">{badge}</div>}

          {/* Arrows */}
          {activeIdx > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setActiveIdx((p) => p - 1); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm"
            >
              <ChevronLeft size={18} />
            </button>
          )}
          {activeIdx < totalItems - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setActiveIdx((p) => p + 1); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm"
            >
              <ChevronRight size={18} />
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-3 left-3 z-10 rounded-full bg-black/60 px-2.5 py-1 text-[11px] text-white/90 backdrop-blur-sm">
            {activeIdx + 1} / {totalItems}
          </div>

          {/* Zoom hint - desktop only */}
          <div className="absolute bottom-3 right-3 z-10 hidden sm:flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1.5 text-[10px] text-white/70 backdrop-blur-sm">
            <ZoomIn size={12} />
            <span>Click para ampliar</span>
          </div>
        </div>

        {/* Thumbnails */}
        <div
          ref={thumbnailRef}
          className="mt-2 flex gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:grid sm:grid-cols-6 sm:gap-2 sm:overflow-visible sm:pb-0"
        >
          {images.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`shrink-0 w-[56px] h-[56px] sm:w-auto sm:h-auto sm:aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                activeIdx === idx
                  ? 'border-[#10BFD8] opacity-100'
                  : 'border-white/10 opacity-50'
              }`}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover sm:object-contain sm:p-1"
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
          {video && (
            <button
              onClick={() => setActiveIdx(images.length)}
              className={`relative shrink-0 w-[56px] h-[56px] sm:w-auto sm:h-auto sm:aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                activeIdx === images.length
                  ? 'border-[#10BFD8] opacity-100'
                  : 'border-white/10 opacity-50'
              }`}
            >
              {images[0] ? (
                <img src={images[0]} alt="" className="w-full h-full object-cover sm:object-contain sm:p-1" loading="lazy" decoding="async" />
              ) : (
                <div className="flex w-full h-full items-center justify-center bg-[#111720]">
                  <Maximize2 size={14} className="text-[#5a6678]" />
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90">
                  <span className="ml-0.5 text-[9px] font-bold text-[#080c12]">▶</span>
                </div>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 z-[110] flex items-center justify-between p-4">
              <div className="rounded-full bg-white/10 px-3 py-1.5 text-[13px] text-white/80">
                {lightboxIdx + 1} / {totalItems}
              </div>
              <button
                onClick={() => setLightboxOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation */}
            {lightboxIdx > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIdx((p) => p - 1); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-[110] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white"
              >
                <ChevronLeft size={22} />
              </button>
            )}
            {lightboxIdx < totalItems - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIdx((p) => p + 1); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-[110] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white"
              >
                <ChevronRight size={22} />
              </button>
            )}

            {/* Content */}
            <div className="flex-1 flex items-center justify-center w-full px-12" onClick={(e) => e.stopPropagation()}>
              {video && lightboxIdx === images.length ? (
                <video
                  src={video}
                  controls
                  playsInline
                  className="max-h-[80vh] max-w-full"
                />
              ) : (
                <img
                  src={images[lightboxIdx]}
                  alt={`${alt} - ${lightboxIdx + 1}`}
                  className="max-h-[80vh] max-w-full object-contain"
                  decoding="async"
                />
              )}
            </div>

            {/* Thumbnails */}
            <div className="w-full overflow-x-auto scrollbar-none py-3 px-4">
              <div className="flex gap-2 justify-center mx-auto" style={{ width: 'fit-content' }}>
                {images.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setLightboxIdx(idx); }}
                    className={`h-12 w-12 shrink-0 overflow-hidden rounded-lg border-2 ${
                      lightboxIdx === idx ? 'border-[#10BFD8]' : 'border-white/20 opacity-50'
                    }`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                  </button>
                ))}
                {video && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setLightboxIdx(images.length); }}
                    className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border-2 ${
                      lightboxIdx === images.length ? 'border-[#10BFD8]' : 'border-white/20 opacity-50'
                    }`}
                  >
                    {images[0] ? (
                      <img src={images[0]} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#111720]">
                        <Maximize2 size={14} className="text-[#5a6678]" />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <span className="text-[8px] font-bold text-white">▶</span>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
