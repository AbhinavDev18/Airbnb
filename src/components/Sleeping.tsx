/** "Where you'll sleep" — one bordered card per sleeping arrangement. */

import { sleepingArrangements } from "@/data/listing";
import { ICONS } from "./icons";
import { Section } from "./primitives";

export function Sleeping() {
  return (
    <Section heading="Where you'll sleep" headingId="sleeping">
      <ul className="grid grid-cols-2 gap-4">
        {sleepingArrangements.map((a) => {
          const Icon = ICONS[a.icon];
          return (
            <li
              key={a.room}
              className="max-w-[312px] rounded-xl border border-line p-6"
            >
              <Icon size={24} className="text-ink" />
              <p className="mt-4 text-base font-semibold text-ink">{a.room}</p>
              <p className="mt-1 text-sm text-muted">{a.detail}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
