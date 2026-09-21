"use client";

/**
 * Reviews block: laurel masthead, rating stats strip, topic chips, and the
 * two-column review grid. Client-side only because each long review carries
 * its own "Show more" toggle.
 */

import { useState } from "react";
import Image from "next/image";
import { ICONS, Star } from "./icons";
import { OutlineButton, Section, ShowMore } from "./primitives";
import {
  listing,
  ratingBreakdown,
  ratingDistribution,
  reviewTopics,
  reviews,
} from "@/data/listing";

/** Bodies past this length overflow the 6-line clamp and get a toggle. */
const LONG_REVIEW = 200;

function Stars() {
  return (
    <span className="flex items-center gap-px text-ink">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={10} />
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  const [open, setOpen] = useState(false);
  const long = review.body.length > LONG_REVIEW;

  return (
    <article>
      <div className="flex items-center gap-3">
        {review.avatar ? (
          <Image
            src={review.avatar}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-base font-semibold text-white"
          >
            {review.initial}
          </span>
        )}
        <div>
          <div className="text-base font-semibold text-ink">{review.name}</div>
          <div className="text-sm text-muted">{review.tenure}</div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-sm text-muted">
        <Stars />
        <span aria-hidden="true">·</span>
        <span>{review.when}</span>
      </div>

      <div
        className={`mt-2 text-base leading-6 text-ink ${
          long && !open ? "clamp-6" : ""
        }`}
      >
        {review.body.split("\n").map((para, i) => (
          <p key={i} className={i > 0 ? "mt-4" : undefined}>
            {para}
          </p>
        ))}
      </div>

      {long && (
        <div className="mt-2">
          <ShowMore
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            {open ? "Show less" : "Show more"}
          </ShowMore>
        </div>
      )}
    </article>
  );
}

export function Reviews() {
  return (
    <Section>
      {/* Masthead */}
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center gap-1">
          <Image
            src="/assets/images/ui/laurel-left.png"
            alt=""
            width={40}
            height={60}
            className="h-[60px] w-auto"
          />
          <span className="text-[56px] font-semibold leading-none text-ink">
            {listing.rating}
          </span>
          <Image
            src="/assets/images/ui/laurel-right.png"
            alt=""
            width={40}
            height={60}
            className="h-[60px] w-auto"
          />
        </div>
        <p className="mt-4 text-2xl font-semibold text-ink">Guest favourite</p>
        <p className="mt-2 max-w-md text-base text-muted">
          {listing.guestFavourite}
        </p>
      </div>

      {/* Stats strip */}
      <div className="mt-10 flex divide-x divide-line border-t border-b border-line-soft py-6">
        <div className="w-[200px] shrink-0 pr-6">
          <div className="text-sm font-semibold text-ink">Overall rating</div>
          <ul className="mt-2 space-y-1">
            {ratingDistribution.map((row) => (
              <li key={row.stars} className="flex items-center gap-2">
                <span className="w-2 text-xs text-muted">{row.stars}</span>
                <span className="h-1 flex-1 overflow-hidden rounded-full bg-line-soft">
                  <span
                    className="block h-full rounded-full bg-ink"
                    style={{ width: `${row.pct * 100}%` }}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>

        {ratingBreakdown.map(({ label, value, icon }) => {
          const Icon = ICONS[icon];
          return (
            <div
              key={label}
              className="flex flex-1 flex-col justify-between px-6"
            >
              <div className="text-xs text-muted">{label}</div>
              <div className="mt-2 text-base font-semibold text-ink">
                {value.toFixed(1)}
              </div>
              <Icon size={24} className="mt-2 text-ink" />
            </div>
          );
        })}
      </div>

      {/* Topic chips */}
      <ul className="mt-8 flex flex-wrap gap-2">
        {reviewTopics.map((topic) => (
          <li key={topic.label}>
            <span className="flex items-center gap-2 rounded-pill border border-line px-[14px] py-2 transition-colors duration-200 hover:border-ink">
              <Image src={topic.icon} alt="" width={20} height={20} />
              <span className="text-sm font-medium text-ink">
                {topic.label}
              </span>
              <span className="text-sm text-muted">{topic.count}</span>
            </span>
          </li>
        ))}
      </ul>

      {/* Review grid */}
      <div className="mt-10 grid grid-cols-2 gap-x-16 gap-y-10">
        {reviews.map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
      </div>

      <div className="mt-10">
        <OutlineButton>Show all {listing.reviewCount} reviews</OutlineButton>
      </div>
    </Section>
  );
}
