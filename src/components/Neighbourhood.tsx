/**
 * "Where you'll be" — a static map placeholder plus the neighbourhood blurb.
 * No map library: this is a visual clone, so the tile area is a skeleton block.
 */

import { Pin } from "./icons";
import { Section, ShowMore } from "./primitives";
import { neighbourhood } from "@/data/listing";

export function Neighbourhood() {
  return (
    <Section heading={neighbourhood.heading} headingId="neighbourhood">
      <div
        role="img"
        aria-label={`Map of ${neighbourhood.location}`}
        className="flex h-[480px] w-full items-center justify-center rounded-xl bg-skeleton"
      >
        <Pin size={48} className="text-rausch" />
      </div>

      <p className="mt-6 text-base font-semibold text-ink">
        {neighbourhood.location}
      </p>
      <p className="text-sm text-muted">{neighbourhood.note}</p>

      <h3 className="mt-8 text-lg font-semibold text-ink">
        {neighbourhood.highlightsTitle}
      </h3>
      <p className="mt-2 text-base text-ink">{neighbourhood.body}</p>

      <div className="mt-4">
        <ShowMore />
      </div>
    </Section>
  );
}
