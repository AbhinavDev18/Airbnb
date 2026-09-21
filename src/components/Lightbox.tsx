"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { photos } from "@/data/listing";
import { useDialog } from "@/hooks/useDialog";
import { ChevronLeft, ChevronRight, Close, Grid } from "./icons";

/**
 * Single-photo viewer. Pages with the arrow buttons or ←/→, closes on Escape.
 *
 * The counter is mirrored into a polite live region so screen reader users hear
 * "3 of 43" when paging — the visible counter alone announces nothing.
 */
export function Lightbox({
  index,
  onIndexChange,
  onClose,
  onBackToTour,
}: {
  /** Null when closed. */
  index: number | null;
  onIndexChange: (next: number) => void;
  onClose: () => void;
  onBackToTour: () => void;
}) {
  const open = index !== null;
  const current = open ? photos[index] : null;

  // Direction drives the slide-in; 1 = moving forward, -1 = back.
  const [direction, setDirection] = useState(1);

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      const next = index + delta;
      if (next < 0 || next >= photos.length) return;
      setDirection(delta > 0 ? 1 : -1);
      onIndexChange(next);
    },
    [index, onIndexChange],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    },
    [go],
  );

  const ref = useDialog<HTMLDivElement>({ open, onClose, onKeyDown });

  // Warm the neighbours so paging doesn't flash an empty frame.
  useEffect(() => {
    if (index === null) return;
    for (const i of [index - 1, index + 1]) {
      const p = photos[i];
      if (!p) continue;
      const img = new window.Image();
      img.src = p.src;
    }
  }, [index]);

  if (!open || !current || index === null) return null;

  const atStart = index === 0;
  const atEnd = index === photos.length - 1;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${photos.length}: ${current.alt}`}
      tabIndex={-1}
      className="fixed inset-0 z-[70] flex flex-col bg-white animate-[lightboxIn_220ms_var(--ease-airbnb)]"
    >
      {/* Header: back-to-tour, caption, counter, close. */}
      <header className="relative flex h-[74px] shrink-0 items-center justify-between px-6">
        <button
          type="button"
          onClick={onBackToTour}
          aria-label="Back to photo tour"
          className="flex size-10 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-hover"
        >
          <Grid size={18} />
        </button>

        <p className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-base font-semibold text-ink">
          {current.category}
        </p>

        <div className="flex items-center gap-4">
          <span className="text-sm text-ink tabular-nums">
            {index + 1} of {photos.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close photo viewer"
            className="flex size-10 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-hover"
          >
            <Close size={16} />
          </button>
        </div>
      </header>

      {/* Stage */}
      {/* py-12 is what sizes the photo: the stage is height-constrained, so the
          vertical padding — not a max-width — decides how large it renders. */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-6 py-12">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={atStart}
          aria-label="Previous photo"
          className="absolute left-6 z-10 flex size-10 items-center justify-center rounded-full border border-line bg-white text-ink shadow-[0_2px_6px_rgba(0,0,0,0.12)] transition-transform duration-200 hover:scale-105 disabled:pointer-events-none disabled:opacity-30"
          style={{ transitionTimingFunction: "var(--ease-airbnb)" }}
        >
          <ChevronLeft size={14} />
        </button>

        <figure className="flex h-full max-h-full w-full max-w-[1100px] flex-col items-center justify-center">
          <div
            key={current.id}
            className="relative h-full w-full"
            style={{
              animation: `${
                direction > 0 ? "slideFromRight" : "slideFromLeft"
              } 260ms var(--ease-airbnb)`,
            }}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="(max-width: 1200px) 90vw, 1000px"
              className="object-contain"
              priority
            />
          </div>
        </figure>

        <button
          type="button"
          onClick={() => go(1)}
          disabled={atEnd}
          aria-label="Next photo"
          className="absolute right-6 z-10 flex size-10 items-center justify-center rounded-full border border-line bg-white text-ink shadow-[0_2px_6px_rgba(0,0,0,0.12)] transition-transform duration-200 hover:scale-105 disabled:pointer-events-none disabled:opacity-30"
          style={{ transitionTimingFunction: "var(--ease-airbnb)" }}
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Announces the photo change without stealing focus. */}
      <p aria-live="polite" className="sr-only-focusable absolute">
        Photo {index + 1} of {photos.length}, {current.alt}
      </p>

      <style>{`
        @keyframes lightboxIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideFromRight {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideFromLeft {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
