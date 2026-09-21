/** "Things to know" — cancellation policy, house rules, safety, in three columns. */

import { Section, ShowMore } from "./primitives";
import { thingsToKnow } from "@/data/listing";

export function ThingsToKnow() {
  return (
    <Section heading="Things to know" headingId="things-to-know">
      <div className="grid grid-cols-3 gap-12">
        {thingsToKnow.map((column) => (
          <div key={column.title}>
            <h3 className="text-lg font-semibold text-ink">{column.title}</h3>
            <div className="mt-4 flex flex-col gap-3">
              {column.lines.map((line) => (
                <p key={line} className="text-base text-ink">
                  {line}
                </p>
              ))}
            </div>
            <div className="mt-4">
              <ShowMore>Learn more</ShowMore>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
