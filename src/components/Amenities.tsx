"use client";

/** "What this place offers" — the ten featured amenities plus the modal trigger. */

import { featuredAmenities } from "@/data/listing";
import { ICONS } from "./icons";
import { OutlineButton, Section } from "./primitives";

export function Amenities({ onShowAll }: { onShowAll: () => void }) {
  return (
    <Section heading="What this place offers" headingId="amenities">
      <ul className="grid grid-cols-2 gap-4">
        {featuredAmenities.map((a) => {
          const Icon = ICONS[a.icon];
          return (
            <li key={a.name} className="flex items-center gap-4">
              <Icon
                size={24}
                className={`shrink-0 ${a.unavailable ? "text-muted opacity-60" : "text-ink"}`}
              />
              <span
                className={
                  a.unavailable
                    ? "text-base text-muted line-through"
                    : "text-base text-ink"
                }
              >
                {a.name}
              </span>
            </li>
          );
        })}
      </ul>

      <OutlineButton className="mt-8" onClick={onShowAll}>
        Show all 50 amenities
      </OutlineButton>
    </Section>
  );
}
