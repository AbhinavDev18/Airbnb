"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { photos, photosByCategory } from "@/data/listing";
import { useDialog } from "@/hooks/useDialog";
import { ChevronLeft, Heart, Share } from "./icons";

/** Global index of a photo, so clicking one opens the lightbox at that photo. */
const indexOf = (id: string) => photos.findIndex((p) => p.id === id);

/**
 * Full-screen scrollable gallery.
 *
 * Layout is a 976px column split into two 458px halves: the category title sits
 * in the left half, the photos stack in the right. Within a category the photos
 * repeat a [full, half, half] rhythm, matching the reference.
 */
export function PhotoTour({
  open,
  onClose,
  onOpenPhoto,
  getFocusPhoto,
}: {
  open: boolean;
  onClose: () => void;
  onOpenPhoto: (index: number) => void;
  /**
   * Reads the index of the photo the lightbox was last showing. The tour
   * unmounts while the lightbox is up, so the button that opened it no longer
   * exists to restore focus to — on the way back we focus its replacement.
   *
   * A getter rather than a value: the caller holds this in a ref, and reading a
   * ref during render is unsafe under concurrent rendering.
   */
  getFocusPhoto?: () => number | null;
}) {
  const ref = useDialog<HTMLDivElement>({
    open,
    onClose,
    initialFocus: (root) => {
      const index = getFocusPhoto?.();
      return index == null
        ? null
        : root.querySelector<HTMLElement>(`[data-photo-index="${index}"]`);
    },
  });
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>(
    photosByCategory[0].category,
  );

  const scrollToCategory = useCallback((category: string) => {
    const target = document.getElementById(
      `tour-${category.replace(/\s+/g, "-")}`,
    );
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Highlight the thumbnail for whichever category is currently in view.
  useEffect(() => {
    if (!open) return;
    const root = scrollerRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) {
          setActiveCategory(visible.target.getAttribute("data-category") ?? "");
        }
      },
      { root, rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    for (const el of root.querySelectorAll("[data-category]")) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour"
      tabIndex={-1}
      className="fixed inset-0 z-[60] bg-white animate-[tourIn_260ms_var(--ease-airbnb)]"
    >
      {/* Sticky chrome */}
      <header className="absolute inset-x-0 top-0 z-10 flex h-[74px] items-center justify-between bg-white px-6">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photo tour"
          className="flex size-10 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-hover"
        >
          <ChevronLeft size={16} />
        </button>

        <h2 className="absolute left-1/2 -translate-x-1/2 text-base font-semibold text-ink">
          Photo tour
        </h2>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Share this listing"
            className="flex size-10 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-hover"
          >
            <Share size={16} />
          </button>
          <button
            type="button"
            aria-label="Save this listing"
            className="flex size-10 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-hover"
          >
            <Heart size={16} />
          </button>
        </div>
      </header>

      <div
        ref={scrollerRef}
        className="h-full overflow-y-auto pt-[74px] pb-24"
      >
        <div className="mx-auto w-[976px] max-w-full">
          {/* Category thumbnail strip */}
          <nav aria-label="Jump to a room" className="pb-10 pt-4">
            {/* 11px gap is what lets 8 thumbnails sit in the first row at
                976px, matching the reference's 8 + 1 wrap. */}
            <ul className="flex flex-wrap gap-[11px]">
              {photosByCategory.map(({ category, photos: group }) => {
                const active = activeCategory === category;
                return (
                  <li key={category}>
                    <button
                      type="button"
                      onClick={() => scrollToCategory(category)}
                      aria-current={active ? "true" : undefined}
                      className="group w-[112px] text-left"
                    >
                      <span
                        className={`block overflow-hidden rounded-lg transition-opacity duration-200 ${
                          active ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={group[0].src}
                          alt=""
                          width={112}
                          height={105}
                          className="h-[105px] w-[112px] object-cover"
                        />
                      </span>
                      <span
                        className={`mt-2 block text-[13px] leading-[17px] ${
                          active
                            ? "font-semibold text-ink underline underline-offset-4"
                            : "text-faint"
                        }`}
                      >
                        {category}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Category sections */}
          {photosByCategory.map(({ category, subtitle, photos: group }) => (
            <section
              key={category}
              id={`tour-${category.replace(/\s+/g, "-")}`}
              data-category={category}
              aria-labelledby={`tour-h-${category.replace(/\s+/g, "-")}`}
              className="grid grid-cols-[458px_458px] gap-x-[60px] pb-14 scroll-mt-[90px]"
            >
              <div>
                <h3
                  id={`tour-h-${category.replace(/\s+/g, "-")}`}
                  className="text-[32px] font-semibold leading-[36px] text-ink"
                >
                  {category}
                </h3>
                {subtitle && (
                  <p className="mt-2 text-base text-faint">{subtitle}</p>
                )}
              </div>

              <TourPhotos
                photos={group}
                onOpenPhoto={onOpenPhoto}
              />
            </section>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes tourIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/**
 * Lays a category's photos out in the reference's repeating rhythm:
 * one full-width 458x305, then a pair of 223x149, and repeat.
 */
function TourPhotos({
  photos: group,
  onOpenPhoto,
}: {
  photos: typeof photos;
  onOpenPhoto: (index: number) => void;
}) {
  const rows: (typeof photos)[] = [];
  for (let i = 0; i < group.length; ) {
    rows.push(group.slice(i, i + 1)); // full
    i += 1;
    if (i < group.length) {
      rows.push(group.slice(i, i + 2)); // pair
      i += 2;
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {rows.map((row, r) => (
        <div key={r} className={row.length === 1 ? "" : "grid grid-cols-2 gap-3"}>
          {row.map((photo) => (
            <TourPhoto
              key={photo.id}
              photo={photo}
              index={indexOf(photo.id)}
              full={row.length === 1}
              onOpen={() => onOpenPhoto(indexOf(photo.id))}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function TourPhoto({
  photo,
  index,
  full,
  onOpen,
}: {
  photo: (typeof photos)[number];
  /** Global index, so the tour can re-focus this photo on return. */
  index: number;
  full: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      data-photo-index={index}
      aria-label={`Open ${photo.alt} full screen`}
      className="group relative block w-full overflow-hidden rounded-lg"
      style={{ aspectRatio: full ? "458 / 305" : "223 / 149" }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={full ? "458px" : "223px"}
        className="object-cover transition-transform duration-300 group-hover:scale-[1.045]"
        style={{ transitionTimingFunction: "var(--ease-airbnb)" }}
      />
      <span className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/10" />
    </button>
  );
}
