"use client";

/**
 * "More stays nearby" — a two-page carousel of four cards per page. Paging
 * translates the track by a whole page width rather than scrolling.
 */

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "./icons";
import { Section, formatINR } from "./primitives";
import { booking, nearbyStays } from "@/data/listing";

const PER_PAGE = 4;
const pages = Array.from(
  { length: Math.ceil(nearbyStays.length / PER_PAGE) },
  (_, i) => nearbyStays.slice(i * PER_PAGE, (i + 1) * PER_PAGE),
);

export function NearbyStays() {
  const [page, setPage] = useState(0);

  return (
    <Section>
      <div className="mb-6 flex items-center justify-between">
        <h2
          id="nearby-stays"
          className="text-[22px] font-semibold leading-[26px] text-ink"
        >
          More stays nearby
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted">
            {page + 1} / {pages.length}
          </span>
          <button
            type="button"
            aria-label="Previous"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 enabled:hover:bg-hover disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={12} />
          </button>
          <button
            type="button"
            aria-label="Next"
            disabled={page === pages.length - 1}
            onClick={() => setPage((p) => p + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 enabled:hover:bg-hover disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-400"
          style={{
            transform: `translateX(-${page * 100}%)`,
            transitionTimingFunction: "var(--ease-airbnb)",
          }}
        >
          {pages.map((group, i) => (
            <ul
              key={i}
              aria-hidden={i !== page}
              className="grid w-full shrink-0 grid-cols-4 gap-6"
            >
              {group.map((stay) => (
                <li key={stay.title} className="group">
                  <div className="relative aspect-square overflow-hidden rounded-xl">
                    <Image
                      src={stay.src}
                      alt={stay.title}
                      fill
                      sizes="250px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      style={{ transitionTimingFunction: "var(--ease-airbnb)" }}
                    />
                  </div>
                  <p className="mt-3 truncate text-[15px] font-medium text-ink">
                    {stay.title}
                  </p>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <span className="text-sm text-muted">
                      {formatINR(stay.price)} for {booking.nights} nights
                    </span>
                    <span className="flex shrink-0 items-center gap-1 text-sm text-ink">
                      <Star size={10} />
                      {stay.rating % 1 === 0 ? stay.rating.toFixed(1) : stay.rating}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </Section>
  );
}
