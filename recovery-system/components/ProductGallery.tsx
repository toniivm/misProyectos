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
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const totalItems = images.length + (video ? 1 : 0);
  const isVideoActive = video && activeIdx === images.length;

  // Swipe handling for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    e.stopPropagation();
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    e.stopPropagation();
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      e.preventDefault();
      if (diff > 0 && activeIdx < totalItems - 1) {
        setActiveIdx((p) => p + 1);
      } else if (diff < 0 && activeIdx > 0) {
        setActiveIdx((p) => p - 1);
      }
    }
  }, [activeIdx, totalItems]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') setLightboxIdx((p) => Math.min(p + 1, images.length - 1));
      if (e.key === 'ArrowLeft') setLightboxIdx((p) => Math.max(p - 1, 0));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxOpen, images.length]);

  // Scroll thumbnail into view
  useEffect(() => {
    if (!thumbnailRef.current) return;
    const active = thumbnailRef.current.children[activeIdx] as HTMLElement;
    if (active) {
      active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeIdx]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }, [zoomed]);

  const openLightbox = useCallback((idx: number) => {
    setLightboxIdx(idx);
    setLightboxOpen(true);
  }, []);

  return (
    <>
      {/* Main Gallery */}
      <div className="relative">
        {/* Main Image */}
        <div
          className="relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl border border-white/[0.08] overflow-hidden cursor-crosshair"
          style={{ background: color, touchAction: 'pan-y' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setZoomed(false)}
          onClick={() => openLightbox(activeIdx)}
        >
          {isVideoActive && video ? (
            <video
              src={video}
              controls
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-contain"
            />
          ) : (
            <img
              src={images[activeIdx]}
              alt={`${alt} - imagen ${activeIdx + 1}`}
              className="absolute inset-0 h-full w-full object-contain transition-transform duration-300"
              style={zoomed ? {
                transform: 'scale(2)',
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              } : undefined}
              decoding="async"
              loading={activeIdx === 0 ? 'eager' : 'lazy'}
            />
          )}

          {/* Badge */}
          {badge && <div className="absolute top-4 left-4 z-10">{badge}</div>}

          {/* Zoom hint */}
          <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1.5 text-[10px] text-white/70 backdrop-blur-sm">
            <ZoomIn size={12} />
            <span className="hidden sm:inline">Click para ampliar</span>
          </div>

          {/* Navigation arrows */}
          {activeIdx > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setActiveIdx((p) => p - 1); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white/80 backdrop-blur-sm transition hover:bg-black/60 hover:text-white"
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={18} />
            </button>
          )}
          {activeIdx < totalItems - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setActiveIdx((p) => p + 1); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white/80 backdrop-blur-sm transition hover:bg-black/60 hover:text-white"
              aria-label="Siguiente imagen"
            >
              <ChevronRight size={18} />
            </button>
          )}

          {/* Image counter */}
          <div className="absolute bottom-4 left-4 z-10 rounded-full bg-black/50 px-2.5 py-1 text-[11px] text-white/80 backdrop-blur-sm">
            {activeIdx + 1} / {totalItems}
          </div>
        </div>

        {/* Thumbnails */}
        <div
          ref={thumbnailRef}
          className="mt-2.5 sm:mt-3 flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none sm:grid sm:grid-cols-6 sm:overflow-visible pb-1"
        >
          {images.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`overflow-hidden rounded-lg sm:rounded-xl border-2 transition-all aspect-square shrink-0 w-[60px] sm:w-auto ${
                activeIdx === idx
                  ? 'border-[#10BFD8]/50 opacity-100'
                  : 'border-white/10 opacity-50 hover:opacity-75'
              }`}
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-contain p-0.5 sm:p-1"
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
          {video && (
            <button
              onClick={() => setActiveIdx(images.length)}
              className={`relative overflow-hidden rounded-xl border-2 transition-all aspect-square shrink-0 w-[60px] sm:w-auto ${
                activeIdx === images.length
                  ? 'border-[#10BFD8]/50 opacity-100'
                  : 'border-white/10 opacity-50 hover:opacity-75'
              }`}
            >
              {images[0] ? (
                <img src={images[0]} alt="" className="h-full w-full object-contain p-1" loading="lazy" decoding="async" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#111720] text-[#5a6678]">
                  <Maximize2 size={16} />
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90">
                  <span className="ml-0.5 text-[10px] font-bold text-[#080c12]">▶</span>
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-[110] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-4 z-[110] rounded-full bg-white/10 px-3 py-1.5 text-[13px] text-white/80">
              {lightboxIdx + 1} / {images.length}
            </div>

            {/* Navigation */}
            {lightboxIdx > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIdx((p) => p - 1); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Anterior"
              >
                <ChevronLeft size={22} />
              </button>
            )}
            {lightboxIdx < images.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIdx((p) => p + 1); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Siguiente"
              >
                <ChevronRight size={22} />
              </button>
            )}

            {/* Image */}
            <motion.img
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              src={images[lightboxIdx]}
              alt={`${alt} - imagen ${lightboxIdx + 1}`}
              className="max-h-[85vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
              decoding="async"
            />

            {/* Thumbnails strip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[110] flex gap-2 overflow-x-auto scrollbar-none max-w-[90vw] p-2">
              {images.map((src, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setLightboxIdx(idx); }}
                  className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                    lightboxIdx === idx ? 'border-[#10BFD8]' : 'border-white/20 opacity-50 hover:opacity-75'
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
