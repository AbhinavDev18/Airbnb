"use client";

/**
 * The block directly under the hero: subtitle + stats, the guest-favourite
 * card, the three highlights, the host row, and the clamped description.
 * Client-side only because the description collapses.
 */

import { useState } from "react";
import Image from "next/image";
import { highlights, host, listing } from "@/data/listing";
import { ICONS } from "./icons";
import { Divider, ShowMore } from "./primitives";

/** One half of the wreath. Aspect is 240x365, so 34px tall is 22px wide. */
function Laurel({ side }: { side: "left" | "right" }) {
  return (
    <Image
      src={`/assets/images/ui/laurel-${side}.png`}
      alt=""
      width={22}
      height={34}
      className="h-[34px] w-auto"
    />
  );
}

function GuestFavouriteCard() {
  return (
    <div className="mt-6 flex items-center justify-between rounded-xl border border-line p-6">
      <div className="flex shrink-0 items-center gap-1">
        <Laurel side="left" />
        <span className="flex flex-col items-center text-[13px] font-semibold leading-[15px] text-ink">
          <span>Guest</span>
          <span>favourite</span>
        </span>
        <Laurel side="right" />
      </div>

      <p className="mx-6 max-w-[330px] text-base font-medium text-ink">
        {listing.guestFavourite}
      </p>

      <div className="flex shrink-0 items-center gap-4">
        <div className="flex flex-col items-center">
          <span className="text-[22px] font-semibold leading-[26px] text-ink">
            {listing.rating}
          </span>
          <span className="text-xs text-muted">Rating</span>
        </div>
        <span aria-hidden="true" className="h-8 w-px bg-line" />
        <div className="flex flex-col items-center">
          <span className="text-[22px] font-semibold leading-[26px] text-ink">
            {listing.reviewCount}
          </span>
          <span className="text-xs text-muted">Reviews</span>
        </div>
      </div>
    </div>
  );
}

export function Overview() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="py-8" aria-label="Listing overview">
      <h2 className="text-[22px] font-semibold leading-[26px] text-ink">
        {listing.subtitle}
      </h2>
      <p className="mt-1 text-base text-ink">{listing.stats}</p>

      <GuestFavouriteCard />

      <ul className="mt-8 flex flex-col gap-6">
        {highlights.map((h) => {
          const Icon = ICONS[h.icon];
          return (
            <li key={h.title} className="flex gap-4">
              <Icon size={24} className="mt-0.5 shrink-0 text-ink" />
              <div>
                <p className="text-base font-semibold text-ink">{h.title}</p>
                <p className="mt-0.5 text-[15px] text-muted">{h.body}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <Divider className="mt-8" />
      <div className="flex items-center gap-3 py-6">
        <Image
          src={host.avatar}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <p className="text-base font-semibold text-ink">
            Hosted by {host.name}
          </p>
          <p className="text-sm text-muted">{host.tenure}</p>
        </div>
      </div>

      <Divider />
      <div className="pt-6">
        <p className="text-sm text-muted">
          {listing.translationNote}{" "}
          <button
            type="button"
            className="font-semibold text-ink underline underline-offset-2 transition-opacity duration-200 hover:opacity-70"
          >
            Show original
          </button>
        </p>

        <p
          className={`mt-4 text-base leading-6 text-ink ${expanded ? "" : "clamp-6"}`}
        >
          {listing.description}
        </p>

        <div className="mt-4">
          <ShowMore
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Show less" : "Show more"}
          </ShowMore>
        </div>
      </div>
    </section>
  );
}
