"use client";

import { useEffect, useState } from "react";
import { booking, listing } from "@/data/listing";
import { Container, formatINR } from "./primitives";
import { Star } from "./icons";

/** Height of the bar — also the scroll offset applied when jumping to a section. */
const BAR_H = 68;

/** Scroll distance past the hero at which the bar slides in. */
const REVEAL_AT = 640;

const TABS = [
  { id: "photos", label: "Photos" },
  { id: "amenities", label: "Amenities" },
  { id: "reviews", label: "Reviews" },
  { id: "location", label: "Location" },
] as const;

/**
 * Secondary navigation that replaces the header once the hero has scrolled
 * away: section tabs on the left, the price summary and Reserve CTA on the
 * right. Hidden — and untabbable — until it is on screen.
 */
export function StickyNav() {
  const [shown, setShown] = useState(false);
  const [active, setActive] = useState<string>(TABS[0].id);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > REVEAL_AT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // A section counts as current once it clears the bar and before it has
    // scrolled most of the way out; ties resolve to the topmost tab.
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const current = TABS.find((tab) => visible.has(tab.id));
        if (current) setActive(current.id);
      },
      { rootMargin: `-${BAR_H + 1}px 0px -60% 0px` },
    );

    for (const tab of TABS) {
      const el = document.getElementById(tab.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  function goTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - BAR_H,
      behavior: reduced ? "auto" : "smooth",
    });
  }

  return (
    <div
      aria-hidden={!shown}
      className={`fixed inset-x-0 top-0 z-50 h-[68px] border-b border-line-soft bg-surface transition-[transform,opacity,visibility] duration-[260ms] ${
        shown
          ? "visible translate-y-0 opacity-100"
          : "invisible -translate-y-full opacity-0"
      }`}
      style={{ transitionTimingFunction: "var(--ease-airbnb)" }}
    >
      <Container className="flex h-full items-center justify-between">
        <nav aria-label="Listing sections" className="flex h-full items-center gap-8">
          {TABS.map((tab) => {
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => goTo(tab.id)}
                aria-current={isActive ? "true" : undefined}
                className={`h-full border-b-2 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "border-ink text-ink"
                    : "border-transparent text-muted hover:text-ink"
                }`}
                style={{ transitionTimingFunction: "var(--ease-airbnb)" }}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-ink">
              {formatINR(booking.total)}
              <span className="font-normal text-muted">
                {" "}
                for {booking.nights} nights
              </span>
            </p>
            <p className="flex items-center justify-end gap-1 text-xs text-muted">
              <Star size={10} className="text-ink" />
              {listing.rating} · {listing.reviewCount} reviews
            </p>
          </div>

          <button
            type="button"
            className="rounded-lg bg-rausch px-6 py-[10px] text-sm font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-rausch-dark active:scale-[0.99]"
            style={{ transitionTimingFunction: "var(--ease-airbnb)" }}
          >
            Reserve
          </button>
        </div>
      </Container>
    </div>
  );
}
